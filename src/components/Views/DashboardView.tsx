import React, { useState } from 'react';
import { Project, TaskItem, ActivityItem, AppView } from '../../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  Plus, 
  ChevronRight, 
  FileText, 
  Calendar, 
  AlertCircle,
  MessageSquare,
  Bot,
  Zap,
  BarChart3,
  Layers
} from 'lucide-react';

interface DashboardViewProps {
  projects: Project[];
  tasks: TaskItem[];
  activities: ActivityItem[];
  onNavigate: (view: AppView) => void;
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Partial<TaskItem>) => void;
  onOpenAiAction: (actionType: 'summary' | 'plan' | 'audit') => void;
  onOpenNewProjectModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  tasks,
  activities,
  onNavigate,
  onToggleTask,
  onAddTask,
  onOpenAiAction,
  onOpenNewProjectModal
}) => {
  const [productivityTab, setProductivityTab] = useState<'focus' | 'tasks'>('focus');
  const [newQuickTaskTitle, setNewQuickTaskTitle] = useState('');
  const [showQuickTaskInput, setShowQuickTaskInput] = useState(false);
  const [activeHoverBar, setActiveHoverBar] = useState<number | null>(4); // default Friday

  const focusData = [
    { day: 'Mon', hours: 4.2, tasks: 5 },
    { day: 'Tue', hours: 5.8, tasks: 8 },
    { day: 'Wed', hours: 3.5, tasks: 4 },
    { day: 'Thu', hours: 6.1, tasks: 9 },
    { day: 'Fri', hours: 6.8, tasks: 11 },
    { day: 'Sat', hours: 2.1, tasks: 2 },
    { day: 'Sun', hours: 1.4, tasks: 1 },
  ];

  const handleCreateQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuickTaskTitle.trim()) return;
    onAddTask({
      id: `task-${Date.now()}`,
      name: newQuickTaskTitle.trim(),
      project: 'Nexus Engine Upgrade',
      status: 'In Progress',
      priority: 'High',
      dueDate: 'Today',
      assignee: {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      }
    });
    setNewQuickTaskTitle('');
    setShowQuickTaskInput(false);
  };

  const topProjects = projects.slice(0, 2);
  const displayTasks = tasks.slice(0, 3);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-300">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#dfe2f1] tracking-tight">
            Good morning, Alex
          </h1>
          <p className="text-sm text-[#c2c6d6] mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenAiAction('summary')}
            className="flex items-center gap-2 bg-[#1c1f2a] border border-[#424754] hover:border-[#4cd7f6] text-[#dfe2f1] px-3.5 py-2 rounded-lg text-xs font-mono transition-all active:scale-95 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4cd7f6]" />
            <span>AI Workspace Pulse</span>
          </button>
          <button
            onClick={onOpenNewProjectModal}
            className="flex items-center gap-2 bg-[#4d8eff] text-[#00285d] hover:bg-[#adc6ff] px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all shadow-[0_0_15px_rgba(77,142,255,0.25)] active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Productivity Chart & Active Projects */}
        <div className="lg:col-span-8 space-y-6">
          {/* Productivity Chart Card */}
          <div className="bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-5 sm:p-6 relative overflow-hidden shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-[#dfe2f1] tracking-tight">
                  Productivity
                </h2>
                <div className="flex bg-[#0f131d] p-1 rounded-lg border border-[#424754]/50">
                  <button
                    onClick={() => setProductivityTab('focus')}
                    className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                      productivityTab === 'focus'
                        ? 'bg-[#313540] text-[#adc6ff] font-semibold'
                        : 'text-[#8c909f] hover:text-[#dfe2f1]'
                    }`}
                  >
                    Focus Time
                  </button>
                  <button
                    onClick={() => setProductivityTab('tasks')}
                    className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                      productivityTab === 'tasks'
                        ? 'bg-[#313540] text-[#4cd7f6] font-semibold'
                        : 'text-[#8c909f] hover:text-[#dfe2f1]'
                    }`}
                  >
                    Tasks Completed
                  </button>
                </div>
              </div>

              <span className="self-start sm:self-auto text-xs font-mono text-[#8c909f] bg-[#0f131d] px-2.5 py-1 rounded border border-[#424754]/40">
                Last 7 Days
              </span>
            </div>

            {/* Interactive Bar Chart Visualization */}
            <div className="h-52 w-full flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2 relative">
              {/* Background Reference Lines */}
              <div className="absolute inset-x-0 top-8 border-b border-[#424754]/30 pointer-events-none flex justify-between text-[10px] font-mono text-[#8c909f]/60 px-1">
                <span>{productivityTab === 'focus' ? '8 hrs' : '15 tasks'}</span>
              </div>
              <div className="absolute inset-x-0 top-28 border-b border-[#424754]/30 pointer-events-none flex justify-between text-[10px] font-mono text-[#8c909f]/60 px-1">
                <span>{productivityTab === 'focus' ? '4 hrs' : '8 tasks'}</span>
              </div>
              <div className="absolute inset-x-0 bottom-6 border-b border-[#424754]/50 pointer-events-none"></div>

              {focusData.map((d, index) => {
                const heightPercent = productivityTab === 'focus' 
                  ? (d.hours / 8) * 100 
                  : (d.tasks / 15) * 100;
                const isHovered = activeHoverBar === index;

                return (
                  <div
                    key={d.day}
                    onMouseEnter={() => setActiveHoverBar(index)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer z-10"
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="mb-2 bg-[#0a0e18] border border-[#4cd7f6]/60 text-[#dfe2f1] text-[11px] font-mono px-2 py-1 rounded shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95">
                        {productivityTab === 'focus' ? `${d.hours}h Focus` : `${d.tasks} Tasks Done`}
                      </div>
                    )}
                    
                    {/* Bar */}
                    <div 
                      className={`w-full max-w-[42px] rounded-t-md transition-all duration-300 ${
                        isHovered 
                          ? 'bg-[#4cd7f6] shadow-[0_0_14px_rgba(76,215,246,0.5)]' 
                          : index === 4 
                            ? 'bg-[#4d8eff] shadow-[0_0_8px_rgba(77,142,255,0.3)]'
                            : 'bg-[#313540] group-hover:bg-[#4d8eff]/70'
                      }`}
                      style={{ height: `${Math.min(heightPercent, 100)}%` }}
                    />
                    <span className={`text-xs font-mono mt-2 transition-colors ${isHovered ? 'text-[#4cd7f6] font-bold' : 'text-[#8c909f]'}`}>
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Metric Summary Footnote */}
            <div className="mt-4 pt-3 border-t border-[#424754]/40 flex items-center justify-between text-xs text-[#c2c6d6]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
                <span className="font-mono">Total Weekly Focus: <strong>29.9 hours</strong></span>
              </div>
              <span className="text-[#4cd7f6] font-mono flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                +14% vs last week
              </span>
            </div>
          </div>

          {/* Active Projects Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#dfe2f1] tracking-tight">
                Active Projects
              </h2>
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-mono text-[#adc6ff] hover:text-[#4cd7f6] flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onNavigate('projects')}
                  className="bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-5 hover:border-[#4d8eff]/60 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold text-[#dfe2f1] group-hover:text-[#adc6ff] transition-colors leading-snug">
                        {proj.title}
                      </h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ${
                        proj.tagType === 'priority' 
                          ? 'bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/20' 
                          : 'bg-[#4cd7f6]/10 text-[#4cd7f6] border border-[#4cd7f6]/20'
                      }`}>
                        {proj.tag}
                      </span>
                    </div>

                    <p className="text-xs text-[#c2c6d6] line-clamp-1 mb-4">
                      {proj.subtitle}
                    </p>

                    {/* Progress */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#8c909f]">Progress</span>
                        <span className="text-[#dfe2f1] font-semibold">{proj.progress}%</span>
                      </div>
                      <div className="h-2 bg-[#0f131d] rounded-full overflow-hidden border border-[#424754]/40">
                        <div
                          className="h-full bg-gradient-to-r from-[#4d8eff] to-[#4cd7f6] rounded-full transition-all duration-500"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-3 border-t border-[#424754]/40 flex items-center justify-between">
                    <div className="flex items-center -space-x-2">
                      {proj.assignees.map((a, i) => (
                        a.avatar ? (
                          <img
                            key={i}
                            src={a.avatar}
                            alt={a.name}
                            className="w-6 h-6 rounded-full object-cover border border-[#1c1f2a]"
                          />
                        ) : (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-[#313540] border border-[#1c1f2a] flex items-center justify-center text-[9px] font-mono text-[#dfe2f1]"
                          >
                            {a.initials}
                          </div>
                        )
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#8c909f]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{proj.dueDate}</span>
                    </div>
                  </div>

                  {proj.nextStep && (
                    <div className="mt-3 text-[11px] font-mono text-[#adc6ff] bg-[#0a0e18] p-2 rounded border border-[#424754]/40 flex items-center justify-between">
                      <span className="truncate">Next: {proj.nextStep}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#4cd7f6] shrink-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Tasks Checklist, Recent Activity & AI Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tasks Checklist */}
          <div className="bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-[#dfe2f1] tracking-tight">
                  Tasks
                </h2>
                <span className="text-[10px] font-mono bg-[#ffb4ab]/15 text-[#ffb4ab] border border-[#ffb4ab]/30 px-1.5 py-0.5 rounded">
                  3 Due Today
                </span>
              </div>
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-mono text-[#adc6ff] hover:text-[#4cd7f6] transition-colors"
              >
                View all
              </button>
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5">
              {displayTasks.map((t) => {
                const isDone = t.status === 'Done';
                return (
                  <div
                    key={t.id}
                    onClick={() => onToggleTask(t.id)}
                    className="p-3 bg-[#0a0e18] border border-[#424754]/50 rounded-lg hover:border-[#4cd7f6]/40 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button 
                        className="text-[#8c909f] group-hover:text-[#4cd7f6] transition-colors shrink-0"
                        aria-label="Toggle task status"
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#4cd7f6]" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#8c909f]" />
                        )}
                      </button>
                      <span className={`text-xs font-medium truncate ${
                        isDone ? 'line-through text-[#8c909f]' : 'text-[#dfe2f1]'
                      }`}>
                        {t.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        t.priority === 'High' 
                          ? 'bg-[#ffb4ab]/20 text-[#ffb4ab]' 
                          : 'bg-[#313540] text-[#c2c6d6]'
                      }`}>
                        {t.priority}
                      </span>
                      {t.assignee.avatar ? (
                        <img
                          src={t.assignee.avatar}
                          alt={t.assignee.name}
                          className="w-5 h-5 rounded-full object-cover border border-[#424754]"
                        />
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-[#262a35] text-[9px] font-mono flex items-center justify-center text-[#8c909f]">
                          {t.assignee.initials || 'UA'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Task Inline Creator */}
            {showQuickTaskInput ? (
              <form onSubmit={handleCreateQuickTask} className="mt-3 pt-3 border-t border-[#424754]/40 flex gap-2">
                <input
                  type="text"
                  value={newQuickTaskTitle}
                  onChange={(e) => setNewQuickTaskTitle(e.target.value)}
                  placeholder="Task title..."
                  autoFocus
                  className="flex-1 bg-[#0a0e18] border border-[#4cd7f6]/60 rounded-md px-2.5 py-1.5 text-xs text-[#dfe2f1] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#4d8eff] text-[#00285d] font-mono text-xs px-2.5 py-1.5 rounded-md font-semibold hover:bg-[#adc6ff]"
                >
                  Add
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowQuickTaskInput(true)}
                className="mt-3 w-full py-2 border border-dashed border-[#424754] hover:border-[#adc6ff] rounded-lg text-xs font-mono text-[#8c909f] hover:text-[#dfe2f1] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Quick Task</span>
              </button>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-5 shadow-lg">
            <h2 className="text-base font-semibold text-[#dfe2f1] tracking-tight mb-4">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {activities.slice(0, 2).map((act) => (
                <div key={act.id} className="flex gap-3 text-xs">
                  {act.avatar ? (
                    <img
                      src={act.avatar}
                      alt={act.user}
                      className="w-7 h-7 rounded-full object-cover border border-[#424754] shrink-0 mt-0.5"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#313540] border border-[#424754] flex items-center justify-center text-[#4cd7f6] shrink-0">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[#dfe2f1] leading-snug">
                      <span className="font-semibold text-[#dfe2f1]">{act.user}</span>{' '}
                      <span className="text-[#c2c6d6]">{act.action}</span>{' '}
                      <span className="font-medium text-[#adc6ff]">{act.target}</span>
                    </p>
                    {act.commentText && (
                      <p className="mt-1 text-[11px] text-[#8c909f] italic bg-[#0a0e18] p-2 rounded border border-[#424754]/30">
                        {act.commentText}
                      </p>
                    )}
                    <span className="text-[10px] font-mono text-[#8c909f] block mt-1">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Quick Actions */}
          <div className="bg-gradient-to-br from-[#1c1f2a] to-[#171b26] border border-[#4d8eff]/40 rounded-xl p-5 shadow-lg relative overflow-hidden ai-glow">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#4cd7f6]" />
              <h2 className="text-base font-semibold text-[#dfe2f1] tracking-tight">
                AI Quick Actions
              </h2>
            </div>
            <p className="text-xs text-[#c2c6d6] mb-4">
              Trigger autonomous summarization and project orchestrations.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => onOpenAiAction('summary')}
                className="w-full bg-[#0a0e18] hover:bg-[#262a35] border border-[#424754] hover:border-[#4cd7f6] text-[#dfe2f1] p-2.5 rounded-lg text-xs font-mono text-left flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-[#4cd7f6]" />
                  <span>Summarize recent activity</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8c909f] group-hover:text-[#4cd7f6] group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onOpenAiAction('plan')}
                className="w-full bg-[#0a0e18] hover:bg-[#262a35] border border-[#424754] hover:border-[#adc6ff] text-[#dfe2f1] p-2.5 rounded-lg text-xs font-mono text-left flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#adc6ff]" />
                  <span>Generate project plan</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8c909f] group-hover:text-[#adc6ff] group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
