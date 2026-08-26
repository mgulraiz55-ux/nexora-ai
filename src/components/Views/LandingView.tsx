import React, { useState } from 'react';
import { AppView } from '../../types';
import { 
  ArrowRight, 
  PlayCircle, 
  Network, 
  Bot, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw,
  User,
  Activity,
  Layers,
  Zap,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: AppView) => void;
  onOpenDemoVideo?: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ 
  onNavigate,
  onOpenDemoVideo 
}) => {
  const [activeInteractiveDemo, setActiveInteractiveDemo] = useState(false);
  const [syncProgress, setSyncProgress] = useState(78);
  const [demoPrompt, setDemoPrompt] = useState('Summarize Q3 results and highlight risk factors');
  const [demoResult, setDemoResult] = useState<{
    revenue: string;
    cac: string;
    velocity: string;
    agents: number;
  }>({
    revenue: '+15% YoY ($8.5M)',
    cac: 'Reduced by $40/seat',
    velocity: '42 pts / sprint (+18%)',
    agents: 2
  });

  return (
    <div className="min-h-screen bg-[#0f131d] text-[#dfe2f1] selection:bg-[#4d8eff] selection:text-[#00285d]">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 md:px-8 pt-24 pb-16 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4d8eff]/12 via-[#0f131d] to-[#0f131d] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4cd7f6]/8 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 mt-4">
          {/* OS Version Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#424754] bg-[#171b26] font-mono text-xs text-[#adc6ff] shadow-[0_0_12px_rgba(77,142,255,0.15)] animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span>NEXORA OS v2.0 is now live</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-[#dfe2f1] tracking-tight leading-[1.1] max-w-3xl">
            Intelligence at <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#adc6ff] via-[#4d8eff] to-[#4cd7f6]">
              Every Layer.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#c2c6d6] max-w-2xl font-sans leading-relaxed">
            A unified AI workspace built for data-rich environments. Seamlessly integrate your tools, visualize complex metrics, and unlock actionable insights with advanced machine intelligence.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mt-2">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto bg-[#4d8eff] text-[#00285d] font-mono font-semibold text-sm px-7 py-3 rounded-lg hover:bg-[#adc6ff] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(77,142,255,0.35)] group active:scale-95"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('workspace')}
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-mono text-sm border border-[#424754] text-[#dfe2f1] hover:bg-[#1c1f2a] hover:border-[#8c909f] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <PlayCircle className="w-4 h-4 text-[#4cd7f6]" />
              <span>Explore Workspace</span>
            </button>
          </div>
        </div>

        {/* High Fidelity Software Dashboard Preview Window */}
        <div className="w-full max-w-5xl mx-auto mt-14 relative z-10 group px-2 sm:px-0">
          <div className="absolute inset-0 bg-[#4d8eff]/10 blur-[80px] rounded-full group-hover:bg-[#4d8eff]/15 transition-all duration-700 pointer-events-none"></div>
          
          <div className="relative border border-[#424754] rounded-xl overflow-hidden bg-[#171b26] shadow-2xl transition-all duration-300 hover:border-[#4cd7f6]/50">
            {/* Window Chrome */}
            <div className="h-9 bg-[#0a0e18] border-b border-[#424754] flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ffb4ab]/30 border border-[#ffb4ab]/40"></div>
                <div className="w-3 h-3 rounded-full bg-[#e0e3e5]/30 border border-[#e0e3e5]/40"></div>
                <div className="w-3 h-3 rounded-full bg-[#4cd7f6]/30 border border-[#4cd7f6]/40"></div>
              </div>
              <div className="text-[11px] font-mono text-[#8c909f] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                <span>nexora.workspace.app / cluster-alpha</span>
              </div>
              <div className="text-[11px] font-mono text-[#8c909f] hidden sm:block">
                v2.0 • 99.99% Uptime
              </div>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="p-4 sm:p-6 bg-gradient-to-b from-[#1c1f2a] to-[#0f131d] relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Mini Stats */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center justify-between bg-[#171b26]/90 border border-[#424754]/60 rounded-lg p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#4d8eff]/10 border border-[#4d8eff]/30 flex items-center justify-center text-[#4d8eff]">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-mono text-[#8c909f]">Throughput Latency</p>
                        <p className="text-sm font-bold text-[#dfe2f1]">14ms • 3.2k req/s</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono bg-[#4cd7f6]/10 text-[#4cd7f6] border border-[#4cd7f6]/20 px-2 py-0.5 rounded">
                        Neural Engine Active
                      </span>
                    </div>
                  </div>

                  {/* Graph Visualizer representation */}
                  <div className="bg-[#0f131d] border border-[#424754]/70 rounded-lg p-4 relative ai-glow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-xs text-[#dfe2f1] flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-[#4cd7f6]" />
                        System Performance & Autonomous Sync
                      </span>
                      <span className="font-mono text-[10px] text-[#adc6ff] bg-[#4d8eff]/10 px-2 py-0.5 rounded border border-[#4d8eff]/20">
                        Real-Time
                      </span>
                    </div>
                    
                    <div className="h-44 w-full relative">
                      <div className="absolute inset-0 graph-grid"></div>
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0,85 Q25,75 45,45 T75,30 T100,15" fill="none" stroke="#4d8eff" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                        <path d="M0,60 Q30,80 50,55 T80,40 T100,25" fill="none" stroke="#4cd7f6" strokeDasharray="3" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        <path d="M0,100 L0,85 Q25,75 45,45 T75,30 T100,15 L100,100 Z" fill="url(#hero-grad)" opacity="0.25" />
                        <defs>
                          <linearGradient id="hero-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#4d8eff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0f131d" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <div className="flex justify-between text-[10px] font-mono text-[#8c909f] pt-2 border-t border-[#424754]/40">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                      <span>Live</span>
                    </div>
                  </div>
                </div>

                {/* Right Quick Controls */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <div className="bg-[#171b26] border border-[#424754]/70 rounded-lg p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-[#dfe2f1]">Active Agents</span>
                        <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                      </div>
                      <p className="text-xs text-[#c2c6d6] leading-relaxed mb-3">
                        Autonomous research & ETL agents executing pipeline tasks.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2 bg-[#0f131d] border border-[#424754]/50 rounded flex items-center justify-between text-xs">
                        <span className="text-[#dfe2f1] font-mono text-[11px]">Vector Ingestion</span>
                        <span className="text-[#4cd7f6] text-[10px] font-mono">Running</span>
                      </div>
                      <div className="p-2 bg-[#0f131d] border border-[#424754]/50 rounded flex items-center justify-between text-xs">
                        <span className="text-[#dfe2f1] font-mono text-[11px]">Q3 Report Gen</span>
                        <span className="text-[#adc6ff] text-[10px] font-mono">Queued</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => onNavigate('workspace')}
                      className="mt-3 w-full py-2 bg-[#4d8eff]/15 text-[#adc6ff] hover:bg-[#4d8eff]/25 border border-[#4d8eff]/30 rounded font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Open Workspace</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Bento Grid Section */}
      <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#dfe2f1] tracking-tight mb-3">
            Deep System Integration
          </h2>
          <p className="text-sm sm:text-base text-[#c2c6d6] max-w-2xl mx-auto">
            Built from the ground up to understand context, automate complexity, and elevate your output with granular data controls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1: Project Intelligence */}
          <div className="bg-[#1c1f2a] border border-[#424754] rounded-xl p-6 flex flex-col gap-4 group hover:border-[#4d8eff]/50 transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-[#313540] flex items-center justify-center border border-[#424754]">
              <Network className="text-[#adc6ff] w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#dfe2f1] tracking-tight">Project Intelligence</h3>
            <p className="text-sm text-[#c2c6d6] leading-relaxed flex-grow">
              Nexora analyzes your entire project ecosystem, connecting disparate data points to provide actionable insights and strategic recommendations before you even ask.
            </p>

            <div className="mt-4 p-4 bg-[#0a0e18] rounded-lg border border-[#424754]/40 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-[#8c909f]">Project Health</span>
                <span className="text-[#adc6ff] font-mono text-xs font-bold">+12%</span>
              </div>
              <div className="h-2 bg-[#313540] rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-[#4d8eff] rounded-full shadow-[0_0_8px_#4d8eff]"></div>
              </div>
              <div className="flex gap-2 pt-1">
                <div className="flex-1 bg-[#262a35] rounded p-2 border border-[#424754]/30">
                  <div className="text-[10px] text-[#8c909f] font-mono">Issues</div>
                  <div className="font-mono text-xs font-semibold text-[#dfe2f1]">3 Active</div>
                </div>
                <div className="flex-1 bg-[#262a35] rounded p-2 border border-[#424754]/30">
                  <div className="text-[10px] text-[#8c909f] font-mono">Velocity</div>
                  <div className="font-mono text-xs font-semibold text-[#dfe2f1]">42 pts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Autonomous Tasks (Spans 2 columns on desktop) */}
          <div className="bg-[#1c1f2a] border border-[#424754] rounded-xl p-6 flex flex-col gap-4 group hover:border-[#4cd7f6]/50 transition-colors shadow-lg md:col-span-2">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-[#313540] flex items-center justify-center border border-[#424754]">
                <Bot className="text-[#4cd7f6] w-6 h-6" />
              </div>
              <div className="px-2.5 py-1 bg-[#03b5d3]/15 border border-[#03b5d3]/30 rounded-full font-mono text-xs text-[#4cd7f6] font-semibold">
                Autonomous
              </div>
            </div>

            <h3 className="text-xl font-semibold text-[#dfe2f1] tracking-tight">Autonomous Tasks</h3>
            <p className="text-sm text-[#c2c6d6] leading-relaxed max-w-xl">
              Delegate complex workflows to specialized AI agents. From initial research to final document generation, watch as tasks are executed with precision in the background.
            </p>

            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#0a0e18] rounded-lg border border-[#424754]/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-[#4cd7f6] animate-spin" />
                  <span className="font-mono text-xs text-[#dfe2f1]">Data Sync</span>
                </div>
                <span className="text-[10px] font-mono text-[#8c909f] bg-[#1c1f2a] px-2 py-0.5 rounded">In Progress</span>
              </div>

              <div className="p-3 bg-[#0a0e18] rounded-lg border border-[#424754]/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#adc6ff]" />
                  <span className="font-mono text-xs text-[#dfe2f1]">Report Gen</span>
                </div>
                <span className="text-[10px] font-mono text-[#4cd7f6] bg-[#03b5d3]/10 px-2 py-0.5 rounded">Complete</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#424754]/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                <span className="font-mono text-xs text-[#8c909f]">2 Agents Active</span>
              </div>
              <button 
                onClick={() => onNavigate('projects')}
                className="text-xs text-[#adc6ff] hover:text-[#4cd7f6] font-mono flex items-center gap-1 transition-colors"
              >
                <span>View Task Queues</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Feature 3: Document Context (Spans all columns or 1 column based on screen) */}
          <div className="bg-[#1c1f2a] border border-[#424754] rounded-xl p-6 flex flex-col gap-4 group hover:border-[#4d8eff]/50 transition-colors shadow-lg md:col-span-3 lg:col-span-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#313540] flex items-center justify-center border border-[#424754]">
                <FileText className="text-[#adc6ff] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#dfe2f1] tracking-tight">Document Context</h3>
                <p className="text-xs text-[#8c909f] font-mono">Semantic RAG & Continuous Knowledge Grounding</p>
              </div>
            </div>

            <p className="text-sm text-[#c2c6d6] leading-relaxed">
              Chat directly with your extensive knowledge base. Our retrieval engine understands nuance, summarizing 100-page documents into 3 actionable bullet points instantly.
            </p>

            {/* Interactive Chat Bubble Preview */}
            <div className="mt-2 p-4 bg-[#0a0e18] rounded-xl border border-[#424754]/40 flex flex-col gap-3">
              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#4d8eff] text-[#00285d] flex items-center justify-center text-xs font-bold font-mono">
                  U
                </div>
                <div className="bg-[#262a35] px-3.5 py-2 rounded-r-lg rounded-bl-lg text-xs text-[#dfe2f1]">
                  Summarize Q3 results and highlight CAC changes.
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#313540] border border-[#424754] flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-[#4cd7f6]" />
                </div>
                <div className="bg-[#262a35] p-3 rounded-r-lg rounded-br-lg text-xs text-[#c2c6d6] flex-1 border border-[#424754]/30 space-y-1">
                  <p className="text-[#dfe2f1] font-medium mb-1">Key Findings from Q3_Revenue_Final.csv:</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                    <li><strong className="text-[#dfe2f1]">Revenue:</strong> Up 15% YoY ($8.5M total) driven by enterprise cloud solutions.</li>
                    <li><strong className="text-[#dfe2f1]">CAC:</strong> Reduced by $40/seat with autonomous sync pipelines.</li>
                    <li><strong className="text-[#dfe2f1]">Growth:</strong> Security modules expanded 25% YoY with 0% churn.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="py-16 px-4 md:px-8 border-t border-[#424754]/40 bg-[#171b26]/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#dfe2f1] tracking-tight">
            Ready to upgrade your team's velocity?
          </h2>
          <p className="text-sm sm:text-base text-[#c2c6d6] max-w-xl mx-auto">
            Join innovative engineering, data, and product teams building with NEXORA AI.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-[#4d8eff] text-[#00285d] font-mono font-semibold text-sm px-8 py-3 rounded-lg hover:bg-[#adc6ff] transition-all shadow-[0_0_20px_rgba(77,142,255,0.3)] active:scale-95 flex items-center gap-2"
            >
              <span>Launch Nexora App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('pricing')}
              className="px-6 py-3 rounded-lg font-mono text-sm border border-[#424754] text-[#dfe2f1] hover:bg-[#1c1f2a] transition-all"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
