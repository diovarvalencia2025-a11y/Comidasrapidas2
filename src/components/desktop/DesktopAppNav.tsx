import { useApp } from '../../context/AppContext';
import { NAV_ITEMS, AVATAR_IMG, NavItemId } from '../../constants';
import { BurgerGlyph, CartIcon, SearchIcon, CaretDownIcon, VideoCameraIcon } from '../icons/Icons';

export function DesktopAppNav() {
  const { activeNav, setActiveNav, cart, setCartOpen, setSearchOpen, setVideoModalOpen } = useApp();

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      id="desktop-app-navigation"
      className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 lg:px-10 pointer-events-auto select-none"
    >
      {/* LEFT: Logo Group */}
      <div
        id="desktop-logo-badge-group"
        className="fade-up flex items-center gap-3 cursor-pointer group"
        style={{ animationDelay: '0s' }}
        onClick={() => setActiveNav('home')}
      >
        <div className="size-7 rounded-tl-[11px] rounded-tr-[5px] rounded-bl-[11px] rounded-br-[11px] bg-[#ffd689] text-[#25140e] flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
          <BurgerGlyph className="w-4 h-4 text-[#25140e]" />
        </div>
        <span
          className="text-lg font-bold tracking-[-1.3px] text-white select-none"
          style={{ fontFamily: 'var(--font-logo)' }}
        >
          canger
        </span>
      </div>

      {/* CENTER: Navigation Pill (Hidden below lg) */}
      <nav
        id="desktop-nav-pill"
        className="fade-up hidden lg:flex items-center rounded-full bg-white p-1 shadow-lg border border-white/20"
        style={{ animationDelay: '0.05s' }}
      >
        <div className="flex items-center">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                id={`desktop-nav-item-${item.id}`}
                onClick={() => setActiveNav(item.id as NavItemId)}
                className={`group px-5 py-3.5 rounded-full text-sm leading-none transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-[rgba(255,214,137,0.56)] font-semibold text-black shadow-xs'
                    : 'font-normal text-black hover:bg-black/5 hover:font-medium'
                }`}
              >
                <span className={isActive ? 'font-semibold' : 'font-normal group-hover:font-medium transition-all'}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Trailing Search Button */}
        <button
          id="desktop-search-trigger"
          onClick={() => setSearchOpen(true)}
          aria-label="Search menu"
          className="size-10 rounded-full hover:bg-black/5 flex items-center justify-center text-black ml-1 transition-colors cursor-pointer"
        >
          <SearchIcon className="w-4 h-4 text-black" />
        </button>
      </nav>

      {/* RIGHT: Action Cluster */}
      <div
        id="desktop-right-cluster"
        className="fade-up flex items-center gap-3"
        style={{ animationDelay: '0.1s' }}
      >
        {/* Video Hero Config Trigger */}
        <button
          id="desktop-video-header-btn"
          onClick={() => setVideoModalOpen(true)}
          title="Configurar / Subir Video Hero"
          aria-label="Configurar Video Hero"
          className="size-[52px] rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center border border-white/30 backdrop-blur-xs transition-all active:scale-95 cursor-pointer shadow-md"
        >
          <VideoCameraIcon className="w-5 h-5 text-[#ffd689]" />
        </button>

        {/* Cart Button */}
        <button
          id="desktop-cart-trigger"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
          className="relative size-[52px] rounded-full bg-white flex items-center justify-center text-black shadow-md hover:bg-zinc-100 transition-all active:scale-95 cursor-pointer"
        >
          <CartIcon className="w-5 h-5 text-black" />
          {totalItemCount > 0 && (
            <span
              id="desktop-cart-notification-dot"
              className="absolute -right-1 -top-0.5 size-[11px] rounded-full bg-red-500 ring-2 ring-white"
            />
          )}
        </button>

        {/* Profile Pill */}
        <button
          id="desktop-profile-pill"
          onClick={() => setActiveNav('about')}
          className="flex items-center gap-2 rounded-full bg-white p-1 pr-3 shadow-md hover:bg-zinc-100 transition-all cursor-pointer"
        >
          <img
            src={AVATAR_IMG}
            alt="Canger Profile"
            className="size-[44px] rounded-full object-cover border-2 border-white shadow-xs"
          />
          <CaretDownIcon className="w-3.5 h-3.5 text-black" />
        </button>
      </div>
    </header>
  );
}
