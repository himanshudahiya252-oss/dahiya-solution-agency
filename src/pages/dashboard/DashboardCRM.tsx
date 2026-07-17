import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MoreVertical, Plus, X, Trash2, CheckCircle } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  Badge,
  Button,
  Tabs,
  Input,
  Card,
  Avatar
} from '../../components/ui';

const defaultLeads = [
  { id: 'L-1023', name: 'Alexander Wright', company: 'Nexus Global', email: 'alex@nexus.com', status: 'Active', value: '$45,000', date: 'Oct 24, 2026' },
  { id: 'L-1024', name: 'Sarah Jenkins', company: 'Quantum AI', email: 'sarah@quantum.ai', status: 'Pending', value: '$120,000', date: 'Oct 24, 2026' },
  { id: 'L-1025', name: 'Marcus Chen', company: 'Elevation Partners', email: 'mchen@elevation.io', status: 'Closed Won', value: '$85,000', date: 'Oct 23, 2026' },
  { id: 'L-1026', name: 'Elena Rodriguez', company: 'Studio Health', email: 'elena@studiohealth.co', status: 'Active', value: '$22,500', date: 'Oct 21, 2026' },
  { id: 'L-1027', name: 'James Wilson', company: 'FinTech Dynamics', email: 'jwilson@fintechd.com', status: 'Closed Lost', value: '$60,000', date: 'Oct 20, 2026' },
  { id: 'L-1028', name: 'Anita Patel', company: 'Retail Solutions', email: 'anita@retailsol.com', status: 'Pending', value: '$35,000', date: 'Oct 19, 2026' },
];

