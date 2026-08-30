import React, { useRef, useEffect } from 'react';
import { VIDEO_URL, PRODUCTS, NAV_ITEMS, AVATAR_IMG, PARAGRAPH_TEXT, NavItemId } from '../../constants';
import {
  BurgerGlyph,
  CartIcon,
  SearchIcon,
  CaretLeftIcon,
  CaretRightIcon,
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
  ArrowDownIcon,
} from '../icons/Icons';
import { useApp } from '../../context/AppContext';

export function MobileMainScreen() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {
    activeNav,
    setActiveNav,
    cart,
    setCartOpen,
    setSearchOpen,
    addToCart,
    setSelectedProduct,
    heroVideoUrl,
    videoBlendMode,
    setVideoModalOpen,
    showToast,
  } = useApp();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [heroVideoUrl]);

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollRail = (direction: 'prev' | 'next') => {
    if (!railRef.current) return;
    const scrollAmount = railRef.current.clientWidth * 0.65;
    railRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      id="mobile-app-container"
      className="relative min-h-screen overflow-x-hidden bg-[#25140e] pb-12 text-white select-none"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* STICKY APPLICATION NAVIGATION */}
      <header
        id="mobile-sticky-nav"
        className="sticky top-0 z-20 bg-[#25140e]/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-amber-900/30"
      >
        {/* Left: Logo Badge + "canger" Wordmark */}
        <div
          id="mobile-logo-group"
          onClick={() => setActiveNav('home')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="size-7 rounded-tl-[11px] rounded-tr-[5px] rounded-bl-[11px] rounded-br-[11px] bg-[#ffd689] text-[#25140e] flex items-center justify-center shadow-xs">
            <BurgerGlyph className="w-4 h-4 text-[#25140e]" />
          </div>
          <span
            className="text-lg font-bold tracking-[-1.3px] text-white"
            style={{ fontFamily: 'var(--font-logo)' }}
          >
            canger
          </span>
        </div>

        {/* Right: Search + Cart + Profile Avatar */}
        <div id="mobile-action-cluster" className="flex items-center gap-2">
          {/* Search Button */}
          <button
            id="mobile-search-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="size-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <SearchIcon className="w-4 h-4 text-white" />
          </button>

          {/* Cart Action Button */}
          <button
            id="mobile-cart-btn"
            onClick={() => setCartOpen(true)}
            aria-label="Cart"
            className="relative size-9 rounded-full bg-white text-black flex items-center justify-center shadow-xs active:scale-95 transition-transform cursor-pointer"
          >
            <CartIcon className="w-4 h-4 text-black" />
            {totalItemCount > 0 && (
              <span
                id="mobile-cart-notification-dot"
                className="absolute -right-0.5 -top-0.5 size-[9px] rounded-full bg-red-500 ring-2 ring-white"
              />
            )}
          </button>

          {/* Profile Avatar */}
          <button
            id="mobile-profile-avatar"
            onClick={() => setActiveNav('about')}
            className="size-9 rounded-full overflow-hidden border border-white cursor-pointer shadow-xs"
          >
            <img src={AVATAR_IMG} alt="Avatar" className="size-full object-cover" />
          </button>
        </div>
      </header>

      {/* NAVIGATION PILLS ROW */}
      <nav
        id="mobile-nav-pills"
        className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 pt-2"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-pill-${item.id}`}
              onClick={() => setActiveNav(item.id as NavItemId)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-[rgba(255,214,137,0.56)] font-semibold text-black shadow-xs'
                  : 'bg-white/10 text-white font-normal hover:bg-white/15'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* 1. VIDEO BANNER (Animation Delay: 0s) */}
      <div
        id="mobile-video-banner"
        className="fade-up mx-4 mt-2 h-[46vh] min-h-[300px] rounded-[28px] overflow-hidden relative shadow-lg bg-black/10"
        style={{ animationDelay: '0s' }}
      >
        <video
          ref={videoRef}
          key={heroVideoUrl}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          className="size-full object-cover"
          style={{
            mixBlendMode: videoBlendMode === 'multiply' ? 'multiply' : videoBlendMode === 'screen' ? 'screen' : 'normal',
          }}
        >
          <source src={heroVideoUrl} type="video/mp4" />
          <source src="/hero-burger.mp4" type="video/mp4" />
          <source src="/hero-burger.webm" type="video/webm" />
          <source src="/hero-burger-h264.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(37,20,14,0.15) 0%, rgba(37,20,14,0.7) 100%)',
          }}
        />
        {/* Bottom-left burger glyph badge */}
        <div
          id="mobile-banner-badge"
          className="absolute bottom-4 left-4 size-16 rounded-full border border-[#ffd689]/40 bg-[#25140e]/80 backdrop-blur-xs flex items-center justify-center shadow-md"
        >
          <BurgerGlyph className="w-8 h-8 text-[#ffd689]" />
        </div>

        {/* Top-right Video Manager / Upload Trigger */}
        <button
          id="mobile-video-change-btn"
          onClick={() => setVideoModalOpen(true)}
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm border border-white/25 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
        >
          <span className="size-2 rounded-full bg-[#ffd689] animate-ping" />
          <span>Cambiar Video</span>
        </button>
      </div>

      {/* MAIN CONTENT STACK */}
      <div className="px-5 mt-6 space-y-4">
        {/* 2. HEADLINE (Animation Delay: 0.1s) */}
        <div
          id="mobile-headline"
          className="fade-up select-none"
          style={{ animationDelay: '0.1s' }}
        >
          <h1
            className="grunge-text font-normal uppercase leading-[0.86] text-[#fefff0] text-left"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 14vw, 4.2rem)',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            CRISPY <span className="text-[#ffd689]">SMASH</span>
            <br />
            BURGERS
          </h1>
        </div>

        {/* 3. PARAGRAPH (Animation Delay: 0.18s) */}
        <p
          id="mobile-intro-paragraph"
          className="fade-up text-[15px] leading-relaxed text-white/90"
          style={{ animationDelay: '0.18s' }}
        >
          <strong className="font-bold text-white">Canger</strong> {PARAGRAPH_TEXT.replace('Canger ', '')}
        </p>

        {/* 4. BADGE LINE (Animation Delay: 0.22s) */}
        <div
          id="mobile-badge-line"
          className="fade-up flex items-center gap-2"
          style={{ animationDelay: '0.22s' }}
        >
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#ffd689]">
            PURE BEEF POWER
          </span>
          <span className="size-1.5 rounded-full bg-[#ffd689]" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70">
            CRISPY SMASH BURGERS
          </span>
        </div>

        {/* 5. CTA ROW (Animation Delay: 0.26s) */}
        <div
          id="mobile-cta-row"
          className="fade-up flex items-center gap-3 pt-1"
          style={{ animationDelay: '0.26s' }}
        >
          {/* Full-width Black Pill Action Button */}
          <button
            id="mobile-add-to-cart-btn"
            onClick={() => addToCart(PRODUCTS[0])}
            className="flex-1 h-12 rounded-full bg-black text-[#ffd689] font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            <span>Add to cart</span>
          </button>

          {/* Square Size-12 Rounded-Full Cart Button */}
          <button
            id="mobile-cart-icon-btn"
            onClick={() => setCartOpen(true)}
            aria-label="View cart"
            className="size-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer shrink-0"
          >
            <CartIcon className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* 6. PRODUCT RAIL (Animation Delay: 0.32s) */}
      <div
        id="mobile-product-rail-section"
        className="fade-up mt-8 pt-2"
        style={{ animationDelay: '0.32s' }}
      >
        {/* Header with Prev/Next Controls */}
        <div className="px-5 flex items-center justify-between mb-4">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
            Menu
          </span>
          <div className="flex items-center gap-2">
            <button
              id="mobile-rail-prev-btn"
              onClick={() => scrollRail('prev')}
              aria-label="Previous burger"
              className="size-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer transition-colors"
            >
              <CaretLeftIcon className="w-4 h-4" />
            </button>
            <button
              id="mobile-rail-next-btn"
              onClick={() => scrollRail('next')}
              aria-label="Next burger"
              className="size-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer transition-colors"
            >
              <CaretRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Snapping Horizontal Cards Row */}
        <div
          ref={railRef}
          id="mobile-product-cards-row"
          className="no-scrollbar flex gap-3.5 px-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="w-[62vw] max-w-[280px] rounded-[24px] bg-white p-1 pb-5 text-black shrink-0 snap-start shadow-xl cursor-pointer transition-transform active:scale-[0.98]"
            >
              {/* 110px Tall Pastel Tile */}
              <div
                className="h-[110px] rounded-[20px] relative mb-3 overflow-visible"
                style={{ background: product.tileBg }}
              >
                {/* Product Photo overflowing bottom anchored */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute left-1/2 bottom-0 h-[140px] w-auto object-contain pointer-events-none"
                  style={{
                    transform: 'translate(-50%, 22%)',
                  }}
                />
              </div>

              {/* Card Meta Content */}
              <div className="px-3 pt-3">
                <h3
                  className="font-bold text-xl leading-tight uppercase"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-xs text-zinc-600 mt-1 leading-snug line-clamp-2">
                    {product.description}
                  </p>
                )}
                {product.price && (
                  <p
                    className="font-bold text-lg mt-2 text-[#c68642]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {product.price}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. FOOTER ACTION ROW (Animation Delay: 0.38s) */}
      <div
        id="mobile-footer-row"
        className="fade-up px-5 mt-10 flex items-center justify-between"
        style={{ animationDelay: '0.38s' }}
      >
        {/* Left: Three Social Action Links */}
        <div className="flex items-center gap-3">
          <a
            href="#instagram"
            onClick={(e) => {
              e.preventDefault();
              showToast('Opening @cangerburgers Instagram');
            }}
            aria-label="Instagram"
            className="size-10 rounded-full border border-white/70 text-white flex items-center justify-center hover:bg-[#ffd689] hover:text-[#25140e] transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="#facebook"
            onClick={(e) => {
              e.preventDefault();
              showToast('Opening Canger Burgers Facebook');
            }}
            aria-label="Facebook"
            className="size-10 rounded-full border border-white/70 text-white flex items-center justify-center hover:bg-[#ffd689] hover:text-[#25140e] transition-colors"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
          <a
            href="#youtube"
            onClick={(e) => {
              e.preventDefault();
              showToast('Opening Canger Burger Channel');
            }}
            aria-label="YouTube"
            className="size-10 rounded-full border border-white/70 text-white flex items-center justify-center hover:bg-[#ffd689] hover:text-[#25140e] transition-colors"
          >
            <YouTubeIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Bordered Circular Down-Arrow */}
        <button
          id="mobile-scroll-hint-btn"
          onClick={scrollToBottom}
          aria-label="Scroll hint"
          className="size-10 rounded-full border border-white/70 text-white flex items-center justify-center hover:bg-[#ffd689] hover:text-[#25140e] transition-colors cursor-pointer"
        >
          <ArrowDownIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
