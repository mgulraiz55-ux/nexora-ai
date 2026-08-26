import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatMessage, 
  WorkspaceDocument, 
  AppView, 
  TaskItem 
} from '../../types';
import { 
  Sparkles, 
  Bot, 
  Paperclip, 
  Send, 
  Copy, 
  Check, 
  FileText, 
  FileSpreadsheet, 
  Code2, 
  Plus, 
  CheckSquare, 
  BarChart2, 
  Mail, 
  ChevronDown, 
  Trash2, 
  Clock, 
  FileCheck2,
  RefreshCw,
  X,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface WorkspaceViewProps {
  chatMessages: ChatMessage[];
  documents: WorkspaceDocument[];
  onSendMessage: (text: string, referenceDoc?: string) => void;
  onAddDocument: (doc: WorkspaceDocument) => void;
  onRemoveDocument: (id: string) => void;
  onAddTaskFromSummary: (taskTitle: string) => void;
  onNavigate: (view: AppView) => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  chatMessages,
  documents,
  onSendMessage,
  onAddDocument,
  onRemoveDocument,
  onAddTaskFromSummary,
  onNavigate
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState<'GPT-4o' | 'Gemini 2.0 Flash' | 'Claude 3.5'>('GPT-4o');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [taskCreatedToast, setTaskCreatedToast] = useState<string | null>(null);
  const [activeChartModal, setActiveChartModal] = useState(false);
  const [activeEmailModal, setActiveEmailModal] = useState(false);
  const [showContextSidebarMobile, setShowContextSidebarMobile] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>('Q3_Revenue_Final.csv');
  const [isUploading, setIsUploading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim(), selectedAttachment || undefined);
    setInputText('');
  };

  const handleQuickChip = (chipText: string) => {
    if (chipText === 'Draft Report') {
      setInputText('Draft an executive Q3 performance report with strategic next steps.');
    } else if (chipText === 'Analyze Data') {
      setInputText('Analyze the variance between Cloud Infrastructure and Security module revenue.');
    } else if (chipText === 'Plan Project') {
      setInputText('Create a 4-week sprint execution plan for Nexus Engine Upgrade.');
    } else if (chipText === 'Saved Prompts') {
      setInputText('Perform automated security and code quality audit on current pipeline scripts.');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleActionClick = (actionId: string) => {
    if (actionId === 'act-create-task') {
      onAddTaskFromSummary('Q3 Revenue Follow-up: Scale Security Module Add-ons');
      setTaskCreatedToast('Task created: "Q3 Revenue Follow-up" in Projects list!');
      setTimeout(() => setTaskCreatedToast(null), 3500);
    } else if (actionId === 'act-gen-chart') {
      setActiveChartModal(true);
    } else if (actionId === 'act-draft-email') {
      setActiveEmailModal(true);
    }
  };

  const handleSimulateFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newDoc: WorkspaceDocument = {
        id: `doc-${Date.now()}`,
        name: `Engineering_Roadmap_Q4.pdf`,
        source: `Upload • 512 KB`,
        size: `512 KB`,
        status: `Ready`,
        icon: 'pdf'
      };
      onAddDocument(newDoc);
      setSelectedAttachment(newDoc.name);
      setIsUploading(false);
    }, 800);
  };

  return (
    <div className="h-[calc(100dvh-7.5rem)] md:h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden bg-[#0f131d] w-full max-w-full min-w-0">
      {/* Toast Notification */}
      {taskCreatedToast && (
        <div className="fixed top-16 sm:top-20 right-4 sm:right-6 z-50 bg-[#4cd7f6] text-[#003640] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 duration-200 max-w-[90vw]">
          <Check className="w-4 h-4 shrink-0" />
          <span className="truncate">{taskCreatedToast}</span>
        </div>
      )}

      {/* Main Chat Canvas (Left / Middle) */}
      <div className="flex-1 flex flex-col h-full min-w-0 w-full border-r border-[#424754]/40 overflow-hidden">
        {/* Workspace Sub-header */}
        <div className="h-14 bg-[#171b26] border-b border-[#424754]/60 px-3 sm:px-4 md:px-6 flex items-center justify-between shrink-0 gap-2 w-full min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-7 h-7 rounded-md bg-[#4d8eff]/15 text-[#adc6ff] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xs sm:text-sm font-semibold text-[#dfe2f1] truncate">
                Data Analysis Assistant
              </h2>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#8c909f] truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse shrink-0"></span>
                <span className="truncate">Active Context: {selectedAttachment || 'All Documents'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Model Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="bg-[#0a0e18] border border-[#424754] text-[#dfe2f1] text-[11px] sm:text-xs font-mono px-2 sm:px-2.5 py-1 rounded-md flex items-center gap-1 sm:gap-1.5 hover:border-[#4cd7f6] transition-colors"
              >
                <span className="text-[#8c909f] hidden sm:inline">Model:</span>
                <span className="text-[#4cd7f6] font-semibold">{selectedModel}</span>
                <ChevronDown className="w-3 h-3 text-[#8c909f]" />
              </button>

              {showModelDropdown && (
                <div className="absolute right-0 mt-1.5 w-44 bg-[#1c1f2a] border border-[#424754] rounded-lg shadow-xl z-50 overflow-hidden text-xs font-mono">
                  {(['GPT-4o', 'Gemini 2.0 Flash', 'Claude 3.5'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setSelectedModel(m);
                        setShowModelDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-[#262a35] transition-colors flex items-center justify-between ${
                        selectedModel === m ? 'text-[#4cd7f6] bg-[#0a0e18]' : 'text-[#dfe2f1]'
                      }`}
                    >
                      <span>{m}</span>
                      {selectedModel === m && <Check className="w-3.5 h-3.5 text-[#4cd7f6]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Context Drawer Toggle */}
            <button
              onClick={() => setShowContextSidebarMobile(!showContextSidebarMobile)}
              className="lg:hidden p-1.5 text-[#c2c6d6] hover:text-[#dfe2f1] hover:bg-[#262a35] rounded-md transition-colors"
              title="Toggle context files"
              aria-label="Toggle context files"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat History Messages Stream */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 w-full min-w-0">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2 sm:gap-3 md:gap-4 ${isUser ? 'justify-end' : 'justify-start'} w-full min-w-0 max-w-full`}
              >
                {!isUser && (
                  <div className="w-7 h-7 sm:w-8 h-8 rounded-lg bg-[#313540] border border-[#424754] flex items-center justify-center shrink-0 text-[#4cd7f6] mt-0.5 shadow-sm">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                )}

                <div className={`w-full max-w-[85%] sm:max-w-[80%] md:max-w-2xl space-y-2.5 sm:space-y-3 min-w-0 ${isUser ? 'items-end text-right ml-auto' : 'items-start text-left mr-auto'}`}>
                  {/* Message Bubble */}
                  <div
                    className={`rounded-xl p-3 sm:p-4 text-xs sm:text-sm leading-relaxed min-w-0 max-w-full break-words [overflow-wrap:anywhere] ${
                      isUser
                        ? 'bg-[#4d8eff] text-[#00285d] font-medium shadow-[0_0_15px_rgba(77,142,255,0.2)]'
                        : 'bg-[#1c1f2a] border border-[#424754]/70 text-[#dfe2f1] shadow-md'
                    }`}
                  >
                    {/* Reference doc pill for user message */}
                    {msg.referenceDoc && isUser && (
                      <div className="mb-2 inline-flex items-center gap-1 bg-[#00285d]/30 text-[#00285d] border border-[#00285d]/30 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono max-w-full truncate">
                        <Paperclip className="w-3 h-3 shrink-0" />
                        <span className="truncate">{msg.referenceDoc}</span>
                      </div>
                    )}

                    <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{msg.text}</p>

                    {/* Structured List Card if available */}
                    {msg.structuredList && (
                      <div className="mt-3 sm:mt-4 space-y-2 text-left w-full min-w-0">
                        {msg.structuredList.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-[#0a0e18] border border-[#424754]/50 rounded-lg p-2.5 sm:p-3 space-y-1 w-full min-w-0"
                          >
                            <div className="flex items-center justify-between gap-2 min-w-0">
                              <span className="font-semibold text-xs text-[#dfe2f1] font-mono truncate">
                                {item.category}
                              </span>
                              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#4cd7f6] bg-[#03b5d3]/10 px-2 py-0.5 rounded shrink-0">
                                {item.metric}
                              </span>
                            </div>
                            <p className="text-xs text-[#c2c6d6] break-words [overflow-wrap:anywhere]">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Code Snippet Card with Copy Button */}
                    {msg.codeSnippet && (
                      <div className="mt-3 sm:mt-4 rounded-lg overflow-hidden border border-[#424754] bg-[#0a0e18] text-left w-full min-w-0 max-w-full">
                        <div className="bg-[#171b26] px-3 py-1.5 flex items-center justify-between border-b border-[#424754]/60 gap-2">
                          <span className="text-[10px] sm:text-[11px] font-mono text-[#8c909f] truncate">
                            {msg.codeSnippet.language}
                          </span>
                          <button
                            onClick={() => handleCopy(msg.codeSnippet!.code)}
                            className="text-[10px] sm:text-[11px] font-mono text-[#adc6ff] hover:text-[#4cd7f6] flex items-center gap-1 transition-colors shrink-0"
                          >
                            {copiedCode ? (
                              <>
                                <Check className="w-3 h-3 text-[#4cd7f6]" />
                                <span className="text-[#4cd7f6]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-2.5 sm:p-3 text-[11px] sm:text-xs font-mono text-[#adc6ff] overflow-x-auto max-w-full selection:bg-[#4d8eff]/30 [scrollbar-width:thin]">
                          <code className="block whitespace-pre">{msg.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* AI Action Quick Buttons */}
                  {msg.actions && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 w-full max-w-full">
                      {msg.actions.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => handleActionClick(act.id)}
                          className="bg-[#171b26] hover:bg-[#262a35] border border-[#424754] hover:border-[#4cd7f6] text-[#dfe2f1] text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all active:scale-95 shadow-sm max-w-full"
                        >
                          {act.id === 'act-create-task' && <CheckSquare className="w-3.5 h-3.5 text-[#4cd7f6] shrink-0" />}
                          {act.id === 'act-gen-chart' && <BarChart2 className="w-3.5 h-3.5 text-[#adc6ff] shrink-0" />}
                          {act.id === 'act-draft-email' && <Mail className="w-3.5 h-3.5 text-[#dfe2f1] shrink-0" />}
                          <span className="truncate">{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.timestamp && (
                    <span className="text-[10px] font-mono text-[#8c909f] block px-1">
                      {msg.timestamp}
                    </span>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 sm:w-8 h-8 rounded-lg bg-[#4d8eff] text-[#00285d] flex items-center justify-center shrink-0 font-bold font-mono text-xs mt-0.5 shadow-sm">
                    U
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area & Quick Chips */}
        <div className="p-3 sm:p-4 bg-[#171b26] border-t border-[#424754]/60 space-y-2.5 sm:space-y-3 shrink-0 w-full min-w-0 overflow-hidden">
          {/* Quick Suggestions */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full hide-scrollbar [scrollbar-width:none]">
            {['Draft Report', 'Analyze Data', 'Plan Project', 'Saved Prompts'].map((chip) => (
              <button
                key={chip}
                onClick={() => handleQuickChip(chip)}
                className="bg-[#0f131d] hover:bg-[#262a35] border border-[#424754]/60 text-[#c2c6d6] hover:text-[#dfe2f1] text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Active attachment tag if present */}
          {selectedAttachment && (
            <div className="inline-flex items-center gap-1.5 bg-[#0a0e18] border border-[#424754] text-[#4cd7f6] px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono max-w-full min-w-0">
              <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Context: {selectedAttachment}</span>
              <button 
                onClick={() => setSelectedAttachment(null)}
                className="text-[#8c909f] hover:text-[#ffb4ab] ml-1 shrink-0 p-0.5"
                aria-label="Remove attachment"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Composer Form */}
          <form onSubmit={handleSend} className="relative flex items-center w-full min-w-0">
            <button
              type="button"
              onClick={handleSimulateFileUpload}
              className={`p-2.5 sm:p-3 text-[#8c909f] hover:text-[#4cd7f6] hover:bg-[#262a35] rounded-l-xl border-y border-l border-[#424754] transition-colors shrink-0 flex items-center justify-center ${
                isUploading ? 'animate-spin text-[#4cd7f6]' : ''
              }`}
              title="Attach document to context"
              aria-label="Attach document"
            >
              {isUploading ? <RefreshCw className="w-4 h-4" /> : <Paperclip className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Nexora anything or query attached context..."
              className="flex-1 min-w-0 bg-[#0a0e18] border-y border-[#424754] py-2.5 sm:py-3 px-2.5 sm:px-3 text-xs md:text-sm text-[#dfe2f1] placeholder:text-[#8c909f]/60 focus:outline-none font-sans"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-[#4d8eff] disabled:bg-[#313540] text-[#00285d] disabled:text-[#8c909f] p-2.5 sm:p-3 rounded-r-xl border-y border-r border-[#424754] hover:bg-[#adc6ff] transition-all flex items-center justify-center font-mono font-semibold shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {showContextSidebarMobile && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-[#0f131d]/75 backdrop-blur-xs" 
          onClick={() => setShowContextSidebarMobile(false)}
        />
      )}

      {/* Right Sidebar: Active Context & Recent History (Desktop + Mobile Drawer overlay) */}
      <aside
        className={`w-full lg:w-80 bg-[#1c1f2a] shrink-0 flex flex-col p-4 md:p-5 overflow-y-auto space-y-6 ${
          showContextSidebarMobile 
            ? 'fixed inset-y-0 right-0 z-50 w-72 sm:w-80 max-w-[85vw] shadow-2xl border-l border-[#424754] pt-4' 
            : 'hidden lg:flex'
        }`}
      >
        {/* Mobile Header for drawer */}
        {showContextSidebarMobile && (
          <div className="flex items-center justify-between lg:hidden pb-3 border-b border-[#424754]/60">
            <span className="text-xs font-mono font-bold text-[#dfe2f1]">Workspace Context</span>
            <button 
              onClick={() => setShowContextSidebarMobile(false)} 
              className="p-1 text-[#8c909f] hover:text-[#dfe2f1] rounded"
              aria-label="Close context sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Active Context Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8c909f]">
              Active Context
            </h3>
            <button
              onClick={handleSimulateFileUpload}
              className="text-xs font-mono text-[#adc6ff] hover:text-[#4cd7f6] flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2">
            {documents.map((doc) => {
              const isSelected = selectedAttachment === doc.name;
              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    setSelectedAttachment(isSelected ? null : doc.name);
                    if (showContextSidebarMobile) setShowContextSidebarMobile(false);
                  }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#0f131d] border-[#4cd7f6] shadow-[0_0_12px_rgba(76,215,246,0.15)]'
                      : 'bg-[#0f131d] border-[#424754]/60 hover:border-[#8c909f]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {doc.icon === 'csv' && <FileSpreadsheet className="w-4 h-4 text-[#4cd7f6] shrink-0" />}
                    {doc.icon === 'pdf' && <FileText className="w-4 h-4 text-[#4d8eff] shrink-0" />}
                    {doc.icon === 'code' && <Code2 className="w-4 h-4 text-[#adc6ff] shrink-0" />}
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#dfe2f1] truncate">{doc.name}</p>
                      <p className="text-[10px] text-[#8c909f] font-mono truncate">{doc.source}</p>
                    </div>
                  </div>

                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                    doc.status === 'Processed' || doc.status === 'Ready'
                      ? 'bg-[#4cd7f6]/10 text-[#4cd7f6]'
                      : 'bg-[#ffb4ab]/10 text-[#ffb4ab]'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent History Section */}
        <div className="pt-4 border-t border-[#424754]/50 flex-1">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#8c909f] mb-3">
            Recent History
          </h3>

          <div className="space-y-2">
            {[
              { title: 'API Latency Optimization', time: 'Yesterday' },
              { title: 'User Persona Synthesis', time: '3 days ago' },
              { title: 'Database Index Review', time: 'Oct 02' }
            ].map((hist, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setInputText(`Review previous analysis on ${hist.title}`);
                  if (showContextSidebarMobile) setShowContextSidebarMobile(false);
                }}
                className="p-2.5 bg-[#0f131d] border border-[#424754]/40 hover:border-[#adc6ff]/60 rounded-lg cursor-pointer transition-colors"
              >
                <p className="text-xs font-medium text-[#dfe2f1] truncate">{hist.title}</p>
                <span className="text-[10px] font-mono text-[#8c909f] block mt-0.5">{hist.time}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Chart Generator Modal Preview */}
      {activeChartModal && (
        <div className="fixed inset-0 z-50 bg-[#0f131d]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c1f2a] border border-[#424754] rounded-xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-semibold text-[#dfe2f1] flex items-center gap-2 truncate">
                <BarChart2 className="w-4 h-4 text-[#4cd7f6] shrink-0" />
                <span className="truncate">Generated Chart: Q3 Revenue</span>
              </h3>
              <button onClick={() => setActiveChartModal(false)} className="text-[#8c909f] hover:text-[#dfe2f1] p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#0a0e18] p-3 sm:p-4 rounded-lg border border-[#424754]/50 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-[#dfe2f1]">
                  <span>Cloud Infrastructure ($4.2M)</span>
                  <span className="text-[#4cd7f6]">50%</span>
                </div>
                <div className="h-3 bg-[#1c1f2a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4d8eff] w-[50%] rounded-full"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-[#dfe2f1]">
                  <span>Security Modules ($2.8M)</span>
                  <span className="text-[#4cd7f6]">33%</span>
                </div>
                <div className="h-3 bg-[#1c1f2a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4cd7f6] w-[33%] rounded-full"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-[#dfe2f1]">
                  <span>Analytics Tools ($1.5M)</span>
                  <span className="text-[#4cd7f6]">17%</span>
                </div>
                <div className="h-3 bg-[#1c1f2a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c4c7c9] w-[17%] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveChartModal(false)}
                className="px-4 py-2 bg-[#4d8eff] text-[#00285d] font-mono text-xs font-semibold rounded-lg hover:bg-[#adc6ff]"
              >
                Insert to Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Generator Modal Preview */}
      {activeEmailModal && (
        <div className="fixed inset-0 z-50 bg-[#0f131d]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c1f2a] border border-[#424754] rounded-xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-semibold text-[#dfe2f1] flex items-center gap-2 truncate">
                <Mail className="w-4 h-4 text-[#4cd7f6] shrink-0" />
                <span className="truncate">Drafted Stakeholder Email</span>
              </h3>
              <button onClick={() => setActiveEmailModal(false)} className="text-[#8c909f] hover:text-[#dfe2f1] p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#0a0e18] p-3 sm:p-4 rounded-lg border border-[#424754]/50 space-y-2 text-xs font-mono text-[#dfe2f1] break-words">
              <p><strong className="text-[#8c909f]">Subject:</strong> Q3 Revenue Performance & Category Breakdown</p>
              <hr className="border-[#424754]/40 my-2" />
              <p>Hi Team,</p>
              <p>Attached is the verified Q3 breakdown. Cloud Infrastructure surpassed targets at $4.2M (+18% YoY), while Security Modules reached $2.8M (+25% YoY).</p>
              <p>Best regards,<br />Nexora AI Assistant</p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText('Subject: Q3 Revenue Performance\n\nHi Team,\nAttached is the verified Q3 breakdown.');
                  setActiveEmailModal(false);
                }}
                className="px-4 py-2 bg-[#4d8eff] text-[#00285d] font-mono text-xs font-semibold rounded-lg hover:bg-[#adc6ff]"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
