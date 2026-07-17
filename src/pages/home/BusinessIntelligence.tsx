import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, PieChart, TrendingUp, DollarSign, Users, MousePointerClick, 
  ArrowUpRight, ArrowDownRight, Globe, Layers, Download, Calendar 
} from 'lucide-react';
import { Card, Button } from '../../components/ui';

import screensImage from '../../assets/images/ai_visualization_screens_1784271794578.jpg';

// Live dashboard stats
const initialMetrics = {
  revenue: { current: '$1,248,300', target: '$1,500,000', rate: '+18.4%', up: true },
  leads: { current: '42,950', target: '45,000', rate: '+22.1%', up: true },
  traffic: { current: '824,100', target: '1,000,000', rate: '-4.2%', up: false },
  conversions: { current: '3.82%', target: '4.00%', rate: '+1.4%', up: true }
};

export default function BusinessIntelligence() {
  const [activeDateRange, setActiveDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'leads' | 'traffic' | 'conversions'>('revenue');

  // SVG Area / Line Chart Points based on selection
  const chartData = {
    revenue: [
      { x: 0, y: 80, label: 'Wk 1' },
      { x: 15, y: 75, label: 'Wk 2' },
      { x: 30, y: 62, label: 'Wk 3' },
      { x: 45, y: 48, label: 'Wk 4' },
      { x: 60, y: 45, label: 'Wk 5' },
      { x: 75, y: 32, label: 'Wk 6' },
      { x: 90, y: 18, label: 'Wk 7' },
      { x: 100, y: 15, label: 'Wk 8' }
    ],
    leads: [
      { x: 0, y: 90, label: 'Wk 1' },
      { x: 15, y: 85, label: 'Wk 2' },
      { x: 30, y: 70, label: 'Wk 3' },
      { x: 45, y: 55, label: 'Wk 4' },
      { x: 60, y: 48, label: 'Wk 5' },
      { x: 75, y: 38, label: 'Wk 6' },
      { x: 90, y: 22, label: 'Wk 7' },
      { x: 100, y: 12, label: 'Wk 8' }
    ],
    traffic: [
      { x: 0, y: 40, label: 'Wk 1' },
      { x: 15, y: 42, label: 'Wk 2' },
      { x: 30, y: 50, label: 'Wk 3' },
      { x: 45, y: 48, label: 'Wk 4' },
      { x: 60, y: 65, label: 'Wk 5' },
      { x: 75, y: 58, label: 'Wk 6' },
      { x: 90, y: 72, label: 'Wk 7' },
      { x: 100, y: 78, label: 'Wk 8' }
    ],
    conversions: [
      { x: 0, y: 85, label: 'Wk 1' },
      { x: 15, y: 82, label: 'Wk 2' },
      { x: 30, y: 68, label: 'Wk 3' },
      { x: 45, y: 60, label: 'Wk 4' },
      { x: 60, y: 52, label: 'Wk 5' },
      { x: 75, y: 35, label: 'Wk 6' },
      { x: 90, y: 25, label: 'Wk 7' },
      { x: 100, y: 22, label: 'Wk 8' }
    ]
  };

  const activePoints = chartData[selectedMetric];
  const pathData = activePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPathData = `${pathData} L 100 100 L 0 100 Z`;

  return (
    <section className="relative bg-ds-black py-32 overflow-hidden border-t border-white/5">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${screensImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ds-black via-ds-black/90 to-ds-black" />
        <div className="absolute inset-0 bg-ds-cyan/5 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
              <BarChart3 size={14} className="text-ds-cyan" />
              Boardroom Analytics
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white tracking-tight leading-[1.1]">
              Business Intelligence Center
            </h2>
          </div>
          <p className="text-lg text-ds-smoke font-light leading-relaxed max-w-xl">
            We build enterprise data aggregation hubs and customized dashboard solutions delivering boardroom-level visual insights.
          </p>
        </div>

        {/* Boardroom Mockup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Interactive Stats Controls */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-ds-smoke uppercase tracking-wider">Metrics Monitor</span>
                <div className="flex gap-1 bg-white/5 p-0.5 rounded-lg border border-white/5">
                  {['7d', '30d', 'ytd'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setActiveDateRange(range)}
                      className={`px-2 py-1 text-[9px] font-mono rounded transition-colors ${
                        activeDateRange === range 
                          ? 'bg-ds-cyan/15 text-ds-cyan border border-ds-cyan/20' 
                          : 'text-ds-smoke hover:text-ds-white'
                      }`}
                    >
                      {range.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric Blocks */}
              {[
                { id: 'revenue', name: 'Corporate Revenue', icon: DollarSign, key: 'revenue' },
                { id: 'leads', name: 'Qualified Inquiries', icon: Users, key: 'leads' },
                { id: 'traffic', name: 'Channel Interactions', icon: Globe, key: 'traffic' },
                { id: 'conversions', name: 'Funnel Conversion', icon: MousePointerClick, key: 'conversions' }
              ].map((item) => {
                const metricInfo = initialMetrics[item.key as keyof typeof initialMetrics];
                const Icon = item.icon;
                const isSelected = selectedMetric === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMetric(item.id as any)}
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected 
                        ? 'bg-ds-cyan/10 border-ds-cyan/35 text-ds-white shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                        : 'bg-white/[0.01] border-white/5 text-ds-smoke hover:bg-white/[0.03] hover:text-ds-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-ds-cyan text-ds-black' : 'bg-white/5 text-ds-silver'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono text-ds-smoke uppercase tracking-wider">{item.name}</h4>
                        <div className="text-xl font-display font-medium text-ds-white mt-1">{metricInfo.current}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`flex items-center gap-1 text-xs font-mono font-bold justify-end ${
                        metricInfo.up ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {metricInfo.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                        <span>{metricInfo.rate}</span>
                      </div>
                      <span className="text-[10px] text-ds-smoke font-mono">Target: {metricInfo.target}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Simulated Data Export button */}
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between">
              <span className="text-[10px] font-mono text-ds-smoke">CSV & XLSX export pipeline</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 !text-xs text-ds-cyan hover:text-ds-white">
                <Download size={13} /> Export Stream
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Charts */}
          <div className="lg:col-span-8">
            <Card className="p-8 h-full flex flex-col justify-between relative overflow-hidden bg-ds-graphite/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-ds-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4 relative z-10">
                <div>
                  <span className="text-xs font-mono text-ds-cyan uppercase tracking-widest font-bold">Dynamic Visual Analytics</span>
                  <h3 className="text-lg font-display text-ds-white font-medium mt-1">
                    {selectedMetric.toUpperCase()} TREND PROFILE
                  </h3>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-ds-silver">
                  <Calendar size={14} className="text-ds-cyan" />
                  <span>Interactive Live View</span>
                </div>
              </div>

              {/* Interactive Area Chart SVG */}
              <div className="w-full h-72 relative my-6">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                  <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                  <line x1="0" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                  <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

                  {/* Gradient Fill under path */}
                  <path d={areaPathData} fill="url(#ds-chart-grad)" className="transition-all duration-700 ease-in-out" />

                  {/* Main Line */}
                  <path d={pathData} fill="none" stroke="rgba(34, 211, 238, 0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-700 ease-in-out" />

                  {/* Dynamic point dots */}
                  {activePoints.map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r="2.5" fill="#22d3ee" className="transition-all duration-700 ease-in-out" />
                  ))}

                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="ds-chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* X Axis Labels */}
                <div className="absolute bottom-[-15px] left-0 right-0 flex justify-between px-1 text-[9px] font-mono text-ds-smoke select-none">
                  {activePoints.map((pt, i) => (
                    <span key={i}>{pt.label}</span>
                  ))}
                </div>
              </div>

              {/* Extra visual indicators (e.g. Pie chart or category breakdowns) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/5 pt-6 relative z-10">
                {[
                  { title: 'SLA Speed Index', value: '99.2%', pct: 99 },
                  { title: 'Query Delivery', value: '42ms', pct: 85 },
                  { title: 'Confidence Acc.', value: '98.8%', pct: 98 },
                  { title: 'Active Ledgers', value: '18 Nodes', pct: 60 }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-[9px] font-mono text-ds-smoke uppercase tracking-wider block">{stat.title}</span>
                    <div className="text-sm font-medium text-ds-white font-mono">{stat.value}</div>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <div className="bg-ds-cyan h-full" style={{ width: `${stat.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
}
