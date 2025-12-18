
import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Search, ShoppingCart, ArrowRight, ChevronDown, Check, Bell, Sparkles } from 'lucide-react';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from './firebase';
import BottomNav from './components/BottomNav';
import RecipeCard from './components/RecipeCard';
import CategoryStrip from './components/CategoryStrip';
import UploadScreen from './components/UploadScreen';
import IngredientReviewScreen from './components/IngredientReviewScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import ShoppingBagScreen from './components/ShoppingBagScreen';
import OrderStatusScreen from './components/OrderStatusScreen';
import ProfileScreen from './components/ProfileScreen';
import CategoryDetailScreen from './components/CategoryDetailScreen';
import RecipeDetailScreen from './components/RecipeDetailScreen';
import AuthScreen from './components/AuthScreen';
import AdminDashboard from './components/AdminDashboard';
import { Tab, HomeView, Ingredient, ReviewItem, ShopView, Order, Address, PaymentMethod, Product, ExtendedReviewItem, Category, User, UserRole, Recipe } from './types';
import { CATEGORIES, RECOMMENDED_RECIPES, MOCK_ADDRESSES, MOCK_CARDS, generateMockProduct, COLES_VEGETABLES_DATABASE, COLES_MEAT_DATABASE, COLES_FRUITS_DATABASE, COLES_SEAFOOD_DATABASE, COLES_BAKERY_DATABASE, COLES_DAIRY_DATABASE } from './constants';

const LOCATIONS = ['Bangkok, TH', 'Sydney, AU', 'Melbourne, AU'];

