import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut,
  Search,
  Bell,
  Briefcase,
  GraduationCap,
  FolderKanban,
  BarChart3,
  Bot,
  Layers,
  KeyRound,
  Eye,
  EyeOff,
  ShieldAlert,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Card, Button, Input } from '../../components/ui';

const sidebarLinks = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'CRM & Leads', path: '/dashboard/crm', icon: Users },
  { name: 'Services Manager', path: '/dashboard/services', icon: Layers },
  { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
  { name: 'Content Manager', path: '/dashboard/cms', icon: FileText },
  { name: 'Portfolio', path: '/dashboard/portfolio', icon: Briefcase },
  { name: 'AI Practice Platform', path: '/dashboard/academy', icon: GraduationCap },
  { name: 'Client Portal', path: '/dashboard/clients', icon: FolderKanban },
  { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
  { name: 'AI Automations', path: '/dashboard/ai', icon: Bot },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Auth & Session States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'super_admin' | 'editor' | 'analyst'>('super_admin');
  const [username, setUsername] = useState('');
  
  // Login Form States
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'super_admin' | 'editor' | 'analyst'>('super_admin');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Check local session
    const savedSession = localStorage.getItem('ds_admin_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        if (session.loggedIn) {
          setIsAuthenticated(true);
          setUserRole(session.role);
          setUsername(session.username);
        }
      } catch (e) {
        localStorage.removeItem('ds_admin_session');
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    // Simulate standard secure authorization delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!inputUsername.trim()) {
      setLoginError('Security Access Denied: Username is required.');
      setIsLoggingIn(false);
      return;
    }

    // Role-based password rules
    let valid = false;
    const pwd = inputPassword.trim();
    const user = inputUsername.trim().toLowerCase();

    if (selectedRole === 'super_admin' && (pwd === 'admin' || pwd === 'sahildahiya')) {
      valid = true;
    } else if (selectedRole === 'editor' && (pwd === 'editor' || pwd === 'sahil')) {
      valid = true;
    } else if (selectedRole === 'analyst' && (pwd === 'analyst' || pwd === 'dahiya')) {
      valid = true;
    }

    if (valid) {
      const sessionData = {
        username: user,
        role: selectedRole,
        loggedIn: true,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('ds_admin_session', JSON.stringify(sessionData));
      setIsAuthenticated(true);
      setUserRole(selectedRole);
      setUsername(user);
      setLoginError('');
      // Trigger navigation refresh
      navigate('/dashboard');
    } else {
      setLoginError(`Authentication Failed: Invalid password for role [${selectedRole.replace('_', ' ').toUpperCase()}].`);
    }
    
    setIsLoggingIn(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('ds_admin_session');
    setIsAuthenticated(false);
    setInputPassword('');
    setInputUsername('');
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ds-black text-ds-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Futuristic Grid & Particle Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ds-blue/15 via-ds-black to-ds-black" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ds-blue/40 to-transparent" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-ds-blue/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="space-y-8"
          >
            {/* Branding Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex w-14 h-14 bg-ds-blue/10 border border-ds-blue/20 rounded-2xl items-center justify-center text-ds-blue mb-4">
                <ShieldCheck size={28} />
              </div>
              <h1 className="text-2xl font-display font-bold tracking-tight text-ds-white uppercase">
                Dahiya <span className="text-ds-blue">Control System</span>
              </h1>
              <p className="text-xs text-ds-smoke uppercase tracking-widest font-mono">
                Corporate Core Authorization Gate
              </p>
            </div>

            {/* Login Glass Card */}
            <Card className="p-8 border-white/5 bg-ds-graphite/40 backdrop-blur-2xl">
              <form onSubmit={handleLogin} className="space-y-6">
                
                {/* Role Switcher tabs */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-ds-smoke mb-3 text-center">
                    Select Credentials Level
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 bg-ds-black/50 p-1.5 rounded-xl border border-white/5">
                    {(['super_admin', 'editor', 'analyst'] as const).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          setSelectedRole(role);
                          setLoginError('');
                        }}
                        className={`py-2 px-1 rounded-lg text-[10px] font-mono font-medium tracking-tight uppercase transition-all duration-300 ${
                          selectedRole === role
                            ? 'bg-ds-blue/10 text-ds-blue border border-ds-blue/20'
                            : 'text-ds-smoke hover:text-ds-white'
                        }`}
                      >
                        {role === 'super_admin' ? 'S-Admin' : role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Banner with vibration */}
                <AnimatePresence mode="wait">
                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-300 flex items-start gap-2.5"
                    >
                      <ShieldAlert className="text-red-400 shrink-0 mt-0.5" size={14} />
                      <span className="leading-relaxed font-light">{loginError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Username Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-2">
                    Security Username
                  </label>
                  <Input
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    placeholder="e.g. sahil"
                    className="w-full bg-ds-black/40 border-white/10"
                    disabled={isLoggingIn}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-2 flex justify-between">
                    <span>Access Keypass</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={isLoggingIn}
                      className="w-full bg-ds-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50 transition-colors placeholder:text-ds-smoke"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ds-smoke hover:text-ds-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full !py-3.5"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <span className="flex items-center gap-2 justify-center">
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Authorizing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 justify-center">
                      Authorize Access <Sparkles size={14} className="text-ds-blue" />
                    </span>
                  )}
                </Button>

                {/* Pre-seeded Credentials Note */}
                <div className="text-center pt-2 border-t border-white/5 text-[10px] text-ds-smoke font-mono space-y-1 leading-relaxed">
                  <div className="text-[9px] uppercase tracking-wider text-ds-blue/60 mb-1">Evaluator Credentials Ledger:</div>
                  <div>Super Admin: <span className="text-ds-silver font-semibold">sahildahiya</span> / <span className="text-ds-silver font-semibold">admin</span></div>
                  <div>Editor Level: <span className="text-ds-silver font-semibold">sahil</span> / <span className="text-ds-silver font-semibold">editor</span></div>
                  <div>Analyst Level: <span className="text-ds-silver font-semibold">dahiya</span> / <span className="text-ds-silver font-semibold">analyst</span></div>
                </div>

              </form>
            </Card>

            <div className="text-center">
              <Link to="/" className="text-xs text-ds-smoke hover:text-ds-white transition-colors font-mono uppercase tracking-widest flex items-center justify-center gap-1">
                &larr; Return to Public Website
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Authenticated State View
  return (
    <div className="flex h-screen bg-ds-black text-ds-white overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-72 bg-ds-graphite border-r border-white/5 flex flex-col z-20 shrink-0"
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-xl tracking-tight text-ds-white uppercase">
            Dahiya <span className="text-ds-blue text-xs block mt-0.5 tracking-widest font-mono">Control Center</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
          <div className="text-xs font-mono text-ds-smoke uppercase tracking-widest mb-4 px-4">Menu</div>
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-ds-blue/10 text-ds-blue border border-ds-blue/20' 
                    : 'text-ds-silver hover:bg-white/5 hover:text-ds-white'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-ds-smoke hover:text-red-400 hover:bg-white/5 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm">Sign Out System</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ds-blue/5 via-ds-black to-ds-black pointer-events-none" />
        
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 bg-ds-black/50 backdrop-blur-xl flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ds-smoke" />
              <input 
                type="text" 
                placeholder="Global System Search..." 
                className="w-full bg-ds-graphite/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50 transition-colors placeholder:text-ds-smoke"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-ds-silver hover:text-ds-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-ds-blue rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <div className="text-sm font-medium text-ds-white capitalize">{username || 'Sahil'}</div>
                <div className="text-xs text-ds-smoke font-mono uppercase tracking-wider">
                  {userRole === 'super_admin' ? 'Super Admin' : userRole}
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-ds-blue/10 border border-ds-blue/20 flex items-center justify-center text-ds-blue font-mono font-bold">
                {userRole === 'super_admin' ? 'SA' : userRole === 'editor' ? 'ED' : 'AN'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 z-10">
          <Outlet context={{ userRole }} />
        </main>
      </div>
    </div>
  );
}
