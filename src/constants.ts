export const VIDEO_URL = '/hero-burger.mp4';
export const VIDEO_FALLBACK_URL =
  'https://pub-36eefd528bbb4e28bdef0ce39a1018e0.r2.dev/Prompt/21-canger-burguer/public/capcut-color-edit.mp4';

export const ASSET_BASE =
  'https://pub-36eefd528bbb4e28bdef0ce39a1018e0.r2.dev/Prompt/21-canger-burguer/public/assets';

export const PRODUCT_1 = `${ASSET_BASE}/product-1.png`;
export const PRODUCT_2 = `${ASSET_BASE}/product-2.png`;
export const PRODUCT_3 = `${ASSET_BASE}/product-3.png`;
export const AVATAR_IMG = `${ASSET_BASE}/avatar.png`;

export type ProductCategory = 'burgers' | 'combos' | 'sides' | 'shakes' | 'desserts' | 'drinks';

export interface MenuCategoryItem {
  id: ProductCategory;
  name: string;
  subtitle: string;
  icon: string;
  image: string;
}

export const MENU_CATEGORIES: MenuCategoryItem[] = [
  {
    id: 'burgers',
    name: 'Burgers',
    subtitle: 'Classic & Premium',
    icon: '🍔',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'combos',
    name: 'Combos',
    subtitle: 'Best Value',
    icon: '🍟',
    image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'sides',
    name: 'Sides',
    subtitle: 'Crispy & Tasty',
    icon: '🧅',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'shakes',
    name: 'Shakes',
    subtitle: 'Thick & Creamy',
    icon: '🥤',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    subtitle: 'Sweet & Delight',
    icon: '🍰',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    subtitle: 'Cool & Refreshing',
    icon: '🧊',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=80',
  },
];

export interface CustomOptionGroup {
  groupName: string;
  type: 'single' | 'multiple';
  required?: boolean;
  options: { name: string; price: number }[];
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: string;
  priceNumber: number;
  image: string;
  tileBg?: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  calories?: string;
  portions?: string[];
  customGroups?: CustomOptionGroup[];
}

