import React, { useState, useEffect } from 'react';
import { ChevronLeft, CreditCard, Calendar, Lock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { Address, PaymentMethod } from '../types';

interface PaymentScreenProps {
  total: number;
  itemCount: number;
  initialAddress?: Address;
  initialPayment?: PaymentMethod;
  onBack: () => void;
  onSuccess: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ 
  total, 
  itemCount, 
  initialAddress,
  initialPayment,
  onBack, 
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    fullName: 'Jacky Wang', // Pre-fill name as well
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: '',
    saveCard: true,
    saveAddress: true
  });

  // Pre-fill form data when props change
  useEffect(() => {
    if (initialAddress) {
      setFormData(prev => ({ ...prev, address: initialAddress.fullAddress }));
    }
    if (initialPayment) {
        // We can't pre-fill the full card number for security simulation, but let's mock it partially or leave blank for user to "confirm"
        // For UX, let's just prefill the address mostly
    }
  }, [initialAddress, initialPayment]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    // Simple mock validation
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Enter a valid 16-digit card number';
    }

    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expiryDate = 'Valid MM/YY required';
    }

    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Invalid CVV';
    }

    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = () => {
    if (validate()) {
      setIsProcessing(true);
      // Simulate API call
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess();
      }, 1500);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    handleChange('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    handleChange('expiryDate', value);
  };

  return (
    <div className="flex flex-col h-full bg-app-bg animate-in fade-in slide-in-from-right-8 duration-300">
      {/* Header */}
      <div className="flex items-center px-4 py-4 pt-10 bg-app-bg sticky top-0 z-20">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <ChevronLeft size={24} className="text-app-dark" />
        </button>
        <div className="flex-1 text-center pr-8">
           <h1 className="text-lg font-semibold text-app-dark">Payment</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-32 no-scrollbar">
        {/* Order Summary Card */}
        <div className="bg-app-dark text-white rounded-[24px] p-5 shadow-lg shadow-app-dark/10 mb-6 flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-white/70 text-sm font-medium">Order Total</span>
            <div className="text-2xl font-bold mt-1">${total.toFixed(2)}</div>
            <div className="text-xs text-white/50 mt-1">{itemCount} items included</div>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center relative z-10">
            <CheckCircle size={24} className="text-app-lime" />
          </div>
          <div className="absolute -right-4 -top-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />
          <div className="absolute -left-4 -bottom-8 w-24 h-24 bg-app-lime/10 rounded-full blur-xl" />
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[24px] p-5 shadow-card space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-app-text mb-1.5">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Jane Doe"
              className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-gray-100 focus:border-app-lime'} outline-none focus:ring-1 focus:ring-opacity-50 transition-all text-app-dark placeholder-gray-400`}
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.fullName}</p>}
          </div>

          {/* Card Details */}
          <div>
            <label className="block text-sm font-medium text-app-text mb-1.5">Card Number</label>
            <div className="relative">
              <input
                type="text"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className={`w-full px-4 py-3 pl-11 rounded-xl bg-gray-50 border ${errors.cardNumber ? 'border-red-400 focus:border-red-500' : 'border-gray-100 focus:border-app-lime'} outline-none focus:ring-1 focus:ring-opacity-50 transition-all text-app-dark placeholder-gray-400`}
              />
              <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {errors.cardNumber && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.cardNumber}</p>}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-app-text mb-1.5">Expiry Date</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`w-full px-4 py-3 pl-11 rounded-xl bg-gray-50 border ${errors.expiryDate ? 'border-red-400 focus:border-red-500' : 'border-gray-100 focus:border-app-lime'} outline-none focus:ring-1 focus:ring-opacity-50 transition-all text-app-dark placeholder-gray-400`}
                />
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.expiryDate && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.expiryDate}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-app-text mb-1.5">CVV</label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.cvv}
                  onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  maxLength={4}
                  className={`w-full px-4 py-3 pl-11 rounded-xl bg-gray-50 border ${errors.cvv ? 'border-red-400 focus:border-red-500' : 'border-gray-100 focus:border-app-lime'} outline-none focus:ring-1 focus:ring-opacity-50 transition-all text-app-dark placeholder-gray-400`}
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
               {errors.cvv && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.cvv}</p>}
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-app-text">Delivery Address</label>
                {initialAddress && (
                    <span className="text-[10px] text-app-lime bg-app-lime/10 px-1.5 rounded">Used Default</span>
                )}
            </div>
            <div className="relative">
              <textarea
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Street address, Apt, City, Zip"
                rows={3}
                className={`w-full px-4 py-3 pl-11 rounded-xl bg-gray-50 border ${errors.address ? 'border-red-400 focus:border-red-500' : 'border-gray-100 focus:border-app-lime'} outline-none focus:ring-1 focus:ring-opacity-50 transition-all text-app-dark placeholder-gray-400 resize-none`}
              />
              <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
            </div>
             {errors.address && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.address}</p>}
          </div>

          {/* Toggles */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-app-text">Save this card for next time</label>
              <button 
                onClick={() => handleChange('saveCard', !formData.saveCard)}
                className={`w-11 h-6 rounded-full transition-colors relative ${formData.saveCard ? 'bg-app-lime' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform ${formData.saveCard ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-app-text">Save this address</label>
              <button 
                onClick={() => handleChange('saveAddress', !formData.saveAddress)}
                className={`w-11 h-6 rounded-full transition-colors relative ${formData.saveAddress ? 'bg-app-lime' : 'bg-gray-200'}`}
              >
                 <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform ${formData.saveAddress ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-app-divider p-5 pb-8 z-30 max-w-md mx-auto">
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className={`w-full bg-app-lime text-white font-bold text-base h-[56px] rounded-[32px] shadow-lg shadow-app-lime/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 ${isProcessing ? 'opacity-80 cursor-wait' : 'hover:brightness-105'}`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Pay now
              <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-semibold ml-1">
                ${total.toFixed(2)}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;