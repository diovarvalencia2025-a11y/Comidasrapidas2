import React from 'react';
import { MENU_CATEGORIES, ProductCategory } from '../../constants';
import { useApp } from '../../context/AppContext';

export function CategoriesRow() {
  const { selectedCategory, setSelectedCategory, scrollToSection } = useApp();

  const handleCategoryClick = (catId: ProductCategory | 'all') => {
    setSelectedCategory(catId);
    if (catId === 'combos') {
      scrollToSection('combos-section');
    } else if (catId === 'shakes') {
      scrollToSection('shakes-section');
    } else {
      scrollToSection('menu-section');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
        {/* All Filter Pill */}
        <button
          onClick={() => handleCategoryClick('all')}
          className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all shrink-0 cursor-pointer shadow-xs ${
            selectedCategory === 'all'
              ? 'bg-[#ffd689] border-[#ffd689] text-black font-bold shadow-md scale-105'
              : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
          }`}
        >
          <span className="text-2xl">🔥</span>
          <div className="text-left">
            <div className="text-sm font-black leading-tight uppercase tracking-wide">
              Todo el Menú
            </div>
            <div className={`text-[11px] font-medium leading-none ${selectedCategory === 'all' ? 'text-black/70' : 'text-white/70'}`}>
              Todas las opciones
            </div>
          </div>
        </button>

        {/* Category Pills matching image */}
        {MENU_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-3.5 px-5 py-3 rounded-2xl border transition-all shrink-0 cursor-pointer shadow-xs ${
                isSelected
                  ? 'bg-[#ffd689] border-[#ffd689] text-black font-bold shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
              }`}
            >
              <div className="size-11 rounded-xl overflow-hidden bg-black/20 shrink-0 border border-white/20 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="size-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('photo-1568901346375')) {
                      target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80';
                    }
                  }}
                />
              </div>
              <div className="text-left">
                <div className="text-sm font-black leading-tight uppercase tracking-wide">
                  {cat.name}
                </div>
                <div
                  className={`text-[11px] font-medium leading-none mt-0.5 ${
                    isSelected ? 'text-black/70' : 'text-white/70'
                  }`}
                >
                  {cat.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
