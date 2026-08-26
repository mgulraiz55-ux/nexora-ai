import React, { useState } from 'react';
import { AppView } from '../../types';
import { 
  Menu, 
  Bell, 
  Search, 
  Plus, 
  CheckCircle2, 
  Sparkles,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TopNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenMobileMenu: () => void;
  onOpenNewProjectModal?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  title?: string;
  subtitle?: string;
  isDashboardOrApp?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentView,
  onNavigate,
  onOpenMobileMenu,
  onOpenNewProjectModal,
  searchQuery = '',
  onSearchChange,
  title,
  subtitle,
  isDashboardOrApp = false
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 'n1', title: 'Data pipeline synced', desc: '12 new records indexed into context', time: '5m ago', unread: true },
    { id: 'n2', title: 'Task assignment', desc: 'Sarah J. assigned you "Implement WebGL Shaders"', time: '1h ago', unread: true },
    { id: 'n3', title: 'Model update', desc: 'NEXORA OS v2.0 update applied successfully', time: '1d ago', unread: false }
  ]);

  // If we are on marketing / landing / pricing
  if (!isDashboardOrApp) {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0f131d]/90 backdrop-blur-md border-b border-[#424754]/40 transition-all">
        <div className="max-w-[1440px] mx-auto h-16 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('landing')}
              className="font-bold text-xl md:text-2xl text-[#dfe2f1] tracking-tight flex items-center gap-2.5 focus:outline-none group"
            >
              <span className="w-8 h-8 rounded-lg bg-[#4d8eff] text-[#00285d] flex items-center justify-center font-mono font-bold text-sm shadow-[0_0_12px_rgba(77,142,255,0.4)] group-hover:scale-105 transition-transform">
                NX
              </span>
              <span className="font-bold tracking-tight">NEXORA <span className="text-[#4cd7f6]">AI</span></span>
            </button>

            <nav className="hidden md:flex items-center gap-7">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`text-sm transition-colors duration-200 ${
                  currentView === 'dashboard' ? 'text-[#adc6ff] font-semibold' : 'text-[#c2c6d6] hover:text-[#adc6ff]'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('workspace')}
                className={`text-sm transition-colors duration-200 ${
                  currentView === 'workspace' ? 'text-[#adc6ff] font-semibold' : 'text-[#c2c6d6] hover:text-[#adc6ff]'
                }`}
              >
                Workspace
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className={`text-sm transition-colors duration-200 ${
                  currentView === 'projects' ? 'text-[#adc6ff] font-semibold' : 'text-[#c2c6d6] hover:text-[#adc6ff]'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => onNavigate('pricing')}
                className={`text-sm transition-colors duration-200 ${
                  currentView === 'pricing' ? 'text-[#adc6ff] font-semibold border-b-2 border-[#adc6ff] pb-0.5' : 'text-[#c2c6d6] hover:text-[#adc6ff]'
                }`}
              >
                Pricing
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="hidden md:inline-flex text-sm text-[#c2c6d6] hover:text-[#dfe2f1] px-3.5 py-1.5 rounded transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-[#4d8eff] text-[#00285d] font-medium text-sm px-4 py-2 rounded-lg hover:bg-[#adc6ff] transition-all duration-200 shadow-[0_0_15px_rgba(77,142,255,0.25)] active:scale-95 flex items-center gap-1.5"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 text-[#c2c6d6] hover:text-[#dfe2f1] hover:bg-[#1c1f2a] rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // If in application workspace / dashboard / projects
  return (
    <header className="h-16 border-b border-[#424754]/50 bg-[#0f131d]/90 glass-overlay sticky top-0 z-30 shrink-0 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-1.5 text-[#c2c6d6] hover:text-[#dfe2f1] hover:bg-[#1c1f2a] rounded-lg transition-colors shrink-0"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {title ? (
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-[#dfe2f1] tracking-tight truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-[#c2c6d6] hidden sm:block truncate">{subtitle}</p>
            )}
          </div>
        ) : (
          <div className="relative hidden sm:block w-64 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c909f]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search workspace, projects, tasks..."
              className="w-full bg-[#0a0e18] border border-[#424754]/60 rounded-lg pl-9 pr-3 py-1.5 text-xs md:text-sm text-[#dfe2f1] placeholder:text-[#8c909f]/60 focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/30 transition-all font-sans"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5 md:gap-3">
        {onOpenNewProjectModal && (
          <button
            onClick={onOpenNewProjectModal}
            className="hidden sm:flex items-center gap-1.5 bg-[#4d8eff] text-[#00285d] font-mono text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[#adc6ff] transition-all shadow-[0_0_12px_rgba(77,142,255,0.2)] active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-[#c2c6d6] hover:text-[#dfe2f1] hover:bg-[#1c1f2a] rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4cd7f6] rounded-full animate-pulse shadow-[0_0_8px_#4cd7f6]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#1c1f2a] border border-[#424754] rounded-xl shadow-2xl z-50 overflow-hidden text-left">
              <div className="p-3 border-b border-[#424754] flex items-center justify-between">
                <span className="font-semibold text-xs text-[#dfe2f1] uppercase tracking-wider font-mono">Notifications</span>
                <span className="text-[10px] bg-[#4d8eff]/20 text-[#4d8eff] px-1.5 py-0.5 rounded font-mono">2 unread</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-[#424754]/40">
                {notifications.map((item) => (
                  <div key={item.id} className={`p-3 hover:bg-[#262a35] transition-colors ${item.unread ? 'bg-[#0a0e18]/40' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#dfe2f1]">{item.title}</span>
                      <span className="text-[10px] text-[#8c909f]">{item.time}</span>
                    </div>
                    <p className="text-xs text-[#c2c6d6]">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-[#424754] bg-[#0a0e18] text-center">
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#4cd7f6] hover:underline font-mono"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User avatar / profile button */}
        <div 
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-2 pl-2 border-l border-[#424754]/50 cursor-pointer group"
          title="Account settings"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Alex Workspace"
            className="w-8 h-8 rounded-full object-cover border border-[#424754] group-hover:border-[#4cd7f6] transition-colors"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-medium text-[#dfe2f1] leading-none">Alex Morgan</p>
            <p className="text-[10px] text-[#4cd7f6] font-mono leading-tight mt-0.5">Pro Workspace</p>
          </div>
        </div>
      </div>
    </header>
  );
};