export const PRODUCTS: Product[] = [
  // FEATURED BURGERS
  {
    id: 'classic-cheeseburger',
    name: 'Classic Cheeseburger',
    category: 'burgers',
    description: 'Juicy beef patty with cheese, lettuce, tomato & special sauce.',
    price: '$6.99',
    priceNumber: 6.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    tileBg: 'rgba(145, 255, 242, 0.3)',
    rating: 4.8,
    reviewCount: 142,
    badge: 'Popular',
    isFeatured: true,
    calories: '650 kcal',
    portions: ['Simple (1x Patty)', 'Doble (2x Patty)', 'Triple Smash (3x Patty)'],
    customGroups: [
      {
        groupName: 'Elige tu Tamaño / Porción',
        type: 'single',
        required: true,
        options: [
          { name: 'Simple (1x Patty)', price: 0 },
          { name: 'Doble (2x Patty)', price: 2.5 },
          { name: 'Triple Smash (3x Patty)', price: 4.5 },
        ],
      },
      {
        groupName: 'Extras Deliciosos',
        type: 'multiple',
        options: [
          { name: 'Queso Cheddar Extra', price: 1.0 },
          { name: 'Tiras de Bacon Crujiente', price: 1.5 },
          { name: 'Cebolla Caramelizada', price: 0.75 },
          { name: 'Pepinillos Dulces Extra', price: 0.5 },
        ],
      },
    ],
  },
  {
    id: 'bbq-bacon-burger',
    name: 'BBQ Bacon Burger',
    category: 'burgers',
    description: 'Smoky BBQ sauce, crispy bacon, onion & melted cheese.',
    price: '$7.99',
    priceNumber: 7.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&auto=format&fit=crop&q=80',
    tileBg: 'rgba(255, 145, 240, 0.3)',
    rating: 4.9,
    reviewCount: 215,
    badge: 'Chef Choice',
    isFeatured: true,
    calories: '790 kcal',
    portions: ['Simple (1x Patty)', 'Doble (2x Patty)'],
    customGroups: [
      {
        groupName: 'Porción',
        type: 'single',
        required: true,
        options: [
          { name: 'Regular BBQ (1x)', price: 0 },
          { name: 'Doble Smoked Bacon (2x)', price: 2.75 },
        ],
      },
      {
        groupName: 'Salsas & Toppings',
        type: 'multiple',
        options: [
          { name: 'Doble Salsa BBQ Ahumada', price: 0.5 },
          { name: 'Jalapeños Asados', price: 0.8 },
          { name: 'Queso Pepper Jack', price: 1.2 },
        ],
      },
    ],
  },
  {
    id: 'spicy-chicken-burger',
    name: 'Spicy Chicken Burger',
    category: 'burgers',
    description: 'Crispy chicken patty with spicy mayo & crunchy lettuce.',
    price: '$6.99',
    priceNumber: 6.99,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&auto=format&fit=crop&q=80',
    tileBg: 'rgba(255, 255, 145, 0.3)',
    rating: 4.7,
    reviewCount: 178,
    badge: 'Spicy Hot',
    isFeatured: true,
    calories: '620 kcal',
    portions: ['Pechuga Crujiente', 'Doble Filete Picante'],
    customGroups: [
      {
        groupName: 'Nivel de Picante',
        type: 'single',
        required: true,
        options: [
          { name: 'Picante Medio (Mild Spice)', price: 0 },
          { name: 'Fuego Volcánico (Extra Spicy)', price: 0.5 },
          { name: 'Sin Picante (Classic Mayo)', price: 0 },
        ],
      },
      {
        groupName: 'Agregados',
        type: 'multiple',
        options: [
          { name: 'Colslaw Cremoso', price: 0.75 },
          { name: 'Queso Suizo Fundido', price: 1.0 },
        ],
      },
    ],
  },
  {
    id: 'mushroom-melt-burger',
    name: 'Mushroom Melt Burger',
    category: 'burgers',
    description: 'Sauteed mushrooms with melted Swiss cheese & sauce.',
    price: '$7.99',
    priceNumber: 7.99,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80',
    tileBg: 'rgba(145, 255, 242, 0.3)',
    rating: 4.8,
    reviewCount: 164,
    badge: 'Gourmet',
    isFeatured: true,
    calories: '710 kcal',
    portions: ['Smash Individual', 'Smash Doble Hongos'],
    customGroups: [
      {
        groupName: 'Porción',
        type: 'single',
        required: true,
        options: [
          { name: 'Regular Melt', price: 0 },
          { name: 'Double Patty Melt', price: 2.5 },
        ],
      },
    ],
  },
  {
    id: 'double-cheese-burger',
    name: 'Double Cheese Burger',
    category: 'burgers',
    description: 'Double beef patty with double cheese & tangy pickles.',
    price: '$8.99',
    priceNumber: 8.99,
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=800&auto=format&fit=crop&q=80',
    tileBg: 'rgba(255, 145, 240, 0.3)',
    rating: 4.9,
    reviewCount: 310,
    badge: 'Best Value',
    isFeatured: true,
    calories: '860 kcal',
    portions: ['Doble Carne (2x100g)', 'Triple Beast (3x100g)'],
    customGroups: [
      {
        groupName: 'Porción Carne',
        type: 'single',
        required: true,
        options: [
          { name: 'Doble Carne Standard', price: 0 },
          { name: 'Triple Beast Smash (+1 Patty)', price: 2.99 },
        ],
      },
    ],
  },

  // BEST SELLERS
  {
    id: 'zesty-zinger-burger',
    name: 'Zesty Zinger Burger',
    category: 'burgers',
    description: 'Crispy fried breast, jalapeño cream sauce, shredded iceberg.',
    price: '$6.99',
    priceNumber: 6.99,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 120,
    badge: 'Top Pick',
    isBestSeller: true,
    calories: '640 kcal',
  },
  {
    id: 'cheesy-veggie-burger',
    name: 'Cheesy Veggie Burger',
    category: 'burgers',
    description: 'Crispy plant-based patty, melted cheddar, roasted peppers.',
    price: '$5.99',
    priceNumber: 5.99,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 99,
    badge: 'Vegetarian',
    isBestSeller: true,
    calories: '520 kcal',
  },
  {
    id: 'smoky-bbq-burger',
    name: 'Smoky BBQ Burger',
    category: 'burgers',
    description: 'Double smashed patty, caramelized onions & thick smoked BBQ.',
    price: '$7.99',
    priceNumber: 7.99,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewCount: 110,
    badge: 'Smoky',
    isBestSeller: true,
    calories: '770 kcal',
  },
  {
    id: 'crispy-chicken-burger',
    name: 'Crispy Chicken Burger',
    category: 'burgers',
    description: 'Golden chicken breast, sweet pickle crunch & herb mayo.',
    price: '$6.99',
    priceNumber: 6.99,
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 95,
    badge: 'Crunchy',
    isBestSeller: true,
    calories: '630 kcal',
  },
  {
    id: 'supreme-beef-burger',
    name: 'Supreme Beef Burger',
    category: 'burgers',
    description: 'Triple smashed Angus beef, melted cheddar & signature Canger drip.',
    price: '$8.99',
    priceNumber: 8.99,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 105,
    badge: 'Supreme',
    isBestSeller: true,
    calories: '920 kcal',
  },

  // COMBOS
  {
    id: 'combo-burger-fries-drink',
    name: 'Smash Supreme Combo',
    category: 'combos',
    description: 'Double Cheese Burger + Papas Fritas Medianas + Bebida a elección.',
    price: '$12.49',
    priceNumber: 12.49,
    image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 284,
    badge: 'Best Value',
    isFeatured: true,
    calories: '1150 kcal',
    portions: ['Combo Mediano', 'Combo Grande (Fritas XL + Bebida 750ml)'],
  },
  {
    id: 'combo-duo-feast',
    name: 'Duo Burger Feast',
    category: 'combos',
    description: '2x Burgers a elección + Papas Grandes + 2x Bebidas + Salsa Canger.',
    price: '$21.99',
    priceNumber: 21.99,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 190,
    badge: 'Para Compartir',
    calories: '1850 kcal',
  },
  {
    id: 'combo-burger-shake',
    name: 'Shake & Smash Combo',
    category: 'combos',
    description: 'Bacon BBQ Burger + Papas Rústicas + Milkshake Grueso a elección.',
    price: '$14.99',
    priceNumber: 14.99,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 145,
    badge: 'Recomendado',
    calories: '1320 kcal',
  },

  // SIDES
  {
    id: 'side-french-fries',
    name: 'Papas Fritas Crujientes',
    category: 'sides',
    description: 'Papas corte fino fritas en su punto exacto con sal marina.',
    price: '$3.49',
    priceNumber: 3.49,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 320,
    portions: ['Medianas (Regular)', 'Grandes (Large)', 'Jumbo Compartir'],
    calories: '380 kcal',
  },
  {
    id: 'side-onion-rings',
    name: 'Aros de Cebolla Rebozados',
    category: 'sides',
    description: 'Aros enteros de cebolla dulce con rebozado crujiente y salsa tártara.',
    price: '$4.29',
    priceNumber: 4.29,
    image: 'https://images.unsplash.com/photo-1625938145744-e380515399b7?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 180,
    calories: '420 kcal',
  },
  {
    id: 'side-truffle-fries',
    name: 'Truffle & Parmesan Fries',
    category: 'sides',
    description: 'Papas doradas bañadas en aceite de trufa blanca y queso parmesano.',
    price: '$5.49',
    priceNumber: 5.49,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 195,
    badge: 'Gourmet',
    calories: '490 kcal',
  },
  {
    id: 'side-mozzarella-sticks',
    name: 'Dedos de Queso Mozzarella',
    category: 'sides',
    description: '6 unidades de queso mozzarella derretido con salsa marinara italiana.',
    price: '$4.99',
    priceNumber: 4.99,
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 140,
    calories: '510 kcal',
  },

  // SHAKES
  {
    id: 'shake-oreo-blast',
    name: 'Oreo Blast Milkshake',
    category: 'shakes',
    description: 'Helado artesanal batido con galletas Oreo trituradas y crema batida.',
    price: '$5.49',
    priceNumber: 5.49,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 410,
    badge: 'Favorito',
    portions: ['16 oz Regular', '24 oz Super Creamy'],
    calories: '590 kcal',
  },
  {
    id: 'shake-chocolate-fudge',
    name: 'Triple Chocolate Shake',
    category: 'shakes',
    description: 'Chocolate belga espeso con sirope de cacao y virutas de chocolate.',
    price: '$5.49',
    priceNumber: 5.49,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 230,
    calories: '610 kcal',
  },
  {
    id: 'shake-strawberry-cream',
    name: 'Strawberry Dream Shake',
    category: 'shakes',
    description: 'Fresas naturales frescas licuadas con helado de vainilla bourbon.',
    price: '$5.29',
    priceNumber: 5.29,
    image: 'https://images.unsplash.com/photo-1553787499-6f9133860278?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 185,
    calories: '480 kcal',
  },

  // DESSERTS
  {
    id: 'dessert-lava-cake',
    name: 'Volcán de Chocolate Fundido',
    category: 'desserts',
    description: 'Pastel tibio de chocolate con centro líquido y helado de vainilla.',
    price: '$4.99',
    priceNumber: 4.99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 160,
    badge: 'Delicioso',
    calories: '540 kcal',
  },
  {
    id: 'dessert-churros-dulce-leche',
    name: 'Churros Crunch con Manjar',
    category: 'desserts',
    description: 'Churros dorados espolvoreados con canela y azúcar + dip de dulce de leche.',
    price: '$4.49',
    priceNumber: 4.49,
    image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 135,
    calories: '460 kcal',
  },

  // DRINKS
  {
    id: 'drink-cola-craft',
    name: 'Cola Artesanal Helada',
    category: 'drinks',
    description: 'Refresco clásico servido con abundante hielo y rodaja de lima fresca.',
    price: '$2.79',
    priceNumber: 2.79,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 290,
    portions: ['Vaso 500ml', 'Vaso 750ml'],
    calories: '150 kcal',
  },
  {
    id: 'drink-lemonade-mint',
    name: 'Limonada Menta & Jengibre',
    category: 'drinks',
    description: 'Limones recién exprimidos con hojas de hierbabuena fresca y hielo frappé.',
    price: '$3.49',
    priceNumber: 3.49,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 195,
    badge: 'Refrescante',
    calories: '110 kcal',
  },
];

export const TRUST_BADGES = [
  {
    id: 'fast-delivery',
    icon: '⚡',
    title: 'Fast Delivery',
    subtitle: 'At Your Doorstep',
  },
  {
    id: 'fresh-hygienic',
    icon: '✨',
    title: 'Fresh & Hygienic',
    subtitle: 'Prepared Daily',
  },
  {
    id: 'secure-payment',
    icon: '🛡️',
    title: 'Secure Payment',
    subtitle: '100% Safe',
  },
  {
    id: 'best-quality',
    icon: '🏆',
    title: 'Best Quality',
    subtitle: 'Premium Ingredients',
  },
  {
    id: 'customer-support',
    icon: '💬',
    title: 'Customer Support',
    subtitle: "We're Here to Help",
  },
];

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'combos', label: 'Combos' },
  { id: 'sides', label: 'Sides' },
  { id: 'shakes', label: 'Shakes' },
  { id: 'offers', label: 'Offers' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact' },
] as const;

export type NavItemId = (typeof NAV_ITEMS)[number]['id'];

export const PARAGRAPH_TEXT =
  'Canger stacks smash-grilled patties into an unapologetic bite filled with crispy edges, smoky char, and sauce that drips exactly where it should.';

