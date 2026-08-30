import React, { useMemo } from 'react';
import { PRODUCTS, ProductCategory } from '../../constants';
import { useApp } from '../../context/AppContext';
import { CategoriesRow } from './CategoriesRow';
import { ProductCard } from './ProductCard';
import { PromoBanners } from './PromoBanners';
import { TrustBadgesRow } from './TrustBadgesRow';
import { RichFooter } from './RichFooter';

export function MenuCatalogSection() {
  const { selectedCategory, setSelectedCategory, scrollToSection } = useApp();

  const featuredBurgers = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'burgers' && p.isFeatured),
    []
  );

  const bestSellerBurgers = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'burgers' && p.isBestSeller),
    []
  );

  const comboProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'combos'),
    []
  );

  const sideProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'sides'),
    []
  );

  const shakeProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'shakes'),
    []
  );

  const dessertProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'desserts'),
    []
  );

  const drinkProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'drinks'),
    []
  );

  // Filtered list if user selected a specific category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div id="menu-section" className="w-full bg-[#f8f9fa] text-gray-900 relative">
      {/* 1. CATEGORY PILLS BAR */}
      <div className="sticky top-0 z-30 bg-[#25140e] shadow-md border-b border-amber-900/30">
        <CategoriesRow />
      </div>

      {/* IF A SPECIFIC CATEGORY IS SELECTED, SHOW FILTERED RESULTS */}
      {selectedCategory !== 'all' && filteredProducts ? (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#c68642] block mb-1">
                Explorando Categoría
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black uppercase text-gray-900 tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {selectedCategory}
              </h2>
            </div>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold uppercase tracking-wider text-[#c68642] hover:underline cursor-pointer"
            >
              Ver Todo el Menú →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        /* STANDARD COMPLETE MENU OVERVIEW MATCHING THE ATTACHED IMAGE */
        <>
          {/* 2. FEATURED BURGERS SECTION */}
          <section id="featured-burgers-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-black uppercase text-gray-900 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Featured Burgers
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Nuestras creaciones más aclamadas con pan brioche y costra caramelizada
                </p>
              </div>
              <button
                onClick={() => setSelectedCategory('burgers')}
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#008790] hover:text-[#006f77] flex items-center gap-1 cursor-pointer group"
              >
                <span>View All Burgers</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
              {featuredBurgers.map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
            </div>
          </section>

          {/* 3. PROMO DUAL BANNERS (COMBOS & SHAKES) */}
          <div id="combos-section">
            <PromoBanners />
          </div>

          {/* 4. BEST SELLERS SECTION */}
          <section id="best-sellers-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-black uppercase text-gray-900 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Best Sellers
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Los favoritos indiscutibles pedidos una y otra vez
                </p>
              </div>
              <button
                onClick={() => setSelectedCategory('burgers')}
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#008790] hover:text-[#006f77] flex items-center gap-1 cursor-pointer group"
              >
                <span>View All</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
              {bestSellerBurgers.map((product) => (
                <ProductCard key={product.id} product={product} variant="bestseller" />
              ))}
            </div>
          </section>

          {/* 5. SIDES & APPETIZERS SECTION */}
          <section id="sides-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-black uppercase text-gray-900 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Acompañamientos & Sides
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Crujientes, dorados y perfectos para dipear
                </p>
              </div>
              <button
                onClick={() => setSelectedCategory('sides')}
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#008790] hover:text-[#006f77] flex items-center gap-1 cursor-pointer group"
              >
                <span>Ver Todos los Sides</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
              {sideProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* 6. SHAKES & DESSERTS SECTION */}
          <section id="shakes-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-black uppercase text-gray-900 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Shakes & Postres Artesanales
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  El toque dulce y refrescante que corona tu experiencia
                </p>
              </div>
              <button
                onClick={() => setSelectedCategory('shakes')}
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#008790] hover:text-[#006f77] flex items-center gap-1 cursor-pointer group"
              >
                <span>Ver Shakes</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
              {[...shakeProducts, ...dessertProducts].slice(0, 5).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* 7. TRUST & VALUE BADGES */}
      <TrustBadgesRow />

      {/* 8. RICH E-COMMERCE FOOTER */}
      <RichFooter />
    </div>
  );
}
