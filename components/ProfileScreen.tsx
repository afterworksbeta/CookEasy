
import React, { useState, useRef } from 'react';
import { 
  User as UserIcon, MapPin, CreditCard, HelpCircle, LogOut, 
  ChevronRight, ChevronLeft, Package, Edit2, Trash2, CheckCircle, Plus, Camera, Check, X
} from 'lucide-react';
import { User, Order, Address, PaymentMethod, ProfileView, ReviewItem } from '../types';

interface ProfileScreenProps {
  user: User;
  orders: Order[];
  addresses: Address[];
  cards: PaymentMethod[];
  onOrderAgain: (items: ReviewItem[]) => void;
  onUpdateAddresses: (addresses: Address[]) => void;
  onUpdateCards: (cards: PaymentMethod[]) => void;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  user, orders, addresses, cards, 
  onOrderAgain, onUpdateAddresses, onUpdateCards, onUpdateUser, onLogout
}) => {
  const [view, setView] = useState<ProfileView>(ProfileView.Menu);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSetDefaultAddress = (id: string) => {
    const updated = addresses.map(addr => ({ ...addr, isDefault: addr.id === id }));
    onUpdateAddresses(updated);
  };
  const handleDeleteAddress = (id: string) => {
    if (confirm('Delete this address?')) {
      onUpdateAddresses(addresses.filter(a => a.id !== id));
    }
  };
  const handleSetDefaultCard = (id: string) => {
    const updated = cards.map(card => ({ ...card, isDefault: card.id === id }));
    onUpdateCards(updated);
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { onUpdateUser({ ...user, avatarUrl: reader.result as string }); };
      reader.readAsDataURL(file);
    }
  };
  const handleNameSave = () => {
    if (newName.trim()) {
      onUpdateUser({ ...user, name: newName });
      setIsEditingName(false);
    }
  };

  const renderHeader = (title: string) => (
    <div className="flex items-center px-4 py-4 pt-10 bg-app-bg sticky top-0 z-20 border-b border-app-divider/50">
      <button onClick={() => setView(ProfileView.Menu)} className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors">
        <ChevronLeft size={24} className="text-app-dark" />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold text-app-dark pr-8">{title}</h1>
    </div>
  );

  if (view === ProfileView.Orders) {
    return (
      <div className="flex flex-col h-full bg-app-bg animate-in slide-in-from-right-8 duration-300">
        {renderHeader('Order History')}
        <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar pt-4">
          <div className="flex flex-col gap-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-[24px] p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-semibold text-app-primary bg-app-primary/10 px-2 py-1 rounded-md">{order.id}</span>
                    <p className="text-xs text-gray-400 mt-2">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-app-dark">${order.total.toFixed(2)}</span>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <span className="text-xs font-medium text-gray-500">{order.status}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                   <span className="text-xs text-gray-400">{order.items?.length || 0} items</span>
                   <button onClick={() => onOrderAgain(order.items)} className="text-sm font-medium text-app-primary hover:text-app-dark transition-colors">Order again</button>
                </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-center text-gray-400 mt-10">No past orders found.</p>}
          </div>
        </div>
      </div>
    );
  }

  if (view === ProfileView.Addresses) {
    return (
      <div className="flex flex-col h-full bg-app-bg animate-in slide-in-from-right-8 duration-300">
        {renderHeader('Saved Addresses')}
        <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar pt-4">
          <div className="flex flex-col gap-3">
             {addresses.map(addr => (
               <div key={addr.id} className={`bg-white rounded-[24px] p-4 shadow-sm border-2 ${addr.isDefault ? 'border-app-primary/50' : 'border-transparent'}`}>
                 <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-2">
                     <MapPin size={18} className="text-app-dark" />
                     <span className="font-semibold text-app-dark">{addr.label}</span>
                     {addr.isDefault && <span className="text-[10px] bg-app-primary text-app-dark px-1.5 py-0.5 rounded font-medium">Default</span>}
                   </div>
                   <div className="flex gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-app-dark bg-gray-50 rounded-lg"><Edit2 size={14} /></button>
                      <button onClick={() => handleDeleteAddress(addr.id)} className="p-1.5 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg"><Trash2 size={14} /></button>
                   </div>
                 </div>
                 <p className="text-sm text-gray-500 leading-relaxed mb-3">{addr.fullAddress}</p>
                 {!addr.isDefault && <button onClick={() => handleSetDefaultAddress(addr.id)} className="text-xs font-medium text-app-primary hover:underline">Set as default</button>}
               </div>
             ))}
             <button className="w-full py-4 border border-dashed border-gray-300 rounded-[24px] text-gray-400 font-medium flex items-center justify-center gap-2 hover:border-app-primary hover:text-app-primary hover:bg-white transition-all"><Plus size={18} /> Add new address</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === ProfileView.Payments) {
    return (
      <div className="flex flex-col h-full bg-app-bg animate-in slide-in-from-right-8 duration-300">
        {renderHeader('Payment Methods')}
        <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar pt-4">
          <div className="flex flex-col gap-3">
             {cards.map(card => (
               <div key={card.id} className="bg-white rounded-[24px] p-4 shadow-sm flex items-center gap-4">
                 <div className="w-12 h-8 bg-app-dark/5 rounded flex items-center justify-center"><CreditCard size={18} className="text-app-dark" /></div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-app-dark text-sm">{card.type} ending in {card.last4}</span>
                      {card.isDefault && <CheckCircle size={14} className="text-app-primary" />}
                    </div>
                    <span className="text-xs text-gray-400">Expires {card.expiry}</span>
                 </div>
                 {!card.isDefault ? (
                   <button onClick={() => handleSetDefaultCard(card.id)} className="p-2 text-gray-300 hover:text-app-primary"><div className="w-4 h-4 rounded-full border border-current" /></button>
                 ) : (
                    <button className="p-2 text-app-primary"><div className="w-4 h-4 rounded-full bg-app-primary border border-app-primary" /></button>
                 )}
               </div>
             ))}
             <button className="w-full py-4 border border-dashed border-gray-300 rounded-[24px] text-gray-400 font-medium flex items-center justify-center gap-2 hover:border-app-primary hover:text-app-primary hover:bg-white transition-all"><Plus size={18} /> Add new card</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === ProfileView.Help) {
     return (
        <div className="flex flex-col h-full bg-app-bg animate-in slide-in-from-right-8 duration-300">
            {renderHeader('Help & Support')}
            <div className="p-6">
                <div className="bg-white rounded-[24px] p-6 shadow-sm text-center">
                    <HelpCircle size={48} className="mx-auto text-app-primary mb-4" />
                    <h3 className="text-lg font-semibold text-app-dark mb-2">How can we help?</h3>
                    <p className="text-sm text-gray-500 mb-6">If you have any issues with your order or the app, please contact our support team.</p>
                    <button className="w-full bg-app-bg text-app-dark font-medium py-3 rounded-[24px] mb-3">Email Support</button>
                    <button className="w-full bg-white border border-gray-200 text-gray-400 font-medium py-3 rounded-[24px] cursor-not-allowed">Live Chat (Coming Soon)</button>
                </div>
            </div>
        </div>
     );
  }

  return (
    <div className="flex flex-col h-full bg-app-bg animate-in fade-in duration-300">
      <div className="px-6 pt-16 pb-8 flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full p-0.5 border-2 border-app-primary overflow-hidden shadow-sm">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 bg-app-lime text-white rounded-full flex items-center justify-center shadow-md border-2 border-white hover:scale-110 transition-transform z-10"
          >
            <Camera size={14} strokeWidth={2.5} />
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
        </div>

        {isEditingName ? (
          <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 px-3 py-1.5 shadow-sm">
            <input autoFocus type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="text-xl font-bold text-app-dark outline-none bg-transparent w-32 text-center" />
            <button onClick={handleNameSave} className="text-app-lime"><Check size={20} strokeWidth={3} /></button>
            <button onClick={() => { setIsEditingName(false); setNewName(user.name); }} className="text-gray-400"><X size={20} /></button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-app-dark">{user.name}</h2>
            <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-app-lime transition-colors"><Edit2 size={16} /></button>
          </div>
        )}
        <p className="text-sm font-medium text-gray-400 mt-1">{user.email}</p>
      </div>

      <div className="flex-1 px-5 pb-24">
        <div className="bg-white rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-1">
            {[
                { label: 'Order history', icon: Package, view: ProfileView.Orders },
                { label: 'Saved addresses', icon: MapPin, view: ProfileView.Addresses },
                { label: 'Saved payment methods', icon: CreditCard, view: ProfileView.Payments },
                { label: 'Help & support', icon: HelpCircle, view: ProfileView.Help },
            ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setView(item.view)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-[24px] transition-colors group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-app-bg flex items-center justify-center text-app-dark group-hover:bg-app-primary group-hover:text-white transition-colors">
                            <item.icon size={20} />
                        </div>
                        <span className="font-semibold text-app-dark">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-app-primary" />
                </button>
            ))}
            <div className="h-px bg-gray-50 my-1 mx-5" />
            <button onClick={onLogout} className="w-full flex items-center justify-between p-5 hover:bg-red-50 rounded-[24px] transition-colors group">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-red-100 group-hover:text-red-500 transition-colors"><LogOut size={20} /></div>
                    <span className="font-semibold text-gray-400 group-hover:text-red-500">Log out</span>
                </div>
            </button>
        </div>
        <div className="text-center mt-12 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Version 1.0.0 • CookEasy Inc.</div>
      </div>
    </div>
  );
};

export default ProfileScreen;
