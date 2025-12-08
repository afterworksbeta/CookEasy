
import React from 'react';
import { Category } from '../types';

interface CategoryStripProps {
  categories: Category[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const CategoryStrip: React.FC<CategoryStripProps> = ({
  categories,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-6 no-scrollbar snap-x">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className="snap-start shrink-0 flex flex-col items-center gap-2 group w-[72px]"
        >
          <div className={`w-[72px] h-[72px] rounded-[24px] overflow-hidden relative shadow-sm transition-all border-2 ${selectedId === cat.id ? 'border-app-primary' : 'border-white group-hover:border-gray-100'}`}>
             <img 
               src={cat.imageUrl} 
               alt={cat.label} 
               className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
             />
          </div>
          <span className={`text-[11px] font-semibold text-center truncate w-full transition-colors ${selectedId === cat.id ? 'text-app-primary' : 'text-gray-500 group-hover:text-app-dark'}`}>
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryStrip;
