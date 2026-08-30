import React from 'react';
import { Product } from '../../constants';
import { useApp } from '../../context/AppContext';
import { PlusIcon, StarIcon } from '../icons/Icons';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  variant?: 'featured' | 'bestseller' | 'standard';
}


export function ProductCard({ product }: ProductCardProps) {
  const { setSelectedProduct, addToCart } = useApp();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.customGroups && product.customGroups.length > 0) {
      setSelectedProduct(product);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-black/5 overflow-hidden"
    >
      {/* Top Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full bg-[#ff9800] text-white text-[11px] font-black tracking-wider uppercase shadow-sm">
            {product.badge}
          </span>
        </div>
      )}

      {/* Calories Tag */}
      {product.calories && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-0.5 rounded-md bg-black/5 text-gray-600 text-[10px] font-semibold">
            {product.calories}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-amber-50/50 to-orange-50/50 mb-4 flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="size-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('photo-1568901346375')) {
              target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80';
            }
          }}
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-500">
              <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-gray-800">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              ({product.reviewCount})
            </span>
          </div>

          {/* Product Name */}
          <h4
            className="text-lg font-black text-gray-900 leading-tight mb-1.5 group-hover:text-[#008790] transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {product.name}
          </h4>

          {/* Description */}
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 block -mb-0.5">
              Precio
            </span>
            <span className="text-xl font-black text-gray-900 tracking-tight">
              {product.price}
            </span>
          </div>

          <button
            id={`btn-add-${product.id}`}
            onClick={handleQuickAdd}
            aria-label={`Agregar ${product.name}`}
            className="size-11 rounded-full bg-[#f6a800] hover:bg-[#e09800] active:scale-90 text-white flex items-center justify-center shadow-md transition-all cursor-pointer group-hover:bg-[#008790]"
          >
            <PlusIcon className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
