import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Sparkles, Package, Heart, Loader2 } from 'lucide-react';
import { useAppStore, useUserStore, useWishlistStore } from '../stores';
import { analyzeSouvenirImage } from '../services';
import { SouvenirAnalysis } from '../types';

const LensPage: React.FC = () => {
  const { setSubView } = useAppStore();
  const profile = useUserStore((s) => s.profile);
  const { addItem } = useWishlistStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SouvenirAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      const base64 = dataUrl.split(',')[1];
      setImageBase64(base64);
      setAnalysis(null);
      setSaved(false);

      setLoading(true);
      const result = await analyzeSouvenirImage(base64, profile);
      setAnalysis(result);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveToWishlist = () => {
    if (!analysis) return;
    addItem({
      name: analysis.name,
      description: analysis.description,
      imageBase64: imageBase64 || undefined,
      estimatedPrice: analysis.estimatedPrice,
      category: analysis.category,
      materials: analysis.materials,
    });
    setSaved(true);
  };

  return (
    <div className="flex flex-col h-full bg-washi-white animate-fade-in overflow-y-auto">
      <header className="p-5 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <button onClick={() => setSubView('main')} className="text-japan-blue">
          <ArrowLeft size={22} />
        </button>
        <div className="text-center">
          <p className="text-lg text-japan-blue font-serif font-bold">Wa-Bi Lens</p>
        </div>
        <div className="w-6" />
      </header>

      <div className="p-6 space-y-6 flex-1">
        {/* Camera Input */}
        <div className="text-center space-y-4">
          {!imagePreview ? (
            <>
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-xl bg-white">
                <Camera size={48} className="mx-auto text-zen-gray mb-4" />
                <p className="text-sm text-sumi-black font-bold mb-1">Scan a Souvenir</p>
                <p className="text-xs text-zen-gray">
                  Take a photo or upload an image of any Japanese craft or souvenir
                </p>
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full py-4 bg-japan-blue text-white font-serif text-base rounded-lg shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <Camera size={20} /> Take Photo
              </button>
            </>
          ) : (
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img src={imagePreview} alt="Scanned item" className="w-full h-56 object-cover" />
              <button
                onClick={() => { setImagePreview(null); setAnalysis(null); setSaved(false); }}
                className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 rounded-full text-xs font-bold text-sumi-black backdrop-blur-md"
              >
                Retake
              </button>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-8 animate-fade-in">
            <Loader2 size={32} className="text-kintsugi-gold animate-spin mb-3" />
            <p className="text-sm text-zen-gray font-serif italic">Analyzing craftsmanship...</p>
          </div>
        )}

        {/* Analysis Result */}
        {analysis && !loading && (
          <div className="space-y-4 animate-slide-up">
            <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-kintsugi-gold font-bold text-xs uppercase tracking-wider">
                <Sparkles size={16} />
                <span>Analysis Result</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-sumi-black">{analysis.name}</h3>
              <p className="text-sm text-zen-gray leading-relaxed">{analysis.description}</p>

              <div className="space-y-3 pt-2">
                <div>
                  <span className="text-xs font-bold text-zen-gray uppercase tracking-wider">History</span>
                  <p className="text-sm text-sumi-black mt-1">{analysis.history}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-zen-gray uppercase tracking-wider">Craftsmanship</span>
                  <p className="text-sm text-sumi-black mt-1">{analysis.craftsmanship}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-zen-gray uppercase tracking-wider">Materials</span>
                    <p className="text-sm text-sumi-black mt-1">{analysis.materials.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-zen-gray uppercase tracking-wider">Est. Price</span>
                    <p className="text-sm font-bold text-japan-blue mt-1">{analysis.estimatedPrice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a
                href="https://yoin.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-kintsugi-gold text-white font-serif text-base rounded-lg shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <Package size={20} /> Ship to Your Country
              </a>
              <button
                onClick={handleSaveToWishlist}
                disabled={saved}
                className={`w-full py-3.5 border-2 rounded-lg text-sm font-bold flex items-center justify-center gap-3 transition-all ${
                  saved
                    ? 'border-green-400 text-green-600 bg-green-50'
                    : 'border-sumi-black text-sumi-black hover:bg-gray-50'
                }`}
              >
                <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LensPage;
