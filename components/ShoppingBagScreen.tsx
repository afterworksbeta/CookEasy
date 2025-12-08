import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, MapPin, CreditCard, Banknote, QrCode, Lock, CheckCircle, Circle } from 'lucide-react';
import { ReviewItem, Address } from '../types';

interface ShoppingBagScreenProps {
  items: ReviewItem[];
  address?: Address;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onConfirm: () => void;
  onContinueShopping: () => void;
}

type PaymentMethodType = 'card' | 'promptpay' | 'cod';

const ShoppingBagScreen: React.FC<ShoppingBagScreenProps> = ({
  items,
  address,
  onUpdateQuantity,
  onRemoveItem,
  onConfirm,
  onContinueShopping
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = items.length === 0 ? 0 : (subtotal > 50 ? 0 : 3.99);
  const total = subtotal + deliveryFee;

  const validItems = items.filter(item => item.quantity > 0);

  const handleConfirmOrder = () => {
    if (!paymentMethod) return;
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
        setIsProcessing(false);
        onConfirm();
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#F6F7F9] animate-in fade-in duration-300">
        <div className="px-6 pt-10 pb-4">
            <h1 className="text-xl font-semibold text-[#111827]">Order Summary</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center -mt-20">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <ShoppingBag size={32} className="text-gray-300" />
            </div>
            <h3 className="text-[#111827] font-semibold text-lg mb-2">Your cart is empty</h3>
            <p className="text-[#6B7280] text-sm mb-8 leading-relaxed">
                Looks like you haven't added any ingredients yet. 
                Upload a recipe to get started!
            </p>
            <button 
                onClick={onContinueShopping}
                className="w-full max-w-[200px] bg-app-lime text-white font-semibold py-3.5 rounded-[32px] shadow-lg shadow-app-lime/20 hover:shadow-app-lime/40 transition-all active:scale-[0.98] hover:brightness-105"
            >
                Start exploring
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F6F7F9] animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="px-6 pt-10 pb-4 bg-[#F6F7F9] shrink-0 z-10 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#111827]">Order Summary</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-[200px] no-scrollbar">
        <div className="flex flex-col gap-5">
            
            {/* Shipping Address Section */}
            <div>
                <h2 className="text-sm font-semibold text-[#6B7280] mb-3 ml-1">Shipping Address</h2>
                <div className="bg-white rounded-[24px] p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#A3D63F]/10 flex items-center justify-center shrink-0">
                            <MapPin size={20} className="text-[#A3D63F]" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-[#111827]">
                                {address?.label || 'Home'}
                            </div>
                            <div className="text-xs text-[#6B7280] mt-0.5 line-clamp-1">
                                {address?.fullAddress || 'Select an address'}
                            </div>
                        </div>
                    </div>
                    <button className="text-xs font-semibold text-[#A3D63F] px-2 py-1 hover:bg-[#A3D63F]/5 rounded-lg transition-colors">
                        Change
                    </button>
                </div>
            </div>

            {/* Your Items Section */}
            <div>
                <h2 className="text-sm font-semibold text-[#6B7280] mb-3 ml-1">Your Items</h2>
                <div className="bg-white rounded-[24px] p-2 shadow-sm">
                    {validItems.map((item, index) => (
                        <div key={item.id} className={`flex items-center gap-3 p-2 ${index !== validItems.length - 1 ? 'border-b border-gray-50' : ''}`}>
                             {/* Image */}
                            <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                                <img 
                                    src={item.product.imageUrl} 
                                    alt={item.product.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-[#111827] truncate">
                                    {item.product.name}
                                </h3>
                                <div className="text-xs text-[#6B7280] mt-0.5">
                                    ${item.product.price.toFixed(2)}
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-3">
                                {/* Qty Stepper */}
                                <div className="flex items-center bg-[#F6F7F9] rounded-lg p-1 gap-2 h-7">
                                    <button 
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                        className="w-5 h-full flex items-center justify-center text-[#111827] hover:bg-white rounded-md transition-colors disabled:opacity-30"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={10} strokeWidth={2.5} />
                                    </button>
                                    <span className="text-xs font-semibold w-2 text-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                        className="w-5 h-full flex items-center justify-center text-[#111827] hover:bg-white rounded-md transition-colors"
                                    >
                                        <Plus size={10} strokeWidth={2.5} />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => onRemoveItem(item.id)}
                                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Method Section */}
            <div>
                <h2 className="text-sm font-semibold text-[#6B7280] mb-3 ml-1">Select Payment Method</h2>
                <div className="flex flex-col gap-3">
                    {/* Option 1: Card */}
                    <button 
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full bg-white rounded-[24px] p-4 shadow-sm flex items-center justify-between border-2 transition-all ${paymentMethod === 'card' ? 'border-app-lime' : 'border-transparent'}`}
                    >
                        <div className="flex items-center gap-3">
                            {paymentMethod === 'card' ? (
                                <CheckCircle size={22} className="text-app-lime fill-app-lime/10" />
                            ) : (
                                <Circle size={22} className="text-gray-300" />
                            )}
                            <div className="flex flex-col items-start">
                                <span className={`text-sm font-bold ${paymentMethod === 'card' ? 'text-app-lime' : 'text-[#111827]'}`}>Credit/Debit Card</span>
                                <span className="text-xs text-[#6B7280]">Visa ending in 4242</span>
                            </div>
                        </div>
                        <CreditCard size={24} className={paymentMethod === 'card' ? 'text-app-lime' : 'text-gray-400'} />
                    </button>

                    {/* Option 2: PromptPay */}
                    <button 
                        onClick={() => setPaymentMethod('promptpay')}
                        className={`w-full bg-white rounded-[24px] p-4 shadow-sm flex items-center justify-between border-2 transition-all ${paymentMethod === 'promptpay' ? 'border-app-lime' : 'border-transparent'}`}
                    >
                        <div className="flex items-center gap-3">
                             {paymentMethod === 'promptpay' ? (
                                <CheckCircle size={22} className="text-app-lime fill-app-lime/10" />
                            ) : (
                                <Circle size={22} className="text-gray-300" />
                            )}
                            <span className={`text-sm font-bold ${paymentMethod === 'promptpay' ? 'text-app-lime' : 'text-[#111827]'}`}>PromptPay</span>
                        </div>
                        <QrCode size={24} className={paymentMethod === 'promptpay' ? 'text-app-lime' : 'text-gray-400'} />
                    </button>

                    {/* Option 3: COD */}
                    <button 
                        onClick={() => setPaymentMethod('cod')}
                        className={`w-full bg-white rounded-[24px] p-4 shadow-sm flex items-center justify-between border-2 transition-all ${paymentMethod === 'cod' ? 'border-app-lime' : 'border-transparent'}`}
                    >
                        <div className="flex items-center gap-3">
                             {paymentMethod === 'cod' ? (
                                <CheckCircle size={22} className="text-app-lime fill-app-lime/10" />
                            ) : (
                                <Circle size={22} className="text-gray-300" />
                            )}
                            <span className={`text-sm font-bold ${paymentMethod === 'cod' ? 'text-app-lime' : 'text-[#111827]'}`}>Cash on Delivery</span>
                        </div>
                        <Banknote size={24} className={paymentMethod === 'cod' ? 'text-app-lime' : 'text-gray-400'} />
                    </button>
                </div>
                
                <div className="flex items-center justify-center gap-1.5 mt-4 opacity-60">
                    <Lock size={12} className="text-[#6B7280]" />
                    <span className="text-xs text-[#6B7280] font-medium">Secure Payment</span>
                </div>
            </div>

        </div>
      </div>

      {/* Footer: Price Summary & Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-5 pb-8 z-30 max-w-md mx-auto shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
          <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Subtotal</span>
                  <span className="font-medium text-[#111827]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Shipping Fee</span>
                  <span className="font-medium text-[#111827]">
                      {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
              </div>
              <div className="flex justify-between text-base pt-2 border-t border-dashed border-gray-200">
                  <span className="font-bold text-[#111827]">Total Amount</span>
                  <span className="font-bold text-app-lime text-lg">${total.toFixed(2)}</span>
              </div>
          </div>
          
          <button 
            onClick={handleConfirmOrder}
            disabled={!paymentMethod || isProcessing}
            className="w-full bg-app-lime text-white font-bold text-base h-[56px] rounded-[32px] shadow-lg shadow-app-lime/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-105"
          >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Order'
              )}
          </button>
      </div>
    </div>
  );
};

export default ShoppingBagScreen;