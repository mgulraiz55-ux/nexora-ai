import React from 'react';
import { AppView } from '../../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#424754]/50 bg-[#0f131d] py-12 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#4d8eff] flex items-center justify-center font-mono font-bold text-xs text-[#00285d]">
            NX
          </div>
          <span className="font-bold text-sm tracking-tight text-[#dfe2f1]">
            NEXORA <span className="text-[#4cd7f6]">AI</span>
          </span>
          <span className="text-xs text-[#8c909f] font-mono ml-2">
            © {new Date().getFullYear()} NEXORA Inc.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-[#c2c6d6] font-mono">
          <button onClick={() => onNavigate('landing')} className="hover:text-[#4cd7f6] transition-colors">
            Overview
          </button>
          <button onClick={() => onNavigate('dashboard')} className="hover:text-[#4cd7f6] transition-colors">
            Dashboard
          </button>
          <button onClick={() => onNavigate('workspace')} className="hover:text-[#4cd7f6] transition-colors">
            Workspace
          </button>
          <button onClick={() => onNavigate('projects')} className="hover:text-[#4cd7f6] transition-colors">
            Projects
          </button>
          <button onClick={() => onNavigate('pricing')} className="hover:text-[#4cd7f6] transition-colors">
            Pricing
          </button>
          <button onClick={() => onNavigate('settings')} className="hover:text-[#4cd7f6] transition-colors">
            Privacy & Terms
          </button>
        </div>
      </div>
    </footer>
  );
};
