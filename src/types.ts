export type AppView = 'landing' | 'dashboard' | 'workspace' | 'projects' | 'pricing' | 'analytics' | 'settings';

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  assigneeAvatar?: string;
  priority?: 'High' | 'Med' | 'Low';
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  status: 'In Progress' | 'Planning' | 'Review' | 'Completed' | 'At Risk' | 'On Track';
  tag?: string;
  tagType?: 'priority' | 'client' | 'status';
  budget?: { spent: number; total: number };
  daysLeft?: number;
  progress: number;
  nextStep?: string;
  tasks?: ProjectTask[];
  additionalTasksCount?: number;
  assignees: {
    name: string;
    avatar?: string;
    initials?: string;
  }[];
  dueDate?: string;
}

export interface TaskItem {
  id: string;
  name: string;
  project: string;
  status: 'In Progress' | 'To Do' | 'Done';
  priority: 'High' | 'Med' | 'Low';
  dueDate: string;
  isOverdue?: boolean;
  assignee: {
    name: string;
    avatar?: string;
    initials?: string;
    unassigned?: boolean;
  };
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'complete' | 'comment' | 'status_change' | 'update' | 'automation';
  commentText?: string;
  avatar?: string;
  icon?: string;
}

export interface WorkspaceDocument {
  id: string;
  name: string;
  source: string;
  size: string;
  status: 'Processed' | 'Processing' | 'Ready';
  icon: 'csv' | 'pdf' | 'code' | 'doc';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  referenceDoc?: string;
  timestamp?: string;
  structuredList?: {
    category: string;
    metric: string;
    detail: string;
  }[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  actions?: {
    id: string;
    label: string;
    icon: string;
  }[];
  isStreaming?: boolean;
}

export interface PricingPlan {
  id: 'free' | 'pro' | 'enterprise';
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  buttonLabel: string;
  features: string[];
}
