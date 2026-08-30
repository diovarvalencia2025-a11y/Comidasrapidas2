import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product, NavItemId, PRODUCTS, VIDEO_URL, ProductCategory } from '../constants';
import { CartItem, AppContextType } from '../types';

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeNav, setActiveNavState] = useState<NavItemId>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      itemPrice: PRODUCTS[0].priceNumber,
      selectedPortion: 'Doble (2x Patty)',
      selectedOptions: ['Queso Cheddar Extra'],
    },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [signatureOpen, setSignatureOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Video State
  const [heroVideoUrl, setHeroVideoUrlState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('canger_hero_video');
      if (saved && !saved.includes('pub-36eefd528bbb4e28bdef0ce39a1018e0')) {
        return saved;
      }
      return VIDEO_URL;
    } catch {
      return VIDEO_URL;
    }
  });

  const [videoBlendMode, setVideoBlendModeState] = useState<'multiply' | 'normal' | 'screen'>(() => {
    try {
      const saved = localStorage.getItem('canger_video_blend');
      return (saved as 'multiply' | 'normal' | 'screen') || 'multiply';
    } catch {
      return 'multiply';
    }
  });

  const setHeroVideoUrl = (url: string) => {
    setHeroVideoUrlState(url);
    try {
      if (url.startsWith('http')) {
        localStorage.setItem('canger_hero_video', url);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const setVideoBlendMode = (mode: 'multiply' | 'normal' | 'screen') => {
    setVideoBlendModeState(mode);
    try {
      localStorage.setItem('canger_video_blend', mode);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleVideoFileUpload = (file: File) => {
    if (!file.type.startsWith('video/')) {
      showToast('Por favor sube un archivo de video válido (.mp4, .webm, .mov)');
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setHeroVideoUrlState(objectUrl);
    showToast(`Video "${file.name}" cargado exitosamente en el Hero`);
  };

  const resetHeroVideo = () => {
    setHeroVideoUrlState(VIDEO_URL);
    setVideoBlendModeState('multiply');
    try {
      localStorage.removeItem('canger_hero_video');
      localStorage.removeItem('canger_video_blend');
    } catch (e) {
      console.warn(e);
    }
    showToast('Video del hero restaurado al original');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const setActiveNav = (nav: NavItemId) => {
    setActiveNavState(nav);
    if (nav === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nav === 'menu') {
      setSelectedCategory('all');
      scrollToSection('menu-section');
    } else if (nav === 'combos') {
      setSelectedCategory('combos');
      scrollToSection('combos-section');
    } else if (nav === 'sides') {
      setSelectedCategory('sides');
      scrollToSection('menu-section');
    } else if (nav === 'shakes') {
      setSelectedCategory('shakes');
      scrollToSection('shakes-section');
    } else if (nav === 'offers') {
      scrollToSection('special-offers-section');
    } else if (nav === 'about') {
      setAboutOpen(true);
    } else if (nav === 'contact') {
      scrollToSection('contact-footer');
    }
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedPortion?: string,
    selectedOptions?: string[],
    customPrice?: number
  ) => {
    const unitPrice = customPrice ?? product.priceNumber;
    setCart((prev) => {
      const optionsKey = (selectedOptions || []).sort().join(',');
      const idx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedPortion === selectedPortion &&
          (item.selectedOptions || []).sort().join(',') === optionsKey
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedPortion,
          selectedOptions,
          itemPrice: unitPrice,
        },
      ];
    });
    showToast(`Agregado al Carrito: ${product.name} (x${quantity})`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const value = useMemo<AppContextType>(
    () => ({
      activeNav,
      setActiveNav,
      selectedCategory,
      setSelectedCategory,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      selectedProduct,
      setSelectedProduct,
      locationsOpen,
      setLocationsOpen,
      aboutOpen,
      setAboutOpen,
      signatureOpen,
      setSignatureOpen,
      videoModalOpen,
      setVideoModalOpen,
      heroVideoUrl,
      setHeroVideoUrl,
      videoBlendMode,
      setVideoBlendMode,
      handleVideoFileUpload,
      resetHeroVideo,
      toastMessage,
      showToast,
      scrollToSection,
    }),
    [
      activeNav,
      selectedCategory,
      cart,
      cartOpen,
      searchOpen,
      selectedProduct,
      locationsOpen,
      aboutOpen,
      signatureOpen,
      videoModalOpen,
      heroVideoUrl,
      videoBlendMode,
      toastMessage,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

