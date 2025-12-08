
import React from 'react';
import { House, FileText, LayoutGrid, User } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const getIconColor = (tab: Tab) =>
    activeTab === tab ? '#A3D63F' : '#9CA3AF'; // Lime Green vs Gray

  // Using a very thin stroke for the "minimal" look requested
  const getStrokeWidth = (tab: Tab) => activeTab === tab ? 2 : 1.5;

  return (
    <div className="fixed bottom-6 left-4 right-4 bg-white rounded-[32px] px-6 py-4 h-[72px] flex justify-between items-center z-50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] max-w-sm mx-auto">
      <button
        onClick={() => onTabChange(Tab.Home)}
        className="flex flex-col items-center justify-center gap-1 w-12 active:scale-90 transition-transform duration-200"
      >
        <House size={26} color={getIconColor(Tab.Home)} strokeWidth={getStrokeWidth(Tab.Home)} />
        {activeTab === Tab.Home && <div className="w-1 h-1 rounded-full bg-app-primary mt-1" />}
      </button>

      <button
        onClick={() => onTabChange(Tab.Orders)}
        className="flex flex-col items-center justify-center gap-1 w-12 active:scale-90 transition-transform duration-200"
      >
        <FileText size={26} color={getIconColor(Tab.Orders)} strokeWidth={getStrokeWidth(Tab.Orders)} />
        {activeTab === Tab.Orders && <div className="w-1 h-1 rounded-full bg-app-primary mt-1" />}
      </button>

      <button
        onClick={() => onTabChange(Tab.Categories)}
        className="flex flex-col items-center justify-center gap-1 w-12 active:scale-90 transition-transform duration-200"
      >
        <LayoutGrid size={26} color={getIconColor(Tab.Categories)} strokeWidth={getStrokeWidth(Tab.Categories)} />
        {activeTab === Tab.Categories && <div className="w-1 h-1 rounded-full bg-app-primary mt-1" />}
      </button>

      <button
        onClick={() => onTabChange(Tab.Profile)}
        className="flex flex-col items-center justify-center gap-1 w-12 active:scale-90 transition-transform duration-200"
      >
        <User size={26} color={getIconColor(Tab.Profile)} strokeWidth={getStrokeWidth(Tab.Profile)} />
        {activeTab === Tab.Profile && <div className="w-1 h-1 rounded-full bg-app-primary mt-1" />}
      </button>
    </div>
  );
};

export default BottomNav;
