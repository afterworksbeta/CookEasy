import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, ShoppingBag, Heart, Star, Minus, Plus, Leaf, Scissors, 
  Award, Calendar, Snowflake, MapPin, CheckCircle, Flame, 
  ChevronDown, ChevronUp, AlertTriangle, Wheat, Zap, Info
} from 'lucide-react';
import { Product, ReviewItem } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  initialItem?: ReviewItem;
  onBack: () => void;
  onAddToCart: (item: ReviewItem) => void;
}

interface CustomOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ 
  product, 
  initialItem,
  onBack,
  onAddToCart 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(initialItem?.quantity || 1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNutritionExpanded, setIsNutritionExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Default values for new fields if they don't exist
  const category = product.category || 'Pantry';
  const calories = product.calories || 150;
  const nutrition = product.nutrition || { protein: '10g', carbs: '20g', fat: '5g' };
  const pricePerUnit = product.pricePerUnit || '$1.20/100g';
  const allergens = product.allergens || [];
  const dietaryType = product.dietaryType || [];

  // Determine options based on product name keywords + dietaryType
  const getOptionsForProduct = (name: string, dietaryTypes: string[]): CustomOption[] => {
    const options: CustomOption[] = [];
    
    // Base options logic
    const lowerName = name.toLowerCase();
    
    if (lowerName.match(/chicken|meat|beef|pork|steak|lamb/)) {
      if (!dietaryTypes.includes('Organic')) options.push({ id: 'premium', label: 'Premium', icon: Award });
      if (!dietaryTypes.includes('Halal')) options.push({ id: 'precut', label: 'Pre-Cut', icon: Scissors });
    } else if (lowerName.match(/fish|shrimp|salmon|seafood|tuna/)) {
      if (!dietaryTypes.includes('Fresh')) options.push({ id: 'wild', label: 'Wild', icon: MapPin });
    } else {
       options.push({ id: 'local', label: 'Local', icon: MapPin });
    }

    // Add dietary types from product data
    dietaryTypes.forEach(type => {
      let Icon = CheckCircle;
      if (type === 'Organic') Icon = Leaf;
      if (type === 'Vegan') Icon = Leaf;
      if (type === 'Keto') Icon = Zap;
      if (type === 'Gluten-Free') Icon = Wheat;
      if (type === 'Halal') Icon = CheckCircle;
      if (type === 'Fresh') Icon = Calendar;
      if (type === 'Frozen') Icon = Snowflake;

      options.push({ id: type.toLowerCase(), label: type, icon: Icon });
    });

    return options;
  };

  const options = getOptionsForProduct(product.name, dietaryType);
  // Assume selected options are either passed or all active
  const selectedOptions = initialItem?.selectedOptions || options.map(o => o.id);

  const handlePurchase = () => {
    const item: ReviewItem = {
      // If editing, keep ID, else generate new
      id: initialItem?.id || Math.random().toString(36).substr(2, 9),
      ingredient: { name: product.name },
      product: product,
      quantity: quantity,
      selectedOptions: selectedOptions
    };
    onAddToCart(item);
  };

  const updateQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleToggleExpand = (expanded: boolean) => {
    setIsExpanded(expanded);
    if (!expanded && scrollRef.current) {
        scrollRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#8BC34A]/20 relative overflow-hidden animate-in fade-in zoom-in-95 duration-300 font-poppins">
      
      {/* 1. Header / Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-6 pt-12 pb-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors drop-shadow-sm"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors drop-shadow-sm ${isFavorite ? 'text-red-500 bg-white/30' : 'text-white hover:bg-white/30'}`}
          >
            <Heart size={20} strokeWidth={2.5} className={isFavorite ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      {/* 2. Hero Product Image - Height increased to 55% because white card height reduced */}
      <div className="h-[55%] w-full relative z-0">
         {/* Background Circle Decoration */}
         <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#A3D63F]/20 rounded-full blur-3xl" />
         
         <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500" 
        />
      </div>

      {/* 3. White Content Card - Reduced height to 55% to minimize empty space */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-white rounded-t-[40px] z-20 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Scrollable Content Area - Scrolling disabled until expanded */}
        <div 
            ref={scrollRef}
            className={`flex-1 px-6 pt-6 pb-2 no-scrollbar ${isExpanded ? 'overflow-y-auto' : 'overflow-hidden'}`}
        >
            
            {/* Header Row: Title & Price */}
            <div className="flex justify-between items-start mb-2 shrink-0">
                <div className="space-y-1 pr-2 flex-1">
                    <h1 className="text-xl font-bold text-[#111827] leading-tight line-clamp-2">
                        {product.name}
                    </h1>
                    {/* Brand, Weight & Category Badge */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-400 mt-1">
                        {product.brand && (
                           <span className="bg-gray-100 text-[#111827] px-2 py-0.5 rounded">{product.brand}</span>
                        )}
                        {product.weight && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span>{product.weight}</span>
                            </>
                        )}
                         {/* Category Badge */}
                        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100 ml-1">
                            <Info size={10} />
                            <span>{category}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end shrink-0 pt-1">
                    <div className="text-3xl font-bold text-[#A3D63F]">
                        ${product.price}
                    </div>
                    {/* Price Per Unit */}
                    <div className="text-sm text-gray-400 font-medium">
                        ({pricePerUnit})
                    </div>
                </div>
            </div>

            {/* Alternative Section with Quantity Selector */}
            <div className="flex justify-between items-end mb-3 mt-3 shrink-0">
                <div className="flex flex-col gap-1">
                     <h3 className="text-sm font-bold text-[#111827]">Alternative</h3>
                     <div className="flex items-center gap-2">
                         <p className="text-[10px] font-medium text-gray-400">Signature</p>
                     </div>
                </div>
                
                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-50 rounded-[20px] p-1 h-[36px] border border-gray-100">
                    <button 
                        onClick={() => updateQuantity(-1)}
                        className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#111827] hover:bg-white rounded-full transition-all disabled:opacity-30"
                        disabled={quantity <= 1}
                    >
                        <Minus size={14} strokeWidth={2.5} />
                    </button>
                    <span className="text-sm font-bold text-[#111827] w-6 text-center">{quantity}</span>
                    <button 
                        onClick={() => updateQuantity(1)}
                        className="w-8 h-full flex items-center justify-center text-[#A3D63F] hover:bg-white hover:shadow-sm rounded-full transition-all"
                    >
                        <Plus size={14} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Particulars Section */}
            <div className="flex flex-col gap-1 pb-2">
                <h3 className="text-sm font-bold text-[#111827]">Particulars</h3>
                
                <div className="relative">
                    <p className={`text-[12px] text-gray-500 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                    
                    {/* EXPANDED CONTENT: Nutrition Facts, Quality & Allergens moved here */}
                    {isExpanded && (
                        <div className="mt-4 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                            {/* Nutrition Facts */}
                            <div className="mb-4 border border-green-100 rounded-xl overflow-hidden">
                                <button 
                                    onClick={() => setIsNutritionExpanded(!isNutritionExpanded)}
                                    className="w-full flex items-center justify-between p-3 bg-green-50/50 hover:bg-green-50 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <Flame size={16} className="text-orange-500 fill-orange-500" />
                                        <span className="text-sm font-bold text-[#111827]">Nutrition Facts</span>
                                    </div>
                                    {isNutritionExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                </button>
                                
                                {isNutritionExpanded && (
                                    <div className="p-4 bg-white flex justify-between gap-2">
                                        <div className="flex flex-col items-center flex-1 p-2 bg-gray-50 rounded-lg">
                                            <span className="text-[10px] text-gray-400 font-semibold uppercase">Calories</span>
                                            <span className="text-sm font-bold text-[#111827]">{calories}</span>
                                        </div>
                                        <div className="flex flex-col items-center flex-1 p-2 bg-gray-50 rounded-lg">
                                            <span className="text-[10px] text-gray-400 font-semibold uppercase">Protein</span>
                                            <span className="text-sm font-bold text-[#111827]">{nutrition.protein}</span>
                                        </div>
                                        <div className="flex flex-col items-center flex-1 p-2 bg-gray-50 rounded-lg">
                                            <span className="text-[10px] text-gray-400 font-semibold uppercase">Carbs</span>
                                            <span className="text-sm font-bold text-[#111827]">{nutrition.carbs}</span>
                                        </div>
                                        <div className="flex flex-col items-center flex-1 p-2 bg-gray-50 rounded-lg">
                                            <span className="text-[10px] text-gray-400 font-semibold uppercase">Fat</span>
                                            <span className="text-sm font-bold text-[#111827]">{nutrition.fat}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                             {/* Quality & Diet */}
                             <div className="mb-2">
                                <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Quality & Diet</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {options.map((opt) => {
                                    const Icon = opt.icon;
                                    return (
                                        <div
                                        key={opt.id}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200 bg-[#F1F8E9] border-[#A3D63F] text-[#33691E] shadow-sm"
                                        >
                                        <Icon size={14} strokeWidth={2} className="text-[#558B2F]" />
                                        <span className="text-[10px] font-bold leading-tight">{opt.label}</span>
                                        </div>
                                    );
                                    })}
                                </div>
                            </div>

                            {/* Allergen Warning */}
                            {allergens.length > 0 && (
                                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
                                    <AlertTriangle size={18} className="text-orange-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-xs font-bold text-orange-800 uppercase tracking-wide mb-1">Contains Allergens</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {allergens.map(allergen => (
                                                <span key={allergen} className="text-[10px] font-semibold bg-white text-orange-700 px-2 py-0.5 rounded border border-orange-100">
                                                    {allergen}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {!isExpanded && (
                      <div className="absolute bottom-0 right-0 z-10 pl-8 bg-gradient-to-l from-white via-white to-transparent">
                          <button 
                              onClick={() => handleToggleExpand(true)}
                              className="text-[12px] font-bold text-[#A3D63F] hover:underline"
                          >
                              ...more
                          </button>
                      </div>
                    )}
                    {isExpanded && (
                       <button 
                          onClick={() => handleToggleExpand(false)}
                          className="text-[12px] font-bold text-[#A3D63F] hover:underline mt-2 inline-block"
                       >
                          less
                       </button>
                    )}
                </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className="fill-[#8BC34A] text-[#8BC34A]" />
                ))}
                <span className="text-[10px] text-gray-400 font-medium ml-2">(128 reviews)</span>
            </div>
            
        </div>

        {/* Action Bar - Fixed Bottom */}
        <div className="flex items-center gap-3 px-6 pb-6 pt-4 shrink-0 border-t border-gray-50 bg-white">
            <button 
                onClick={handlePurchase}
                className="w-[52px] h-[52px] rounded-[20px] border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#A3D63F] hover:border-[#A3D63F] transition-colors shrink-0"
            >
                <ShoppingBag size={22} />
            </button>
            
            <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-[52px] h-[52px] rounded-[20px] border flex items-center justify-center transition-colors shrink-0 ${isFavorite ? 'border-red-200 text-red-500 bg-red-50' : 'border-gray-200 text-gray-400 hover:text-red-400'}`}
            >
                <Heart size={22} className={isFavorite ? 'fill-current' : ''} />
            </button>

            <button 
                onClick={handlePurchase}
                className="flex-1 h-[56px] bg-[#A3D63F] hover:brightness-105 text-white rounded-[28px] font-semibold text-lg shadow-lg shadow-[#A3D63F]/30 active:scale-[0.98] transition-all flex items-center justify-center"
            >
                Add to Cart
            </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailScreen;