
import React from 'react';
import { Clock, Heart } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress, onToggleFavorite }) => {
  return (
    <div 
      onClick={onPress}
      className="bg-white rounded-[24px] p-3 shadow-sm flex flex-col w-full active:scale-[0.98] transition-transform duration-200 cursor-pointer"
    >
      <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-[20px] overflow-hidden mb-3 group">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(e);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            recipe.isFavorite 
              ? 'bg-white text-red-500 shadow-sm scale-110' 
              : 'bg-black/20 text-white hover:bg-white hover:text-red-500'
          }`}
        >
           <Heart size={16} strokeWidth={2.5} className={recipe.isFavorite ? 'fill-current' : ''} />
        </button>
      </div>

      <div className="px-1 flex flex-col gap-1">
        <h3 className="text-[#111827] font-bold text-sm leading-tight line-clamp-2 min-h-[2.5em]">
          {recipe.title}
        </h3>
        
        <div className="flex flex-col gap-1 mt-0.5">
           <div className="text-gray-400 text-xs font-medium">
             {recipe.ingredientCount} ingredients
           </div>
           
           <div className="flex items-center text-gray-400 text-xs font-medium gap-1.5">
             <Clock size={12} className="text-gray-400" />
             <span>{recipe.cookTime}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
