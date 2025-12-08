import React, { useMemo } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { Category, Product, ReviewItem } from '../types';

interface CategoryDetailScreenProps {
  category: Category;
  products: Product[];
  onBack: () => void;
  onProductSelect: (product: Product) => void;
  onAddToCart: (item: ReviewItem) => void;
}

const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({ 
  category, 
  products,
  onBack, 
  onProductSelect,
  onAddToCart
}) => {
  const categoryProducts = useMemo(() => {
    return products.filter(p => p.category === category.label);
  }, [products, category.label]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const item: ReviewItem = {
        id: Math.random().toString(36).substr(2, 9),
        ingredient: { name: product.name },
        product: product,
        quantity: 1,
        selectedOptions: []
    };
    onAddToCart(item);
  };

  return (
    <div className="flex flex-col h-full bg-[#F6F7F9] animate-in fade-in slide-in-from-right-8 duration-300">
      
      {/* Header */}
      <div className="relative flex items-center justify-center px-6 py-6 pt-12 bg-white sticky top-0 z-20">
        <button 
          onClick={onBack}
          className="absolute left-6 w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors bg-white z-10 outline-none"
        >
          <ChevronLeft size={24} className="text-[#111827]" />
        </button>
        <h1 className="text-lg font-bold text-[#111827]">
          {category.label}
        </h1>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 no-scrollbar">
         {categoryProducts.length > 0 ? (
           <div className="grid grid-cols-2 gap-4">
              {categoryProducts.map(product => (
                  <div 
                      key={product.id}
                      onClick={() => onProductSelect(product)}
                      className="bg-white rounded-2xl p-3 shadow-sm flex flex-col cursor-pointer active:scale-[0.98] transition-all"
                  >
                      <div className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3 relative">
                          <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/200?text=No+Image')}
                          />
                           {product.matchType === 'Best Price' && (
                              <div className="absolute top-0 left-0 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-br-lg font-bold z-10">
                                 SALE
                              </div>
                           )}
                           <button 
                             onClick={(e) => handleQuickAdd(e, product)}
                             className="absolute bottom-2 right-2 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-[#A3D63F] shadow-sm hover:bg-[#A3D63F] hover:text-white transition-colors z-10"
                           >
                              <Plus size={18} strokeWidth={2.5} />
                           </button>
                      </div>
                      
                      <h3 className="text-sm font-semibold text-[#111827] line-clamp-2 leading-tight mb-1 h-[2.5em]">
                          {product.name}
                      </h3>
                      
                      <div className="flex justify-between items-end mt-auto">
                          <div>
                              <div className="text-base font-bold text-[#A3D63F]">${product.price.toFixed(2)}</div>
                              <div className="text-[10px] text-gray-400 font-medium">{product.weight}</div>
                          </div>
                      </div>
                  </div>
              ))}
           </div>
         ) : (
           <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-400">
              <p className="text-lg font-medium text-gray-400/80">No products found in this category.</p>
              <p className="text-xs mt-2 text-gray-400/60">Check back later!</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default CategoryDetailScreen;