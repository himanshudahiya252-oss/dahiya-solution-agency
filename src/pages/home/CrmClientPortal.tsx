import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, FolderKanban, ShieldCheck, DollarSign, FileText, Download, 
  Plus, Search, Filter, ArrowRight, CheckCircle2, ChevronRight, 
  Trash2, Briefcase, Eye, Clock, LayoutGrid
} from 'lucide-react';
import { Card, Button } from '../../components/ui';

import workspaceImage from '../../assets/images/modern_ai_workspace_1784272666662.jpg';

// Initial leads
const initialLeads = [
  { id: 'L-501', name: 'James Atherton', company: 'Pinnacle Capital', email: 'j.atherton@pinnacle.com', budget: '$150,000', status: 'In Contract' },
  { id: 'L-502', name: 'Sarah Sterling', company: 'Quantum Robotics', email: 's.sterling@quantum.io', budget: '$95,000', status: 'Scoped' },
  { id: 'L-503', name: 'Richard Feng', company: 'Megalith Inc', email: 'feng.r@megalith.com', budget: '$220,000', status: 'Lead' },
  { id: 'L-504', name: 'Elena Korolyova', company: 'Astra Biotech', email: 'elena@astra.co', budget: '$65,000', status: 'Contacted' }
];

// Kanban columns & cards
const initialKanbanTasks = [
  { id: 'T-1', title: 'Technical Architecture Review', desc: 'Syllabus and API structures analysis.', column: 'Lead', priority: 'High' },
  { id: 'T-2', title: 'Database Optimization', desc: 'Enforcing Spanner and Firestore partition layouts.', column: 'Contacted', priority: 'Medium' },
  { id: 'T-3', title: 'Integrate Live Dashboard API', desc: 'Connecting real-time sockets to analytics panel.', column: 'Scoped', priority: 'High' },
  { id: 'T-4', title: 'CMS Design & Structure', desc: 'Design UI layouts with custom themes.', column: 'In Contract', priority: 'Low' }
];

// Client portal projects
const portalProjects = [
  { name: 'Enterprise CRM Upgrade', progress: 75, status: 'Active Development', nextMilestone: 'Sprint 4: Draggable Boards' },
  { name: 'Predictive Lead Gen Engine', progress: 100, status: 'Completed & Live', nextMilestone: 'Signoff issued by Sahil Dahiya' }
];

// Invoices & Secure files list
const portalFiles = [
  { name: 'Security_Audit_Report_2026.pdf', size: '2.4 MB', type: 'Report' },
  { name: 'Dahiya_Solution_Invoice_INV-1092.pdf', size: '150 KB', type: 'Invoice' },
  { name: 'Core_System_Architecture_Layout.png', size: '4.8 MB', type: 'Asset' }
];

