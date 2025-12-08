import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ChefHat, Eye, EyeOff, X } from 'lucide-react';
import { UserRole } from '../types';

interface AuthScreenProps {
  onLogin: (email: string, role: UserRole) => void;
  onClose?: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      
      if (email === 'admin@cookeasy.com' && password === 'admin') {
        onLogin('Admin User', 'admin');
      } else if (email === 'user@cookeasy.com' && password === 'user') {
        onLogin('Tester User', 'user');
      } else {
        // For demo, allow registration to just log in as user
        if (!isLogin) {
             onLogin(email.split('@')[0], 'user');
        } else {
             setError('Invalid email or password. Try admin@cookeasy.com / admin');
        }
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Close Button for Modal Mode */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
        >
          <X size={20} />
        </button>
      )}

      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#A3D63F]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-10%] w-[250px] h-[250px] bg-orange-100 rounded-full blur-3xl" />

      <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-[#A3D63F] rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#A3D63F]/30 rotate-3">
            <ChefHat size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#111827] mb-2">CookEasy</h1>
          <p className="text-gray-500">Your smart kitchen companion</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-1 rounded-2xl border border-gray-100 shadow-sm mb-8 flex">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${isLogin ? 'bg-[#111827] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${!isLogin ? 'bg-[#111827] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#A3D63F]/50 focus:border-[#A3D63F] outline-none transition-all"
                />
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 ml-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#A3D63F]/50 focus:border-[#A3D63F] outline-none transition-all"
              />
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#A3D63F]/50 focus:border-[#A3D63F] outline-none transition-all"
              />
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-500 text-xs font-medium rounded-xl text-center">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#A3D63F] text-white font-bold text-base py-4 rounded-[24px] shadow-lg shadow-[#A3D63F]/30 active:scale-[0.98] transition-all hover:brightness-105 flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={20} />
                </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-2">
            <p className="text-xs text-gray-400">Demo Credentials:</p>
            <div className="flex justify-center gap-2 text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono">admin@cookeasy.com / admin</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono">user@cookeasy.com / user</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;