import { Project, TaskItem, ActivityItem, WorkspaceDocument, ChatMessage, PricingPlan } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Nexus Engine Upgrade',
    subtitle: 'Core data processing & WebGL pipeline',
    status: 'In Progress',
    tag: 'High Priority',
    tagType: 'priority',
    budget: { spent: 45000, total: 60000 },
    daysLeft: 12,
    progress: 78,
    nextStep: 'Finalize WebGL shader integration',
    tasks: [
      { id: 't1-1', title: 'Data pipeline refactor', completed: true },
      { 
        id: 't1-2', 
        title: 'Optimize shader compilation', 
        completed: false, 
        assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' 
      },
      { id: 't1-3', title: 'Update LLM context window', completed: false },
    ],
    additionalTasksCount: 4,
    assignees: [
      { name: 'Alex M.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      { name: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      { name: 'Marcus K.', initials: '+2' }
    ],
    dueDate: 'Oct 12'
  },
  {
    id: 'proj-2',
    title: 'Client Portal v2',
    subtitle: 'Enterprise self-service management interface',
    status: 'Planning',
    tag: 'Client Facing',
    tagType: 'client',
    budget: { spent: 2000, total: 15000 },
    daysLeft: 30,
    progress: 15,
    nextStep: 'Wireframe user flows with design team',
    tasks: [
      { id: 't2-1', title: 'Design System Audit', completed: false, priority: 'Med' },
      { id: 't2-2', title: 'Wireframe user flows', completed: false },
      { id: 't2-3', title: 'Stakeholder Review', completed: false },
    ],
    additionalTasksCount: 12,
    assignees: [
      { name: 'David R.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
    ],
    dueDate: 'Nov 05'
  },
  {
    id: 'proj-3',
    title: 'Project Alpha',
    subtitle: 'Q3 Marketing Campaign & Launch Architecture',
    status: 'On Track',
    tag: 'On Track',
    tagType: 'status',
    budget: { spent: 18000, total: 24000 },
    daysLeft: 8,
    progress: 75,
    nextStep: 'Finalize API Specs',
    tasks: [
      { id: 't3-1', title: 'Draft Q3 Report', completed: true },
      { id: 't3-2', title: 'Asset bundle optimization', completed: false },
    ],
    additionalTasksCount: 3,
    assignees: [
      { name: 'Jessica D.', initials: 'JD' },
      { name: 'Sam A.', initials: 'SA' }
    ],
    dueDate: 'Oct 12'
  },
  {
    id: 'proj-4',
    title: 'Nebula Sync',
    subtitle: 'Distributed vector database sync engine',
    status: 'At Risk',
    tag: 'At Risk',
    tagType: 'priority',
    budget: { spent: 32000, total: 40000 },
    daysLeft: 5,
    progress: 40,
    nextStep: 'Database Migration',
    tasks: [
      { id: 't4-1', title: 'Resolve connection pool lock', completed: false },
      { id: 't4-2', title: 'Partition shard indexing', completed: false },
    ],
    additionalTasksCount: 6,
    assignees: [
      { name: 'Mike K.', initials: 'MK' },
      { name: 'Anna L.', initials: 'AL' },
      { name: 'Ryan J.', initials: 'RJ' }
    ],
    dueDate: 'Oct 20'
  },
  {
    id: 'proj-5',
    title: 'Data Pipeline',
    subtitle: 'Automated ETL ingestion with sub-second latency',
    status: 'On Track',
    tag: 'On Track',
    tagType: 'status',
    budget: { spent: 54000, total: 60000 },
    daysLeft: 18,
    progress: 90,
    nextStep: 'QA Sign-off',
    tasks: [
      { id: 't5-1', title: 'End-to-end load testing', completed: true },
      { id: 't5-2', title: 'Security audit certificate', completed: true },
    ],
    additionalTasksCount: 2,
    assignees: [
      { name: 'Tom J.', initials: 'TJ' }
    ],
    dueDate: 'Nov 02'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    name: 'Implement WebGL Shaders',
    project: 'Nexus Engine Upgrade',
    status: 'In Progress',
    priority: 'High',
    dueDate: 'Oct 10',
    isOverdue: true,
    assignee: {
      name: 'Sarah J.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'task-2',
    name: 'Update API Documentation',
    project: 'Nexus Engine Upgrade',
    status: 'To Do',
    priority: 'Med',
    dueDate: 'Oct 15',
    assignee: {
      name: 'Unassigned',
      initials: 'UA',
      unassigned: true
    }
  },
  {
    id: 'task-3',
    name: 'Review Auth API',
    project: 'Client Portal v2',
    status: 'Done',
    priority: 'Med',
    dueDate: 'Oct 08',
    assignee: {
      name: 'Alex M.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'task-4',
    name: 'Review PR #102',
    project: 'Nebula Sync',
    status: 'In Progress',
    priority: 'High',
    dueDate: 'Today',
    assignee: {
      name: 'John D.',
      initials: 'JD'
    }
  },
  {
    id: 'task-5',
    name: 'Update design system docs',
    project: 'Client Portal v2',
    status: 'To Do',
    priority: 'Med',
    dueDate: 'Tomorrow',
    assignee: {
      name: 'Sarah A.',
      initials: 'SA'
    }
  },
  {
    id: 'task-6',
    name: 'Client meeting prep',
    project: 'Project Alpha',
    status: 'To Do',
    priority: 'High',
    dueDate: 'Wed 12th',
    assignee: {
      name: 'Mike K.',
      initials: 'MK'
    }
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    user: 'Sarah J.',
    action: 'completed',
    target: 'Data pipeline refactor',
    time: '2 hours ago',
    type: 'complete',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'act-2',
    user: 'Alex M.',
    action: 'commented on',
    target: 'Client Portal v2',
    time: '4 hours ago',
    type: 'comment',
    commentText: '"We need to align with marketing on these wireframes before Friday\'s sync..."',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'act-3',
    user: 'Automation',
    action: 'completed:',
    target: '12 documents indexed into vector context',
    time: '1 hour ago',
    type: 'automation'
  },
  {
    id: 'act-4',
    user: 'System',
    action: 'Project shifted to',
    target: 'Nexus Engine Upgrade → In Progress',
    time: 'Yesterday',
    type: 'status_change'
  }
];

export const INITIAL_DOCUMENTS: WorkspaceDocument[] = [
  {
    id: 'doc-1',
    name: 'Q3_Revenue_Final.csv',
    source: 'Google Drive • 245 KB',
    size: '245 KB',
    status: 'Processed',
    icon: 'csv'
  },
  {
    id: 'doc-2',
    name: 'Project_Brief_v2.pdf',
    source: 'Slack • 1.2 MB',
    size: '1.2 MB',
    status: 'Processing',
    icon: 'pdf'
  },
  {
    id: 'doc-3',
    name: 'data_pipeline_v2.py',
    source: 'GitHub • 48 KB',
    size: '48 KB',
    status: 'Ready',
    icon: 'code'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'Can you analyze the attached Q3 revenue dataset and provide a breakdown of the top performing product categories? Please structure it clearly.',
    referenceDoc: 'Document Q3_Revenue_Final.csv',
    timestamp: '10:42 AM'
  },
  {
    id: 'msg-2',
    sender: 'ai',
    text: 'Based on the Q3 revenue dataset, here is the analysis of the top-performing product categories. The data indicates a strong shift towards enterprise solutions.',
    structuredList: [
      {
        category: 'Cloud Infrastructure',
        metric: '$4.2M (Up 18% YoY)',
        detail: 'Driven by new enterprise migrations and high-concurrency clusters.'
      },
      {
        category: 'Security Modules',
        metric: '$2.8M (Up 25% YoY)',
        detail: 'Highest growth segment this quarter with zero churn.'
      },
      {
        category: 'Analytics Tools',
        metric: '$1.5M (Flat)',
        detail: 'Stable recurring revenue across Tier-1 mid-market teams.'
      }
    ],
    codeSnippet: {
      language: 'Python (Pandas)',
      code: `import pandas as pd

# Load Q3 Data
df = pd.read_csv('q3_revenue.csv')

# Group by category and sum revenue
category_revenue = df.groupby('Category')['Revenue'].sum().sort_values(ascending=False)
print(category_revenue.head(3))`
    },
    actions: [
      { id: 'act-create-task', label: 'Create Task from this summary', icon: 'task' },
      { id: 'act-gen-chart', label: 'Generate Chart', icon: 'chart' },
      { id: 'act-draft-email', label: 'Draft Email', icon: 'mail' }
    ],
    timestamp: '10:43 AM'
  },
  {
    id: 'msg-3',
    sender: 'user',
    text: 'Draft a brief executive summary based on this.',
    timestamp: '10:45 AM'
  },
  {
    id: 'msg-4',
    sender: 'ai',
    text: '**Executive Summary: Q3 Performance Overview**\n\nQ3 delivered strong operational momentum with **$8.5M total revenue** (+16.4% YoY), primarily accelerated by Enterprise Cloud Infrastructure ($4.2M) and Security Modules ($2.8M). Operational efficiency improved by **12%**, reducing overall customer acquisition cost by **$40/seat**.\n\n*Strategic Recommendations:*\n1. Double down on security module add-ons during Q4 renewal cycles.\n2. Standardize automated shader pipelines to preserve 99.98% SLA margins.\n3. Deploy the autonomous data sync agent across all enterprise clusters.',
    timestamp: '10:45 AM'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Essential tools for individuals starting out.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    buttonLabel: 'Start Free',
    features: [
      'Basic AI tools',
      '1 active project',
      '100 AI Queries / mo',
      'Standard Models',
      'Community support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Full AI workspace for professionals.',
    monthlyPrice: 24,
    yearlyPrice: 19,
    popular: true,
    buttonLabel: 'Upgrade to Pro',
    features: [
      'Full AI workspace access',
      'Unlimited projects',
      'Advanced models (GPT-4o, Claude 3.5, Gemini 2.0)',
      'Advanced analytics & reporting',
      'Priority email support',
      'Autonomous agent execution',
      'Unlimited context document parsing'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Tailored solutions for scaling teams.',
    monthlyPrice: 79,
    yearlyPrice: 65,
    buttonLabel: 'Contact Sales',
    features: [
      'Custom AI model training & fine-tuning',
      'Advanced team permissions & RBAC',
      'SSO & advanced enterprise security',
      '24/7 dedicated priority support',
      'Custom SLAs (99.99% uptime)',
      'Dedicated Account Manager',
      'On-premise / VPC deployment options'
    ]
  }
];
