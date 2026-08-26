import React, { useState, useEffect } from 'react';
import { 
  AppView, 
  Project, 
  TaskItem, 
  ActivityItem, 
  WorkspaceDocument, 
  ChatMessage 
} from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_TASKS, 
  INITIAL_ACTIVITIES, 
  INITIAL_DOCUMENTS, 
  INITIAL_CHAT_MESSAGES 
} from './data/initialData';

import { TopNav } from './components/Navigation/TopNav';
import { Sidebar } from './components/Navigation/Sidebar';
import { MobileDrawer } from './components/Navigation/MobileDrawer';
import { MobileBottomNav } from './components/Navigation/MobileBottomNav';
import { LandingView } from './components/Views/LandingView';
import { DashboardView } from './components/Views/DashboardView';
import { WorkspaceView } from './components/Views/WorkspaceView';
import { ProjectsView } from './components/Views/ProjectsView';
import { PricingView } from './components/Views/PricingView';
import { AnalyticsView } from './components/Views/AnalyticsView';
import { SettingsView } from './components/Views/SettingsView';
import { Footer } from './components/Shared/Footer';
import { NewProjectModal } from './components/Modals/NewProjectModal';
import { AiActionModal } from './components/Modals/AiActionModal';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [documents, setDocuments] = useState<WorkspaceDocument[]>(INITIAL_DOCUMENTS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [aiActionModal, setAiActionModal] = useState<{
    isOpen: boolean;
    type: 'summary' | 'plan' | 'audit' | null;
  }>({
    isOpen: false,
    type: null
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic browser document title update
  useEffect(() => {
    const titleMap: Record<AppView, string> = {
      landing: 'NEXORA AI | AI Productivity Workspace',
      dashboard: 'Dashboard | NEXORA AI',
      workspace: 'AI Workspace | NEXORA AI',
      projects: 'Projects & Tasks | NEXORA AI',
      pricing: 'Pricing | NEXORA AI',
      analytics: 'Analytics | NEXORA AI',
      settings: 'Settings | NEXORA AI',
    };
    document.title = titleMap[currentView] || 'NEXORA AI';
  }, [currentView]);

  // Lock scroll when modals are open
  useEffect(() => {
    if (isNewProjectModalOpen || aiActionModal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNewProjectModalOpen, aiActionModal.isOpen]);

  // Task interactions
  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'Done' ? 'In Progress' : 'Done';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleUpdateTaskStatus = (taskId: string, status: 'In Progress' | 'To Do' | 'Done') => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const handleAddTask = (newTaskPartial: Partial<TaskItem>) => {
    const createdTask: TaskItem = {
      id: newTaskPartial.id || `task-${Date.now()}`,
      name: newTaskPartial.name || 'New Task',
      project: newTaskPartial.project || 'Nexus Engine Upgrade',
      status: newTaskPartial.status || 'In Progress',
      priority: newTaskPartial.priority || 'High',
      dueDate: newTaskPartial.dueDate || 'Today',
      assignee: newTaskPartial.assignee || {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      }
    };
    setTasks(prev => [createdTask, ...prev]);

    // Add activity
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      user: 'Alex Morgan',
      action: 'created task',
      target: createdTask.name,
      time: 'Just now',
      type: 'update',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    };
    setActivities(prev => [newAct, ...prev]);
  };

  const handleCreateProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      user: 'Alex Morgan',
      action: 'launched project',
      target: newProject.title,
      time: 'Just now',
      type: 'status_change',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    };
    setActivities(prev => [newAct, ...prev]);
  };

  // Workspace chat interactions
  const handleSendMessage = (text: string, referenceDoc?: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      referenceDoc,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Generate context-aware AI response simulation
    setTimeout(() => {
      let aiResponseText = `I have processed your query regarding "${text.slice(0, 30)}...". Context vectors and latest operational telemetry have been synchronized.`;
      
      let structuredList = undefined;
      let codeSnippet = undefined;
      let actions = [
        { id: 'act-create-task', label: 'Create Task from this summary', icon: 'task' },
        { id: 'act-gen-chart', label: 'Generate Chart', icon: 'chart' },
        { id: 'act-draft-email', label: 'Draft Email', icon: 'mail' }
      ];

      if (text.toLowerCase().includes('report') || text.toLowerCase().includes('executive')) {
        aiResponseText = `**Executive Briefing & Strategic Milestones:**\n\n1. **Core Pipeline:** Shader throughput optimized by **38%**, reducing end-to-end rendering cycle time.\n2. **Q4 Trajectory:** Enterprise ARR on pace for **$11.2M** (+22% QoQ).\n3. **Action:** Deploy autonomous data sync agent across all cluster nodes.`;
      } else if (text.toLowerCase().includes('pipeline') || text.toLowerCase().includes('code') || text.toLowerCase().includes('data')) {
        codeSnippet = {
          language: 'Python (Pipeline Async)',
          code: `async def sync_vector_cluster(cluster_id: str):\n    engine = NexoraVectorEngine(cluster_id)\n    await engine.reindex_embeddings(batch_size=512)\n    return {"status": "synchronized", "shards": 16}`
        };
      } else {
        structuredList = [
          {
            category: 'Operational Throughput',
            metric: '99.98% Healthy',
            detail: 'All vector ingestion clusters operating within sub-15ms thresholds.'
          },
          {
            category: 'Resource Utilization',
            metric: '64% Allocated',
            detail: 'Compute headroom available for automated background agents.'
          }
        ];
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        structuredList,
        codeSnippet,
        actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiMsg]);
    }, 700);
  };

  const handleAddDocument = (doc: WorkspaceDocument) => {
    setDocuments(prev => [doc, ...prev]);
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const isMarketingView = currentView === 'landing' || currentView === 'pricing';

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Workspace Dashboard';
      case 'workspace': return 'AI Workspace & Assistant';
      case 'projects': return 'Projects & Backlog';
      case 'analytics': return 'Telemetry & Analytics';
      case 'settings': return 'Workspace Settings';
      default: return 'NEXORA AI';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f131d] text-[#dfe2f1] font-sans flex flex-col selection:bg-[#4d8eff] selection:text-[#00285d]">
      {/* Mobile Slide-Over Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setIsMobileMenuOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        documents={documents}
        onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
      />

      {/* New Project Creation Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />

      {/* AI Action Execution Modal */}
      <AiActionModal
        isOpen={aiActionModal.isOpen}
        onClose={() => setAiActionModal({ isOpen: false, type: null })}
        actionType={aiActionModal.type}
      />

      {/* Marketing Views (Landing & Pricing) */}
      {isMarketingView ? (
        <div className="flex flex-col min-h-screen">
          <TopNav
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            isDashboardOrApp={false}
          />
          <main className="flex-1">
            {currentView === 'landing' && (
              <LandingView
                onNavigate={(view) => {
                  setCurrentView(view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
            {currentView === 'pricing' && (
              <PricingView
                onNavigate={(view) => {
                  setCurrentView(view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </main>
          <Footer onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        </div>
      ) : (
        /* App/Dashboard Workspace Layout */
        <div className="flex min-h-screen">
          {/* Desktop Left Sidebar */}
          <Sidebar
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
          />

          {/* Main App Container */}
          <div className="flex-1 flex flex-col md:pl-64 min-w-0 pb-16 md:pb-0">
            <TopNav
              currentView={currentView}
              onNavigate={(view) => {
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
              onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              title={getViewTitle()}
              isDashboardOrApp={true}
            />

            <main className="flex-1 overflow-x-hidden">
              {currentView === 'dashboard' && (
                <DashboardView
                  projects={projects}
                  tasks={tasks}
                  activities={activities}
                  onNavigate={setCurrentView}
                  onToggleTask={handleToggleTask}
                  onAddTask={handleAddTask}
                  onOpenAiAction={(type) => setAiActionModal({ isOpen: true, type })}
                  onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
                />
              )}

              {currentView === 'workspace' && (
                <WorkspaceView
                  chatMessages={chatMessages}
                  documents={documents}
                  onSendMessage={handleSendMessage}
                  onAddDocument={handleAddDocument}
                  onRemoveDocument={handleRemoveDocument}
                  onAddTaskFromSummary={(title) => {
                    handleAddTask({
                      name: title,
                      project: 'Client Portal v2',
                      priority: 'High'
                    });
                  }}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'projects' && (
                <ProjectsView
                  projects={projects}
                  tasks={tasks}
                  activities={activities}
                  onToggleTask={handleToggleTask}
                  onUpdateTaskStatus={handleUpdateTaskStatus}
                  onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
                  onAddTask={handleAddTask}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'analytics' && (
                <AnalyticsView onNavigate={setCurrentView} />
              )}

              {currentView === 'settings' && (
                <SettingsView onNavigate={setCurrentView} />
              )}
            </main>
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <MobileBottomNav
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