const App: React.FC = () => {
  // --- Auth State ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Sync with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || '',
          avatarUrl: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150',
          role: firebaseUser.email === 'admin@cookeasy.com' ? 'admin' : 'user'
        });
      } else {
        setCurrentUser(null);
      }
      setIsInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  // --- Shared Data State ---
  const [recipesDatabase, setRecipesDatabase] = useState<Recipe[]>(RECOMMENDED_RECIPES);
  const [productsDatabase, setProductsDatabase] = useState<Product[]>([]); // Initialized properly in a real app

  // --- User App State ---
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [returnTab, setReturnTab] = useState<Tab>(Tab.Home);
  const [homeView, setHomeView] = useState<HomeView>(HomeView.Dashboard);
  const [shopView, setShopView] = useState<ShopView>(ShopView.Cart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(LOCATIONS[0]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ReviewItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [reviewItems, setReviewItems] = useState<ExtendedReviewItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedReviewItem, setSelectedReviewItem] = useState<ExtendedReviewItem | undefined>(undefined);

  // --- Handlers ---
  const requireAuth = (callback: () => void) => {
    if (currentUser) callback();
    else setIsAuthModalOpen(true);
  };

  const handleTabChange = (tab: Tab) => {
    if (tab === Tab.Orders || tab === Tab.Profile) requireAuth(() => setActiveTab(tab));
    else setActiveTab(tab);
  };

  const handleAnalysisComplete = (ingredients: Ingredient[], imagePreview: string) => {
    const initialItems: ExtendedReviewItem[] = ingredients.map((ing, index) => ({
        id: `item-${index}`,
        ingredient: ing,
        product: generateMockProduct(ing.name),
        quantity: 1,
        isSelected: true
    }));
    setReviewItems(initialItems);
    setHomeView(HomeView.Review);
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setReturnTab(activeTab);
    setHomeView(HomeView.RecipeDetail);
  };

  const handleAddToCart = (items: ReviewItem[]) => {
    requireAuth(() => {
        setCartItems(prev => [...prev, ...items]);
        setIsCartOpen(true);
    });
  };

  if (isInitializing) return (
    <div className="max-w-md mx-auto h-[100dvh] bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-app-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const renderDashboard = () => (
    <div className="flex flex-col h-full bg-[#FAFAFA] overflow-hidden">
      {/* Top Navigation / Header */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 group cursor-pointer" onClick={() => setIsLocationOpen(!isLocationOpen)}>
            <MapPin size={14} className="text-app-primary" />
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Location</span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
          </div>
          <span className="text-sm font-bold text-app-dark">{currentLocation}</span>
          
          {isLocationOpen && (
            <div className="absolute top-full left-6 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95">
              {LOCATIONS.map(loc => (
                <button 
                  key={loc} 
                  onClick={() => { setCurrentLocation(loc); setIsLocationOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex justify-between items-center"
                >
                  {loc} {currentLocation === loc && <Check size={14} className="text-app-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-app-dark relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-10 h-10 rounded-full bg-app-dark flex items-center justify-center text-white relative shadow-lg shadow-app-dark/20"
          >
            <ShoppingCart size={18} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-app-primary text-app-dark text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Welcome Section */}
        <div className="px-6 pt-6 mb-6">
          <h1 className="text-3xl font-bold text-app-dark leading-tight">
            Hi, {currentUser ? currentUser.name.split(' ')[0] : 'Chef'}! <br />
            <span className="text-gray-400 font-medium text-lg">Ready for a new dish?</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="px-6 mb-8">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-app-primary transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search recipes, ingredients..."
              className="w-full bg-white border border-gray-100 rounded-[20px] py-4 pl-12 pr-4 shadow-sm outline-none focus:ring-4 focus:ring-app-primary/10 focus:border-app-primary transition-all font-medium text-app-dark"
            />
          </div>
        </div>

        {/* AI Scanner Card - The "Hook" */}
        <div className="px-6 mb-8">
          <button 
            onClick={() => requireAuth(() => setHomeView(HomeView.Upload))}
            className="w-full relative h-[160px] rounded-[32px] overflow-hidden group shadow-2xl shadow-app-primary/20 active:scale-[0.98] transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-app-primary to-[#8BC34A]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles size={12} className="text-white fill-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Powered by AI</span>
                </div>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-app-primary shadow-lg group-hover:rotate-12 transition-transform">
                  <Camera size={24} strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-1">Recipe Scanner</h3>
                <p className="text-white/80 text-sm font-medium">Turn any recipe photo into a shopping list</p>
              </div>
            </div>
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center px-6 mb-4">
            <h2 className="text-xl font-bold text-app-dark">Categories</h2>
            <button className="text-sm font-bold text-app-primary">View All</button>
          </div>
          <CategoryStrip 
            categories={CATEGORIES} 
            selectedId={selectedCategory?.id} 
            onSelect={(id) => {
              const cat = CATEGORIES.find(c => c.id === id);
              if (cat) { setSelectedCategory(cat); setHomeView(HomeView.CategoryDetail); }
            }} 
          />
        </div>

        {/* Recommended Recipes Grid */}
        <div className="px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-app-dark">Recommended</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm text-app-dark"><ArrowRight size={14} className="rotate-180" /></button>
              <button className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm text-app-dark"><ArrowRight size={14} /></button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {recipesDatabase.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onPress={() => handleRecipeSelect(recipe)} 
                onToggleFavorite={() => {}} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-app-bg relative shadow-2xl overflow-hidden flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {isCartOpen ? (
          <ShoppingBagScreen 
            items={cartItems} 
            onUpdateQuantity={(id, delta) => {}} 
            onRemoveItem={(id) => {}} 
            onConfirm={() => setShopView(ShopView.Success)} 
            onContinueShopping={() => setIsCartOpen(false)} 
          />
        ) : homeView === HomeView.Dashboard ? renderDashboard() : 
            homeView === HomeView.Upload ? <UploadScreen onBack={() => setHomeView(HomeView.Dashboard)} onAnalysisComplete={handleAnalysisComplete} /> :
            homeView === HomeView.RecipeDetail && selectedRecipe ? <RecipeDetailScreen recipe={selectedRecipe} onBack={() => setHomeView(HomeView.Dashboard)} getMatchingProducts={() => []} onAddRecipeToCart={handleAddToCart} /> :
            homeView === HomeView.Review ? <IngredientReviewScreen items={reviewItems} onUpdateItems={setReviewItems} onBack={() => setHomeView(HomeView.Dashboard)} onAddToCart={handleAddToCart} onProductSelect={() => {}} /> :
            null
        }
      </div>
      {!isCartOpen && homeView === HomeView.Dashboard && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="w-full max-w-md bg-white rounded-t-[40px] overflow-hidden shadow-2xl h-[85vh]">
              <AuthScreen onClose={() => setIsAuthModalOpen(false)} />
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
