import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Activity, 
  Cpu, 
  Clock, 
  Database, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { AppView } from '../../types';

interface AnalyticsViewProps {
  onNavigate: (view: AppView) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const [metricTimeframe, setMetricTimeframe] = useState<'24h' | '7d' | '30d'>('7d');

  const metrics = [
    { label: 'Total AI Inferences', value: '48.2k', change: '+24%', status: 'up' },
    { label: 'Avg Latency (ms)', value: '14.2ms', change: '-8ms', status: 'up' },
    { label: 'Vector Index Size', value: '1.4 GB', change: '+320MB', status: 'neutral' },
    { label: 'Context Accuracy', value: '99.4%', change: '+0.6%', status: 'up' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#dfe2f1] tracking-tight">
            System & Team Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#c2c6d6] mt-1">
            Real-time inference throughput, autonomous task completion, and team velocity.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex bg-[#1c1f2a] p-1 rounded-lg border border-[#424754]">
          {(['24h', '7d', '30d'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setMetricTimeframe(tf)}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                metricTimeframe === tf
                  ? 'bg-[#4d8eff] text-[#00285d] font-bold'
                  : 'text-[#8c909f] hover:text-[#dfe2f1]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-4 space-y-2 shadow-md">
            <span className="text-xs font-mono text-[#8c909f]">{m.label}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-[#dfe2f1]">{m.value}</span>
              <span className="text-xs font-mono text-[#4cd7f6] bg-[#03b5d3]/10 px-2 py-0.5 rounded flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Performance & Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Graph Card */}
        <div className="lg:col-span-8 bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-[#dfe2f1] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#4cd7f6]" />
              Inference Velocity & Throughput Load
            </h3>
            <span className="text-[11px] font-mono text-[#adc6ff] bg-[#4d8eff]/10 px-2 py-0.5 rounded border border-[#4d8eff]/20">
              Live Streaming
            </span>
          </div>

          <div className="h-60 bg-[#0a0e18] rounded-lg border border-[#424754]/50 p-4 relative overflow-hidden ai-glow">
            <div className="absolute inset-0 graph-grid"></div>
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,80 Q20,60 40,40 T70,30 T100,10" fill="none" stroke="#4d8eff" strokeWidth="2.5" />
              <path d="M0,70 Q25,85 50,50 T80,45 T100,20" fill="none" stroke="#4cd7f6" strokeDasharray="3" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-2 inset-x-4 flex justify-between text-[10px] font-mono text-[#8c909f]">
              <span>Oct 01</span>
              <span>Oct 03</span>
              <span>Oct 05</span>
              <span>Oct 07</span>
              <span>Today</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center">
            <div className="p-2.5 bg-[#0f131d] rounded-lg border border-[#424754]/40">
              <p className="text-[10px] font-mono text-[#8c909f]">Model Precision</p>
              <p className="text-sm font-bold font-mono text-[#4cd7f6]">99.8%</p>
            </div>
            <div className="p-2.5 bg-[#0f131d] rounded-lg border border-[#424754]/40">
              <p className="text-[10px] font-mono text-[#8c909f]">Success Rate</p>
              <p className="text-sm font-bold font-mono text-[#adc6ff]">100%</p>
            </div>
            <div className="p-2.5 bg-[#0f131d] rounded-lg border border-[#424754]/40">
              <p className="text-[10px] font-mono text-[#8c909f]">Cache Hit Ratio</p>
              <p className="text-sm font-bold font-mono text-[#dfe2f1]">84.2%</p>
            </div>
          </div>
        </div>

        {/* Breakdown by Module */}
        <div className="lg:col-span-4 bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-5 shadow-lg space-y-4">
          <h3 className="text-sm font-semibold text-[#dfe2f1] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#adc6ff]" />
            Agent Distribution
          </h3>

          <div className="space-y-3">
            {[
              { name: 'ETL & Vector Ingestion', percent: 45, color: '#4d8eff' },
              { name: 'Code & Shader Generation', percent: 30, color: '#4cd7f6' },
              { name: 'Document Analysis & RAG', percent: 18, color: '#adc6ff' },
              { name: 'Automated Sync Checks', percent: 7, color: '#8c909f' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#dfe2f1]">{item.name}</span>
                  <span className="text-[#8c909f]">{item.percent}%</span>
                </div>
                <div className="h-2 bg-[#0a0e18] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#0a0e18] rounded-lg border border-[#424754]/40 text-xs text-[#c2c6d6] space-y-2 mt-4">
            <div className="flex items-center gap-1.5 text-[#4cd7f6] font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Optimization Insight</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Switching batch ETL pipelines to overnight low-priority queues reduced token overhead by 22%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
