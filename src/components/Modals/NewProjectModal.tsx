import React, { useState } from 'react';
import { Project } from '../../types';
import { X, Plus, Calendar, DollarSign, Tag, Users } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Project) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [tag, setTag] = useState('High Priority');
  const [status, setStatus] = useState<'In Progress' | 'Planning' | 'Review' | 'On Track' | 'At Risk'>('In Progress');
  const [totalBudget, setTotalBudget] = useState('50000');
  const [dueDate, setDueDate] = useState('Nov 15');
  const [nextStep, setNextStep] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'New initiative workflow',
      status: status,
      tag: tag,
      tagType: tag.includes('Priority') ? 'priority' : 'status',
      budget: { spent: 0, total: parseInt(totalBudget) || 50000 },
      daysLeft: 30,
      progress: 0,
      nextStep: nextStep.trim() || 'Kickoff sprint planning with team',
      tasks: [],
      assignees: [
        { name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
      ],
      dueDate: dueDate
    };

    onCreateProject(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f131d]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1c1f2a] border border-[#424754] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#424754]/60 pb-3">
          <h3 className="text-lg font-bold text-[#dfe2f1]">Create New Initiative</h3>
          <button onClick={onClose} aria-label="Close modal" className="text-[#8c909f] hover:text-[#dfe2f1] p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="project-title" className="text-xs font-mono text-[#8c909f] block mb-1">Project Title *</label>
            <input
              id="project-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Quantum Vector Indexer"
              className="w-full bg-[#0a0e18] border border-[#424754] rounded-lg p-2.5 text-xs sm:text-sm text-[#dfe2f1] focus:outline-none focus:border-[#4cd7f6]"
            />
          </div>

          <div>
            <label htmlFor="project-subtitle" className="text-xs font-mono text-[#8c909f] block mb-1">Subtitle / Objective</label>
            <input
              id="project-subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Sub-millisecond distributed semantic embeddings"
              className="w-full bg-[#0a0e18] border border-[#424754] rounded-lg p-2.5 text-xs text-[#dfe2f1] focus:outline-none focus:border-[#4cd7f6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="project-status" className="text-xs font-mono text-[#8c909f] block mb-1">Initial Status</label>
              <select
                id="project-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#0a0e18] border border-[#424754] rounded-lg p-2 text-xs text-[#dfe2f1]"
              >
                <option value="In Progress">In Progress</option>
                <option value="Planning">Planning</option>
                <option value="On Track">On Track</option>
                <option value="At Risk">At Risk</option>
              </select>
            </div>

            <div>
              <label htmlFor="project-tag" className="text-xs font-mono text-[#8c909f] block mb-1">Tag / Priority</label>
              <select
                id="project-tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-[#0a0e18] border border-[#424754] rounded-lg p-2 text-xs text-[#dfe2f1]"
              >
                <option value="High Priority">High Priority</option>
                <option value="Client Facing">Client Facing</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="AI Engine">AI Engine</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="project-budget" className="text-xs font-mono text-[#8c909f] block mb-1">Budget ($)</label>
              <input
                id="project-budget"
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
                className="w-full bg-[#0a0e18] border border-[#424754] rounded-lg p-2 text-xs text-[#dfe2f1] font-mono"
              />
            </div>

            <div>
              <label htmlFor="project-due-date" className="text-xs font-mono text-[#8c909f] block mb-1">Target Due Date</label>
              <input
                id="project-due-date"
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="e.g. Dec 01"
                className="w-full bg-[#0a0e18] border border-[#424754] rounded-lg p-2 text-xs text-[#dfe2f1] font-mono"
              />
            </div>
          </div>

          <div>
            <label htmlFor="project-next-step" className="text-xs font-mono text-[#8c909f] block mb-1">Next Immediate Action</label>
            <input
              id="project-next-step"
              type="text"
              value={nextStep}
              onChange={(e) => setNextStep(e.target.value)}
              placeholder="e.g. Provision cloud TPU cluster"
              className="w-full bg-[#0a0e18] border border-[#424754] rounded-lg p-2 text-xs text-[#dfe2f1]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#424754]/50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-[#8c909f] hover:text-[#dfe2f1]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4d8eff] hover:bg-[#adc6ff] text-[#00285d] font-mono text-xs font-bold px-5 py-2 rounded-lg transition-all shadow-md"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
