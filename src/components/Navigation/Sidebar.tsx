import React from 'react';
import { AppView } from '../../types';
import { 
  LayoutDashboard, 
  Zap, 
  FolderKanban, 
  LineChart, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Plus,
  Compass
} from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenNewProjectModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenNewProjectModal
}) => {
  const navLinks = [
    { id: 'dashboard' as AppView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workspace' as AppView, label: 'Workspace', icon: Zap },
    { id: 'projects' as AppView, label: 'Projects', icon: FolderKanban },
    { id: 'analytics' as AppView, label: 'Analytics', icon: LineChart },
    { id: 'settings' as AppView, label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="hidden md:flex flex-col bg-[#1c1f2a] border-r border-[#424754]/50 fixed left-0 top-0 h-full w-64 py-6 z-40 select-none">
      {/* Workspace Header */}
      <div className="px-4 mb-6">
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group"
          title="Back to Landing"
        >
          <div className="w-9 h-9 rounded-lg bg-[#4d8eff] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(77,142,255,0.3)] group-hover:scale-105 transition-transform">
            <span className="font-mono text-xs font-bold text-[#00285d]">NX</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-[#dfe2f1] tracking-tight group-hover:text-[#adc6ff] transition-colors truncate">
              Nexora Workspace
            </h1>
            <p className="text-[11px] text-[#4cd7f6] font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
              Pro Plan
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="px-4 mb-4">
        <button
          onClick={onOpenNewProjectModal}
          className="w-full bg-[#4d8eff] text-[#00285d] hover:bg-[#adc6ff] transition-all font-mono text-xs font-semibold py-2.5 rounded-lg flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(77,142,255,0.2)] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-[#4d8eff] text-[#00285d] font-medium shadow-[0_0_12px_rgba(77,142,255,0.25)]'
                  : 'text-[#c2c6d6] hover:bg-[#313540]/60 hover:text-[#dfe2f1]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#00285d]' : 'text-[#8c909f]'}`} />
              <span className="font-sans">{item.label}</span>
            </button>
          );
        })}

        {/* Quick Link to Landing/Pricing */}
        <div className="pt-3 mt-3 border-t border-[#424754]/40 px-1">
          <p className="text-[10px] uppercase font-mono text-[#8c909f] px-2 mb-1">Public Pages</p>
          <button
            onClick={() => onNavigate('landing')}
            className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs transition-colors ${
              currentView === 'landing' ? 'text-[#4cd7f6] bg-[#313540]' : 'text-[#8c909f] hover:text-[#dfe2f1] hover:bg-[#313540]/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs transition-colors ${
              currentView === 'pricing' ? 'text-[#4cd7f6] bg-[#313540]' : 'text-[#8c909f] hover:text-[#dfe2f1] hover:bg-[#313540]/40'
            }`}
          >
            <span className="font-mono text-xs font-bold">$</span>
            <span>Pricing & Plans</span>
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-auto border-t border-[#424754]/50 pt-3 px-2 space-y-1">
        <button
          onClick={() => onNavigate('settings')}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs text-[#c2c6d6] hover:bg-[#313540]/60 hover:text-[#dfe2f1] rounded-lg transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-[#8c909f]" />
          <span>Documentation & Help</span>
        </button>
        <button
          onClick={() => onNavigate('landing')}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs text-[#c2c6d6] hover:bg-[#313540]/60 hover:text-[#ffb4ab] rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 text-[#8c909f]" />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
};
