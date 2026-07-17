import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Mail, 
  Layers, 
  BookOpen, 
  Clock, 
  MousePointerClick, 
  ArrowUpRight, 
  Globe, 
  Zap,
  Activity,
  UserCheck
} from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui';

// Mock data for beautiful charts
const visitorHistory = [
  { date: 'Mon', value: 1200 },
  { date: 'Tue', value: 1600 },
  { date: 'Wed', value: 1400 },
  { date: 'Thu', value: 2100 },
  { date: 'Fri', value: 1850 },
  { date: 'Sat', value: 2450 },
  { date: 'Sun', value: 2200 }
];

const trafficSources = [
  { source: 'Direct / Dark Social', count: 1280, pct: '45%' },
  { source: 'Search Engines (Google, Bing)', count: 910, pct: '32%' },
  { source: 'LinkedIn Professional Referral', count: 420, pct: '15%' },
  { source: 'GitHub Repositories', count: 230, pct: '8%' }
];

const popularServices = [
  { name: 'Digital Architecture', clicks: 1250, conversion: '3.4%', status: 'Critical Growth' },
  { name: 'AI Integration', clicks: 1840, conversion: '4.8%', status: 'Category Hot' },
  { name: 'Brand Strategy', clicks: 810, conversion: '2.1%', status: 'Stable' },
  { name: 'Growth Systems', clicks: 950, conversion: '2.9%', status: 'Expanding' }
];

const blogPerformance = [
  { title: 'The Sovereignty of Agentic Workflows in Enterprise CRM', views: 412, reads: '84%', time: '5.2m' },
  { title: 'Configuring NextGen Multi-Agent LLMs with Schema Enforcement', views: 320, reads: '72%', time: '4.1m' },
  { title: 'Designing High-Latent Systems with Dahiya OS Platforms', views: 189, reads: '91%', time: '3.8m' }
];

const mockActivities = [
  { time: '12 mins ago', ip: '194.22.103.8', event: 'Contact request submitted by Marcus Reynolds (Pinnacle Corp)', geo: 'Berlin, DE' },
  { time: '45 mins ago', ip: '72.41.221.19', event: 'Read article: Sovereignty of Agentic Workflows', geo: 'New York, US' },
  { time: '1 hr ago', ip: '103.5.88.114', event: 'Initiated checkout for Enterprise AI Strategy consultation', geo: 'New Delhi, IN' },
  { time: '3 hrs ago', ip: '185.90.11.45', event: 'Downloaded PDF: Multi-Agent Deployment Ledger v2', geo: 'London, UK' }
];

