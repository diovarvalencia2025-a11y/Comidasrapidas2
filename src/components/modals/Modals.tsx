import React, { useState, useRef } from 'react';

import { useApp } from '../../context/AppContext';
import { PRODUCTS, Product, VIDEO_URL } from '../../constants';
import {
  CartIcon,
  CloseIcon,
  SearchIcon,
  PlusIcon,
  MinusIcon,
  BurgerGlyph,
  CheckIcon,
  VideoCameraIcon,
  UploadIcon,
  RefreshIcon,
} from '../icons/Icons';

export function Toast() {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div
      id="canger-app-toast"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black text-white px-5 py-3.5 rounded-full shadow-2xl border border-white/20 fade-up"
    >
      <div className="size-6 rounded-full bg-[#ffd689] flex items-center justify-center text-black">
        <BurgerGlyph className="w-3.5 h-3.5" />
      </div>
      <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
    </div>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, updateQuantity, removeFromCart, showToast } = useApp();

  if (!cartOpen) return null;

  const total = cart.reduce(
    (sum, item) => sum + (item.itemPrice || item.product.priceNumber || 12.9) * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
      <div
        className="w-full max-w-md bg-[#25140e] h-full shadow-2xl flex flex-col justify-between border-l border-amber-900/30 text-white overflow-hidden"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {/* Header */}
        <div className="p-6 border-b border-amber-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#ffd689] text-[#25140e] flex items-center justify-center">
              <CartIcon className="w-5 h-5 text-[#25140e]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                TU SMASH BAG
              </h2>
              <p className="text-xs text-white/70 tracking-wider uppercase font-medium">
                {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en la orden
              </p>
            </div>
          </div>
          <button
            id="close-cart-btn"
            onClick={() => setCartOpen(false)}
            className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <CloseIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="size-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#ffd689]">
                <BurgerGlyph className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-1 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                TU BOLSA ESTÁ VACÍA
              </h3>
              <p className="text-sm text-white/70">¡Elige tus hamburguesas favoritas y agrégalas aquí!</p>
            </div>
          ) : (
            cart.map((item, index) => {
              const unitPrice = item.itemPrice || item.product.priceNumber || 12.9;
              return (
                <div
                  key={`${item.product.id}-${index}`}
                  className="bg-white/10 rounded-2xl p-4 border border-white/15 flex items-start gap-4"
                >
                  <div
                    className="size-20 rounded-xl flex items-center justify-center relative overflow-hidden shrink-0 bg-black/20"
                    style={{ background: item.product.tileBg }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="size-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('photo-1568901346375')) {
                          target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80';
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base leading-tight truncate text-white uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.product.name}
                    </h4>
                    {item.selectedPortion && (
                      <p className="text-xs text-[#ffd689] font-medium mt-0.5">
                        {item.selectedPortion}
                      </p>
                    )}
                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">
                        +{item.selectedOptions.join(', ')}
                      </p>
                    )}
                    <p className="text-white font-extrabold text-sm mt-1">
                      ${(unitPrice * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="size-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
                      >
                        <MinusIcon className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="size-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
                      >
                        <PlusIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-white/40 hover:text-white transition-colors cursor-pointer p-1"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#00747c] border-t border-white/15 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-white/80">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Envío Rápido</span>
                <span className="text-emerald-300 font-bold">¡GRATIS!</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/20">
                <span style={{ fontFamily: 'var(--font-display)' }}>TOTAL</span>
                <span className="text-[#ffd689]">${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              id="checkout-action-btn"
              onClick={() => {
                showToast('🔥 ¡Orden enviada a cocina! Tiempo estimado: 20 min');
                setCartOpen(false);
              }}
              className="w-full py-4 bg-black hover:bg-zinc-900 text-[#ffd689] rounded-full font-bold text-base tracking-wider uppercase transition-transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>PEDIR AHORA • ${(total).toFixed(2)}</span>
              <CheckIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function SearchModal() {
  const { searchOpen, setSearchOpen, addToCart } = useApp();
  const [query, setQuery] = useState('');

  if (!searchOpen) return null;

  const filtered = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#25140e] rounded-[28px] border border-amber-900/40 shadow-2xl p-6 text-white space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SearchIcon className="w-6 h-6 text-[#ffd689]" />
            <h3 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              SEARCH CANGER MENU
            </h3>
          </div>
          <button
            id="close-search-btn"
            onClick={() => setSearchOpen(false)}
            className="size-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="relative">
          <input
            id="canger-search-input"
            type="text"
            placeholder="Search Smoke Stack, double patty, chili..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-white/15 border border-white/25 rounded-full px-5 py-3.5 text-white placeholder-white/60 focus:outline-none focus:border-[#ffd689] text-base"
          />
        </div>

        <div className="space-y-3 max-h-72 overflow-y-auto no-scrollbar">
          {filtered.length === 0 ? (
            <p className="text-center py-6 text-white/70 text-sm">No smash items match your search.</p>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-white/10 rounded-2xl border border-white/15 hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="size-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                    style={{ background: product.tileBg }}
                  >
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base" style={{ fontFamily: 'var(--font-display)' }}>
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#ffd689] font-medium">{product.price || '$12.9'}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    addToCart(product);
                    setSearchOpen(false);
                  }}
                  className="px-4 py-2 bg-[#ffd689] text-[#25140e] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductDetailModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedPortion, setSelectedPortion] = useState<string>('');
  const [selectedPortionPrice, setSelectedPortionPrice] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [extraOptionsPrice, setExtraOptionsPrice] = useState<number>(0);

  // Sync state if product changes
  React.useEffect(() => {
    if (product) {
      setQuantity(1);
      const sizeGroup = product.customGroups?.find((g) => g.type === 'single');
      if (sizeGroup && sizeGroup.options.length > 0) {
        setSelectedPortion(sizeGroup.options[0].name);
        setSelectedPortionPrice(product.priceNumber + sizeGroup.options[0].price);
      } else {
        setSelectedPortion('');
        setSelectedPortionPrice(product.priceNumber);
      }
      setSelectedOptions([]);
      setExtraOptionsPrice(0);
    }
  }, [product]);

  if (!product) return null;

  const handleSingleOptionSelect = (optName: string, extraPrice: number) => {
    setSelectedPortion(optName);
    setSelectedPortionPrice(product.priceNumber + extraPrice);
  };

  const handleMultiOptionToggle = (name: string, price: number) => {
    if (selectedOptions.includes(name)) {
      setSelectedOptions((prev) => prev.filter((opt) => opt !== name));
      setExtraOptionsPrice((prev) => prev - price);
    } else {
      setSelectedOptions((prev) => [...prev, name]);
      setExtraOptionsPrice((prev) => prev + price);
    }
  };

  const unitTotal = selectedPortionPrice + extraOptionsPrice;
  const grandTotal = unitTotal * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#25140e] rounded-[32px] border border-amber-900/40 shadow-2xl p-6 sm:p-8 text-white relative max-h-[90vh] overflow-y-auto no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 size-10 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white cursor-pointer transition-colors"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Product Tile Banner */}
        <div
          className="w-full h-56 rounded-[24px] flex items-center justify-center relative overflow-hidden mb-6 bg-gradient-to-b from-black/20 to-black/40 p-3"
          style={{ background: product.tileBg }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="size-full object-cover rounded-2xl drop-shadow-2xl transition-transform hover:scale-105"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('photo-1568901346375')) {
                target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80';
              }
            }}
          />
          {product.badge && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#ff9800] text-white text-xs font-black uppercase tracking-wider shadow-md">
              {product.badge}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black tracking-tight uppercase" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h3>
            <span className="text-3xl font-black text-[#ffd689]" style={{ fontFamily: 'var(--font-display)' }}>
              ${unitTotal.toFixed(2)}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            {product.description}
          </p>

          {/* Custom Option Groups */}
          {product.customGroups && product.customGroups.length > 0 && (
            <div className="space-y-4 pt-2">
              {product.customGroups.map((group) => (
                <div key={group.groupName}>
                  <label className="block text-xs uppercase tracking-wider font-extrabold text-[#ffd689] mb-2.5">
                    {group.groupName}
                  </label>
                  {group.type === 'single' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {group.options.map((opt) => {
                        const isSelected = selectedPortion === opt.name;
                        const optionPrice = product.priceNumber + opt.price;
                        return (
                          <button
                            key={opt.name}
                            type="button"
                            onClick={() => handleSingleOptionSelect(opt.name, opt.price)}
                            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#ffd689] text-black border-[#ffd689] font-bold shadow-md'
                                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                            }`}
                          >
                            <div className="text-xs font-extrabold uppercase leading-tight">
                              {opt.name}
                            </div>
                            <div className={`text-xs mt-1 font-black ${isSelected ? 'text-black' : 'text-[#ffd689]'}`}>
                              ${optionPrice.toFixed(2)}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.options.map((opt) => {
                        const isChecked = selectedOptions.includes(opt.name);
                        return (
                          <button
                            key={opt.name}
                            type="button"
                            onClick={() => handleMultiOptionToggle(opt.name, opt.price)}
                            className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-white text-black font-bold border-white shadow-xs'
                                : 'bg-white/10 text-white border-white/15 hover:bg-white/15'
                            }`}
                          >
                            <span>{opt.name}</span>
                            <span className={isChecked ? 'text-[#008790] font-bold' : 'text-[#ffd689]'}>
                              +{opt.price === 0 ? 'Gratis' : `$${opt.price.toFixed(2)}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Quantity Controls & Add to Cart Button */}
          <div className="pt-4 flex items-center gap-3">
            <div className="flex items-center bg-black/40 rounded-full border border-white/20 p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="size-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-black text-lg text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="size-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, quantity, selectedPortion, selectedOptions, unitTotal);
                onClose();
              }}
              className="flex-1 py-4 bg-black hover:bg-zinc-900 text-[#ffd689] rounded-full font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-xl"
            >
              <span>Agregar • ${grandTotal.toFixed(2)}</span>
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoManagerModal() {
  const {
    videoModalOpen,
    setVideoModalOpen,
    heroVideoUrl,
    setHeroVideoUrl,
    videoBlendMode,
    setVideoBlendMode,
    handleVideoFileUpload,
    resetHeroVideo,
    showToast,
  } = useApp();

  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!videoModalOpen) return null;

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setHeroVideoUrl(urlInput.trim());
    showToast('Video URL actualizada en el hero');
    setUrlInput('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleVideoFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#25140e] rounded-[32px] border border-amber-900/40 shadow-2xl p-6 sm:p-8 text-white relative max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-900/30 mb-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#ffd689] flex items-center justify-center text-black shadow-md">
              <VideoCameraIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tight uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                Configurar Video del Hero
              </h3>
              <p className="text-xs text-white/70">
                Sube tu video o animación de smash burger
              </p>
            </div>
          </div>
          <button
            onClick={() => setVideoModalOpen(false)}
            className="size-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Live Preview Card */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider font-bold text-[#ffd689] mb-2">
            Vista Previa en Vivo
          </label>
          <div className="h-52 w-full rounded-2xl bg-black/40 overflow-hidden relative border border-white/20 flex items-center justify-center">
            <video
              key={heroVideoUrl}
              autoPlay
              loop
              muted
              playsInline
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
            <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded-lg text-[10px] uppercase font-mono tracking-wider text-white/80 border border-white/10">
              Modo: {videoBlendMode}
            </div>
          </div>
        </div>

        {/* Option 1: Upload Local File */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider font-bold text-[#ffd689] mb-2">
            1. Subir Archivo Local (.mp4 / .webm)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-5 border-2 border-dashed border-white/30 hover:border-[#ffd689] bg-white/5 hover:bg-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-colors cursor-pointer group"
          >
            <UploadIcon className="w-8 h-8 text-[#ffd689] transition-transform group-hover:scale-110" />
            <span className="font-semibold text-sm text-white">
              Haz clic aquí para seleccionar el video o arrástralo
            </span>
            <span className="text-xs text-white/60">
              Compatible con MP4, WEBM y MOV
            </span>
          </button>
        </div>

        {/* Option 2: Enter URL */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider font-bold text-[#ffd689] mb-2">
            2. O Ingresar Enlace URL Directo
          </label>
          <form onSubmit={handleApplyUrl} className="flex gap-2">
            <input
              type="url"
              placeholder="https://ejemplo.com/mi-video-burger.mp4"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#ffd689]"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-[#ffd689] hover:bg-[#ffe1a6] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shrink-0"
            >
              Aplicar
            </button>
          </form>
        </div>

        {/* Option 3: Blend Mode Selector */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider font-bold text-[#ffd689] mb-2">
            3. Modo de Fusión del Fondo
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'normal', name: 'Normal', desc: 'Fondo completo' },
              { id: 'multiply', name: 'Multiply', desc: 'Fondo blanco transparente' },
              { id: 'screen', name: 'Screen', desc: 'Efecto brillo' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setVideoBlendMode(mode.id as 'multiply' | 'normal' | 'screen')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  videoBlendMode === mode.id
                    ? 'bg-white text-[#25140e] border-white font-bold shadow-md'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/15'
                }`}
              >
                <div className="text-sm font-bold capitalize">{mode.name}</div>
                <div className={`text-[10px] mt-0.5 leading-tight ${videoBlendMode === mode.id ? 'text-[#25140e]/80' : 'text-white/70'}`}>
                  {mode.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-amber-900/30">
          <button
            type="button"
            onClick={resetHeroVideo}
            className="flex items-center gap-1.5 text-xs text-white/75 hover:text-white underline cursor-pointer"
          >
            <RefreshIcon className="w-3.5 h-3.5" />
            <span>Restaurar video por defecto</span>
          </button>
          <button
            type="button"
            onClick={() => setVideoModalOpen(false)}
            className="px-6 py-3 rounded-full bg-black text-[#ffd689] font-bold text-xs uppercase tracking-wider hover:bg-zinc-900 transition-colors cursor-pointer shadow-lg"
          >
            Listo / Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export function InfoModal({
  title,
  isOpen,
  onClose,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#25140e] rounded-[32px] border border-amber-900/40 shadow-2xl p-6 sm:p-8 text-white relative max-h-[85vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-4 border-b border-amber-900/30 mb-5">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-[#ffd689] flex items-center justify-center text-black">
              <BurgerGlyph className="w-5 h-5" />
            </div>
            <h3 className="text-3xl font-bold tracking-tight uppercase" style={{ fontFamily: 'var(--font-display)' }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="size-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
