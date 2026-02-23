import { ChatMessage, ConversationContext, PhilosophyContent, Location, UserProfile, SouvenirAnalysis } from '../types';
import { buildChatSystemPrompt, buildLocationSystemPrompt, buildLensSystemPrompt } from '../constants';

async function callClaude(body: Record<string, unknown>): Promise<string> {
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Claude API error:', err);
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || '';
}

export async function generateChatResponse(
  messages: ChatMessage[],
  context: ConversationContext
): Promise<string> {
  try {
    return await callClaude({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: buildChatSystemPrompt(context),
      messages: messages.slice(-20).map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });
  } catch {
    return "I'm having trouble connecting right now. Please try again in a moment, or tap 'Talk to a human' for immediate help.";
  }
}

export async function generateLocationContent(
  location: Location,
  profile: UserProfile,
  activeLens: string
): Promise<PhilosophyContent> {
  try {
    const prompt = `
Analyze "${location.name}" (${location.kanji}) in ${location.area}, Japan.

Provide a response in JSON format with these fields:
{
  "title": "A poetic title for this place",
  "personalLensText": "A personalized insight connecting this place to the traveler's interests (${profile.primaryLenses.join(', ')}) and their ${activeLens} lens. Reference specific sub-interests: ${profile.subInterests?.join(', ') || 'general'}.",
  "historicalContext": "Historical facts about this place, adapted for ${profile.learningDepth || 'Story'} level depth.",
  "taruWoShiruLesson": "A philosophical takeaway connecting this place to the concept of knowing contentment (taru wo shiru).",
  "personalizedTips": {
    "food": "A food recommendation near this location respecting dietary restrictions: ${profile.dietaryRestrictions.join(', ') || 'None'}. Food preferences: ${profile.foodLikes?.join(', ') || 'Open'}.",
    "shopping": "A shopping recommendation for someone interested in: ${profile.shoppingCategories?.join(', ') || 'crafts'}. Materials: ${profile.materials?.join(', ') || 'any'}.",
    "warning": "Any accessibility or practical advice for someone with: ${profile.mobility?.join(', ') || 'no restrictions'}. Taboos: ${profile.taboos?.join(', ') || 'none'}."
  }
}`;

    const text = await callClaude({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: buildLocationSystemPrompt(profile, activeLens),
      messages: [{ role: 'user', content: prompt }],
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as PhilosophyContent;
    }
    throw new Error('No JSON in response');
  } catch (error) {
    console.error('Location content error:', error);
    return {
      title: 'A Quiet Encounter',
      personalLensText: 'This place holds stories waiting to be discovered through your unique perspective.',
      historicalContext: 'Centuries of history stand before you, each stone carrying the memory of countless visitors.',
      taruWoShiruLesson: 'Sometimes the deepest understanding comes not from seeking more, but from being present with what is here.',
      personalizedTips: {},
    };
  }
}

export async function analyzeSouvenirImage(
  imageBase64: string,
  profile: UserProfile
): Promise<SouvenirAnalysis> {
  try {
    const text = await callClaude({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: buildLensSystemPrompt(),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: `Analyze this Japanese item. The traveler is interested in: ${profile.primaryLenses.join(', ')}. Respond in JSON format.`,
            },
          ],
        },
      ],
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as SouvenirAnalysis;
    }
    throw new Error('No JSON in response');
  } catch (error) {
    console.error('Souvenir analysis error:', error);
    return {
      name: 'Japanese Craft Item',
      description: 'A beautiful piece of Japanese craftsmanship.',
      history: 'This item reflects traditional Japanese artisan techniques passed down through generations.',
      materials: ['Traditional materials'],
      craftsmanship: 'Handcrafted using traditional methods.',
      estimatedPrice: 'Please check with the vendor',
      category: 'Craft',
    };
  }
}
