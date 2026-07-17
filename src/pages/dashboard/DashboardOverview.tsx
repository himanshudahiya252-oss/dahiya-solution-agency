import { motion } from 'motion/react';
import { Users, TrendingUp, Mail, Activity, ArrowRight, ShieldCheck, HardDrive, Cpu } from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui';

const stats = [
  { label: "Today's Visitors", value: "2,451", trend: "+14%", positive: true, icon: Users },
  { label: "Active Leads", value: "18", trend: "+3", positive: true, icon: TrendingUp },
  { label: "Unread Messages", value: "5", trend: "-2", positive: false, icon: Mail },
  { label: "Website Health", value: "99.9%", trend: "Optimal", positive: true, icon: Activity },
];

const recentActivity = [
  { id: 1, type: 'lead', title: 'New lead from TechCorp', time: '10 mins ago', status: 'Pending' },
  { id: 2, type: 'system', title: 'Daily backup completed', time: '1 hour ago', status: 'Success' },
  { id: 3, type: 'content', title: 'Blog post published: AI Trends', time: '3 hours ago', status: 'Live' },
  { id: 4, type: 'message', title: 'Client message: Sarah Jenkins', time: '5 hours ago', status: 'Unread' },
  { id: 5, type: 'security', title: 'Login from new IP address', time: '1 day ago', status: 'Warning' },
];

export default function DashboardOverview() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ds-white mb-2">Command Center</h1>
          <p className="text-ds-silver font-light">Welcome back. Here's what's happening across the platform today.</p>
        </div>
        <Button variant="secondary" asMotion>
          Generate Report <ArrowRight size={14} className="ml-2" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hoverable className="p-6 relative group h-full">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Icon size={80} />
                </div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-ds-graphite border border-white/5 flex items-center justify-center">
                    <Icon size={18} className="text-ds-silver group-hover:text-ds-white transition-colors" />
                  </div>
                  <Badge variant={stat.positive ? 'success' : 'default'} className="font-mono px-2 py-0.5">
                    {stat.trend}
                  </Badge>
                </div>
                <div className="relative z-10">
                  <div className="text-3xl font-display font-bold text-ds-white mb-1">{stat.value}</div>
                  <div className="text-sm text-ds-smoke font-medium">{stat.label}</div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart Area Mock */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2"
        >
          <Card className="p-8 h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-display text-ds-white font-medium">Platform Analytics Overview</h2>
              <select className="bg-ds-graphite border border-white/10 rounded-lg px-3 py-1.5 text-sm text-ds-silver focus:outline-none focus:border-ds-blue/50 cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 border-b border-white/5 pb-4 mt-8">
              {/* Simple Mock Bar Chart */}
              {[40, 60, 45, 80, 55, 90, 70].map((height, i) => (
                <div key={i} className="w-full relative group">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-ds-graphite text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {height * 12}
                  </div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="w-full bg-ds-blue/20 rounded-t-sm border-t border-ds-blue/50 hover:bg-ds-blue/40 transition-colors cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-ds-smoke font-mono uppercase tracking-wider">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-display text-ds-white font-medium">Recent Activity</h2>
              <button className="text-xs text-ds-blue hover:text-ds-white transition-colors font-medium">View All</button>
            </div>
            
            <div className="space-y-6 flex-1">
              {recentActivity.map((activity, i) => (
                <div key={activity.id} className="flex gap-4 group">
                  <div className="w-2 flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      activity.type === 'lead' ? 'bg-ds-cyan' :
                      activity.type === 'security' ? 'bg-red-500' :
                      activity.type === 'message' ? 'bg-ds-blue' : 'bg-ds-silver'
                    }`} />
                    {i !== recentActivity.length - 1 && <div className="w-px h-full bg-white/5 mt-2 group-hover:bg-white/10 transition-colors" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="text-sm text-ds-white font-medium mb-1">{activity.title}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-ds-smoke">{activity.time}</span>
                      <Badge variant={
                        activity.status === 'Success' || activity.status === 'Live' ? 'success' :
                        activity.status === 'Warning' ? 'danger' : 'outline'
                      } className="text-[10px] !px-2 !py-0.5 tracking-wider uppercase">
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* System Status Row */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { label: "AI System Status", value: "Operational", icon: ShieldCheck, color: "text-green-400" },
          { label: "Storage Usage", value: "42% (1.2TB)", icon: HardDrive, color: "text-ds-silver" },
          { label: "Server Load", value: "24% Avg", icon: Cpu, color: "text-ds-silver" }
        ].map((sys, i) => {
          const Icon = sys.icon;
          return (
            <Card key={i} className="p-6 flex items-center justify-between group hoverable cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-ds-graphite flex items-center justify-center">
                  <Icon size={18} className="text-ds-silver group-hover:text-ds-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-medium text-ds-white group-hover:text-ds-blue transition-colors">{sys.label}</div>
                  <div className={`text-xs ${sys.color} font-mono mt-1`}>{sys.value}</div>
                </div>
              </div>
            </Card>
          )
        })}
      </motion.div>
    </div>
  );
}
