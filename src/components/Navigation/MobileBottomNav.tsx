import React from 'react';
import { AppView } from '../../types';
import { 
  LayoutDashboard, 
  Zap, 
  FolderKanban, 
  LineChart, 
  Settings 
} from 'lucide-react';

interface MobileBottomNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate
}) => {
  const items = [
    { id: 'dashboard' as AppView, label: 'Home', icon: LayoutDashboard },
    { id: 'workspace' as AppView, label: 'Work', icon: Zap },
    { id: 'projects' as AppView, label: 'Projects', icon: FolderKanban },
    { id: 'analytics' as AppView, label: 'Stats', icon: LineChart },
    { id: 'settings' as AppView, label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 bg-[#1c1f2a] border-t border-[#424754]/60 shadow-2xl flex justify-around items-center h-16 pb-safe px-2 md:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3.5 transition-all duration-200 active:scale-90 ${
              isActive 
                ? 'bg-[#03b5d3] text-[#00424e] rounded-full font-bold shadow-[0_0_12px_rgba(3,181,211,0.4)]'
                : 'text-[#c2c6d6] hover:text-[#4cd7f6]'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-mono leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
