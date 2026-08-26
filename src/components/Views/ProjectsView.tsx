import React, { useState } from 'react';
import { Project, TaskItem, ActivityItem, AppView } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  ChevronRight, 
  Check, 
  X, 
  Layers, 
  FolderKanban,
  CheckSquare,
  Users,
  Tag,
  ArrowUpDown
} from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  tasks: TaskItem[];
  activities: ActivityItem[];
  onToggleTask: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, status: 'In Progress' | 'To Do' | 'Done') => void;
  onOpenNewProjectModal: () => void;
  onAddTask: (task: Partial<TaskItem>) => void;
  onNavigate: (view: AppView) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  tasks,
  activities,
  onToggleTask,
  onUpdateTaskStatus,
  onOpenNewProjectModal,
  onAddTask,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('All');
  const [showMobileFilterSheet, setShowMobileFilterSheet] = useState(false);
  const [showNewTaskInline, setShowNewTaskInline] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProject, setNewTaskProject] = useState(projects[0]?.title || 'Nexus Engine Upgrade');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Med' | 'Low'>('High');

  // Filter projects & tasks
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'All' || p.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'All' || t.status === selectedStatusFilter;
    const matchesPriority = selectedPriorityFilter === 'All' || t.priority === selectedPriorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask({
      id: `task-${Date.now()}`,
      name: newTaskTitle.trim(),
      project: newTaskProject,
      status: 'In Progress',
      priority: newTaskPriority,
      dueDate: 'Oct 20',
      assignee: {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      }
    });
    setNewTaskTitle('');
    setShowNewTaskInline(false);
  };

  const tasksDoneCount = tasks.filter(t => t.status === 'Done').length;
  const tasksOverdueCount = tasks.filter(t => t.isOverdue).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#dfe2f1] tracking-tight">
            Projects & Tasks
          </h1>
          <p className="text-xs sm:text-sm text-[#c2c6d6] mt-1">
            Manage workspace initiatives, sprints, and task backlogs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMobileFilterSheet(true)}
            className="md:hidden flex items-center gap-1.5 bg-[#1c1f2a] border border-[#424754] text-[#dfe2f1] px-3 py-2 rounded-lg text-xs font-mono"
          >
            <Filter className="w-3.5 h-3.5 text-[#4cd7f6]" />
            <span>Filters</span>
          </button>
          
          <button
            onClick={onOpenNewProjectModal}
            className="flex items-center gap-1.5 bg-[#4d8eff] text-[#00285d] hover:bg-[#adc6ff] px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all shadow-[0_0_15px_rgba(77,142,255,0.25)] active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Desktop Filter & Search Toolbar */}
      <div className="hidden md:flex items-center justify-between gap-4 bg-[#1c1f2a] border border-[#424754]/70 p-3 rounded-xl">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c909f]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, tasks, tags..."
              className="w-full bg-[#0a0e18] border border-[#424754]/60 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#dfe2f1] placeholder:text-[#8c909f] focus:outline-none focus:border-[#4cd7f6]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter Buttons */}
          <div className="flex items-center bg-[#0a0e18] p-1 rounded-lg border border-[#424754]/50">
            {['All', 'In Progress', 'Planning', 'On Track', 'At Risk'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatusFilter(status)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  selectedStatusFilter === status
                    ? 'bg-[#313540] text-[#adc6ff] font-semibold'
                    : 'text-[#8c909f] hover:text-[#dfe2f1]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Priority Filter */}
          <div className="flex items-center bg-[#0a0e18] p-1 rounded-lg border border-[#424754]/50">
            {['All', 'High', 'Med'].map((pri) => (
              <button
                key={pri}
                onClick={() => setSelectedPriorityFilter(pri)}
                className={`px-2 py-1 text-xs font-mono rounded transition-colors ${
                  selectedPriorityFilter === pri
                    ? 'bg-[#313540] text-[#4cd7f6] font-semibold'
                    : 'text-[#8c909f] hover:text-[#dfe2f1]'
                }`}
              >
                {pri}
              </button>
            ))}
          </div>

          {(selectedStatusFilter !== 'All' || selectedPriorityFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedStatusFilter('All');
                setSelectedPriorityFilter('All');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-[#ffb4ab] hover:underline px-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Projects + Tasks vs Weekly Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 or 9 cols): Projects Grid & Tasks Table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Projects Bento Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-[#dfe2f1] flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-[#4cd7f6]" />
                <span>Active Initiatives ({filteredProjects.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-4 flex flex-col justify-between hover:border-[#4d8eff]/60 transition-all shadow-md group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold text-[#dfe2f1] group-hover:text-[#adc6ff] transition-colors leading-snug">
                        {proj.title}
                      </h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ${
                        proj.status === 'At Risk'
                          ? 'bg-[#ffb4ab]/15 text-[#ffb4ab] border border-[#ffb4ab]/30'
                          : proj.status === 'On Track'
                          ? 'bg-[#4cd7f6]/15 text-[#4cd7f6] border border-[#4cd7f6]/30'
                          : 'bg-[#4d8eff]/15 text-[#adc6ff] border border-[#4d8eff]/30'
                      }`}>
                        {proj.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#c2c6d6] line-clamp-2 mb-3">
                      {proj.subtitle}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-[#8c909f]">Progress</span>
                        <span className="text-[#dfe2f1] font-semibold">{proj.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-[#0f131d] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#4d8eff] to-[#4cd7f6] rounded-full"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Mini Task Checklist */}
                    {proj.tasks && proj.tasks.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-[#424754]/40 mb-3">
                        {proj.tasks.slice(0, 2).map((t) => (
                          <div key={t.id} className="flex items-center justify-between text-[11px]">
                            <span className={`truncate ${t.completed ? 'line-through text-[#8c909f]' : 'text-[#dfe2f1]'}`}>
                              • {t.title}
                            </span>
                            {t.completed && <Check className="w-3 h-3 text-[#4cd7f6] shrink-0" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-2 border-t border-[#424754]/40 flex items-center justify-between text-xs font-mono text-[#8c909f]">
                    <div className="flex items-center -space-x-1.5">
                      {proj.assignees.map((a, i) => (
                        a.avatar ? (
                          <img
                            key={i}
                            src={a.avatar}
                            alt={a.name}
                            className="w-5 h-5 rounded-full object-cover border border-[#1c1f2a]"
                          />
                        ) : (
                          <span
                            key={i}
                            className="w-5 h-5 rounded-full bg-[#313540] text-[8px] flex items-center justify-center text-[#dfe2f1] border border-[#1c1f2a]"
                          >
                            {a.initials}
                          </span>
                        )
                      ))}
                    </div>
                    <span>Due {proj.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Tasks Table */}
          <div className="bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#4cd7f6]" />
                <h2 className="text-base font-semibold text-[#dfe2f1]">
                  Tasks Backlog & Sprint Execution
                </h2>
              </div>
              <button
                onClick={() => setShowNewTaskInline(!showNewTaskInline)}
                className="text-xs font-mono text-[#adc6ff] hover:text-[#4cd7f6] flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Inline task creator */}
            {showNewTaskInline && (
              <form onSubmit={handleCreateTask} className="p-3 bg-[#0a0e18] border border-[#4cd7f6]/50 rounded-lg space-y-3">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task title..."
                  autoFocus
                  className="w-full bg-[#1c1f2a] border border-[#424754] rounded px-3 py-1.5 text-xs text-[#dfe2f1] focus:outline-none"
                />
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <select
                      value={newTaskProject}
                      onChange={(e) => setNewTaskProject(e.target.value)}
                      className="bg-[#1c1f2a] border border-[#424754] rounded px-2 py-1 text-xs text-[#dfe2f1]"
                    >
                      {projects.map(p => (
                        <option key={p.id} value={p.title}>{p.title}</option>
                      ))}
                    </select>

                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as any)}
                      className="bg-[#1c1f2a] border border-[#424754] rounded px-2 py-1 text-xs text-[#dfe2f1]"
                    >
                      <option value="High">High Priority</option>
                      <option value="Med">Med Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowNewTaskInline(false)}
                      className="px-2.5 py-1 text-xs text-[#8c909f] hover:text-[#dfe2f1]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#4d8eff] text-[#00285d] font-mono text-xs font-semibold px-3 py-1 rounded"
                    >
                      Save Task
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Tasks Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-[#424754]/50 text-[#8c909f] font-mono text-[11px] uppercase">
                    <th className="pb-2 pl-2">Task</th>
                    <th className="pb-2 hidden sm:table-cell">Project</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Priority</th>
                    <th className="pb-2 hidden md:table-cell">Due Date</th>
                    <th className="pb-2 pr-2 text-right">Assignee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#424754]/30">
                  {filteredTasks.map((t) => {
                    const isDone = t.status === 'Done';
                    return (
                      <tr key={t.id} className="hover:bg-[#262a35]/50 transition-colors group">
                        <td className="py-3 pl-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onToggleTask(t.id)}
                              className="text-[#8c909f] group-hover:text-[#4cd7f6] transition-colors"
                              aria-label="Toggle task"
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-[#4cd7f6]" />
                              ) : (
                                <Circle className="w-4 h-4 text-[#8c909f]" />
                              )}
                            </button>
                            <span className={`font-medium ${isDone ? 'line-through text-[#8c909f]' : 'text-[#dfe2f1]'}`}>
                              {t.name}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 text-[#c2c6d6] hidden sm:table-cell font-mono text-[11px]">
                          {t.project}
                        </td>

                        <td className="py-3">
                          <select
                            value={t.status}
                            onChange={(e) => onUpdateTaskStatus(t.id, e.target.value as any)}
                            className={`bg-transparent border border-[#424754] rounded px-1.5 py-0.5 font-mono text-[10px] focus:outline-none ${
                              t.status === 'Done'
                                ? 'text-[#4cd7f6] border-[#4cd7f6]/40'
                                : t.status === 'In Progress'
                                ? 'text-[#adc6ff] border-[#4d8eff]/40'
                                : 'text-[#c2c6d6]'
                            }`}
                          >
                            <option value="In Progress" className="bg-[#1c1f2a] text-[#dfe2f1]">In Progress</option>
                            <option value="To Do" className="bg-[#1c1f2a] text-[#dfe2f1]">To Do</option>
                            <option value="Done" className="bg-[#1c1f2a] text-[#dfe2f1]">Done</option>
                          </select>
                        </td>

                        <td className="py-3">
                          <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] ${
                            t.priority === 'High'
                              ? 'bg-[#ffb4ab]/15 text-[#ffb4ab]'
                              : 'bg-[#313540] text-[#c2c6d6]'
                          }`}>
                            {t.priority}
                          </span>
                        </td>

                        <td className="py-3 hidden md:table-cell font-mono text-[11px] text-[#8c909f]">
                          <span className={t.isOverdue && !isDone ? 'text-[#ffb4ab] font-bold' : ''}>
                            {t.dueDate}
                          </span>
                        </td>

                        <td className="py-3 pr-2 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {t.assignee.avatar ? (
                              <img
                                src={t.assignee.avatar}
                                alt={t.assignee.name}
                                className="w-5 h-5 rounded-full object-cover border border-[#424754]"
                              />
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-[#313540] text-[9px] font-mono flex items-center justify-center text-[#8c909f]">
                                {t.assignee.initials || 'UA'}
                              </span>
                            )}
                            <span className="text-[11px] text-[#c2c6d6] hidden lg:inline truncate max-w-[80px]">
                              {t.assignee.name}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Weekly Summary & Sprint Stats */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weekly Summary */}
          <div className="bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-5 shadow-lg space-y-4">
            <h2 className="text-base font-semibold text-[#dfe2f1] tracking-tight">
              Weekly Summary
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#0a0e18] rounded-lg border border-[#424754]/40 text-center">
                <div className="text-[11px] font-mono text-[#8c909f]">Tasks Done</div>
                <div className="text-xl font-bold font-mono text-[#4cd7f6] mt-1">{tasksDoneCount}</div>
              </div>
              <div className="p-3 bg-[#0a0e18] rounded-lg border border-[#424754]/40 text-center">
                <div className="text-[11px] font-mono text-[#8c909f]">Overdue</div>
                <div className="text-xl font-bold font-mono text-[#ffb4ab] mt-1">{tasksOverdueCount}</div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-mono text-[#8c909f]">
                <span>Sprint Completion</span>
                <span className="text-[#dfe2f1]">68%</span>
              </div>
              <div className="h-2 bg-[#0a0e18] rounded-full overflow-hidden">
                <div className="h-full bg-[#4d8eff] w-[68%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Activity Stream */}
          <div className="bg-[#1c1f2a] border border-[#424754]/70 rounded-xl p-5 shadow-lg">
            <h2 className="text-base font-semibold text-[#dfe2f1] tracking-tight mb-3">
              Team Pulse
            </h2>

            <div className="space-y-3">
              {activities.map((act) => (
                <div key={act.id} className="text-xs flex gap-2.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#313540] flex items-center justify-center text-[#adc6ff] shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[#dfe2f1] leading-tight">
                      <strong>{act.user}</strong> {act.action} <span className="text-[#4cd7f6]">{act.target}</span>
                    </p>
                    <span className="text-[10px] font-mono text-[#8c909f] block mt-0.5">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet Modal */}
      {showMobileFilterSheet && (
        <div className="fixed inset-0 z-50 bg-[#0f131d]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#1c1f2a] border-t sm:border border-[#424754] rounded-t-2xl sm:rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#dfe2f1]">Filter Projects & Tasks</h3>
              <button onClick={() => setShowMobileFilterSheet(false)} className="text-[#8c909f] hover:text-[#dfe2f1]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-[#8c909f] block mb-1.5">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {['All', 'In Progress', 'Planning', 'On Track', 'At Risk'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatusFilter(st)}
                      className={`p-2 rounded text-xs font-mono border ${
                        selectedStatusFilter === st
                          ? 'bg-[#4d8eff] text-[#00285d] font-semibold border-[#4d8eff]'
                          : 'bg-[#0a0e18] text-[#c2c6d6] border-[#424754]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#8c909f] block mb-1.5">Priority</label>
                <div className="grid grid-cols-3 gap-2">
                  {['All', 'High', 'Med'].map((pr) => (
                    <button
                      key={pr}
                      onClick={() => setSelectedPriorityFilter(pr)}
                      className={`p-2 rounded text-xs font-mono border ${
                        selectedPriorityFilter === pr
                          ? 'bg-[#4cd7f6] text-[#003640] font-semibold border-[#4cd7f6]'
                          : 'bg-[#0a0e18] text-[#c2c6d6] border-[#424754]'
                      }`}
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowMobileFilterSheet(false)}
                className="w-full py-2.5 bg-[#4d8eff] text-[#00285d] rounded-lg font-mono text-xs font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
