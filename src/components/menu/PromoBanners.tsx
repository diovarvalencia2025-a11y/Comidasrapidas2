import React from 'react';
import { useApp } from '../../context/AppContext';

export function PromoBanners() {
  const { setSelectedCategory, scrollToSection } = useApp();

  const handleCombosClick = () => {
    setSelectedCategory('combos');
    scrollToSection('combos-section');
  };

  const handleShakesClick = () => {
    setSelectedCategory('shakes');
    scrollToSection('shakes-section');
  };

  return (
    <div id="promo-banners-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Banner 1: Best Combos */}
        <div
          id="banner-best-combos"
          onClick={handleCombosClick}
          className="relative bg-gradient-to-br from-zinc-950 via-black to-zinc-900 rounded-[32px] p-6 sm:p-8 md:p-10 text-white overflow-hidden shadow-xl border border-white/10 flex flex-col justify-between group cursor-pointer hover:border-amber-400/40 transition-all duration-300"
        >
          {/* Background Glow */}
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

          {/* Left Text Content */}
          <div className="relative z-10 max-w-[60%] sm:max-w-[55%]">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
              Best Combos
            </span>
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight tracking-tight mb-3 text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              More Burgers, More Happiness!
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-6 line-clamp-2">
              Combina tus hamburguesas smash favoritas con papas rústicas y bebidas heladas con hasta 25% de ahorro.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCombosClick();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-md active:scale-95 cursor-pointer"
            >
              <span>Explore Combos</span>
              <span className="text-base leading-none">→</span>
            </button>
          </div>

          {/* Right Image Art */}
          <div className="absolute -bottom-4 -right-4 sm:bottom-0 sm:right-0 w-[45%] sm:w-[48%] h-[85%] flex items-center justify-end pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=800&auto=format&fit=crop&q=80"
              alt="Combos Smash"
              className="size-full object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
            />
          </div>
        </div>

        {/* Banner 2: Delicious Shakes */}
        <div
          id="banner-delicious-shakes"
          onClick={handleShakesClick}
          className="relative bg-gradient-to-br from-[#f6a800] via-[#ff9800] to-[#e65100] rounded-[32px] p-6 sm:p-8 md:p-10 text-white overflow-hidden shadow-xl border border-white/20 flex flex-col justify-between group cursor-pointer hover:shadow-2xl transition-all duration-300"
        >
          {/* Background Glow */}
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/20 blur-3xl pointer-events-none" />

          {/* Left Text Content */}
          <div className="relative z-10 max-w-[60%] sm:max-w-[55%]">
            <span className="inline-block px-3 py-1 rounded-full bg-black/20 backdrop-blur-xs text-white text-xs font-black uppercase tracking-wider mb-3">
              Thick & Creamy
            </span>
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight tracking-tight mb-3 text-white drop-shadow-xs"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Delicious Shakes To Refresh You!
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mb-6 line-clamp-2">
              Batidos artesanales espesos con auténticas galletas Oreo, fresas frescas y chocolate belga fundido.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShakesClick();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-amber-300 font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-900 transition-colors shadow-md active:scale-95 cursor-pointer"
            >
              <span>Shop Shakes</span>
              <span className="text-base leading-none">→</span>
            </button>
          </div>

          {/* Right Image Art */}
          <div className="absolute -bottom-4 -right-4 sm:bottom-0 sm:right-0 w-[45%] sm:w-[48%] h-[85%] flex items-center justify-end pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80"
              alt="Milkshakes"
              className="size-full object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
