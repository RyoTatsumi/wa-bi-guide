
import React, { useState, useEffect } from 'react';
import MapCanvas from './components/MapCanvas';
import KnowledgeCard from './components/KnowledgeCard';
import { ViewState, Location, InterestCategory, UserProfile } from './types';
import { 
  INITIAL_LOCATIONS, AGE_GROUPS, COMPANIONS, MOBILITY_OPTIONS, 
  SUB_INTERESTS, FOOD_LIKES, DIETARY_RESTRICTIONS, SHOPPING_CATS, 
  MATERIALS, TABOOS 
} from './constants';
import { 
  User, Bell, Map as MapIcon, Compass, Sparkles, Navigation, 
  CheckCircle, ChevronRight, Utensils, ShoppingCart, UserCheck, 
  Search, PlusCircle, X, MapPin, ZoomIn, Globe, Settings, Coffee,
  Truck, Camera, Footprints, Languages, Heart, Info, Calendar, Clock, MessageSquare, Send,
  ArrowLeft, PenTool, Wind, ExternalLink
} from 'lucide-react';

const LENS_OPTIONS: InterestCategory[] = ['Samurai', 'Zen', 'Craft', 'Culture', 'DailyLife', 'Anime', 'Nature', 'Food', 'Shopping'];
const AREA_CENTERS = {
  Kyoto: { lat: 35.0116, lng: 135.7681 },
  Osaka: { lat: 34.6937, lng: 135.5023 },
  Nara: { lat: 34.6851, lng: 135.8327 }
};

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('onboarding');
  const [step, setStep] = useState(1);
  const [activeLens, setActiveLens] = useState<InterestCategory>('Zen');
  const [activeArea, setActiveArea] = useState<'Kyoto' | 'Osaka' | 'Nara'>('Kyoto');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [targetPos, setTargetPos] = useState<{ lat: number; lng: number } | null>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Seeker',
    ageGroup: '25–34',
    companions: 'Solo',
    travelStyle: 'Semi-planned',
    stayDuration: '4–7 days',
    mobility: ['Stairs OK'],
    language: 'English',
    primaryLenses: ['Zen'],
    subInterests: [],
    foodLikes: [],
    foodDislikes: [],
    dietaryRestrictions: [],
    foodBehavior: { reservation: false, maxWaitTime: 30, priceRange: 'Mid', adventureLevel: 'Safe' },
    shoppingPurpose: [],
    shoppingCategories: [],
    materials: [],
    shippingNeeded: false,
    dailyPace: '3-4 spots',
    crowdTolerance: 'Medium',
    photographyLevel: 'Casual',
    learningDepth: 'Story',
    taboos: [],
    customTags: [],
  });

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(newPos);
      },
      (err) => console.warn("Geolocation failed", err),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleLocationSelect = (loc: Location) => {
    setSelectedLocation(loc);
    setViewState('knowledge');
  };

  const toggle = (field: keyof UserProfile, value: any, isObjectField?: string) => {
    setProfile(prev => {
      if (isObjectField) {
        const obj = (prev as any)[field];
        return { ...prev, [field]: { ...obj, [isObjectField]: value } };
      }
      const list = (prev as any)[field];
      if (!Array.isArray(list)) return { ...prev, [field]: value };
      return { 
        ...prev, 
        [field]: list.includes(value) ? list.filter((i: any) => i !== value) : [...list, value] 
      };
    });
  };

  const renderOnboarding = () => (
    <div className="flex flex-col h-full bg-washi-white p-8 animate-fade-in overflow-y-auto pb-32">
      <div className="text-center mt-6 mb-10">
        <h1 className="text-3xl font-serif text-japan-blue font-bold tracking-[0.2em] uppercase">The Soul Ledger</h1>
        <div className="flex justify-center gap-1 mt-4">
          {[1, 2, 3, 4, 5, 6].map(s => <div key={s} className={`h-1 w-8 rounded-full transition-all duration-700 ${s <= step ? 'bg-japan-blue' : 'bg-gray-100'}`} />)}
        </div>
      </div>

      <div className="flex-1">
        {step === 1 && (
          <div className="space-y-8 animate-slide-up">
             <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Your Earthly Name</label>
                <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-transparent border-b-2 border-japan-blue p-4 font-serif text-2xl focus:outline-none" />
             </div>
             <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Age Layer</label>
                   <div className="flex flex-wrap gap-2">
                      {AGE_GROUPS.map(a => (
                        <button key={a} onClick={() => toggle('ageGroup', a)} className={`px-4 py-2 border text-[10px] uppercase tracking-widest ${profile.ageGroup === a ? 'bg-japan-blue text-white' : 'bg-white'}`}>{a}</button>
                      ))}
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Companions</label>
                   <div className="flex flex-wrap gap-2">
                      {COMPANIONS.map(c => (
                        <button key={c} onClick={() => toggle('companions', c)} className={`px-4 py-2 border text-[10px] uppercase tracking-widest ${profile.companions === c ? 'bg-japan-blue text-white' : 'bg-white'}`}>{c}</button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-slide-up">
             <h2 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Guiding Lenses & Deep Interests</h2>
             <div className="grid grid-cols-3 gap-2">
                {LENS_OPTIONS.map(l => (
                   <button key={l} onClick={() => { toggle('primaryLenses', l); setActiveLens(l); }} className={`p-3 border font-serif text-[9px] uppercase tracking-widest transition-all ${profile.primaryLenses.includes(l) ? 'bg-japan-blue text-white' : 'bg-white text-gray-400'}`}>{l}</button>
                ))}
             </div>
             <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Refined Interests</label>
                <div className="flex flex-wrap gap-2">
                   {SUB_INTERESTS.map(i => (
                     <button key={i} onClick={() => toggle('subInterests', i)} className={`px-3 py-1 border text-[9px] uppercase tracking-widest ${profile.subInterests.includes(i) ? 'border-japan-blue text-japan-blue bg-blue-50' : 'bg-white text-gray-400 border-gray-100'}`}>{i}</button>
                   ))}
                </div>
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-slide-up">
             <h2 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Sustenance & Restrictions</h2>
             <div className="space-y-4">
                <label className="text-[9px] text-gray-400 uppercase tracking-widest">Favorite Flavors</label>
                <div className="flex flex-wrap gap-2">
                   {FOOD_LIKES.map(f => (
                     <button key={f} onClick={() => toggle('foodLikes', f)} className={`px-3 py-1 border text-[9px] uppercase tracking-widest ${profile.foodLikes.includes(f) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-400 border-gray-100'}`}>{f}</button>
                   ))}
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[9px] text-gray-400 uppercase tracking-widest">Dietary Restrictions</label>
                <div className="flex flex-wrap gap-2">
                   {DIETARY_RESTRICTIONS.map(d => (
                     <button key={d} onClick={() => toggle('dietaryRestrictions', d)} className={`px-3 py-1 border text-[9px] uppercase tracking-widest ${profile.dietaryRestrictions.includes(d) ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-400 border-gray-100'}`}>{d}</button>
                   ))}
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[9px] text-gray-400 uppercase tracking-widest">Adventure Level</label>
                   <div className="flex gap-1">
                      {['Safe', 'Adventurous'].map(v => <button key={v} onClick={() => toggle('foodBehavior', v, 'adventureLevel')} className={`flex-1 py-2 border text-[8px] uppercase tracking-widest ${profile.foodBehavior.adventureLevel === v ? 'bg-japan-blue text-white' : 'bg-white'}`}>{v}</button>)}
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] text-gray-400 uppercase tracking-widest">Max Wait (Min)</label>
                   <input type="number" value={profile.foodBehavior.maxWaitTime} onChange={e => toggle('foodBehavior', parseInt(e.target.value), 'maxWaitTime')} className="w-full bg-white border border-gray-100 p-2 text-xs" />
                </div>
             </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-slide-up">
             <h2 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Artifacts & Materials</h2>
             <div className="space-y-4">
                <label className="text-[9px] text-gray-400 uppercase tracking-widest">Categories of Interest</label>
                <div className="flex flex-wrap gap-2">
                   {SHOPPING_CATS.map(s => (
                     <button key={s} onClick={() => toggle('shoppingCategories', s)} className={`px-3 py-1 border text-[9px] uppercase tracking-widest ${profile.shoppingCategories.includes(s) ? 'bg-kintsugi-gold text-white border-kintsugi-gold' : 'bg-white text-gray-400 border-gray-100'}`}>{s}</button>
                   ))}
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[9px] text-gray-400 uppercase tracking-widest">Resonant Materials</label>
                <div className="flex flex-wrap gap-2">
                   {MATERIALS.map(m => (
                     <button key={m} onClick={() => toggle('materials', m)} className={`px-3 py-1 border text-[9px] uppercase tracking-widest ${profile.materials.includes(m) ? 'bg-sumi-black text-white border-sumi-black' : 'bg-white text-gray-400 border-gray-100'}`}>{m}</button>
                   ))}
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 border border-gray-100 bg-white">
                <input type="checkbox" checked={profile.shippingNeeded} onChange={e => setProfile({...profile, shippingNeeded: e.target.checked})} className="w-5 h-5 accent-japan-blue" />
                <label className="text-[9px] uppercase tracking-widest text-gray-600">International Shipping Needed?</label>
             </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8 animate-slide-up">
             <h2 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Pace & Practicality</h2>
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                   <label className="text-[9px] text-gray-400 uppercase tracking-widest">Daily Pace</label>
                   {['1-2 spots', '3-4 spots', '5-6+ spots'].map(p => (
                     <button key={p} onClick={() => toggle('dailyPace', p)} className={`w-full py-2 border text-[9px] uppercase tracking-widest ${profile.dailyPace === p ? 'bg-japan-blue text-white' : 'bg-white'}`}>{p}</button>
                   ))}
                </div>
                <div className="space-y-4">
                   <label className="text-[9px] text-gray-400 uppercase tracking-widest">Crowd Tolerance</label>
                   {['Low', 'Medium', 'High'].map(t => (
                     <button key={t} onClick={() => toggle('crowdTolerance', t)} className={`w-full py-2 border text-[9px] uppercase tracking-widest ${profile.crowdTolerance === t ? 'bg-japan-blue text-white' : 'bg-white'}`}>{t}</button>
                   ))}
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[9px] text-gray-400 uppercase tracking-widest">Mobility Needs</label>
                <div className="flex flex-wrap gap-2">
                   {MOBILITY_OPTIONS.map(m => (
                     <button key={m} onClick={() => toggle('mobility', m)} className={`px-3 py-1 border text-[9px] uppercase tracking-widest ${profile.mobility.includes(m) ? 'bg-japan-blue text-white' : 'bg-white text-gray-400 border-gray-100'}`}>{m}</button>
                   ))}
                </div>
             </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-8 animate-slide-up text-center py-12">
             <div className="w-24 h-24 bg-japan-blue text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <CheckCircle size={48} />
             </div>
             <h2 className="text-2xl font-serif text-japan-blue leading-relaxed">"The soul is ready to encounter the world."</h2>
             <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mt-4">Profile Synchronization Complete</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-washi-white via-washi-white to-transparent max-w-md mx-auto z-[1000]">
        <div className="flex gap-4">
          <button 
            onClick={() => step < 6 ? setStep(s => s + 1) : setViewState('map')} 
            className="flex-1 py-5 bg-japan-blue text-white font-serif flex items-center justify-center gap-3 shadow-2xl uppercase tracking-[0.2em] text-[10px]"
          >
            {step === 6 ? 'Step into the World' : 'Continue Deepening'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfileEditor = () => (
    <div className="p-8 bg-washi-white h-full overflow-y-auto animate-fade-in pb-40 space-y-12">
      <header className="flex items-center justify-between border-b border-gray-100 pb-8">
         <div>
            <h2 className="text-3xl font-serif text-sumi-black">The Mirror</h2>
            <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mt-1 italic">Reflecting your traveler's soul</p>
         </div>
         <button onClick={() => setViewState('map')} className="p-3 bg-white shadow-xl rounded-full text-japan-blue"><X size={20}/></button>
      </header>

      {/* Identity */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-japan-blue">
          <User size={18} />
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Identity</h3>
        </div>
        <div className="p-6 bg-white border border-gray-100 shadow-xl rounded-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Name</label>
              <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full text-lg font-serif text-japan-blue bg-transparent focus:outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Age Layer</label>
              <select value={profile.ageGroup} onChange={e => toggle('ageGroup', e.target.value)} className="w-full bg-transparent text-sm font-serif">{AGE_GROUPS.map(a => <option key={a}>{a}</option>)}</select>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Spirit */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-kintsugi-gold">
          <Sparkles size={18} />
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Guiding Spirit</h3>
        </div>
        <div className="p-6 bg-white border border-gray-100 shadow-xl rounded-sm space-y-6">
          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Active Lenses</label>
            <div className="flex flex-wrap gap-1">
              {LENS_OPTIONS.map(l => (
                <button key={l} onClick={() => toggle('primaryLenses', l)} className={`px-2 py-1 border text-[8px] uppercase tracking-widest transition-all ${profile.primaryLenses.includes(l) ? 'bg-japan-blue text-white border-japan-blue' : 'bg-white text-gray-400 border-gray-100'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Sub-Interests</label>
            <div className="flex flex-wrap gap-1">
              {SUB_INTERESTS.map(i => (
                <button key={i} onClick={() => toggle('subInterests', i)} className={`px-2 py-1 border text-[8px] uppercase tracking-widest transition-all ${profile.subInterests.includes(i) ? 'bg-blue-50 text-japan-blue border-blue-100' : 'bg-white text-gray-400 border-gray-100'}`}>{i}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustenance */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-orange-600">
          <Utensils size={18} />
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Sustenance</h3>
        </div>
        <div className="p-6 bg-white border border-gray-100 shadow-xl rounded-sm space-y-6">
          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Flavor Likes</label>
            <div className="flex flex-wrap gap-1">
              {FOOD_LIKES.map(f => (
                <button key={f} onClick={() => toggle('foodLikes', f)} className={`px-2 py-1 border text-[8px] uppercase tracking-widest transition-all ${profile.foodLikes.includes(f) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-400 border-gray-100'}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Restrictions</label>
            <div className="flex flex-wrap gap-1">
              {DIETARY_RESTRICTIONS.map(d => (
                <button key={d} onClick={() => toggle('dietaryRestrictions', d)} className={`px-2 py-1 border text-[8px] uppercase tracking-widest transition-all ${profile.dietaryRestrictions.includes(d) ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-400 border-gray-100'}`}>{d}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practicality */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Footprints size={18} />
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Practicality</h3>
        </div>
        <div className="p-6 bg-white border border-gray-100 shadow-xl rounded-sm space-y-6">
           <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Mobility</label>
              <div className="flex flex-wrap gap-1">
                 {MOBILITY_OPTIONS.map(m => (
                   <button key={m} onClick={() => toggle('mobility', m)} className={`px-2 py-1 border text-[8px] uppercase tracking-widest transition-all ${profile.mobility.includes(m) ? 'bg-japan-blue text-white border-japan-blue' : 'bg-white text-gray-400 border-gray-100'}`}>{m}</button>
                 ))}
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                 <label className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Pace</label>
                 <select value={profile.dailyPace} onChange={e => toggle('dailyPace', e.target.value)} className="w-full bg-transparent text-[10px] font-bold uppercase tracking-widest">{['1-2 spots', '3-4 spots', '5-6+ spots'].map(p => <option key={p}>{p}</option>)}</select>
              </div>
              <div className="space-y-1">
                 <label className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Tolerance</label>
                 <select value={profile.crowdTolerance} onChange={e => toggle('crowdTolerance', e.target.value)} className="w-full bg-transparent text-[10px] font-bold uppercase tracking-widest">{['Low', 'Medium', 'High'].map(t => <option key={t}>{t}</option>)}</select>
              </div>
           </div>
        </div>
      </section>

      <button onClick={() => {setViewState('onboarding'); setStep(1);}} className="w-full py-6 bg-sumi-black text-white text-[10px] font-bold tracking-[0.4em] uppercase flex items-center justify-center gap-3 shadow-2xl hover:bg-gray-800 transition-colors">
        <UserCheck size={18} className="text-kintsugi-gold" /> Re-Engrave Identity
      </button>
    </div>
  );

  const renderBookingView = () => (
    <div className="flex flex-col h-full bg-washi-white animate-fade-in overflow-y-auto font-serif">
      <header className="p-8 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <button onClick={() => setViewState('knowledge')} className="text-japan-blue hover:scale-110 transition-transform"><ArrowLeft size={24} /></button>
        <div className="text-center">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-1">Ritual of Encounter</h2>
          <p className="text-xl text-japan-blue font-bold tracking-widest">Intention Bridge</p>
        </div>
        <div className="w-6"></div>
      </header>

      <div className="p-8 space-y-12 pb-40 flex-1 flex flex-col justify-center text-center">
        <div className="space-y-6">
          <Wind className="mx-auto text-kintsugi-gold opacity-50 mb-4 animate-bounce-slight" size={48} />
          <h3 className="text-3xl text-japan-blue font-bold tracking-widest leading-tight">
            Connecting to the<br/>Soul Guide Ledger
          </h3>
          <p className="text-sm text-gray-600 italic leading-loose max-w-xs mx-auto">
            "Your path is coming into focus. <br/>
            Now, finalize your encounter through our official booking gate."
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-white border border-japan-blue/10 rounded-sm shadow-xl">
             <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-kintsugi-gold">
                   <img src={selectedLocation?.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="text-left">
                   <p className="text-[9px] uppercase tracking-widest text-gray-400">Destination</p>
                   <p className="text-lg font-bold text-japan-blue">{selectedLocation?.kanji}</p>
                </div>
             </div>
             <p className="text-[10px] text-gray-400 uppercase tracking-widest">Selected Spirit Lens: {activeLens}</p>
          </div>
        </div>

        <div className="space-y-6">
          <a 
            href="https://tarushiru.line-ene.com/public-book/3"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-6 bg-sumi-black text-white font-serif flex flex-col items-center justify-center gap-1 shadow-2xl uppercase tracking-[0.5em] text-[12px] group relative overflow-hidden active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-japan-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative z-10 flex items-center gap-3">
               Open Official Form <ExternalLink size={16} />
            </div>
            <span className="relative z-10 text-[7px] opacity-40 group-hover:opacity-100 transition-opacity">Tarushiru Journal Portal</span>
          </a>
          
          <button onClick={() => setViewState('knowledge')} className="text-[10px] uppercase tracking-[0.4em] text-gray-400 hover:text-japan-blue transition-colors">
            Return to Reflection
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen bg-washi-white relative shadow-2xl overflow-hidden flex flex-col font-serif">
      {viewState !== 'onboarding' && viewState !== 'booking' && (
        <header className="h-16 bg-washi-white/95 border-b border-gray-100 flex justify-between items-center px-6 shrink-0 z-[1000] backdrop-blur-md">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 border-2 border-japan-blue rounded-sm flex items-center justify-center font-bold text-japan-blue">和</div>
             <h1 className="text-xl font-serif text-japan-blue tracking-tighter font-bold">Wa-Bi</h1>
          </div>
          <button onClick={() => setViewState('profile')} className="w-10 h-10 rounded-full border-2 border-kintsugi-gold p-1 bg-white overflow-hidden shadow-inner active:scale-90 transition-transform">
             <div className="w-full h-full bg-japan-blue rounded-full flex items-center justify-center text-white"><User size={16} /></div>
          </button>
        </header>
      )}

      <main className="flex-1 relative overflow-hidden">
        {viewState === 'onboarding' && renderOnboarding()}
        {viewState === 'map' && (
          <div className="w-full h-full relative">
            <MapCanvas 
              locations={INITIAL_LOCATIONS} 
              onLocationSelect={handleLocationSelect} 
              userLocation={userPos} 
              targetLocation={targetPos}
              activeLens={activeLens} 
            />
            
            <div className="absolute top-4 left-0 right-0 z-[500] px-6">
              <div className="flex gap-1 justify-center bg-white/80 p-1 rounded-sm backdrop-blur-md border border-gray-100 shadow-xl">
                 {(['Kyoto', 'Osaka', 'Nara'] as const).map(area => (
                   <button 
                     key={area} 
                     onClick={() => {
                       setActiveArea(area);
                       setTargetPos(AREA_CENTERS[area]);
                     }} 
                     className={`flex-1 py-2 rounded-sm text-[9px] font-bold tracking-[0.3em] uppercase transition-all ${activeArea === area ? 'bg-japan-blue text-white' : 'text-gray-400 hover:text-japan-blue'}`}
                   >
                     {area}
                   </button>
                 ))}
              </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 z-[400] flex justify-center pointer-events-none px-12">
               <div className="text-japan-blue/40 text-[8px] flex items-center gap-2 uppercase tracking-[0.5em] text-center leading-relaxed bg-white/40 backdrop-blur-sm px-4 py-1 rounded-full">
                 <ZoomIn size={10} /> Zoom deep to find the soul of the city
               </div>
            </div>

            <button 
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    const current = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    setUserPos(current);
                    setTargetPos(current);
                  });
                }
              }} 
              className="absolute bottom-6 right-6 z-[500] bg-white text-japan-blue p-4 rounded-full shadow-2xl border border-gray-100 hover:bg-japan-blue hover:text-white transition-all active:scale-90"
            >
              <Navigation size={20} />
            </button>
          </div>
        )}
        {viewState === 'knowledge' && selectedLocation && (
          <KnowledgeCard location={selectedLocation} profile={profile} activeLens={activeLens} onBack={() => setViewState('map')} onBookGuide={() => setViewState('booking')} onShopArtifacts={() => setViewState('shop')} />
        )}
        {viewState === 'profile' && renderProfileEditor()}
        {viewState === 'booking' && renderBookingView()}
      </main>

      {viewState !== 'onboarding' && viewState !== 'booking' && (
        <nav className="h-20 bg-sumi-black text-white flex justify-around items-center shrink-0 z-[1000] shadow-2xl relative">
          <button onClick={() => setViewState('map')} className={`flex flex-col items-center gap-1 transition-all ${viewState === 'map' ? 'text-kintsugi-gold' : 'text-white/20'}`}>
            <MapIcon size={24} />
            <span className="text-[8px] font-bold tracking-[0.4em] uppercase">World</span>
          </button>
          <div className="w-px h-8 bg-white/10"></div>
          <button onClick={() => setViewState('profile')} className={`flex flex-col items-center gap-1 transition-all ${viewState === 'profile' ? 'text-kintsugi-gold' : 'text-white/20'}`}>
            <Sparkles size={24} />
            <span className="text-[8px] font-bold tracking-[0.4em] uppercase">Mirror</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
