import { motion } from 'motion/react';
import { 
  Bot, 
  Sparkles, 
  PenTool, 
  GraduationCap, 
  Megaphone, 
  Search, 
  MessageSquare, 
  Workflow, 
  Image as ImageIcon,
  Languages,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Card, Button, Badge, Input } from '../../components/ui';

const aiModules = [
  { id: 'content', title: 'Content Studio', description: 'Generate and refine business content, blogs, and copy.', icon: PenTool, active: true },
  { id: 'academy', title: 'Practice Exam Studio', description: 'Generate educational content, questions, and mock tests.', icon: GraduationCap, active: true },
  { id: 'marketing', title: 'Marketing Assistant', description: 'Campaign ideas, ad copy, and audience segmentation.', icon: Megaphone, active: true },
  { id: 'seo', title: 'SEO Assistant', description: 'Intelligent recommendations for page optimization.', icon: Search, active: true },
  { id: 'chat', title: 'Chat Assistant', description: 'Configure the AI assistant for website visitors.', icon: MessageSquare, active: false },
  { id: 'workflow', title: 'Workflow Automation', description: 'Create automation rules for platform events.', icon: Workflow, active: false },
  { id: 'images', title: 'Image Prompt Builder', description: 'Generate structured prompts for design tools.', icon: ImageIcon, active: false },
  { id: 'translation', title: 'Translation Center', description: 'Translate content maintaining brand tone.', icon: Languages, active: false },
];

export default function DashboardAI() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ds-white mb-2 flex items-center gap-3">
            <Bot className="text-ds-blue" />
            AI Command Center
          </h1>
          <p className="text-ds-silver font-light">Your intelligent assistant ecosystem. Improve productivity and decision-making.</p>
        </div>
        <Button variant="primary" asMotion>
          <Sparkles size={16} className="mr-2" /> Quick Actions
        </Button>
      </div>

      {/* Active Workspace / Assistant Prompt */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-1 border-ds-blue/20 bg-ds-blue/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Bot size={120} className="text-ds-blue" />
          </div>
          <div className="bg-ds-graphite/80 backdrop-blur-md rounded-2xl p-8 relative z-10">
            <h2 className="text-xl font-display text-ds-white mb-4">How can I assist you today?</h2>
            <div className="relative">
              <Input 
                placeholder="e.g., 'Draft a blog post about local SEO trends' or 'Summarize recent leads'" 
                icon={<Sparkles size={18} className="text-ds-blue" />}
                className="w-full !py-4 !pr-32 !bg-ds-black/50 shadow-inner"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button variant="primary" size="sm" className="h-9">
                  Generate <Zap size={14} className="ml-2" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {['Suggest homepage improvements', 'Create a new service page', 'Write follow-up email', 'Generate exam questions'].map((suggestion, i) => (
                <Badge key={i} variant="outline" className="cursor-pointer !py-1.5 px-4 font-normal bg-ds-black/30 hover:bg-white/5">
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiModules.map((module, i) => {
          const Icon = module.icon;
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`h-full ${module.active ? '' : 'opacity-60 grayscale'}`}
            >
              <Card hoverable={module.active} className="p-6 h-full flex flex-col group relative overflow-hidden transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    module.active ? 'bg-ds-blue/10 text-ds-blue group-hover:bg-ds-blue/20' : 'bg-ds-graphite text-ds-smoke'
                  }`}>
                    <Icon size={24} />
                  </div>
                  {!module.active && (
                    <Badge variant="outline" className="text-[10px] !px-2 uppercase tracking-widest bg-ds-smoke/10">
                      Coming Soon
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-display text-ds-white mb-2">{module.title}</h3>
                <p className="text-sm text-ds-smoke leading-relaxed mb-4">{module.description}</p>
                
                {module.active && (
                  <div className="flex items-center gap-2 text-xs text-ds-blue font-medium mt-auto opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    Open Studio <ArrowRight size={14} />
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {/* Analytics Insights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-8 flex flex-col md:flex-row gap-8 items-center border-ds-cyan/20">
          <div className="w-16 h-16 rounded-full bg-ds-cyan/10 flex items-center justify-center shrink-0 border border-ds-cyan/20">
            <Sparkles size={24} className="text-ds-cyan" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-display text-ds-white font-medium mb-1">AI Daily Insight</h3>
            <p className="text-sm text-ds-silver leading-relaxed">
              Organic traffic is improving consistently this week. The latest blog post on "AI Automation" has generated 3 high-quality leads. I recommend publishing a follow-up case study to maintain engagement momentum.
            </p>
          </div>
          <div>
            <Button variant="secondary" className="whitespace-nowrap">
              View Full Report
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
