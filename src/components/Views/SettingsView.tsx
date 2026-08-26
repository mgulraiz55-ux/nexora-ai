import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Key, 
  Bell, 
  Users, 
  Check, 
  Save, 
  Sparkles,
  Zap
} from 'lucide-react';
import { AppView } from '../../types';

interface SettingsViewProps {
  onNavigate: (view: AppView) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'models' | 'team' | 'security'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [workspaceName, setWorkspaceName] = useState('Nexora Core Engineering');
  const [defaultModel, setDefaultModel] = useState('GPT-4o');
  const [enableAutonomousExecution, setEnableAutonomousExecution] = useState(true);
  const [temperature, setTemperature] = useState('0.4');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#dfe2f1] tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#c2c6d6] mt-1">
          Manage workspace configuration, default intelligence models, and team preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#424754]/60 gap-4 overflow-x-auto hide-scrollbar">
        {[
          { id: 'general', label: 'General', icon: Settings },
          { id: 'models', label: 'AI Models & Reasoning', icon: Sparkles },
          { id: 'team', label: 'Team Members', icon: Users },
          { id: 'security', label: 'Security & API Keys', icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 text-xs md:text-sm font-mono border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-[#4cd7f6] text-[#4cd7f6] font-semibold'
                  : 'border-transparent text-[#8c909f] hover:text-[#dfe2f1]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {savedSuccess && (
        <div className="bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6] p-3 rounded-lg text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Workspace settings updated successfully.</span>
        </div>
      )}

      {/* Tab Panels */}
      <form onSubmit={handleSave} className="bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-6 shadow-lg space-y-6">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[#8c909f] block mb-1.5">Workspace Name</label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full bg-[#0a0e18] border border-[#424754] rounded-lg p-2.5 text-xs sm:text-sm text-[#dfe2f1] focus:outline-none focus:border-[#4cd7f6]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#8c909f] block mb-1.5">Admin Email</label>
              <input
                type="email"
                defaultValue="alex.morgan@nexora.ai"
                disabled
                className="w-full bg-[#0a0e18] border border-[#424754]/50 rounded-lg p-2.5 text-xs text-[#8c909f] cursor-not-allowed"
              />
            </div>

            <div className="pt-2">
              <label className="text-xs font-mono text-[#8c909f] block mb-1.5">Default Timezone</label>
              <select className="bg-[#0a0e18] border border-[#424754] rounded-lg p-2 text-xs text-[#dfe2f1] w-full max-w-xs">
                <option>UTC-08:00 Pacific Time (US & Canada)</option>
                <option>UTC-05:00 Eastern Time (US & Canada)</option>
                <option>UTC+00:00 UTC / GMT</option>
                <option>UTC+01:00 Central European Time</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[#8c909f] block mb-1.5">Primary Default Model</label>
              <select
                value={defaultModel}
                onChange={(e) => setDefaultModel(e.target.value)}
                className="bg-[#0a0e18] border border-[#424754] rounded-lg p-2 text-xs text-[#dfe2f1] w-full max-w-sm"
              >
                <option value="GPT-4o">OpenAI GPT-4o (High Speed & Code)</option>
                <option value="Gemini 2.0 Flash">Google Gemini 2.0 Flash (Multimodal & Fast RAG)</option>
                <option value="Claude 3.5">Anthropic Claude 3.5 Sonnet (Nuanced Analysis)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#0a0e18] rounded-lg border border-[#424754]/50">
              <div>
                <p className="text-xs font-semibold text-[#dfe2f1]">Autonomous Agent Background Execution</p>
                <p className="text-[11px] text-[#8c909f]">Allow background agents to self-trigger ETL pipelines and report drafts.</p>
              </div>
              <input
                type="checkbox"
                checked={enableAutonomousExecution}
                onChange={(e) => setEnableAutonomousExecution(e.target.checked)}
                className="w-4 h-4 accent-[#4cd7f6]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#8c909f]">Reasoning Temperature</span>
                <span className="text-[#4cd7f6]">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full accent-[#4cd7f6]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8c909f] mt-1">
                <span>Deterministic (0.0)</span>
                <span>Balanced (0.4)</span>
                <span>Creative (1.0)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-mono uppercase text-[#8c909f]">Workspace Members (3 / 10 seats)</h3>
              <button 
                type="button" 
                onClick={() => onNavigate('pricing')}
                className="text-xs font-mono text-[#4cd7f6] hover:underline"
              >
                + Upgrade for more seats
              </button>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Alex Morgan', role: 'Owner / Admin', email: 'alex.morgan@nexora.ai', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
                { name: 'Sarah Jenkins', role: 'Lead Engineer', email: 'sarah.j@nexora.ai', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
                { name: 'David Ross', role: 'Product Designer', email: 'david.r@nexora.ai', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0a0e18] border border-[#424754]/50 rounded-lg text-xs">
                  <div className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-[#dfe2f1]">{member.name}</p>
                      <p className="text-[#8c909f] font-mono text-[10px]">{member.email}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-[#adc6ff] bg-[#4d8eff]/10 px-2 py-1 rounded">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[#8c909f] block mb-1.5">Workspace API Key</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="nx_live_948102938472918239018471"
                  readOnly
                  className="w-full bg-[#0a0e18] border border-[#424754] rounded-lg p-2.5 text-xs font-mono text-[#dfe2f1]"
                />
                <button
                  type="button"
                  onClick={() => alert('API Key copied')}
                  className="px-3 py-1 bg-[#313540] text-xs font-mono rounded-lg hover:bg-[#424754]"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-[#0a0e18] rounded-lg border border-[#424754]/50 space-y-1">
              <p className="text-xs font-semibold text-[#dfe2f1]">SSO & Two-Factor Authentication</p>
              <p className="text-[11px] text-[#4cd7f6] font-mono">Enforced via Google Identity & SAML 2.0</p>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-[#424754]/50">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#4d8eff] hover:bg-[#adc6ff] text-[#00285d] font-mono text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-[0_0_12px_rgba(77,142,255,0.25)] active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
