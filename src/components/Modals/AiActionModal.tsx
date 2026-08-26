import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Check, X, RefreshCw, Layers, ArrowRight } from 'lucide-react';

interface AiActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'summary' | 'plan' | 'audit' | null;
  onApplyPlan?: (planTitle: string) => void;
}

export const AiActionModal: React.FC<AiActionModalProps> = ({
  isOpen,
  onClose,
  actionType,
  onApplyPlan
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, actionType]);

  if (!isOpen || !actionType) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0f131d]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1c1f2a] border border-[#424754] rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#424754]/60 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#4cd7f6]" />
            <h3 className="text-base font-bold text-[#dfe2f1]">
              {actionType === 'summary' && 'AI Workspace Activity Summary'}
              {actionType === 'plan' && 'Autonomous Project Execution Plan'}
              {actionType === 'audit' && 'Automated Security & Performance Audit'}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="text-[#8c909f] hover:text-[#dfe2f1]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#4cd7f6] animate-spin" />
            <p className="text-xs font-mono text-[#adc6ff]">Synthesizing workspace context & vector records...</p>
          </div>
        ) : (
          <div className="space-y-4 text-xs font-sans text-[#dfe2f1]">
            {actionType === 'summary' && (
              <div className="bg-[#0a0e18] p-4 rounded-xl border border-[#424754]/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#4cd7f6] font-semibold">Pulse Report (Last 24h)</span>
                  <span className="text-[10px] font-mono bg-[#4d8eff]/10 text-[#adc6ff] px-2 py-0.5 rounded">
                    Confidence: 99.4%
                  </span>
                </div>
                <p className="text-[#c2c6d6] leading-relaxed">
                  Your team pushed <strong>14 commits</strong> across 2 active projects. Sarah Jenkins closed the core data pipeline refactor ahead of schedule.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-[#424754]/30">
                  <p>• <strong>Blockers:</strong> 0 active critical blockers. Nexus Engine shader integration is on track for Oct 12.</p>
                  <p>• <strong>Recommendation:</strong> Schedule design review for Client Portal wireframes before Friday.</p>
                </div>
              </div>
            )}

            {actionType === 'plan' && (
              <div className="bg-[#0a0e18] p-4 rounded-xl border border-[#424754]/50 space-y-3">
                <span className="font-mono text-[#4cd7f6] font-semibold">Suggested Sprint Milestones</span>
                <div className="space-y-2">
                  <div className="p-2.5 bg-[#171b26] rounded-lg border border-[#424754]/40 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-[#dfe2f1]">Phase 1: WebGL Shader Compilers</p>
                      <p className="text-[11px] text-[#8c909f]">Target: 3 days • Assigned to Sarah J.</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#4cd7f6]">Ready</span>
                  </div>
                  <div className="p-2.5 bg-[#171b26] rounded-lg border border-[#424754]/40 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-[#dfe2f1]">Phase 2: Vector Sync Cache Load Test</p>
                      <p className="text-[11px] text-[#8c909f]">Target: 5 days • Assigned to Alex M.</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#adc6ff]">Queued</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#4d8eff] text-[#00285d] font-mono text-xs font-bold rounded-lg hover:bg-[#adc6ff] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
