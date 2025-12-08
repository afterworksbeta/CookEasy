
import React, { useState, useRef, useEffect } from 'react';
import { 
  Package, ShoppingCart, BarChart3, LogOut, Plus, Search, 
  Edit, Trash2, CheckCircle, Truck, Clock, AlertCircle, X,
  ChevronRight, Bike, MapPin, BookOpen, ChefHat, Upload, MoreHorizontal, Filter, ArrowUpRight, DollarSign, Users, ShoppingBag,
  Bold, Italic, List, Table, AlignLeft, Type
} from 'lucide-react';
import { Product, Order, AdminView, User, Recipe } from '../types';

interface AdminDashboardProps {
  user: User;
  products: Product[];
  recipes?: Recipe[];
  orders: Order[];
  onLogout: () => void;
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status'], partner?: string) => void;
  onUpdateRecipe?: (recipe: Recipe) => void;
  onAddRecipe?: (recipe: Recipe) => void;
  onDeleteRecipe?: (id: string) => void;
}

// --- Rich Text Editor Component ---
const RichTextEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && contentRef.current.innerHTML !== value) {
      if (value === '' && contentRef.current.innerHTML === '<br>') return;
      if (contentRef.current.innerHTML === '' || value !== contentRef.current.innerHTML) {
         contentRef.current.innerHTML = value;
      }
    }
  }, []);

  const exec = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (contentRef.current) onChange(contentRef.current.innerHTML);
  };

  const insertTable = () => {
    // Insert a table with inline styles to ensure borders are visible in simple viewers
    const tableHTML = `
      <table style="width: 100%; border-collapse: collapse; margin: 10px 0; border: 1px solid #e5e7eb;">
        <thead>
          <tr style="background-color: #f9fafb;">
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Header 1</th>
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #e5e7eb; padding: 8px;">Cell 1</td>
            <td style="border: 1px solid #e5e7eb; padding: 8px;">Cell 2</td>
          </tr>
        </tbody>
      </table>
      <p><br/></p>
    `;
    exec('insertHTML', tableHTML);
  };

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white flex flex-col h-64">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center shrink-0">
        
        {/* Font Style */}
        <button type="button" onClick={() => exec('bold')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Bold">
          <Bold size={16} strokeWidth={2.5} />
        </button>
        <button type="button" onClick={() => exec('italic')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Italic">
          <Italic size={16} />
        </button>
        
        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Font Size */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded px-1 h-8">
            <Type size={14} className="text-gray-500" />
            <select 
                onChange={(e) => exec('fontSize', e.target.value)} 
                className="bg-transparent text-xs font-medium outline-none h-full w-10 text-center"
                defaultValue="3"
                title="Font Size"
            >
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
            </select>
        </div>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Lists */}
        <button type="button" onClick={() => exec('insertUnorderedList')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Bullet List">
          <List size={16} />
        </button>
        
        {/* Insertions */}
        <button type="button" onClick={insertTable} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Insert Table">
          <Table size={16} />
        </button>
      </div>

      {/* Editable Area */}
      <div 
        ref={contentRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="flex-1 p-4 outline-none text-sm text-[#111827] overflow-y-auto [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_table]:w-full [&_td]:border [&_td]:border-gray-300 [&_td]:p-1 [&_th]:border [&_th]:border-gray-300 [&_th]:p-1"
      />
      <style>{`
         [contenteditable]:empty:before {
            content: "Enter recipe details...";
            color: #9CA3AF;
            pointer-events: none;
            display: block;
         }
      `}</style>
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  user, products, recipes = [], orders, onLogout, 
  onUpdateProduct, onAddProduct, onDeleteProduct, onUpdateOrderStatus,
  onUpdateRecipe, onAddRecipe, onDeleteRecipe
}) => {
  const [activeView, setActiveView] = useState<AdminView>(AdminView.Dashboard);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('All');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productFormData, setProductFormData] = useState<Partial<Product>>({});

  // Recipe Modal State
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [recipeFormData, setRecipeFormData] = useState<Partial<Recipe>>({});

  // --- Statistics ---
  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const lowStockItems = products.filter(p => (p.stockQuantity || 0) < 5).length;

  // --- Image Upload Handler ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isRecipeModalOpen) {
             setRecipeFormData(prev => ({ ...prev, imageUrl: result }));
        } else if (isProductModalOpen) {
             setProductFormData(prev => ({ ...prev, imageUrl: result }));
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = ''; // Reset input
  };

  // --- Product Handlers ---
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductFormData({ ...product });
    setIsProductModalOpen(true);
  };

  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      price: 0,
      stockQuantity: 10,
      category: 'Vegetables',
      brand: 'Coles',
      imageUrl: 'https://source.unsplash.com/random/200x200/?vegetable',
      weight: '1kg',
      nutrition: { protein: '0g', carbs: '0g', fat: '0g' }
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!productFormData.name || !productFormData.price) return;

    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, ...productFormData } as Product);
    } else {
      onAddProduct({
        id: `prod-${Math.random().toString(36).substr(2, 9)}`,
        matchType: 'Exact match',
        weight: '1kg',
        ...productFormData
      } as Product);
    }
    setIsProductModalOpen(false);
  };

  // --- Recipe Handlers ---
  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setRecipeFormData({ ...recipe });
    setIsRecipeModalOpen(true);
  };

  const handleAddNewRecipe = () => {
    setEditingRecipe(null);
    setRecipeFormData({
      title: '',
      description: '',
      cookTime: '30 min',
      ingredientCount: 5,
      imageUrl: 'https://source.unsplash.com/random/400x300/?food',
    });
    setIsRecipeModalOpen(true);
  };

  const handleSaveRecipe = () => {
    if (!recipeFormData.title || !onAddRecipe || !onUpdateRecipe) return;

    if (editingRecipe) {
      onUpdateRecipe({ ...editingRecipe, ...recipeFormData } as Recipe);
    } else {
      onAddRecipe({
        id: `recipe-${Math.random().toString(36).substr(2, 9)}`,
        title: 'New Recipe',
        description: '',
        imageUrl: '',
        cookTime: '15 min',
        ingredientCount: 0,
        ...recipeFormData
      } as Recipe);
    }
    setIsRecipeModalOpen(false);
  };

  // --- Components ---

  const AdminBottomNav = () => (
    <div className="fixed bottom-6 left-4 right-4 bg-[#111827] rounded-[32px] px-6 py-4 h-[72px] flex justify-between items-center z-40 shadow-xl max-w-sm mx-auto">
      <button 
        onClick={() => setActiveView(AdminView.Dashboard)}
        className={`flex flex-col items-center justify-center gap-1 w-12 transition-all ${activeView === AdminView.Dashboard ? 'text-[#A3D63F]' : 'text-gray-400'}`}
      >
        <BarChart3 size={24} strokeWidth={activeView === AdminView.Dashboard ? 2.5 : 1.5} />
      </button>

      <button 
        onClick={() => setActiveView(AdminView.Orders)}
        className={`flex flex-col items-center justify-center gap-1 w-12 transition-all relative ${activeView === AdminView.Orders ? 'text-[#A3D63F]' : 'text-gray-400'}`}
      >
        <div className="relative">
          <ShoppingCart size={24} strokeWidth={activeView === AdminView.Orders ? 2.5 : 1.5} />
          {pendingOrders > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#111827]" />
          )}
        </div>
      </button>

      <button 
        onClick={() => setActiveView(AdminView.Products)}
        className={`flex flex-col items-center justify-center gap-1 w-12 transition-all ${activeView === AdminView.Products ? 'text-[#A3D63F]' : 'text-gray-400'}`}
      >
        <Package size={24} strokeWidth={activeView === AdminView.Products ? 2.5 : 1.5} />
      </button>

      <button 
        onClick={() => setActiveView(AdminView.Recipes)}
        className={`flex flex-col items-center justify-center gap-1 w-12 transition-all ${activeView === AdminView.Recipes ? 'text-[#A3D63F]' : 'text-gray-400'}`}
      >
        <ChefHat size={24} strokeWidth={activeView === AdminView.Recipes ? 2.5 : 1.5} />
      </button>
    </div>
  );

  const MobileHeader = ({ title, showSearch = false, children }: { title: string, showSearch?: boolean, children?: React.ReactNode }) => (
    <div className="bg-[#F6F7F9] px-6 pt-12 pb-4 sticky top-0 z-30">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-[#111827]">{title}</h1>
            <button onClick={onLogout} className="p-2 bg-white rounded-full text-gray-400 shadow-sm hover:text-red-500">
                <LogOut size={20} />
            </button>
        </div>
        {showSearch && (
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={18} />
                </div>
                <input 
                    type="text" 
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white text-[#111827] placeholder-gray-400 rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none shadow-sm focus:ring-2 focus:ring-[#A3D63F]/20"
                />
            </div>
        )}
        {children}
    </div>
  );

  // --- Views ---

  const renderDashboardOverview = () => (
      <div className="flex flex-col pb-32">
          <MobileHeader title="Dashboard" />
          
          <div className="px-5 space-y-6">
             {/* Stats Grid */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111827] p-4 rounded-[24px] text-white shadow-lg shadow-[#111827]/20">
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-2 bg-white/10 rounded-full">
                           <DollarSign size={18} className="text-[#A3D63F]" />
                        </div>
                        <span className="text-xs font-medium text-green-400">+12%</span>
                    </div>
                    <div className="text-2xl font-bold">${totalSales.toFixed(0)}</div>
                    <div className="text-xs text-gray-400">Total Revenue</div>
                </div>

                <div className="bg-white p-4 rounded-[24px] shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-2 bg-orange-50 rounded-full">
                           <Clock size={18} className="text-orange-500" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-[#111827]">{pendingOrders}</div>
                    <div className="text-xs text-gray-500">Pending Orders</div>
                </div>

                <div className="bg-white p-4 rounded-[24px] shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-2 bg-red-50 rounded-full">
                           <AlertCircle size={18} className="text-red-500" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-[#111827]">{lowStockItems}</div>
                    <div className="text-xs text-gray-500">Low Stock</div>
                </div>

                <div className="bg-white p-4 rounded-[24px] shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-2 bg-blue-50 rounded-full">
                           <Users size={18} className="text-blue-500" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-[#111827]">128</div>
                    <div className="text-xs text-gray-500">Total Customers</div>
                </div>
             </div>

             {/* Recent Activity */}
             <div>
                <h3 className="text-lg font-bold text-[#111827] mb-3 px-1">Recent Activity</h3>
                <div className="bg-white rounded-[24px] p-2 shadow-sm">
                    {orders.slice(0, 3).map((order, idx) => (
                        <div key={order.id} className={`flex items-center gap-3 p-3 ${idx !== 2 ? 'border-b border-gray-50' : ''}`}>
                             <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                                <ShoppingBag size={18} className="text-gray-400" />
                             </div>
                             <div className="flex-1 min-w-0">
                                 <div className="flex justify-between">
                                     <span className="font-bold text-sm text-[#111827]">{order.id}</span>
                                     <span className="font-bold text-sm text-[#A3D63F]">${order.total.toFixed(0)}</span>
                                 </div>
                                 <div className="flex justify-between mt-0.5">
                                     <span className="text-xs text-gray-400">{order.customerName}</span>
                                     <span className="text-[10px] text-gray-400">{order.status}</span>
                                 </div>
                             </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
      </div>
  );

  const renderProductsManager = () => {
    const categories = ['All', 'Vegetables', 'Fruits', 'Meat', 'Seafood', 'Bakery', 'Dairy', 'Pantry'];
    
    return (
      <div className="flex flex-col pb-32 relative h-full">
          <MobileHeader title="Inventory" showSearch={true}>
            <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-6 px-6">
              {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedProductCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${
                        selectedProductCategory === cat
                        ? 'bg-[#111827] text-white border-[#111827]' 
                        : 'bg-white text-gray-500 border-gray-200'
                    }`}
                  >
                      {cat}
                  </button>
              ))}
            </div>
          </MobileHeader>
          
          <div className="px-5 space-y-3 pb-8 pt-2">
              {products
                .filter(p => {
                    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesCategory = selectedProductCategory === 'All' || p.category === selectedProductCategory;
                    return matchesSearch && matchesCategory;
                })
                .map(product => (
                  <div key={product.id} className="bg-white rounded-[24px] p-3 shadow-sm flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                      <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                          <img src={product.imageUrl} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div>
                              <div className="flex justify-between items-start">
                                  <h3 className="font-bold text-[#111827] text-sm truncate pr-2">{product.name}</h3>
                                  <span className="font-bold text-[#A3D63F] text-sm">${product.price}</span>
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5">{product.category} • {product.weight}</p>
                          </div>
                          
                          <div className="flex justify-between items-end mt-2">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                                  (product.stockQuantity || 0) < 5 
                                  ? 'bg-red-50 text-red-500' 
                                  : 'bg-green-50 text-green-600'
                              }`}>
                                  {product.stockQuantity || 0} in stock
                              </span>
                              
                              <div className="flex gap-2">
                                  <button 
                                    onClick={() => handleEditProduct(product)}
                                    className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#111827] hover:bg-gray-200"
                                  >
                                      <Edit size={14} />
                                  </button>
                                  <button 
                                    onClick={() => onDeleteProduct(product.id)}
                                    className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100"
                                  >
                                      <Trash2 size={14} />
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
              
              {products.filter(p => {
                    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesCategory = selectedProductCategory === 'All' || p.category === selectedProductCategory;
                    return matchesSearch && matchesCategory;
                }).length === 0 && (
                  <div className="text-center py-10 text-gray-400">
                      No products found.
                  </div>
              )}
          </div>

          <button 
            onClick={handleAddNewProduct}
            className="fixed bottom-28 right-5 w-14 h-14 bg-[#111827] rounded-full shadow-lg shadow-[#111827]/30 flex items-center justify-center text-white z-30 active:scale-90 transition-transform"
          >
              <Plus size={24} />
          </button>
      </div>
    );
  };

  const renderRecipesManager = () => (
    <div className="flex flex-col pb-32 relative h-full">
        <MobileHeader title="Recipes" showSearch={true} />

        <div className="px-5 space-y-4 pb-8">
            {recipes
              .filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(recipe => (
                <div key={recipe.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2">
                    <div className="h-32 w-full relative">
                        <img src={recipe.imageUrl} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 flex gap-2">
                             <button onClick={() => handleEditRecipe(recipe)} className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#111827] shadow-sm">
                                 <Edit size={14} />
                             </button>
                             <button onClick={() => onDeleteRecipe && onDeleteRecipe(recipe.id)} className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-sm">
                                 <Trash2 size={14} />
                             </button>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-[#111827]">{recipe.title}</h3>
                        <div 
                           className="text-xs text-gray-400 mt-1 line-clamp-2 [&_p]:inline [&_ul]:hidden [&_table]:hidden"
                           dangerouslySetInnerHTML={{ __html: recipe.description }}
                        />
                        
                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                <Clock size={14} className="text-[#A3D63F]" />
                                {recipe.cookTime}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                <Package size={14} className="text-orange-500" />
                                {recipe.ingredientCount} ingredients
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <button 
            onClick={handleAddNewRecipe}
            className="fixed bottom-28 right-5 w-14 h-14 bg-[#111827] rounded-full shadow-lg shadow-[#111827]/30 flex items-center justify-center text-white z-30 active:scale-90 transition-transform"
        >
            <Plus size={24} />
        </button>
    </div>
  );

  const renderOrdersManager = () => (
      <div className="flex flex-col pb-32">
          <MobileHeader title="Orders" />
          
          <div className="px-5 mb-4 flex gap-2 overflow-x-auto no-scrollbar">
              {['All', 'Active', 'Completed'].map((filter, i) => (
                  <button 
                    key={filter} 
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${
                        i === 0 
                        ? 'bg-[#111827] text-white border-[#111827]' 
                        : 'bg-white text-gray-500 border-gray-200'
                    }`}
                  >
                      {filter}
                  </button>
              ))}
          </div>

          <div className="px-5 space-y-4">
              {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-[24px] p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                                  {order.customerName?.charAt(0)}
                              </div>
                              <div>
                                  <h3 className="text-sm font-bold text-[#111827]">{order.id}</h3>
                                  <p className="text-xs text-gray-400">{order.customerName}</p>
                              </div>
                          </div>
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-orange-100 text-orange-700'
                          }`}>
                              {order.status}
                          </span>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-3 mb-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Items ({order.items.length})</span>
                              <span>{order.date}</span>
                          </div>
                          <div className="font-mono font-bold text-[#111827] text-lg">
                              ${order.total.toFixed(2)}
                          </div>
                      </div>

                      <div className="flex gap-2">
                          <select 
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                            className="flex-1 bg-[#F6F7F9] text-[#111827] text-xs font-bold py-3 px-3 rounded-xl outline-none"
                          >
                                <option value="Order received">Received</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Ready for Pickup">Ready</option>
                                <option value="Out for delivery">On Way</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                          </select>
                          
                          {order.status === 'Ready for Pickup' && !order.deliveryPartner && (
                             <div className="flex gap-2">
                                <button onClick={() => onUpdateOrderStatus(order.id, 'Out for delivery', 'Uber')} className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                                    <Truck size={16} />
                                </button>
                                <button onClick={() => onUpdateOrderStatus(order.id, 'Out for delivery', 'Grab')} className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center">
                                    <Bike size={16} />
                                </button>
                             </div>
                          )}
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  return (
    <div className="flex h-[100dvh] bg-[#F6F7F9] font-poppins text-sm text-gray-700 overflow-hidden max-w-md mx-auto relative shadow-2xl">
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
                {activeView === AdminView.Dashboard && renderDashboardOverview()}
                {activeView === AdminView.Products && renderProductsManager()}
                {activeView === AdminView.Recipes && renderRecipesManager()}
                {activeView === AdminView.Orders && renderOrdersManager()}
            </div>
        </div>

        <AdminBottomNav />

        {/* Hidden File Input */}
        <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageUpload}
        />

        {/* Product Modal - Mobile Optimized */}
        {isProductModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center backdrop-blur-sm sm:items-center">
                <div className="bg-white w-full h-[90vh] sm:h-auto sm:max-w-md sm:rounded-[32px] rounded-t-[32px] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
                    <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-[#111827]">
                            {editingProduct ? 'Edit Product' : 'New Product'}
                        </h3>
                        <button onClick={() => setIsProductModalOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-400">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto flex-1 space-y-5">
                        {/* Image Upload Area */}
                        <div className="flex justify-center">
                            <div className="w-32 h-32 bg-gray-50 rounded-[24px] overflow-hidden relative group cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#A3D63F]" onClick={() => fileInputRef.current?.click()}>
                                <img 
                                    src={productFormData.imageUrl || 'https://via.placeholder.com/150'} 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Upload size={24} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Name</label>
                                <input 
                                    className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-semibold text-[#111827] focus:ring-2 focus:ring-[#A3D63F]/20"
                                    value={productFormData.name || ''}
                                    onChange={e => setProductFormData({...productFormData, name: e.target.value})}
                                    placeholder="Product Name"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
                                        <input 
                                            type="number"
                                            className="w-full bg-gray-50 border-none rounded-2xl pl-8 pr-4 py-3 text-sm font-semibold text-[#111827]"
                                            value={productFormData.price || ''}
                                            onChange={e => setProductFormData({...productFormData, price: parseFloat(e.target.value)})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Stock</label>
                                    <input 
                                        type="number"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-semibold text-[#111827]"
                                        value={productFormData.stockQuantity || ''}
                                        onChange={e => setProductFormData({...productFormData, stockQuantity: parseInt(e.target.value)})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Category</label>
                                <select 
                                    className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-semibold text-[#111827]"
                                    value={productFormData.category || 'Vegetables'}
                                    onChange={e => setProductFormData({...productFormData, category: e.target.value})}
                                >
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Seafood">Seafood</option>
                                    <option value="Bakery">Bakery</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Pantry">Pantry</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-100 bg-white pb-8">
                         <button 
                            onClick={handleSaveProduct}
                            className="w-full bg-[#111827] text-white font-bold py-4 rounded-[24px] shadow-lg shadow-[#111827]/30 active:scale-95 transition-transform"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Recipe Modal - Mobile Optimized */}
        {isRecipeModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center backdrop-blur-sm sm:items-center">
                <div className="bg-white w-full h-[90vh] sm:h-auto sm:max-w-md sm:rounded-[32px] rounded-t-[32px] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
                     <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-[#111827]">
                            {editingRecipe ? 'Edit Recipe' : 'New Recipe'}
                        </h3>
                        <button onClick={() => setIsRecipeModalOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 space-y-5">
                         <div className="w-full h-40 bg-gray-50 rounded-[24px] overflow-hidden relative group cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#A3D63F]" onClick={() => fileInputRef.current?.click()}>
                            <img 
                                src={recipeFormData.imageUrl || 'https://via.placeholder.com/300x150'} 
                                className="w-full h-full object-cover" 
                                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x150')}
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full">Change Image</span>
                            </div>
                         </div>
                         <input 
                             className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-xs text-gray-500"
                             value={recipeFormData.imageUrl || ''}
                             onChange={e => setRecipeFormData({...recipeFormData, imageUrl: e.target.value})}
                             placeholder="Image URL..."
                         />

                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Title</label>
                            <input 
                                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-semibold text-[#111827]"
                                value={recipeFormData.title || ''}
                                onChange={e => setRecipeFormData({...recipeFormData, title: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Description</label>
                            {/* Rich Text Editor Replacement */}
                            <RichTextEditor 
                                value={recipeFormData.description || ''}
                                onChange={(val) => setRecipeFormData({...recipeFormData, description: val})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Cook Time</label>
                                <input 
                                    className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-semibold text-[#111827]"
                                    value={recipeFormData.cookTime || ''}
                                    onChange={e => setRecipeFormData({...recipeFormData, cookTime: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Ingredients Count</label>
                                <input 
                                    type="number"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-semibold text-[#111827]"
                                    value={recipeFormData.ingredientCount || ''}
                                    onChange={e => setRecipeFormData({...recipeFormData, ingredientCount: parseInt(e.target.value)})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-100 bg-white pb-8">
                         <button 
                            onClick={handleSaveRecipe}
                            className="w-full bg-[#111827] text-white font-bold py-4 rounded-[24px] shadow-lg shadow-[#111827]/30 active:scale-95 transition-transform"
                        >
                            Save Recipe
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default AdminDashboard;
