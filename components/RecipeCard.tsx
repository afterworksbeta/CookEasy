
import React from 'react';
import { Clock, Heart, Star } from 'lucide-react';
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
      className="bg-white rounded-[28px] p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col w-full active:scale-[0.97] transition-all duration-300 cursor-pointer border border-white group"
    >
      <div className="relative w-full aspect-[1/1.2] rounded-[22px] overflow-hidden mb-3">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(e);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-lg transition-all z-10 ${
            recipe.isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/70 text-gray-800 hover:bg-white'
          }`}
        >
           <Heart size={14} className={recipe.isFavorite ? 'fill-current' : ''} />
        </button>

        <div className="absolute bottom-2.5 left-2.5 flex gap-1">
          <div className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-bold text-white flex items-center gap-1">
            <Clock size={10} />
            {recipe.cookTime}
          </div>
        </div>
      </div>

      <div className="px-1.5 pb-2 flex flex-col h-full">
        <h3 className="text-app-dark font-bold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-app-primary transition-colors">
          {recipe.title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
           <div className="flex items-center gap-1">
             <Star size={10} className="fill-orange-400 text-orange-400" />
             <span className="text-[10px] font-bold text-gray-400">4.8</span>
           </div>
           <span className="text-[10px] font-bold text-app-primary bg-app-primary/10 px-2 py-0.5 rounded-full">
             {recipe.ingredientCount} items
           </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
