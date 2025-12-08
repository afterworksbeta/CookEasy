import React, { useState } from 'react';
import { ChevronLeft, Plus, Minus, Search, Trash2, Check, RefreshCw, ShoppingCart, X, Star, Filter, AlertCircle } from 'lucide-react';
import { Ingredient, Product, ReviewItem, ExtendedReviewItem } from '../types';
import { generateMockProduct } from '../constants';

interface IngredientReviewScreenProps {
  items: ExtendedReviewItem[];
  onUpdateItems: (items: ExtendedReviewItem[]) => void;
  onBack: () => void;
  onAddToCart: (items: ReviewItem[]) => void; // This is "Continue"
  onProductSelect: (product: Product, item: ExtendedReviewItem) => void;
}

const getBadgeStyles = (type: string) => {
  switch (type) {
    case 'Exact match':
      return 'text-[#A3D63F] bg-[#A3D63F]/10 border border-transparent';
    case 'Similar item':
      return 'text-blue-500 bg-blue-50 border border-blue-200';
    case 'Best Price':
      return 'text-orange-500 bg-orange-50 border border-orange-200';
    case 'Premium product':
      return 'text-purple-500 bg-purple-50 border border-purple-200';
    default:
      return 'text-gray-500 bg-gray-100 border border-gray-200';
  }
};