export default function CrmClientPortal() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'crm' | 'kanban' | 'portal'>('crm');
  
  // CRM states
  const [crmLeads, setCrmLeads] = useState(initialLeads);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadBudget, setNewLeadBudget] = useState('');

  // Kanban states
  const [kanbanTasks, setKanbanTasks] = useState(initialKanbanTasks);

  // Reports viewer state
  const [selectedReportType, setSelectedReportType] = useState('audit');
  const [reportLog, setReportLog] = useState('');

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadCompany) return;
    
    const newL = {
      id: `L-${500 + crmLeads.length + 1}`,
      name: newLeadName,
      company: newLeadCompany,
      email: `${newLeadName.toLowerCase().replace(' ', '.')}@${newLeadCompany.toLowerCase().replace(' ', '')}.com`,
      budget: newLeadBudget || '$50,000',
      status: 'Lead'
    };

    setCrmLeads([...crmLeads, newL]);
    setNewLeadName('');
    setNewLeadCompany('');
    setNewLeadBudget('');
  };

  // Move Kanban task to next column for easy interaction
  const advanceTask = (taskId: string) => {
    const columns = ['Lead', 'Contacted', 'Scoped', 'In Contract'];
    setKanbanTasks(
      kanbanTasks.map((t) => {
        if (t.id === taskId) {
          const currentColIdx = columns.indexOf(t.column);
          const nextColIdx = (currentColIdx + 1) % columns.length;
          return { ...t, column: columns[nextColIdx] };
        }
        return t;
      })
    );
  };

  // Simulate Report Generation
  const triggerReportBuild = (type: string) => {
    setSelectedReportType(type);
    setReportLog('Compiling telemetry indices...');
    setTimeout(() => {
      setReportLog(`Success: Generated fully compliant PDF layout for ${type.toUpperCase()} Strategy Report.`);
    }, 1200);
  };

  return (
    <section className="relative bg-ds-black py-32 overflow-hidden border-t border-white/5">
      {/* Immersive background image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${workspaceImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ds-black via-ds-black/90 to-ds-black" />
        <div className="absolute inset-0 bg-ds-blue/5 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Module Title */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
              <FolderKanban size={14} className="text-ds-cyan" />
              Enterprise Command
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white tracking-tight leading-[1.1]">
              CRM & Client Portal
            </h2>
          </div>
          <p className="text-lg text-ds-smoke font-light leading-relaxed max-w-xl">
            We architect end-to-end bespoke customer workspaces, pipelines, and fully-featured client directories mapped to legacy business states.
          </p>
        </div>

        {/* Tab Selector row */}
        <div className="flex justify-center gap-2 mb-12 border-b border-white/10 pb-4 max-w-3xl mx-auto">
          {[
            { id: 'crm', label: 'Bespoke CRM Workspace', icon: Users },
            { id: 'kanban', label: 'Adaptive Kanban Board', icon: LayoutGrid },
            { id: 'portal', label: 'Secure Client Portal', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeWorkspaceTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveWorkspaceTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono transition-all duration-300 ${
                  isActive 
                    ? 'bg-ds-cyan/15 text-ds-cyan border border-ds-cyan/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                    : 'text-ds-smoke hover:text-ds-white bg-white/[0.02] border border-transparent'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Main interactive frame container */}
        <div className="min-h-[550px] bg-ds-graphite/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl mb-16 relative">
          <AnimatePresence mode="wait">
            
            {/* 1. BESPOKE CRM WORKSPACE */}
            {activeWorkspaceTab === 'crm' && (
              <motion.div
                key="crm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-display text-ds-white">Customer Relationship Management Panel</h3>
                    <p className="text-xs text-ds-smoke">Interactive sales tracker mapping high-value leads and budgets.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Interactive Lead Adder */}
                  <div className="bg-white/[0.01] border border-white/5 p-6 rounded-xl space-y-4">
                    <h4 className="text-xs font-mono text-ds-white uppercase tracking-wider font-bold border-b border-white/5 pb-2">Add New Client Inquiry</h4>
                    <form onSubmit={handleAddLead} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="James Atherton" 
                          value={newLeadName}
                          onChange={(e) => setNewLeadName(e.target.value)}
                          className="w-full bg-ds-black border border-white/10 rounded-lg px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-cyan transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Company Name</label>
                        <input 
                          type="text" 
                          placeholder="Pinnacle Capital" 
                          value={newLeadCompany}
                          onChange={(e) => setNewLeadCompany(e.target.value)}
                          className="w-full bg-ds-black border border-white/10 rounded-lg px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-cyan transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Est. Budget Portfolio</label>
                        <input 
                          type="text" 
                          placeholder="$150,000" 
                          value={newLeadBudget}
                          onChange={(e) => setNewLeadBudget(e.target.value)}
                          className="w-full bg-ds-black border border-white/10 rounded-lg px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-cyan transition-colors"
                        />
                      </div>

                      <Button type="submit" variant="primary" size="sm" className="w-full font-bold tracking-wide !bg-ds-cyan !text-ds-black">
                        <Plus size={14} className="mr-1" /> Register Lead
                      </Button>
                    </form>
                  </div>

                  {/* Leads Data Table */}
                  <div className="lg:col-span-2 border border-white/10 rounded-xl overflow-hidden bg-ds-black/50">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 text-ds-smoke font-mono uppercase text-[9px] tracking-wider border-b border-white/10">
                        <tr>
                          <th className="p-3">Lead ID</th>
                          <th className="p-3">Client details</th>
                          <th className="p-3">Company</th>
                          <th className="p-3">Est. Portfolio</th>
                          <th className="p-3">Pipeline Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-light">
                        {crmLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-3 font-mono font-bold text-ds-cyan">{lead.id}</td>
                            <td className="p-3">
                              <div className="text-ds-white font-medium">{lead.name}</div>
                              <div className="text-[10px] text-ds-smoke font-mono">{lead.email}</div>
                            </td>
                            <td className="p-3 text-ds-silver font-medium">{lead.company}</td>
                            <td className="p-3 font-mono text-ds-white font-bold">{lead.budget}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                                lead.status === 'In Contract' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' :
                                lead.status === 'Scoped' ? 'bg-ds-cyan/10 text-ds-cyan border border-ds-cyan/25' :
                                lead.status === 'Contacted' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/25' :
                                'bg-white/5 text-ds-smoke border border-white/10'
                              }`}>{lead.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. ADAPTIVE KANBAN BOARD */}
            {activeWorkspaceTab === 'kanban' && (
              <motion.div
                key="kanban"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-display text-ds-white">Project Pipeline Task Board</h3>
                    <p className="text-xs text-ds-smoke">Interactive bento boards. Click card to advance task columns.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {['Lead', 'Contacted', 'Scoped', 'In Contract'].map((col) => {
                    const colTasks = kanbanTasks.filter((t) => t.column === col);
                    return (
                      <div key={col} className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex flex-col gap-3 min-h-[350px]">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-[10px] font-mono text-ds-white uppercase tracking-wider font-bold">{col}</span>
                          <span className="text-[10px] font-mono text-ds-cyan px-1.5 py-0.5 rounded bg-ds-cyan/5 border border-ds-cyan/15">{colTasks.length}</span>
                        </div>

                        <div className="space-y-2.5 flex-1 overflow-y-auto">
                          {colTasks.map((task) => (
                            <div 
                              key={task.id}
                              onClick={() => advanceTask(task.id)}
                              className="p-4 rounded-lg bg-ds-black/70 border border-white/5 hover:border-ds-cyan/40 transition-all cursor-pointer group space-y-2 select-none"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] font-mono text-ds-cyan font-bold">{task.id}</span>
                                <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                                  task.priority === 'High' ? 'bg-rose-500/10 text-rose-400' : 'bg-ds-blue/15 text-ds-blue'
                                }`}>{task.priority}</span>
                              </div>
                              <h4 className="text-xs font-semibold text-ds-white group-hover:text-ds-cyan transition-colors">{task.title}</h4>
                              <p className="text-[11px] text-ds-smoke font-light leading-snug">{task.desc}</p>
                              
                              <div className="pt-2 border-t border-white/5 mt-2 flex justify-between items-center text-[9px] font-mono text-ds-smoke group-hover:text-ds-cyan transition-colors">
                                <span>Click to advance</span>
                                <ChevronRight size={11} className="transform group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          ))}
                          {colTasks.length === 0 && (
                            <div className="text-[10px] text-ds-smoke font-mono italic text-center py-20 border border-dashed border-white/5 rounded-lg">
                              Column idle
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* 3. SECURE CLIENT PORTAL */}
            {activeWorkspaceTab === 'portal' && (
              <motion.div
                key="portal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Active Milestones list */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-mono text-ds-white uppercase tracking-wider font-bold mb-4">Active Projects Milestone Logs</h3>
                  
                  <div className="space-y-4">
                    {portalProjects.map((proj, idx) => (
                      <div key={idx} className="p-5 rounded-xl border border-white/5 bg-white/[0.01] space-y-3">
                        <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
                          <span className="font-semibold text-ds-white text-sm">{proj.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                            proj.progress === 100 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-ds-blue/15 text-ds-blue'
                          }`}>{proj.status}</span>
                        </div>

                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-ds-blue to-ds-cyan h-full transition-all duration-1000" style={{ width: `${proj.progress}%` }} />
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-mono text-ds-smoke pt-1">
                          <span>Progress: {proj.progress}%</span>
                          <span className="text-ds-cyan font-bold">Next: {proj.nextMilestone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Uploaded Secure Invoices and Files */}
                <div className="lg:col-span-5 bg-ds-black/40 border border-white/15 p-6 rounded-xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-mono text-ds-white uppercase tracking-wider font-bold mb-4">Secure Shared Files</h3>
                    <div className="space-y-3">
                      {portalFiles.map((file, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs">
                          <div className="flex items-center gap-3">
                            <FileText size={16} className="text-ds-cyan" />
                            <div>
                              <div className="font-semibold text-ds-white truncate max-w-[180px]">{file.name}</div>
                              <span className="text-[9px] text-ds-smoke font-mono uppercase">{file.type} &bull; {file.size}</span>
                            </div>
                          </div>
                          <button className="p-1.5 rounded hover:bg-white/5 text-ds-cyan hover:text-ds-white transition-all">
                            <Download size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 text-center mt-4 text-[9px] font-mono text-ds-smoke italic">
                    AES-256 secure encrypted data files. Mapped dynamically.
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* 4. BUSINESS REPORTS GENERATION BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-white/5 pt-16">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl font-display text-ds-white">Business Intelligence Reports</h3>
            <p className="text-sm text-ds-smoke font-light leading-relaxed">
              Instantly generate compliance strategies, comprehensive SEO metrics, or digital audit matrices customized to corporate operations.
            </p>

            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'audit', label: 'Security & Integrity' },
                { id: 'strategy', label: 'Tactical Expansion' },
                { id: 'seo', label: 'Search Telemetry' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => triggerReportBuild(type.id)}
                  className={`px-3 py-1.5 rounded text-xs font-mono border transition-all ${
                    selectedReportType === type.id 
                      ? 'bg-ds-cyan/15 text-ds-cyan border-ds-cyan/30' 
                      : 'text-ds-smoke border-white/5 hover:border-white/20 bg-white/[0.01]'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#0b0c0d] border border-white/10 rounded-xl p-5 font-mono text-xs text-ds-silver h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-3 right-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ds-cyan animate-pulse" />
                <span className="text-[8px] uppercase tracking-wider text-ds-smoke">PDF Generator Node</span>
              </div>

              <div className="flex-1 pr-6 flex items-center">
                {reportLog ? (
                  <span className="text-emerald-400 font-semibold">{reportLog}</span>
                ) : (
                  <span className="text-ds-smoke italic">Select a report criteria to invoke local assembly stream.</span>
                )}
              </div>

              <div className="border-t border-white/5 pt-3 flex justify-between text-[9px] text-ds-smoke select-none">
                <span>Output Format: PDF Layout (verifiable hash)</span>
                {reportLog && (
                  <button className="text-ds-cyan hover:underline flex items-center gap-1">
                    <Download size={10} /> Fetch Doc
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
