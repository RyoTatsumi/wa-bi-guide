
import { GoogleGenAI, Type } from "@google/genai";
import { PhilosophyContent, UserProfile, Location } from '../types';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const generateLocationPhilosophy = async (
  location: Location,
  profile: UserProfile,
  activeLens: string
): Promise<PhilosophyContent> => {
  
  const systemInstruction = `
    You are the "Soul Mirror" guide of Wa-Bi. 
    You synthesize Japanese history with the specific soul-data of a traveler.
    Rules:
    1. Check Dietary Restrictions first before recommending food.
    2. Adapt explanation depth to the user's "learningDepth" (Academic vs Story).
    3. If the user has mobility constraints, provide a "Warning" tip.
    4. Connect history to their "Materials" interest (e.g., if they like wood, talk about the carpentry).
  `;

  const prompt = `
    Analyze "${location.name}" (${location.kanji}) for:
    - User Profile: ${JSON.stringify(profile)}
    - Active Lens: ${activeLens}
    
    Structure in JSON:
    1. "title": A poetic title.
    2. "personalLensText": Deep personalization based on their specific sub-interests (e.g. ${profile.subInterests.join(', ')}) and active lens.
    3. "historicalContext": Facts tailored to their ${profile.learningDepth} learning level.
    4. "taruWoShiruLesson": A philosophical takeaway.
    5. "personalizedTips": {
       "food": "A specific restaurant name and dish nearby matching ${profile.foodLikes.join(', ')} and respecting ${profile.dietaryRestrictions.join(', ')}.",
       "shopping": "A recommendation for ${profile.shoppingCategories.join(', ')} involving ${profile.materials.join(', ')}.",
       "warning": "Advice regarding ${profile.mobility.join(', ')} or ${profile.taboos.join(', ')} if applicable."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            personalLensText: { type: Type.STRING },
            historicalContext: { type: Type.STRING },
            taruWoShiruLesson: { type: Type.STRING },
            personalizedTips: {
              type: Type.OBJECT,
              properties: {
                food: { type: Type.STRING },
                shopping: { type: Type.STRING },
                warning: { type: Type.STRING }
              }
            }
          },
          required: ["title", "personalLensText", "historicalContext", "taruWoShiruLesson", "personalizedTips"]
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as PhilosophyContent;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      title: "The Quiet Encounter",
      personalLensText: "This place mirrors your current journey.",
      historicalContext: "Centuries of history stand before you.",
      taruWoShiruLesson: "You are exactly where you need to be.",
      personalizedTips: {}
    };
  }
};
