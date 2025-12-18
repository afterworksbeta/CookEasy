
import React, { useState } from 'react';
import { Camera, MapPin, Search, ShoppingCart, ArrowRight, ChevronDown, Check } from 'lucide-react';
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

const LOCATIONS = ['Melbourne', 'Sydney'];

const App: React.FC = () => {
  // --- Auth State ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // --- Shared Data State ---
  const [recipesDatabase, setRecipesDatabase] = useState<Recipe[]>(RECOMMENDED_RECIPES);
  const [productsDatabase, setProductsDatabase] = useState<Product[]>(() => {
     const vegProducts = COLES_VEGETABLES_DATABASE.map((item, index) => ({
        id: `veg-${index + 100}`,
        name: item.name,
        brand: 'Fresh Market',
        price: item.price,
        imageUrl: item.imageUrl,
        matchType: Math.random() > 0.8 ? 'Best Price' : 'Exact match',
        weight: item.size,
        category: 'Vegetables',
        pricePerUnit: `per ${item.size}`,
        stockQuantity: Math.floor(Math.random() * 50) + 5,
        calories: Math.floor(Math.random() * 80) + 15,
        nutrition: {
            protein: `${(Math.random() * 3).toFixed(1)}g`,
            carbs: `${(Math.random() * 12).toFixed(1)}g`,
            fat: `${(Math.random() * 1).toFixed(1)}g`,
            fiber: `${(Math.random() * 5).toFixed(1)}g`
        },
        allergens: [],
        dietaryType: item.name.toLowerCase().includes('organic') ? ['Organic', 'Vegan'] : ['Vegan']
     }));
     
     const meatProducts = COLES_MEAT_DATABASE.map((item, index) => ({
        id: `meat-${index + 200}`,
        name: item.name,
        brand: 'Coles Graze', 
        price: item.price,
        imageUrl: item.imageUrl,
        matchType: Math.random() > 0.8 ? 'Best Price' : 'Exact match',
        weight: item.size,
        category: 'Meat',
        pricePerUnit: `per ${item.size}`,
        stockQuantity: Math.floor(Math.random() * 30) + 5,
        calories: Math.floor(Math.random() * 200) + 150, 
        nutrition: {
            protein: `${(Math.random() * 10 + 20).toFixed(1)}g`,
            carbs: '0g',
            fat: `${(Math.random() * 15 + 5).toFixed(1)}g`,
            fiber: '0g'
        },
        allergens: [],
        dietaryType: ['Gluten-Free']
    }));

    const fruitProducts = COLES_FRUITS_DATABASE.map((item, index) => ({
        id: `fruit-${index + 300}`,
        name: item.name,
        brand: 'Fresh Orchard', 
        price: item.price,
        imageUrl: item.imageUrl,
        matchType: Math.random() > 0.8 ? 'Best Price' : 'Exact match',
        weight: item.size,
        category: 'Fruits',
        pricePerUnit: `per ${item.size}`,
        stockQuantity: Math.floor(Math.random() * 50) + 5,
        calories: Math.floor(Math.random() * 60) + 40,
        nutrition: {
            protein: `${(Math.random() * 1).toFixed(1)}g`,
            carbs: `${(Math.random() * 15 + 5).toFixed(1)}g`,
            fat: '0.2g',
            fiber: `${(Math.random() * 3 + 1).toFixed(1)}g`
        },
        allergens: [],
        dietaryType: ['Vegan', 'Organic']
    }));

    const seafoodProducts = COLES_SEAFOOD_DATABASE.map((item, index) => ({
        id: `seafood-${index + 400}`,
        name: item.name,
        brand: 'Ocean Catch',
        price: item.price,
        imageUrl: item.imageUrl,
        matchType: Math.random() > 0.8 ? 'Best Price' : 'Exact match',
        weight: item.size,
        category: 'Seafood',
        pricePerUnit: `per ${item.size}`,
        stockQuantity: Math.floor(Math.random() * 30) + 5,
        calories: Math.floor(Math.random() * 150) + 80,
        nutrition: {
            protein: `${(Math.random() * 15 + 15).toFixed(1)}g`,
            carbs: '0g',
            fat: `${(Math.random() * 10).toFixed(1)}g`,
            fiber: '0g'
        },
        allergens: ['Seafood', 'Shellfish'],
        dietaryType: ['Gluten-Free', 'Pescatarian']
    }));

    const bakeryProducts = COLES_BAKERY_DATABASE.map((item, index) => ({
        id: `bakery-${index + 500}`,
        name: item.name,
        brand: item.brand,
        price: item.price,
        imageUrl: item.imageUrl,
        matchType: Math.random() > 0.8 ? 'Best Price' : 'Exact match',
        weight: item.size,
        category: 'Bakery',
        pricePerUnit: `per ${item.size}`,
        stockQuantity: Math.floor(Math.random() * 40) + 5,
        calories: Math.floor(Math.random() * 300) + 150,
        nutrition: {
            protein: `${(Math.random() * 5 + 2).toFixed(1)}g`,
            carbs: `${(Math.random() * 30 + 20).toFixed(1)}g`,
            fat: `${(Math.random() * 10 + 2).toFixed(1)}g`,
            fiber: `${(Math.random() * 2).toFixed(1)}g`
        },
        allergens: ['Gluten', 'Eggs', 'Milk'],
        dietaryType: ['Vegetarian']
    }));

    const dairyProducts = COLES_DAIRY_DATABASE.map((item, index) => ({
        id: `dairy-${index + 600}`,
        name: item.name,
        brand: item.brand,
        price: item.price,
        imageUrl: item.imageUrl,
        matchType: Math.random() > 0.8 ? 'Best Price' : 'Exact match',
        weight: item.size,
        category: 'Dairy',
        pricePerUnit: `per ${item.size}`,
        stockQuantity: Math.floor(Math.random() * 40) + 5,
        calories: Math.floor(Math.random() * 200) + 50,
        nutrition: {
            protein: `${(Math.random() * 10 + 2).toFixed(1)}g`,
            carbs: `${(Math.random() * 10 + 2).toFixed(1)}g`,
            fat: `${(Math.random() * 10 + 2).toFixed(1)}g`,
            fiber: `0g`
        },
        allergens: ['Milk'],
        dietaryType: ['Vegetarian', 'Gluten-Free']
    }));

    return [...vegProducts, ...meatProducts, ...fruitProducts, ...seafoodProducts, ...bakeryProducts, ...dairyProducts];
  });

  const [globalOrders, setGlobalOrders] = useState<Order[]>([
    {
      id: 'ORD-7782',
      date: 'Oct 24, 2023',
      total: 14.10,
      status: 'Delivered',
      items: [],
      customerName: 'Tester User' 
    }
  ]);

  // --- User App State ---
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [returnTab, setReturnTab] = useState<Tab>(Tab.Home);
  const [homeView, setHomeView] = useState<HomeView>(HomeView.Dashboard);
  const [shopView, setShopView] = useState<ShopView>(ShopView.Cart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(LOCATIONS[0]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [extractedImage, setExtractedImage] = useState<string | null>(null);
  const [reviewItems, setReviewItems] = useState<ExtendedReviewItem[]>([]);
  const [cartItems, setCartItems] = useState<ReviewItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedReviewItem, setSelectedReviewItem] = useState<ExtendedReviewItem | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [savedCards, setSavedCards] = useState<PaymentMethod[]>(MOCK_CARDS);
  const [lastOrder, setLastOrder] = useState<{items: ReviewItem[], total: number} | null>(null);

  // --- Helpers ---
  const requireAuth = (callback: () => void) => {
    if (currentUser) {
      callback();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // --- Auth Handlers ---
  const handleLogin = (name: string, email: string, role: UserRole) => {
    setCurrentUser({
      id: `u-${Math.random().toString(36).substr(2, 5)}`,
      name: name,
      email: email,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
      role: role
    });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setHomeView(HomeView.Dashboard);
    setActiveTab(Tab.Home);
  };

  // --- Navigation Wrappers ---
  const handleTabChange = (tab: Tab) => {
      if (tab === Tab.Orders || tab === Tab.Profile) {
          requireAuth(() => setActiveTab(tab));
      } else {
          setActiveTab(tab);
      }
  };

  // --- Admin Handlers ---
  const handleAdminUpdateProduct = (updated: Product) => {
    setProductsDatabase(prev => prev.map(p => p.id === updated.id ? updated : p));
  };
  const handleAdminAddProduct = (newProduct: Product) => {
    setProductsDatabase(prev => [newProduct, ...prev]);
  };
  const handleAdminDeleteProduct = (id: string) => {
    setProductsDatabase(prev => prev.filter(p => p.id !== id));
  };
  const handleAdminUpdateOrderStatus = (orderId: string, status: Order['status'], partner?: string) => {
    setGlobalOrders(prev => prev.map(o => {
        if (o.id === orderId) {
            return {
                ...o,
                status: status,
                deliveryPartner: partner as any || o.deliveryPartner
            };
        }
        return o;
    }));
  };
  const handleAdminAddRecipe = (newRecipe: Recipe) => {
    setRecipesDatabase(prev => [...prev, newRecipe]);
  };
  const handleAdminUpdateRecipe = (updated: Recipe) => {
    setRecipesDatabase(prev => prev.map(r => r.id === updated.id ? updated : r));
  };
  const handleAdminDeleteRecipe = (id: string) => {
    setRecipesDatabase(prev => prev.filter(r => r.id !== id));
  };
  const handleToggleFavorite = (recipeId: string) => {
    setRecipesDatabase(prev => prev.map(r => 
        r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r
    ));
    if (selectedRecipe && selectedRecipe.id === recipeId) {
        setSelectedRecipe(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  // --- User App Logic ---
  const findProductInDatabase = (name: string) => {
      const lowerName = name.toLowerCase();
      return productsDatabase.find(p => p.name.toLowerCase().includes(lowerName) || lowerName.includes(p.name.toLowerCase()));
  };
  const getMatchingProducts = (ingredients: string[]): Product[] => {
    return ingredients.map(ingName => {
        return findProductInDatabase(ingName) || generateMockProduct(ingName);
    });
  };
  const handleAnalysisComplete = (ingredients: Ingredient[], imagePreview: string) => {
    const initialItems: ExtendedReviewItem[] = ingredients.map((ing, index) => {
        const dbProduct = findProductInDatabase(ing.name);
        const product = dbProduct || generateMockProduct(ing.name);
        return {
            id: `item-${index}`,
            ingredient: ing,
            product: product,
            quantity: 1,
            isSelected: true
        };
    });
    setReviewItems(initialItems);
    setExtractedImage(imagePreview);
    setSelectedRecipe(null);
    setHomeView(HomeView.Review);
  };
  const handleProductSelect = (product: Product, item?: ExtendedReviewItem) => {
    setSelectedProduct(product);
    setSelectedReviewItem(item);
    setHomeView(HomeView.ProductDetail);
  };
  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setReturnTab(activeTab);
    setHomeView(HomeView.RecipeDetail);
  };
  const handleCategoryClick = (categoryId: string) => {
      const category = CATEGORIES.find(c => c.id === categoryId);
      if (category) {
          setSelectedCategory(category);
          setReturnTab(activeTab);
          setHomeView(HomeView.CategoryDetail);
          setActiveTab(Tab.Home);
      }
  };
  const handleAddToCart = (items: ReviewItem[]) => {
    requireAuth(() => {
        const newCart = [...cartItems];
        items.forEach(newItem => {
            if (newItem.quantity > 0) {
                const existingIndex = newCart.findIndex(c => c.product.id === newItem.product.id);
                if (existingIndex >= 0) {
                    newCart[existingIndex] = {
                        ...newCart[existingIndex],
                        quantity: newCart[existingIndex].quantity + newItem.quantity
                    };
                } else {
                    newCart.push(newItem);
                }
            }
        });
        setCartItems(newCart);
        if (homeView === HomeView.Review || homeView === HomeView.RecipeDetail) {
             setHomeView(HomeView.Dashboard);
             setIsCartOpen(true);
        } else {
             setIsCartOpen(true);
        }
    });
  };
  const handleSingleItemPurchase = (updatedItem: ReviewItem) => {
      requireAuth(() => {
          if (selectedReviewItem) {
              setReviewItems(prevItems => {
                  return prevItems.map(item => {
                      if (item.id === selectedReviewItem.id) {
                          return {
                              ...item,
                              product: updatedItem.product,
                              quantity: updatedItem.quantity,
                              selectedOptions: updatedItem.selectedOptions
                          };
                      }
                      return item;
                  });
              });
              setHomeView(HomeView.Review);
          } else {
              handleAddToCart([updatedItem]);
          }
      });
  };
  const handlePaymentSuccess = () => {
      const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
      const deliveryFee = cartItems.length === 0 ? 0 : (total > 50 ? 0 : 3.99);
      const finalTotal = total + deliveryFee;
      const newOrder: Order = {
          id: `ORD-${Math.floor(Math.random() * 10000) + 1000}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          total: finalTotal,
          status: 'Order received',
          items: [...cartItems],
          customerName: currentUser?.name || 'Guest'
      };
      setGlobalOrders(prev => [newOrder, ...prev]);
      setLastOrder({
          items: [...cartItems],
          total: finalTotal
      });
      setCartItems([]); 
      setShopView(ShopView.Success);
  };

  // --- Rendering ---
  if (currentUser?.role === 'admin') {
      return (
          <AdminDashboard 
            user={currentUser}
            products={productsDatabase}
            recipes={recipesDatabase}
            orders={globalOrders}
            onLogout={handleLogout}
            onAddProduct={handleAdminAddProduct}
            onUpdateProduct={handleAdminUpdateProduct}
            onDeleteProduct={handleAdminDeleteProduct}
            onUpdateOrderStatus={handleAdminUpdateOrderStatus}
            onAddRecipe={handleAdminAddRecipe}
            onUpdateRecipe={handleAdminUpdateRecipe}
            onDeleteRecipe={handleAdminDeleteRecipe}
          />
      );
  }

  const userOrders = currentUser ? globalOrders.filter(o => o.customerName === currentUser.name) : [];

  const renderCartFlow = () => {
      if (shopView === ShopView.Success) {
          return (
            <OrderStatusScreen 
              onContinueShopping={() => {
                  setShopView(ShopView.Cart);
                  setIsCartOpen(false);
                  setHomeView(HomeView.Dashboard);
                  setActiveTab(Tab.Home);
              }} 
              order={lastOrder}
            />
          );
      }
      const defaultAddress = savedAddresses.find(a => a.isDefault) || savedAddresses[0];
      return (
        <div className="h-full flex flex-col">
          <div className="p-4 flex items-center bg-[#F6F7F9]">
             <button onClick={() => setIsCartOpen(false)} className="p-2 -ml-2 text-app-dark">
                <ArrowRight className="rotate-180" size={24} />
             </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ShoppingBagScreen 
                items={cartItems}
                address={defaultAddress}
                onUpdateQuantity={(id, delta) => {
                    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
                }}
                onRemoveItem={(id) => setCartItems(prev => prev.filter(item => item.id !== id))}
                onConfirm={handlePaymentSuccess}
                onContinueShopping={() => setIsCartOpen(false)}
            />
          </div>
        </div>
      );
  };

  const renderContent = () => {
    if (isCartOpen) return renderCartFlow();
    if (activeTab === Tab.Home) {
      if (homeView === HomeView.Upload) {
        return <UploadScreen onBack={() => setHomeView(HomeView.Dashboard)} onAnalysisComplete={handleAnalysisComplete} />;
      }
      if (homeView === HomeView.Review) {
        return <IngredientReviewScreen items={reviewItems} onUpdateItems={setReviewItems} onBack={() => selectedRecipe ? setHomeView(HomeView.RecipeDetail) : setHomeView(HomeView.Upload)} onAddToCart={handleAddToCart} onProductSelect={handleProductSelect} />;
      }
      if (homeView === HomeView.ProductDetail && selectedProduct) {
        return <ProductDetailScreen product={selectedProduct} initialItem={selectedReviewItem} onBack={() => selectedCategory ? setHomeView(HomeView.CategoryDetail) : (selectedRecipe ? setHomeView(HomeView.RecipeDetail) : setHomeView(HomeView.Review))} onAddToCart={handleSingleItemPurchase} />;
      }
      if (homeView === HomeView.CategoryDetail && selectedCategory) {
          return <CategoryDetailScreen category={selectedCategory} products={productsDatabase} onBack={() => { setHomeView(HomeView.Dashboard); setActiveTab(returnTab); }} onProductSelect={(p) => handleProductSelect(p, undefined)} onAddToCart={(item) => handleAddToCart([item])} />;
      }
      if (homeView === HomeView.RecipeDetail && selectedRecipe) {
          return <RecipeDetailScreen recipe={selectedRecipe} onBack={() => { setHomeView(HomeView.Dashboard); setActiveTab(returnTab); }} getMatchingProducts={getMatchingProducts} onAddRecipeToCart={(items) => { const extendedItems: ExtendedReviewItem[] = items.map(item => ({ ...item, isSelected: true })); setReviewItems(extendedItems); setHomeView(HomeView.Review); }} onToggleFavorite={() => handleToggleFavorite(selectedRecipe.id)} />;
      }
      return (
        <div className="flex flex-col h-full bg-[#FAFAFA] animate-in fade-in duration-300">
          <div className="flex justify-between items-center px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
            <div className="flex items-center gap-2 relative z-50">
               <div className="p-2 bg-white rounded-full shadow-sm">
                 <MapPin size={18} className="text-app-primary" strokeWidth={2.5} />
               </div>
               <div className="relative">
                  <button onClick={() => setIsLocationOpen(!isLocationOpen)} className="flex flex-col items-start text-left focus:outline-none">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-400">Current Location</span>
                        <ChevronDown size={12} className={`text-gray-400 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} />
                      </div>
                      <span className="text-sm font-bold text-app-dark leading-none">{currentLocation}</span>
                  </button>
                  {isLocationOpen && (
                    <div className="absolute top-full left-0 mt-3 w-48 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                      {LOCATIONS.map(loc => (
                        <button key={loc} onClick={() => { setCurrentLocation(loc); setIsLocationOpen(false); }} className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 flex justify-between items-center transition-colors ${currentLocation === loc ? 'text-app-lime bg-app-lime/5' : 'text-app-dark'}`}>
                          {loc}
                          {currentLocation === loc && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  )}
               </div>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-app-dark relative">
              <ShoppingCart size={20} strokeWidth={2} />
              {cartItems.length > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-app-lime rounded-full border-2 border-white" />}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
            <div className="px-6 mt-2 mb-6">
              <h1 className="text-[28px] font-bold text-app-dark leading-tight mb-4">
                Hello, {currentUser ? currentUser.name : 'Guest'} <span className="text-2xl">👋</span><br />
                <span className="text-gray-400 font-medium text-lg">What are you cooking?</span>
              </h1>
              <div className="bg-white p-2 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-3 pr-4">
                  <div className="w-10 h-10 bg-app-lime rounded-xl flex items-center justify-center text-white shrink-0">
                      <Search size={20} />
                  </div>
                  <input type="text" placeholder="Search for recipes, ingredients..." className="flex-1 bg-transparent outline-none text-sm text-app-dark font-medium placeholder-gray-300" />
              </div>
            </div>
            <div className="px-6 mb-8">
              <button onClick={() => requireAuth(() => { setHomeView(HomeView.Upload); setActiveTab(Tab.Home); })} className="w-full h-[80px] rounded-[28px] overflow-hidden relative group shadow-xl shadow-app-lime/20 active:scale-[0.98] transition-all">
                <div className="absolute inset-0 bg-gradient-to-r from-app-lime to-[#8BC34A]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="absolute inset-0 flex items-center justify-between px-6">
                    <div className="text-left">
                        <span className="block text-white/90 text-xs font-medium uppercase tracking-wider mb-1">AI Assistant</span>
                        <span className="block text-white text-xl font-bold">Upload Ingredients</span>
                    </div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                        <Camera size={24} />
                    </div>
                </div>
              </button>
            </div>
            <div className="mb-8">
              <div className="flex justify-between items-center px-6 mb-4">
                <h2 className="text-lg font-bold text-app-dark">Categories</h2>
                <button onClick={() => setActiveTab(Tab.Categories)} className="text-xs font-semibold text-app-primary">See All</button>
              </div>
              <CategoryStrip categories={CATEGORIES} selectedId={selectedCategory?.id || ''} onSelect={handleCategoryClick} />
            </div>
            <div className="px-6 pb-4">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-[#111827]">Recommended</h2>
                <button className="text-xs font-bold text-[#A3D63F]">See All</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {recipesDatabase.map(recipe => (
                   <RecipeCard key={recipe.id} recipe={recipe} onPress={() => handleRecipeSelect(recipe)} onToggleFavorite={() => handleToggleFavorite(recipe.id)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (activeTab === Tab.Orders) {
        return (
            <div className="h-full bg-app-bg pt-12">
                <div className="px-5 mb-6">
                    <h1 className="text-2xl font-bold text-app-dark">My Orders</h1>
                </div>
                <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar">
                     <div className="flex flex-col gap-4">
                        {userOrders.map(order => (
                        <div key={order.id} className="bg-white rounded-[24px] p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="text-xs font-semibold text-app-primary bg-app-primary/10 px-2 py-1 rounded-md">{order.id}</span>
                                    <p className="text-xs text-gray-400 mt-2">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold text-app-dark">${order.total.toFixed(2)}</span>
                                    <div className="flex items-center gap-1 justify-end mt-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : order.status === 'Out for delivery' ? 'bg-blue-500' : 'bg-orange-500'}`} />
                                        <span className="text-xs font-medium text-gray-500">{order.status}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleAddToCart(order.items)} className="w-full py-2 mt-2 text-sm font-medium text-app-primary hover:bg-app-primary/5 rounded-[32px] transition-colors border border-app-primary/20">Order again</button>
                        </div>
                        ))}
                        {userOrders.length === 0 && <p className="text-gray-400 text-center mt-10">No orders yet.</p>}
                     </div>
                </div>
            </div>
        );
    }
    if (activeTab === Tab.Categories) {
        return (
            <div className="h-full bg-app-bg pt-12">
                <div className="px-5 mb-6">
                    <h1 className="text-2xl font-bold text-app-dark">Categories</h1>
                </div>
                <div className="grid grid-cols-2 gap-4 px-5 pb-24 overflow-y-auto no-scrollbar">
                    {CATEGORIES.map(cat => (
                        <div key={cat.id} onClick={() => handleCategoryClick(cat.id)} className="bg-white rounded-[24px] p-3 shadow-sm flex flex-col items-center gap-3 hover:shadow-md transition-shadow cursor-pointer active:scale-95 duration-200">
                            <img src={cat.imageUrl} className="w-full aspect-video object-cover rounded-xl" alt={cat.label} />
                            <span className="font-semibold text-app-dark">{cat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    if (activeTab === Tab.Profile && currentUser) {
      return <ProfileScreen user={currentUser} orders={userOrders} addresses={savedAddresses} cards={savedCards} onOrderAgain={(items) => handleAddToCart(items)} onUpdateAddresses={setSavedAddresses} onUpdateCards={setSavedCards} onUpdateUser={(updated) => setCurrentUser(updated)} onLogout={handleLogout} />;
    }
    return null;
  };

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-app-bg relative shadow-2xl overflow-hidden flex flex-col">
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>
      {!isCartOpen && homeView === HomeView.Dashboard && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="w-full h-full sm:h-auto sm:max-w-md bg-white sm:rounded-[32px] overflow-hidden shadow-2xl">
              <AuthScreen onLogin={handleLogin} onClose={() => setIsAuthModalOpen(false)} />
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