const IngredientReviewScreen: React.FC<IngredientReviewScreenProps> = ({ 
  items, 
  onUpdateItems,
  onBack,
  onAddToCart,
  onProductSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for Change Product Modal
  const [isAlternativesOpen, setIsAlternativesOpen] = useState(false);
  const [activeItemForChange, setActiveItemForChange] = useState<ExtendedReviewItem | null>(null);
  const [alternativeProducts, setAlternativeProducts] = useState<Product[]>([]);

  const toggleSelection = (id: string) => {
    onUpdateItems(items.map(item => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    }));
  };

  const updateQuantity = (id: string, delta: number) => {
    onUpdateItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleOpenAlternatives = (item: ExtendedReviewItem) => {
    setActiveItemForChange(item);
    // Generate 5 distinct mock alternatives based on the ingredient name
    const alts = Array.from({ length: 5 }).map(() => generateMockProduct(item.ingredient.name));
    setAlternativeProducts(alts);
    setIsAlternativesOpen(true);
  };

  const handleSelectAlternative = (newProduct: Product) => {
    if (!activeItemForChange) return;

    onUpdateItems(items.map(item => {
      if (item.id === activeItemForChange.id) {
        return { ...item, product: newProduct };
      }
      return item;
    }));

    setIsAlternativesOpen(false);
    setActiveItemForChange(null);
  };

  const handleDeleteItem = (id: string) => {
    onUpdateItems(items.filter(item => item.id !== id));
  };

  const handleContinue = () => {
    const selectedItems = items.filter(item => item.isSelected);
    onAddToCart(selectedItems);
  };

  const filteredItems = items.filter(item => 
    item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCount = items.filter(i => i.isSelected).length;
  const totalAmount = items
    .filter(i => i.isSelected)
    .reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="flex flex-col h-full bg-[#F6F7F9] animate-in fade-in slide-in-from-right-8 duration-300 relative">
      {/* Header */}
      <div className="flex flex-col bg-white sticky top-0 z-30 shadow-sm pb-4 pt-10 px-4">
        <div className="flex items-center mb-4 relative">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors absolute left-0"
          >
            <ChevronLeft size={24} className="text-[#111827]" />
          </button>
          <h1 className="w-full text-center text-lg font-semibold text-[#111827]">
            Confirm Your Selection
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Find product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F3F4F6] text-[#111827] placeholder-gray-400 rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[#A3D63F]/20 transition-all"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-[200px] no-scrollbar">
        <div className="flex flex-col gap-3">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-[24px] p-3 shadow-sm flex items-start gap-3 transition-all duration-200 ${!item.isSelected ? 'opacity-60 grayscale-[0.5]' : ''}`}
            >
              {/* Left: Selection Control */}
              <button 
                onClick={() => toggleSelection(item.id)}
                className="mt-8 shrink-0 focus:outline-none"
              >
                {item.isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-[#A3D63F] flex items-center justify-center shadow-sm">
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-transparent hover:border-gray-400 transition-colors" />
                )}
              </button>

              {/* Image */}
              <div 
                className="w-20 h-20 rounded-xl bg-gray-50 shrink-0 overflow-hidden shadow-sm cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                onClick={() => onProductSelect(item.product, item)}
              >
                <img 
                  src={item.product.imageUrl} 
                  alt={item.product.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Middle: Info */}
              <div className="flex-1 min-w-0 pt-1">
                <h3 
                  className="text-base font-semibold text-[#111827] leading-tight mb-1 truncate cursor-pointer hover:text-[#A3D63F] transition-colors"
                  onClick={() => onProductSelect(item.product, item)}
                >
                  {item.product.name}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {item.product.weight}
                </p>
                <div className={`mt-2 text-xs font-medium px-2 py-0.5 rounded-md inline-block ${getBadgeStyles(item.product.matchType)}`}>
                  {item.product.matchType}
                </div>
              </div>

              {/* Right: Controls */}
              <div className="flex flex-col items-end gap-1 min-w-[80px]">
                <span className="text-base font-semibold text-[#111827]">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
                
                {/* Quantity Control */}
                <div className="flex items-center bg-gray-50 rounded-full p-0.5 gap-2 my-1">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={!item.isSelected}
                    className="w-6 h-6 flex items-center justify-center text-[#111827] hover:bg-white rounded-full transition-colors disabled:opacity-50"
                  >
                    <Minus size={12} strokeWidth={2.5} />
                  </button>
                  <span className="text-xs font-semibold w-3 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={!item.isSelected}
                    className="w-6 h-6 flex items-center justify-center text-[#111827] hover:bg-white rounded-full transition-colors disabled:opacity-50"
                  >
                    <Plus size={12} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="flex items-center gap-3 mt-1">
                   <button 
                     onClick={() => handleOpenAlternatives(item)}
                     disabled={!item.isSelected}
                     className="text-xs font-bold text-app-secondary hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     Change
                   </button>
                   <button 
                     onClick={() => handleDeleteItem(item.id)}
                     className="text-gray-300 hover:text-red-400 transition-colors p-1"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
             <div className="text-center py-10 text-gray-400">
                <p>No products found.</p>
             </div>
          )}
        </div>
      </div>

      {/* Sticky Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-8 z-30 max-w-md mx-auto shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
         <div className="flex justify-between items-end mb-4">
            <div>
               <p className="text-sm text-[#6B7280]">Selected Products</p>
               <p className="text-base font-semibold text-[#111827]">{selectedCount} items</p>
            </div>
            <div className="text-right">
               <p className="text-sm text-[#6B7280]">Amount Due</p>
               <p className="text-xl font-bold text-app-lime">${totalAmount.toFixed(2)}</p>
            </div>
         </div>
         
         <button 
           onClick={handleContinue}
           disabled={selectedCount === 0}
           className="w-full bg-app-lime text-white font-semibold h-[56px] rounded-[32px] shadow-lg shadow-app-lime/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-105"
         >
            Continue
         </button>
      </div>

      {/* Alternatives Modal / Bottom Sheet */}
      {isAlternativesOpen && activeItemForChange && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsAlternativesOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 z-50 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto shadow-2xl max-w-md mx-auto">
            
            {/* Modal Handle */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-[#111827]">Change Product</h2>
               <button 
                 onClick={() => setIsAlternativesOpen(false)} 
                 className="p-2 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Out of Stock Warning */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
               <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={18} />
               <div>
                  <h4 className="text-sm font-bold text-orange-800">Desired product is out of stock</h4>
                  <p className="text-xs text-orange-600 mt-1">
                     We couldn't find an exact match for "{activeItemForChange.ingredient.name}". Here are the best alternatives.
                  </p>
               </div>
            </div>

            {/* Filters Row */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
               {['Recommended', 'Lowest Price', 'Organic', 'Top Rated'].map((filter, idx) => (
                 <button 
                    key={filter}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${idx === 0 ? 'bg-app-lime text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-app-lime'}`}
                 >
                    {filter}
                 </button>
               ))}
            </div>

            {/* Current Search Term */}
            <div className="mb-4 text-sm text-gray-500">
              Showing results for <span className="font-bold text-[#111827]">"{activeItemForChange.ingredient.name}"</span>
            </div>

            {/* List of Alternatives */}
            <div className="space-y-4">
               {alternativeProducts.map((prod) => (
                  <div key={prod.id} className="flex gap-3 p-2 bg-white rounded-[20px] border border-gray-100 shadow-sm hover:border-app-lime/50 transition-colors">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 relative">
                         <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                         {prod.matchType === 'Best Price' && (
                            <div className="absolute top-0 left-0 bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-br-lg font-bold">
                               SALE
                            </div>
                         )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-bold text-[#111827] line-clamp-2 leading-tight">
                                {prod.name}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                               <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{prod.brand}</span>
                               <span className="text-xs text-gray-400">• {prod.weight}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-end mt-2">
                             <div>
                                <div className="text-lg font-bold text-app-lime">${prod.price.toFixed(2)}</div>
                                <div className="text-[10px] text-gray-400">({prod.pricePerUnit})</div>
                             </div>
                             <button 
                               onClick={() => handleSelectAlternative(prod)}
                               className="bg-app-dark text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 active:scale-95"
                             >
                                Select
                             </button>
                          </div>
                      </div>
                  </div>
               ))}
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default IngredientReviewScreen;