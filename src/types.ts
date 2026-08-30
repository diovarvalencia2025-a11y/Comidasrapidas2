import { Product, NavItemId, ProductCategory } from './constants';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPortion?: string;
  selectedOptions?: string[];
  itemPrice: number;
}

export interface AppContextType {
  activeNav: NavItemId;
  setActiveNav: (nav: NavItemId) => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedPortion?: string, selectedOptions?: string[], customPrice?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  locationsOpen: boolean;
  setLocationsOpen: (open: boolean) => void;
  aboutOpen: boolean;
  setAboutOpen: (open: boolean) => void;
  signatureOpen: boolean;
  setSignatureOpen: (open: boolean) => void;
  videoModalOpen: boolean;
  setVideoModalOpen: (open: boolean) => void;
  heroVideoUrl: string;
  setHeroVideoUrl: (url: string) => void;
  videoBlendMode: 'multiply' | 'normal' | 'screen';
  setVideoBlendMode: (mode: 'multiply' | 'normal' | 'screen') => void;
  handleVideoFileUpload: (file: File) => void;
  resetHeroVideo: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  scrollToSection: (sectionId: string) => void;
}