export default function DashboardAnalytics() {
  const [totalLeads, setTotalLeads] = useState(18);
  const [totalVisitors, setTotalVisitors] = useState(12841);
  const [conversionRate, setConversionRate] = useState(2.8);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);

  useEffect(() => {
    // Read dynamic leads count from localStorage if any
    const leadsStr = localStorage.getItem('ds_crm_leads');
    if (leadsStr) {
      try {
        const parsed = JSON.parse(leadsStr);
        setTotalLeads(parsed.length);
        // Compute dynamic conversion
        const conv = ((parsed.length / 840) * 100).toFixed(1);
        setConversionRate(parseFloat(conv));
      } catch (e) {}
    }

    // Capture leads for "Contact Requests" table
    if (leadsStr) {
      try {
        const parsed = JSON.parse(leadsStr);
        setRecentRequests(parsed.slice(0, 4));
      } catch (e) {}
    }
  }, []);

  // Compute SVG chart coordinates dynamically
  const maxVal = Math.max(...visitorHistory.map(v => v.value));
  const svgWidth = 500;
  const svgHeight = 180;
  const padding = 20;
  
  const points = visitorHistory.map((v, idx) => {
    const x = padding + (idx * (svgWidth - padding * 2) / (visitorHistory.length - 1));
    const y = svgHeight - padding - ((v.value / maxVal) * (svgHeight - padding * 2));
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ds-white mb-2 flex items-center gap-3">
            <BarChart3 className="text-ds-blue" />
            Business Intelligence & Analytics
          </h1>
          <p className="text-ds-silver font-light">Monitor real-time visitors, conversion funnels, catalog clicks, and SEO indexing performance.</p>
        </div>
        <Button variant="outline" size="sm" asMotion onClick={() => window.location.reload()}>
          <Zap size={14} className="mr-2 text-ds-blue" /> Refresh Intel
        </Button>
      </div>

      {/* Grid: 4 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 relative overflow-hidden">
          <div className="absolute right-4 top-4 text-ds-blue/10"><Users size={48} /></div>
          <div className="text-xs font-mono uppercase tracking-widest text-ds-smoke mb-2">Website Visitors</div>
          <div className="text-3xl font-display font-bold text-ds-white mb-2">
            {totalVisitors.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp size={14} /> +14.2% <span className="text-ds-smoke">vs last week</span>
          </div>
        </Card>

        <Card className="p-6 relative overflow-hidden">
          <div className="absolute right-4 top-4 text-ds-blue/10"><UserCheck size={48} /></div>
          <div className="text-xs font-mono uppercase tracking-widest text-ds-smoke mb-2">CRM Leads Received</div>
          <div className="text-3xl font-display font-bold text-ds-white mb-2">
            {totalLeads}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp size={14} /> +8.4% <span className="text-ds-smoke">conversions</span>
          </div>
        </Card>

        <Card className="p-6 relative overflow-hidden">
          <div className="absolute right-4 top-4 text-ds-blue/10"><Mail size={48} /></div>
          <div className="text-xs font-mono uppercase tracking-widest text-ds-smoke mb-2">Contact Enquiries</div>
          <div className="text-3xl font-display font-bold text-ds-white mb-2">
            {recentRequests.length || 5}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ds-blue">
            <Globe size={14} /> 100% response <span className="text-ds-smoke">latency</span>
          </div>
        </Card>

        <Card className="p-6 relative overflow-hidden">
          <div className="absolute right-4 top-4 text-ds-blue/10"><MousePointerClick size={48} /></div>
          <div className="text-xs font-mono uppercase tracking-widest text-ds-smoke mb-2">Conversion Threshold</div>
          <div className="text-3xl font-display font-bold text-ds-white mb-2">
            {conversionRate}%
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp size={14} /> +0.6% <span className="text-ds-smoke">indexing</span>
          </div>
        </Card>
      </div>

      {/* Main Stats Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Interactive Graph & Active Traffic */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-display text-ds-white mb-6">Traffic Index History (7 Days)</h2>
            <div className="h-56 flex items-end justify-center w-full relative">
              {/* Custom High-Fidelity SVG Chart */}
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full text-ds-blue">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="20" y1="20" x2="480" y2="20" stroke="#FFFFFF" strokeOpacity="0.03" />
                <line x1="20" y1="75" x2="480" y2="75" stroke="#FFFFFF" strokeOpacity="0.03" />
                <line x1="20" y1="130" x2="480" y2="130" stroke="#FFFFFF" strokeOpacity="0.03" />
                <line x1="20" y1="160" x2="480" y2="160" stroke="#FFFFFF" strokeOpacity="0.05" />

                {/* Filled Area */}
                <path
                  d={`M ${padding},${svgHeight - padding} L ${points} L ${svgWidth - padding},${svgHeight - padding} Z`}
                  fill="url(#chartGrad)"
                />
                
                {/* Main line */}
                <polyline
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="2"
                  points={points}
                />

                {/* Point nodes */}
                {visitorHistory.map((v, idx) => {
                  const x = padding + (idx * (svgWidth - padding * 2) / (visitorHistory.length - 1));
                  const y = svgHeight - padding - ((v.value / maxVal) * (svgHeight - padding * 2));
                  return (
                    <g key={idx} className="group/node cursor-pointer">
                      <circle cx={x} cy={y} r="4" fill="#00E5FF" stroke="#000000" strokeWidth="1.5" />
                      <circle cx={x} cy={y} r="8" fill="#00E5FF" className="opacity-0 group-hover/node:opacity-30 transition-opacity animate-ping" />
                    </g>
                  );
                })}
              </svg>
            </div>
            
            {/* Legend Days */}
            <div className="flex justify-between px-6 font-mono text-[10px] text-ds-smoke uppercase tracking-widest mt-4">
              {visitorHistory.map((v, i) => (
                <div key={i} className="text-center">
                  <div>{v.date}</div>
                  <div className="text-ds-silver font-semibold mt-1">{v.value}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* CRM / Lead Enquiries captured directly */}
          <Card className="p-6">
            <h2 className="text-lg font-display text-ds-white mb-6">Recent Enquiries & Lead Channels</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-mono uppercase tracking-widest text-ds-smoke">
                    <th className="py-3 px-2">Identifier</th>
                    <th className="py-3 px-4">Contact Profile</th>
                    <th className="py-3 px-4">Corporate Unit</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4 text-right">Route Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {recentRequests.length > 0 ? (
                    recentRequests.map((req, i) => (
                      <tr key={req.id || i} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-2 font-mono text-xs text-ds-blue">{req.id}</td>
                        <td className="py-3.5 px-4 font-medium text-ds-white">{req.name}</td>
                        <td className="py-3.5 px-4 text-ds-silver font-light">{req.company}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-ds-smoke">{req.date}</td>
                        <td className="py-3.5 px-4 text-right">
                          <Badge variant={req.status === 'Won' ? 'success' : req.status === 'Lost' ? 'danger' : 'warning'}>
                            {req.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-2 font-mono text-xs text-ds-blue">L-4091</td>
                        <td className="py-3.5 px-4 font-medium text-ds-white">Elena Rostova</td>
                        <td className="py-3.5 px-4 text-ds-silver font-light">Siberia Tech</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-ds-smoke">Jul 15, 2026</td>
                        <td className="py-3.5 px-4 text-right"><Badge variant="warning">Pending</Badge></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-2 font-mono text-xs text-ds-blue">L-3011</td>
                        <td className="py-3.5 px-4 font-medium text-ds-white">Thomas Geller</td>
                        <td className="py-3.5 px-4 text-ds-silver font-light">Nexus Capital</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-ds-smoke">Jul 14, 2026</td>
                        <td className="py-3.5 px-4 text-right"><Badge variant="success">Won</Badge></td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Traffic Sources, Popular Services, CMS Performance */}
        <div className="space-y-6">
          
          {/* Popular Services Ratings & conversion */}
          <Card className="p-6">
            <h2 className="text-sm font-mono uppercase tracking-widest text-ds-white mb-4 flex items-center gap-2">
              <Layers size={14} className="text-ds-blue" />
              Popular Services performance
            </h2>
            <div className="space-y-4">
              {popularServices.map((service, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-ds-white">{service.name}</span>
                    <span className="font-mono text-ds-blue font-semibold">{service.clicks} clicks</span>
                  </div>
                  <div className="w-full bg-ds-graphite h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-ds-blue h-full rounded-full transition-all duration-1000"
                      style={{ width: `${(service.clicks / 2000) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-ds-smoke font-mono">
                    <span>Conv. Rate: {service.conversion}</span>
                    <span className="text-emerald-400">{service.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Traffic Channels breakdown */}
          <Card className="p-6">
            <h2 className="text-sm font-mono uppercase tracking-widest text-ds-white mb-4 flex items-center gap-2">
              <Globe size={14} className="text-ds-blue" />
              Acquisition Channels
            </h2>
            <div className="space-y-3.5">
              {trafficSources.map((source, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                  <div>
                    <div className="text-xs font-medium text-ds-white">{source.source}</div>
                    <div className="text-[10px] text-ds-smoke font-mono mt-0.5">{source.count} unique nodes</div>
                  </div>
                  <Badge variant="outline" className="bg-ds-blue/5 border-ds-blue/15 text-ds-blue text-[10px]">
                    {source.pct}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Blog / Content SEO Indexing Performance */}
          <Card className="p-6">
            <h2 className="text-sm font-mono uppercase tracking-widest text-ds-white mb-4 flex items-center gap-2">
              <BookOpen size={14} className="text-ds-blue" />
              SEO content performance
            </h2>
            <div className="space-y-4">
              {blogPerformance.map((article, i) => (
                <div key={i} className="space-y-1 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="text-xs font-medium text-ds-white line-clamp-1 hover:text-ds-blue transition-colors cursor-pointer">
                    {article.title}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-ds-smoke">
                    <span className="flex items-center gap-1"><Users size={10} /> {article.views} views</span>
                    <span className="flex items-center gap-1"><MousePointerClick size={10} /> {article.reads} completion</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {article.time} read</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>

      {/* Live Activity Stream */}
      <Card className="p-6">
        <h2 className="text-lg font-display text-ds-white mb-6 flex items-center gap-2">
          <Activity size={18} className="text-emerald-400 animate-pulse" />
          Real-Time System Log & Activities
        </h2>
        <div className="space-y-4">
          {mockActivities.map((act, i) => (
            <div key={i} className="flex items-start gap-4 text-xs border-b border-white/5 pb-3.5 last:border-0 last:pb-0">
              <span className="font-mono text-ds-smoke shrink-0 w-24">{act.time}</span>
              <div className="flex-1">
                <span className="font-mono text-ds-blue bg-ds-blue/5 border border-ds-blue/15 px-2 py-0.5 rounded mr-2">
                  {act.ip}
                </span>
                <span className="text-ds-silver font-light">{act.event}</span>
              </div>
              <Badge variant="outline" className="text-[10px] shrink-0 border-white/5 bg-white/5">
                {act.geo}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
