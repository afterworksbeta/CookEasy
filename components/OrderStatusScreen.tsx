import React, { useEffect, useState } from 'react';
import { Check, ShoppingBag, ArrowRight, Clock, MapPin, ChevronDown, ChevronUp, Package, Truck, Home, Receipt } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReviewItem } from '../types';

interface OrderStatusScreenProps {
  onContinueShopping: () => void;
  order: { items: ReviewItem[], total: number } | null;
}

const steps = [
  { label: 'Order received', icon: Receipt },
  { label: 'Preparing ingredients', icon: Package },
  { label: 'Out for delivery', icon: Truck },
  { label: 'Delivered', icon: Home },
];

const OrderStatusScreen: React.FC<OrderStatusScreenProps> = ({ onContinueShopping, order }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [orderId] = useState(`CE-${Math.floor(Math.random() * 1000000)}`);
  
  useEffect(() => {
    // Fire confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A3D63F', '#2C543C', '#F3FFE8']
    });

    // Simulate progress
    const timer1 = setTimeout(() => setCurrentStep(1), 2000); // Preparing
    const timer2 = setTimeout(() => setCurrentStep(2), 5000); // Out for delivery
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const total = order?.total || 42.50;
  const items = order?.items || [];

  return (
    <div className="flex flex-col h-full bg-app-bg animate-in fade-in duration-500 relative">
      
      {/* Header */}
      <div className="px-6 pt-10 pb-4">
        <h1 className="text-2xl font-semibold text-app-dark text-center">Order status</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar">
        
        {/* Top Info Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-card mb-6">
          <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Order ID</span>
              <div className="text-lg font-bold text-app-dark mt-0.5">{orderId}</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Total</span>
              <div className="text-lg font-bold text-app-lime mt-0.5">${total.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-app-bg/50 p-3 rounded-xl">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-app-lime shrink-0">
               <Clock size={20} />
             </div>
             <div>
               <div className="text-xs text-gray-500 font-medium">Est. Delivery</div>
               <div className="text-sm font-semibold text-app-dark">35–45 minutes</div>
             </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-[24px] p-6 shadow-card mb-6 relative overflow-hidden">
          <h3 className="text-sm font-semibold text-app-dark mb-6">Tracking</h3>
          
          <div className="relative pl-2">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-2 bottom-6 w-0.5 bg-gray-100 -z-0" />
            
            {/* Progress Line (colored) */}
            <div 
              className="absolute left-[15px] top-2 w-0.5 bg-app-lime transition-all duration-1000 ease-in-out -z-0" 
              style={{ height: `${(currentStep / (steps.length - 1)) * 80}%` }}
            />

            <div className="flex flex-col gap-8">
              {steps.map((step, index) => {
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;
                const Icon = step.icon;
                
                return (
                  <div key={index} className="flex items-center gap-4 relative z-10">
                    <div 
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border-2
                        ${isActive 
                          ? 'bg-app-lime border-app-lime text-white shadow-md shadow-app-lime/20' 
                          : 'bg-white border-gray-200 text-gray-300'
                        }
                      `}
                    >
                      {isActive ? <Check size={14} strokeWidth={3} /> : <div className="w-2 h-2 rounded-full bg-gray-200" />}
                    </div>
                    
                    <div className={`${isActive ? 'opacity-100' : 'opacity-40'} transition-opacity duration-500`}>
                      <div className="text-sm font-semibold text-app-dark">{step.label}</div>
                      {isCurrent && (
                        <span className="text-[10px] font-medium text-app-lime animate-pulse">
                          In progress...
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => setShowDetails(true)}
            className="w-full bg-white text-app-dark font-medium py-3.5 rounded-[32px] border border-gray-200 hover:border-app-lime hover:text-app-lime transition-colors shadow-sm text-sm flex items-center justify-center gap-2"
          >
            <Receipt size={16} />
            View order details
          </button>
          
          <button
            onClick={onContinueShopping}
            className="w-full bg-app-lime text-white font-semibold py-4 rounded-[32px] shadow-xl shadow-app-lime/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:brightness-105"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>

      </div>

      {/* Order Details Modal / Bottom Sheet */}
      {showDetails && (
        <>
          <div 
            className="absolute inset-0 bg-black/40 z-40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowDetails(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 z-50 animate-in slide-in-from-bottom duration-300 max-h-[80%] overflow-y-auto shadow-2xl">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-semibold text-app-dark">Order details</h2>
               <button onClick={() => setShowDetails(false)} className="p-2 bg-gray-50 rounded-full text-gray-500">
                 <ChevronDown size={20} />
               </button>
            </div>

            <div className="space-y-6">
               {/* Address Section */}
               <div>
                 <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Delivery to</h4>
                 <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-[24px]">
                    <MapPin size={20} className="text-app-dark mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-app-dark">Home</div>
                      <div className="text-sm text-gray-500 leading-snug">123 Green Street, Apt 4B<br/>New York, NY 10001</div>
                    </div>
                 </div>
               </div>

               {/* Items List */}
               <div>
                 <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Items ({items.length})</h4>
                 <div className="space-y-3">
                   {items.length > 0 ? items.map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                             x{item.quantity}
                          </div>
                          <span className="text-sm text-app-dark font-medium">{item.product.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                     </div>
                   )) : (
                     <p className="text-sm text-gray-400 italic">No items available for display.</p>
                   )}
                 </div>
               </div>

               {/* Total Section */}
               <div className="pt-4 border-t border-dashed border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Subtotal</span>
                    <span className="text-sm font-medium text-app-dark">
                      ${(items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">Delivery fee</span>
                    <span className="text-sm font-medium text-app-dark">
                      {total > 50 ? 'Free' : '$3.99'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-bold text-app-dark">Total Paid</span>
                    <span className="text-xl font-bold text-app-lime">${total.toFixed(2)}</span>
                  </div>
               </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default OrderStatusScreen;