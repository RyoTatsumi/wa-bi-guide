import React from 'react';
import { ArrowLeft, Trash2, Package, Heart } from 'lucide-react';
import { useAppStore, useWishlistStore } from '../stores';

const WishlistPage: React.FC = () => {
  const { setSubView } = useAppStore();
  const { items, removeItem } = useWishlistStore();

  return (
    <div className="flex flex-col h-full bg-washi-white animate-fade-in overflow-y-auto">
      <header className="p-5 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <button onClick={() => setSubView('main')} className="text-japan-blue">
          <ArrowLeft size={22} />
        </button>
        <div className="text-center">
          <p className="text-lg text-japan-blue font-serif font-bold">My Wishlist</p>
        </div>
        <div className="w-6" />
      </header>

      <div className="p-6 space-y-4 flex-1 pb-24">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart size={48} className="text-gray-200 mb-4" />
            <p className="text-base font-serif text-sumi-black mb-2">No items saved yet</p>
            <p className="text-sm text-zen-gray">
              Use the Wa-Bi Lens to scan souvenirs and save them here for later
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs text-zen-gray uppercase tracking-wider font-bold">
              {items.length} item{items.length !== 1 ? 's' : ''} saved
            </p>
            {items.map((item) => (
              <div key={item.id} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                <div className="flex gap-4">
                  {item.imageBase64 && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={`data:image/jpeg;base64,${item.imageBase64}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-sumi-black truncate">{item.name}</h3>
                    <p className="text-xs text-zen-gray mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      {item.estimatedPrice && (
                        <span className="text-xs font-bold text-japan-blue">{item.estimatedPrice}</span>
                      )}
                      {item.category && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-zen-gray">
                          {item.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                  <a
                    href="https://yoin.jp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-kintsugi-gold text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2"
                  >
                    <Package size={14} /> Buy on yoin
                  </a>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="px-3 py-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
