
import React, { useMemo } from 'react';
import { ChevronLeft, Clock, ShoppingBag, Heart, ChefHat, Check } from 'lucide-react';
import { Recipe, Product, ReviewItem } from '../types';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  getMatchingProducts: (ingredients: string[]) => Product[];
  onAddRecipeToCart: (items: ReviewItem[]) => void;
  onToggleFavorite?: () => void;
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ 
  recipe, 
  onBack, 
  getMatchingProducts,
  onAddRecipeToCart,
  onToggleFavorite
}) => {
  const matchedProducts = useMemo(() => {
    return getMatchingProducts(recipe.ingredients || []);
  }, [recipe, getMatchingProducts]);

  const totalPrice = matchedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddAll = () => {
    const items: ReviewItem[] = matchedProducts.map((p, index) => ({
        id: `recipe-item-${index}-${Date.now()}`,
        ingredient: { name: recipe.ingredients[index] || p.name },
        product: p,
        quantity: 1,
        selectedOptions: []
    }));
    onAddRecipeToCart(items);
  };

  return (
    <div className="flex flex-col h-full bg-[#F6F7F9] animate-in fade-in slide-in-from-right-8 duration-300 font-poppins relative">
      
      {/* Hero Image */}
      <div className="w-full h-[40%] relative">
         <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
         
         <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center z-10">
            <button 
               onClick={onBack}
               className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
               <ChevronLeft size={24} />
            </button>
            <button 
               onClick={onToggleFavorite}
               className={`w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors ${recipe.isFavorite ? 'text-red-500 bg-white/30' : 'text-white hover:bg-white/30'}`}
            >
               <Heart size={20} className={recipe.isFavorite ? 'fill-current' : ''} />
            </button>
         </div>

         <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Clock size={12} /> {recipe.cookTime}
                </span>
                <span className="bg-[#A3D63F] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {matchedProducts.length} items matched
                </span>
            </div>
            <h1 className="text-3xl font-bold text-white leading-tight shadow-sm">
                {recipe.title}
            </h1>
         </div>
      </div>

      {/* Content Content */}
      <div className="flex-1 bg-white -mt-6 rounded-t-[32px] relative z-20 flex flex-col shadow-[0_-4px_24px_rgba(0,0,0,0.1)] overflow-hidden">
         <div className="p-6 overflow-y-auto no-scrollbar pb-24">
             <div className="mb-6">
                 <h3 className="text-lg font-bold text-[#111827] mb-2">Description</h3>
                 {/* Render HTML Description Safely with custom list and table styling */}
                 <div 
                    className="text-gray-500 text-sm leading-relaxed 
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2
                    [&_li]:my-1
                    [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:my-2
                    [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:my-2
                    [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:my-2
                    [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_blockquote]:italic
                    [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
                    [&_th]:border [&_th]:border-gray-200 [&_th]:p-2 [&_th]:bg-gray-50 [&_th]:text-left [&_th]:font-semibold
                    [&_td]:border [&_td]:border-gray-200 [&_td]:p-2
                    [&_hr]:my-4 [&_hr]:border-gray-200
                    [&_b]:font-bold [&_strong]:font-bold
                    [&_i]:italic [&_em]:italic
                    "
                    dangerouslySetInnerHTML={{ 
                        __html: recipe.description || "A delicious recipe perfect for home cooking." 
                    }} 
                 />
             </div>

             <div>
                 <h3 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
                     <ChefHat size={20} className="text-[#A3D63F]" />
                     Ingredients Shop List
                 </h3>
                 
                 <div className="flex flex-col gap-3">
                     {matchedProducts.map((product, idx) => (
                         <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                             <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                 <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                     <h4 className="text-sm font-semibold text-[#111827] truncate pr-2">{product.name}</h4>
                                     <span className="text-sm font-bold text-[#A3D63F]">${product.price.toFixed(2)}</span>
                                 </div>
                                 <div className="flex items-center gap-1.5 mt-0.5">
                                     <Check size={12} className="text-green-500" strokeWidth={3} />
                                     <span className="text-xs text-gray-500">Matched from "{recipe.ingredients?.[idx]}"</span>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         </div>

         {/* Bottom Action Bar */}
         <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex items-center gap-4">
             <div className="flex flex-col">
                 <span className="text-sm text-gray-400 font-medium">Total Price</span>
                 <span className="text-2xl font-bold text-[#111827]">${totalPrice.toFixed(2)}</span>
             </div>
             <button 
                onClick={handleAddAll}
                className="flex-1 bg-[#A3D63F] text-white font-bold h-[56px] rounded-[28px] shadow-lg shadow-[#A3D63F]/30 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
             >
                 <ShoppingBag size={20} />
                 Add all to Cart
             </button>
         </div>
      </div>

    </div>
  );
};

export default RecipeDetailScreen;