export default function DashboardCRM() {
  const [leads, setLeads] = useState<typeof defaultLeads>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadValue, setNewLeadValue] = useState('');
  const [newLeadStatus, setNewLeadStatus] = useState('Pending');

  // Active Actions Dropdown State
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  useEffect(() => {
    const savedLeads = localStorage.getItem('ds_crm_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        setLeads(defaultLeads);
      }
    } else {
      localStorage.setItem('ds_crm_leads', JSON.stringify(defaultLeads));
      setLeads(defaultLeads);
    }
  }, []);

  const saveLeadsToStorage = (updatedLeads: typeof defaultLeads) => {
    setLeads(updatedLeads);
    localStorage.setItem('ds_crm_leads', JSON.stringify(updatedLeads));
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadEmail.trim()) return;

    const newLead = {
      id: `L-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newLeadName.trim(),
      company: newLeadCompany.trim() || 'N/A',
      email: newLeadEmail.trim(),
      status: newLeadStatus,
      value: newLeadValue.trim() ? (newLeadValue.startsWith('$') ? newLeadValue.trim() : `$${newLeadValue.trim()}`) : '$10,000',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = [newLead, ...leads];
    saveLeadsToStorage(updated);

    // Reset Form
    setNewLeadName('');
    setNewLeadCompany('');
    setNewLeadEmail('');
    setNewLeadValue('');
    setNewLeadStatus('Pending');
    setIsModalOpen(false);
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    saveLeadsToStorage(updated);
    setSelectedLeadId(null);
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    saveLeadsToStorage(updated);
    setSelectedLeadId(null);
  };

  // Filter & Search Logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && lead.status === 'Active';
    if (activeTab === 'pending') return matchesSearch && lead.status === 'Pending';
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ds-white mb-2">CRM & Lead Management</h1>
          <p className="text-ds-silver font-light">Manage inquiries, track deal progress, and analyze sales performance.</p>
        </div>
        <Button variant="primary" asMotion onClick={() => setIsModalOpen(true)}>
          <Plus size={16} className="mr-2" /> Add New Lead
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-0 overflow-visible">
          <div className="p-6 border-b border-white/5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-[280px]">
              <Input 
                placeholder="Search leads..." 
                icon={<Search size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 !py-2 !rounded-full"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-mono text-ds-smoke hover:text-ds-white transition-colors border border-white/10 rounded-full px-3 py-1"
                >
                  Clear
                </button>
              )}
            </div>
            
            <Tabs 
              tabs={[
                { id: 'all', label: `All Leads (${leads.length})` },
                { id: 'active', label: `Active (${leads.filter(l => l.status === 'Active').length})` },
                { id: 'pending', label: `Pending (${leads.filter(l => l.status === 'Pending').length})` }
              ]} 
              activeTab={activeTab} 
              onChange={setActiveTab} 
            />
          </div>

          <div className="overflow-x-auto">
            <Table className="border-0 rounded-none bg-transparent min-w-[800px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-white/5">
                  <TableHead>Lead ID</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Est. Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date added</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-ds-smoke font-light">
                      No leads match your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <TableCell className="font-mono text-ds-silver">{lead.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar fallback={lead.name} size="sm" />
                          <div>
                            <div className="text-sm font-medium text-ds-white">{lead.name}</div>
                            <div className="text-xs text-ds-smoke">{lead.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell className="font-mono text-ds-white">{lead.value}</TableCell>
                      <TableCell>
                        <Badge variant={
                          lead.status === 'Active' ? 'primary' :
                          lead.status === 'Pending' ? 'warning' :
                          lead.status === 'Closed Won' ? 'success' : 'outline'
                        }>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-ds-smoke">{lead.date}</TableCell>
                      <TableCell className="text-right relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setSelectedLeadId(selectedLeadId === lead.id ? null : lead.id)}
                          className="h-8 w-8 !rounded-full cursor-pointer hover:bg-white/10"
                        >
                          <MoreVertical size={16} />
                        </Button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {selectedLeadId === lead.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setSelectedLeadId(null)} />
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute right-0 top-10 mt-1 w-48 bg-ds-black border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                              >
                                <div className="p-1.5 space-y-1">
                                  <button 
                                    onClick={() => handleUpdateStatus(lead.id, 'Active')}
                                    className="w-full text-left text-xs text-ds-silver hover:text-ds-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                                  >
                                    <CheckCircle size={14} className="text-ds-blue" />
                                    Mark as Active
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateStatus(lead.id, 'Closed Won')}
                                    className="w-full text-left text-xs text-ds-silver hover:text-ds-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                                  >
                                    <CheckCircle size={14} className="text-emerald-400" />
                                    Mark as Won
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateStatus(lead.id, 'Pending')}
                                    className="w-full text-left text-xs text-ds-silver hover:text-ds-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                                  >
                                    <CheckCircle size={14} className="text-yellow-400" />
                                    Mark as Pending
                                  </button>
                                  <div className="h-px bg-white/5 my-1" />
                                  <button 
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="w-full text-left text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                                  >
                                    <Trash2 size={14} />
                                    Delete Lead
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
            <Button variant="ghost" size="sm" className="opacity-55 cursor-not-allowed">Previous</Button>
            <div className="flex gap-1">
              <Button variant="primary" size="icon" className="w-8 h-8">1</Button>
            </div>
            <Button variant="ghost" size="sm" className="opacity-55 cursor-not-allowed">Next</Button>
          </div>
        </Card>
      </motion.div>

      {/* Add Lead Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-ds-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-ds-graphite/95 border border-white/10 rounded-3xl p-8 shadow-2xl z-50"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 text-ds-smoke hover:text-ds-white transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-display font-bold text-ds-white mb-2">Create New Lead</h2>
              <p className="text-xs text-ds-smoke mb-6">Manually log a new lead or customer inquiry into the system.</p>

              <form onSubmit={handleAddLead} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-ds-smoke mb-2">Contact Name *</label>
                  <input 
                    type="text" 
                    required
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    className="w-full bg-ds-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-ds-smoke mb-2">Company / Organization</label>
                  <input 
                    type="text" 
                    value={newLeadCompany}
                    onChange={(e) => setNewLeadCompany(e.target.value)}
                    className="w-full bg-ds-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50"
                    placeholder="e.g. Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-ds-smoke mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    className="w-full bg-ds-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50"
                    placeholder="e.g. john@acme.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-ds-smoke mb-2">Estimated Value</label>
                    <input 
                      type="text" 
                      value={newLeadValue}
                      onChange={(e) => setNewLeadValue(e.target.value)}
                      className="w-full bg-ds-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50"
                      placeholder="e.g. $25,000"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-ds-smoke mb-2">Initial Status</label>
                    <select 
                      value={newLeadStatus}
                      onChange={(e) => setNewLeadStatus(e.target.value)}
                      className="w-full bg-ds-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50 appearance-none cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                      <option value="Closed Won">Closed Won</option>
                      <option value="Closed Lost">Closed Lost</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3 justify-end">
                  <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Lead
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
