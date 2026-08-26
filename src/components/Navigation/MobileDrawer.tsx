import React from 'react';
import { AppView, WorkspaceDocument } from '../../types';
import { 
  X, 
  Home, 
  LayoutDashboard, 
  Zap, 
  FolderKanban, 
  LineChart, 
  Settings, 
  FileText, 
  Code2, 
  DollarSign, 
  HelpCircle, 
  LogOut,
  Sparkles,
  Plus
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  documents?: WorkspaceDocument[];
  onOpenNewProjectModal: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  documents = [],
  onOpenNewProjectModal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex md:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0f131d]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <aside className="relative w-72 max-w-[85vw] bg-[#1c1f2a] border-r border-[#424754] h-full flex flex-col p-4 z-10 shadow-2xl overflow-y-auto">
        {/* User Profile Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#424754]/60 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#424754] bg-[#0f131d]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Alex Workspace"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#dfe2f1]">Alex Morgan</p>
              <p className="text-xs text-[#4cd7f6] font-mono">Pro Workspace</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#c2c6d6] hover:text-[#dfe2f1] hover:bg-[#313540] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick New Project */}
        <button
          onClick={() => {
            onClose();
            onOpenNewProjectModal();
          }}
          className="w-full mb-4 bg-[#4d8eff] text-[#00285d] font-mono text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(77,142,255,0.2)]"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>

        {/* Primary Links */}
        <div className="space-y-1">
          <button
            onClick={() => { onNavigate('landing'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'landing' ? 'bg-[#4d8eff] text-[#00285d] font-medium' : 'text-[#c2c6d6] hover:bg-[#313540]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Landing Page</span>
          </button>

          <button
            onClick={() => { onNavigate('dashboard'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'dashboard' ? 'bg-[#4d8eff] text-[#00285d] font-medium' : 'text-[#c2c6d6] hover:bg-[#313540]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => { onNavigate('workspace'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'workspace' ? 'bg-[#4d8eff] text-[#00285d] font-medium' : 'text-[#c2c6d6] hover:bg-[#313540]'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>AI Workspace</span>
          </button>

          <button
            onClick={() => { onNavigate('projects'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'projects' ? 'bg-[#4d8eff] text-[#00285d] font-medium' : 'text-[#c2c6d6] hover:bg-[#313540]'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Projects & Tasks</span>
          </button>

          <button
            onClick={() => { onNavigate('pricing'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'pricing' ? 'bg-[#4d8eff] text-[#00285d] font-medium' : 'text-[#c2c6d6] hover:bg-[#313540]'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Pricing</span>
          </button>

          <button
            onClick={() => { onNavigate('analytics'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'analytics' ? 'bg-[#4d8eff] text-[#00285d] font-medium' : 'text-[#c2c6d6] hover:bg-[#313540]'
            }`}
          >
            <LineChart className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => { onNavigate('settings'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'settings' ? 'bg-[#4d8eff] text-[#00285d] font-medium' : 'text-[#c2c6d6] hover:bg-[#313540]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>

        {/* Context Documents Section */}
        <div className="mt-6 pt-4 border-t border-[#424754]/60">
          <p className="text-[11px] font-mono text-[#8c909f] uppercase tracking-wider mb-2">
            Active Context
          </p>
          <div className="space-y-1.5">
            {documents.slice(0, 2).map((doc) => (
              <div 
                key={doc.id}
                onClick={() => { onNavigate('workspace'); onClose(); }}
                className="flex items-center gap-2 p-2 bg-[#0f131d] border border-[#424754]/50 rounded-lg text-xs text-[#dfe2f1] cursor-pointer hover:border-[#4cd7f6]/50"
              >
                {doc.icon === 'code' ? (
                  <Code2 className="w-3.5 h-3.5 text-[#4cd7f6] shrink-0" />
                ) : (
                  <FileText className="w-3.5 h-3.5 text-[#4d8eff] shrink-0" />
                )}
                <span className="truncate">{doc.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-4 border-t border-[#424754]/60 flex items-center justify-between text-xs text-[#8c909f]">
          <span className="font-mono text-[11px]">NEXORA v2.0.4</span>
          <button 
            onClick={() => { onNavigate('landing'); onClose(); }}
            className="hover:text-[#ffb4ab] flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
