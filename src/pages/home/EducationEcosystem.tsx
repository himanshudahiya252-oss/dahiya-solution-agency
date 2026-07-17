import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, BookOpen, Clock, Award, CheckCircle2, 
  XCircle, ChevronRight, ChevronLeft, Bookmark, RefreshCw, 
  Search, SlidersHorizontal, Eye, Plus, Send, AlertCircle, 
  Sliders, User, ShieldAlert, Sparkles, Database, FileText, 
  Sun, Moon, Filter, ArrowRight, Layers
} from 'lucide-react';
import { Card, Button } from '../../components/ui';
import { useSettings } from '../../context/SettingsContext';

import bgImage from '../../assets/images/ai_education_platform_1784273786221.jpg';

// Rotatable Hero Messages
const heroMessages = [
  "AI Practice Exams",
  "Mock Test Systems",
  "Institute Portals",
  "Student Dashboards",
  "Teacher Panels",
  "Performance Analytics",
  "Question Banks",
  "Learning Management Solutions"
];

// Sample Practice Questions
const practiceQuestions = [
  {
    id: 1,
    type: "Single Choice",
    subject: "Artificial Intelligence",
    topic: "Neural Networks",
    passage: "Artificial neural networks (ANNs) are computing systems inspired by the biological neural networks that constitute animal brains.",
    question: "Which activation function is commonly used in output layers of multi-class classification problems?",
    options: ["Sigmoid", "ReLU", "Tanh", "Softmax"],
    correctAnswer: 3, // Softmax
    explanation: "Softmax converts a vector of K real values to a probability distribution of K outcomes, making it ideal for multi-class classification output.",
    difficulty: "Medium"
  },
  {
    id: 2,
    type: "Multiple Choice",
    subject: "Web Development",
    topic: "React Performance",
    question: "Select all techniques that directly help optimize rendering performance in React applications:",
    options: [
      "Using React.memo to memoize components",
      "Spreading unused variables across state managers",
      "Implementing virtualized lists for long feeds",
      "Using useMemo and useCallback hooks for reference safety"
    ],
    correctAnswer: [0, 2, 3],
    explanation: "React.memo, list virtualization, and memoization hooks (useMemo/useCallback) are standard methods to optimize rendering behavior.",
    difficulty: "Hard"
  },
  {
    id: 3,
    type: "True/False",
    subject: "Software Architecture",
    topic: "Microservices",
    question: "True or False: In a pure microservice architecture, all services must share a single centralized database instance to enforce state integrity.",
    options: ["True", "False"],
    correctAnswer: 1, // False
    explanation: "In standard microservices, each service should own its private database (Database-per-Service pattern) to ensure loose coupling and independent scalability.",
    difficulty: "Easy"
  }
];

// Content Calendar Planning
const learningJourneySteps = [
  { step: 'Register', title: 'Onboard Student', desc: 'Custom profiles, diagnostic exams, and immediate setup.' },
  { step: 'Choose Course', title: 'Personalized Paths', desc: 'AI-guided curation matching candidate weak points.' },
  { step: 'Practice', title: 'Adaptive Testing', desc: 'Bespoke mock exams reflecting exact state patterns.' },
  { step: 'Analyze', title: 'Deep Metrics', desc: 'Detailed, topic-wise confidence indices and mastery trends.' },
  { step: 'Improve', title: 'Assisted Learning', desc: 'AI summary models and continuous smart coaching.' },
  { step: 'Retest', title: 'Iterative Validation', desc: 'Targeted re-evaluations to eliminate knowledge blind spots.' },
  { step: 'Track Progress', title: 'Continuous Growth', desc: 'Continuous leaderboard and historical progress logs.' },
  { step: 'Achieve Goals', title: 'Verified Certification', desc: 'Unlock institutional credentials and verifiable achievements.' }
];

export function EducationEcosystem() {
  const { settings } = useSettings();
  // Rotate message index
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % heroMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Demo state: Active Main View
  const [activeTab, setActiveTab] = useState<'exam' | 'dashboard' | 'analytics' | 'assistant' | 'institute'>('exam');

  // Exam Simulator states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [examTheme, setExamTheme] = useState<'dark' | 'light'>('dark');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>({});
  const [bookmarks, setBookmarks] = useState<Record<number, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<number | null>(null);
  const [examScore, setExamScore] = useState<{ correct: number; total: number } | null>(null);
  const [examTime, setExamTime] = useState(1200); // 20 minutes countdown

  // Live timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setExamTime((prev) => (prev > 0 ? prev - 1 : 1200));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = practiceQuestions[currentQuestionIdx];

  const handleSelectOption = (optIdx: number) => {
    if (currentQ.type === "Multiple Choice") {
      const currentSelection = selectedAnswers[currentQ.id] || [];
      if (currentSelection.includes(optIdx)) {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentQ.id]: currentSelection.filter((x: number) => x !== optIdx)
        });
      } else {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentQ.id]: [...currentSelection, optIdx].sort()
        });
      }
    } else {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQ.id]: optIdx
      });
    }
  };

  const handleToggleBookmark = (id: number) => {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    practiceQuestions.forEach((q) => {
      const ans = selectedAnswers[q.id];
      if (Array.isArray(q.correctAnswer)) {
        if (Array.isArray(ans) && ans.length === q.correctAnswer.length && ans.every((v, i) => v === q.correctAnswer[i])) {
          correctCount++;
        }
      } else {
        if (ans === q.correctAnswer) {
          correctCount++;
        }
      }
    });
    setExamScore({ correct: correctCount, total: practiceQuestions.length });
  };

  const handleResetExam = () => {
    setSelectedAnswers({});
    setBookmarks({});
    setShowExplanation(null);
    setExamScore(null);
    setExamTime(1200);
    setCurrentQuestionIdx(0);
  };

  // Certificate Editable Mockup
  const [certName, setCertName] = useState("Alexander Sterling");
  const [certCourse, setCertCourse] = useState("Intelligent Systems & Adaptive AI");
  const [certDate, setCertDate] = useState("2026-07-17");

  // Question Bank search / filter state
  const [qbSearch, setQbSearch] = useState("");
  const [qbFilterSubject, setQbFilterSubject] = useState("All");
  const [qbFilterDifficulty, setQbFilterDifficulty] = useState("All");

  const sampleQuestionBank = [
    { code: "Q-901", question: "Explain the optimization trade-offs between dynamic programming and memoization.", subject: "Algorithms", difficulty: "Hard" },
    { code: "Q-704", question: "What is the difference between client-side rendering and edge routing middleware?", subject: "Web Dev", difficulty: "Medium" },
    { code: "Q-512", question: "Which relational normalization form completely eliminates transitive dependency?", subject: "Databases", difficulty: "Medium" },
    { code: "Q-308", question: "Define the visual contrast hierarchy guidelines of Web Content Accessibility (WCAG 2.1).", subject: "UI/UX", difficulty: "Easy" },
    { code: "Q-882", question: "How does distributed consensus resolve state divergence in a secure environment?", subject: "System Design", difficulty: "Hard" }
  ];

  const filteredQuestions = sampleQuestionBank.filter((q) => {
    const matchSearch = q.question.toLowerCase().includes(qbSearch.toLowerCase()) || q.code.toLowerCase().includes(qbSearch.toLowerCase());
    const matchSubject = qbFilterSubject === "All" || q.subject === qbFilterSubject;
    const matchDiff = qbFilterDifficulty === "All" || q.difficulty === qbFilterDifficulty;
    return matchSearch && matchSubject && matchDiff;
  });

  return (
    <section className="relative bg-ds-black py-32 overflow-hidden border-t border-white/5">
      {/* Background with cinematic theme */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ds-black via-ds-black/90 to-ds-black" />
        <div className="absolute inset-0 bg-ds-blue/5 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Dynamic Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6"
          >
            <GraduationCap size={14} className="text-ds-cyan" />
            AI & EdTech Architecture
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white leading-[1.1] mb-6">
            Intelligent platforms engineered for <br />
            <span className="relative inline-block h-[1.2em] text-transparent bg-clip-text bg-gradient-to-r from-ds-cyan to-ds-blue min-w-[320px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={msgIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 right-0"
                >
                  {heroMessages[msgIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          
          <p className="text-lg text-ds-smoke font-light leading-relaxed max-w-2xl mx-auto">
            Traditional learning portals are outdated. We design adaptive testing platforms, performance visualizers, and enterprise systems optimized for institutions delivering structured practice and credentialing.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto border-b border-white/10 pb-4">
          {[
            { id: 'exam', label: 'Adaptive Practice Exam', icon: Clock },
            { id: 'dashboard', label: 'Student Dashboard', icon: User },
            { id: 'analytics', label: 'Learning Analytics', icon: Layers },
            { id: 'assistant', label: 'AI Study Assistant', icon: Sparkles },
            { id: 'institute', label: 'LMS Administration', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono transition-all duration-300 ${
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

        {/* Dynamic Main Workspace Container */}
        <div className="min-h-[580px] bg-ds-graphite/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative mb-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ds-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-ds-blue/5 rounded-full filter blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            
            {/* 1. ADAPTIVE EXAM SIMULATOR */}
            {activeTab === 'exam' && (
              <motion.div
                key="exam"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`transition-all duration-500 rounded-xl p-6 border ${
                  examTheme === 'light' 
                    ? 'bg-white text-zinc-900 border-zinc-200' 
                    : 'bg-ds-black text-ds-white border-white/10'
                }`}
              >
                {/* Simulator header controls */}
                <div className="flex justify-between items-center border-b pb-4 mb-6 border-current/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-ds-cyan/20 text-ds-cyan rounded">
                      Adaptive Exam Mode
                    </span>
                    <span className="text-xs font-mono opacity-60">Timer: {formatTime(examTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setExamTheme(examTheme === 'dark' ? 'light' : 'dark')}
                      className="p-1.5 rounded hover:bg-current/10 transition-colors"
                      title="Toggle Practice Dark/Light Theme"
                    >
                      {examTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                    </button>
                    <button 
                      onClick={handleResetExam}
                      className="p-1.5 rounded hover:bg-current/10 transition-colors"
                      title="Reset Exam State"
                    >
                      <RefreshCw size={15} />
                    </button>
                  </div>
                </div>

                {/* Main Simulator Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Left Column: Question Navigator */}
                  <div className="lg:col-span-1 border-r border-current/10 pr-0 lg:pr-6 flex flex-col gap-4">
                    <div className="text-xs font-mono uppercase tracking-wider font-bold opacity-80">
                      Exam Navigator
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {practiceQuestions.map((q, idx) => {
                        const isSelected = selectedAnswers[q.id] !== undefined;
                        const isBookmarked = bookmarks[q.id];
                        const isActive = currentQuestionIdx === idx;
                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIdx(idx)}
                            className={`p-2.5 rounded text-xs font-mono font-bold transition-all border ${
                              isActive
                                ? 'border-ds-cyan bg-ds-cyan/20 text-ds-cyan'
                                : isBookmarked
                                ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500'
                                : isSelected
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                                : 'border-current/10 hover:border-current/30'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        )
                      })}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-current/10 flex flex-col gap-2 text-xs font-mono opacity-80">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500" />
                        <span>Answered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500" />
                        <span>Bookmarked</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-ds-cyan/20 border border-ds-cyan" />
                        <span>Current</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Active Question Block */}
                  <div className="lg:col-span-3 flex flex-col justify-between min-h-[380px]">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div>
                          <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">
                            {currentQ.subject} &bull; {currentQ.topic}
                          </span>
                          <span className="ml-3 px-2 py-0.5 rounded text-[9px] font-mono border border-current/20 opacity-70">
                            {currentQ.type}
                          </span>
                        </div>
                        <button
                          onClick={() => handleToggleBookmark(currentQ.id)}
                          className={`flex items-center gap-1.5 text-xs font-mono transition-colors ${
                            bookmarks[currentQ.id] ? 'text-yellow-500' : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Bookmark size={13} fill={bookmarks[currentQ.id] ? "currentColor" : "none"} />
                          {bookmarks[currentQ.id] ? 'Bookmarked' : 'Bookmark'}
                        </button>
                      </div>

                      {currentQ.passage && (
                        <div className="p-4 rounded-lg bg-current/[0.03] border border-current/5 text-sm italic leading-relaxed mb-4 font-light opacity-90">
                          {currentQ.passage}
                        </div>
                      )}

                      <h3 className="text-base md:text-lg font-medium leading-relaxed mb-6">
                        <span className="font-mono text-ds-cyan mr-2">{currentQuestionIdx + 1}.</span>
                        {currentQ.question}
                      </h3>

                      {/* Interactive Options Stack */}
                      <div className="space-y-2.5">
                        {currentQ.options.map((option, idx) => {
                          const isSelected = currentQ.type === "Multiple Choice"
                            ? (selectedAnswers[currentQ.id] || []).includes(idx)
                            : selectedAnswers[currentQ.id] === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectOption(idx)}
                              className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex justify-between items-center group ${
                                isSelected
                                  ? 'border-ds-cyan bg-ds-cyan/10 text-ds-cyan'
                                  : 'border-current/10 hover:border-current/20 hover:bg-current/[0.02]'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono font-bold ${
                                  isSelected ? 'border-ds-cyan bg-ds-cyan/20 text-ds-cyan' : 'border-current/20'
                                }`}>
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                <span>{option}</span>
                              </div>
                              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Navigation footer */}
                    <div className="mt-8 pt-6 border-t border-current/10 flex justify-between items-center flex-wrap gap-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentQuestionIdx === 0}
                          onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
                          className={examTheme === 'light' ? '!text-zinc-900 hover:!bg-zinc-100 border-zinc-200' : ''}
                        >
                          <ChevronLeft size={16} /> Prev
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentQuestionIdx === practiceQuestions.length - 1}
                          onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                          className={examTheme === 'light' ? '!text-zinc-900 hover:!bg-zinc-100 border-zinc-200' : ''}
                        >
                          Next <ChevronRight size={16} />
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowExplanation(showExplanation === currentQ.id ? null : currentQ.id)}
                          className={`!text-xs font-mono ${examTheme === 'light' ? 'text-zinc-600 hover:text-black' : ''}`}
                        >
                          {showExplanation === currentQ.id ? "Hide Solution" : "Explain Answer"}
                        </Button>

                        <Button
                          variant="primary"
                          size="sm"
                          onClick={handleSubmitExam}
                          className="!bg-ds-cyan hover:!bg-ds-cyan/80 !text-ds-black font-bold"
                        >
                          Submit Test
                        </Button>
                      </div>
                    </div>

                    {/* Dynamic Explanation Section */}
                    <AnimatePresence>
                      {showExplanation === currentQ.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 p-4 rounded-xl bg-ds-cyan/5 border border-ds-cyan/20 text-xs leading-relaxed"
                        >
                          <div className="flex items-center gap-2 text-ds-cyan font-bold font-mono mb-2">
                            <Sparkles size={14} />
                            AI Explanation Model
                          </div>
                          <p className="opacity-90">{currentQ.explanation}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Score summary report card */}
                    <AnimatePresence>
                      {examScore !== null && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="mt-6 p-6 rounded-xl bg-ds-black text-ds-white border border-emerald-500/20 text-center relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
                          <h4 className="text-xl font-display text-emerald-400 mb-2">Test Completed!</h4>
                          <p className="text-xs text-ds-smoke max-w-sm mx-auto mb-4">
                            You scored <strong className="text-ds-white">{examScore.correct} / {examScore.total}</strong> answers correctly. This adaptation sample operates under illustrative algorithms.
                          </p>
                          <div className="flex justify-center gap-3">
                            <Button variant="outline" size="sm" onClick={handleResetExam}>
                              Retry Practice Set
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. PREMIUM STUDENT DASHBOARD */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-display text-ds-white">Candidate Workspace Dashboard</h3>
                    <p className="text-xs text-ds-smoke">Comprehensive tracking index for personalized target scores.</p>
                  </div>
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-ds-cyan">
                    Status: Active Integration
                  </div>
                </div>

                {/* Dashboard stats strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Today's Study Progress", value: "85%", change: "↗ 15% from goal" },
                    { label: "Mock Study Hours", value: "32.4h", change: "+4.2h this week" },
                    { label: "Practice Accuracy", value: "91.2%", change: "Target: 95.0%" },
                    { label: "Next Scheduled Exam", value: "AI Systems", change: "July 19, 2026" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                      <div className="text-[10px] text-ds-smoke font-mono uppercase tracking-wider mb-2">{stat.label}</div>
                      <div className="text-2xl font-display font-medium text-ds-white mb-1">{stat.value}</div>
                      <div className="text-[10px] text-ds-cyan/70 font-mono">{stat.change}</div>
                    </div>
                  ))}
                </div>

                {/* Content columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Subject and Target Master List */}
                  <div className="lg:col-span-2 bg-white/[0.01] border border-white/5 p-5 rounded-xl space-y-4">
                    <h4 className="text-xs font-mono text-ds-white uppercase tracking-wider font-bold">Subject Mastery Breakdown</h4>
                    <div className="space-y-3.5">
                      {[
                        { name: "Distributed Systems & Scalability", progress: 88, accuracy: 92, status: "Mastered" },
                        { name: "Machine Learning & Advanced Classification", progress: 74, accuracy: 84, status: "Review Needed" },
                        { name: "Client Architecture & Fluid Rendering", progress: 95, accuracy: 96, status: "Outstanding" },
                        { name: "Security Protocols & Auth Architectures", progress: 48, accuracy: 62, status: "Critical Path" }
                      ].map((sub, i) => (
                        <div key={i} className="space-y-1.5 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-medium text-ds-white">{sub.name}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                              sub.status === "Outstanding" ? "bg-emerald-500/10 text-emerald-400" :
                              sub.status === "Mastered" ? "bg-ds-cyan/10 text-ds-cyan" :
                              sub.status === "Review Needed" ? "bg-yellow-500/10 text-yellow-500" :
                              "bg-red-500/10 text-red-400"
                            }`}>{sub.status}</span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-ds-blue to-ds-cyan h-full" style={{ width: `${sub.progress}%` }} />
                          </div>
                          <div className="flex justify-between text-[10px] text-ds-smoke font-mono">
                            <span>Completeness: {sub.progress}%</span>
                            <span>Avg Accuracy: {sub.accuracy}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leaderboard & Achievements Preview */}
                  <div className="bg-white/[0.01] border border-white/5 p-5 rounded-xl flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-mono text-ds-white uppercase tracking-wider font-bold mb-4">Institutional Standings</h4>
                      <div className="space-y-3">
                        {[
                          { rank: 1, name: "Lucas Vance", score: "99.8%", active: false },
                          { rank: 2, name: "Sofia Patel", score: "98.2%", active: false },
                          { rank: 3, name: "Alexander S. (You)", score: "96.4%", active: true },
                          { rank: 4, name: "Marcus Thorne", score: "95.1%", active: false },
                          { rank: 5, name: "Zara Chen", score: "92.0%", active: false }
                        ].map((lead, i) => (
                          <div key={i} className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono ${
                            lead.active ? 'bg-ds-cyan/10 border border-ds-cyan/20 text-ds-cyan' : 'bg-white/[0.01] border border-white/5'
                          }`}>
                            <div className="flex items-center gap-3">
                              <span className="font-bold opacity-75">#{lead.rank}</span>
                              <span className={lead.active ? 'font-bold' : 'text-ds-silver'}>{lead.name}</span>
                            </div>
                            <span className="font-bold">{lead.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/5 text-center">
                      <span className="text-[10px] text-ds-smoke italic font-light">Interactive mockup representing live competitive student rosters.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. PERFORMANCE ANALYTICS AND CUSTOM CHARTING */}
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-display text-ds-white">Learning Performance Analytics</h3>
                    <p className="text-xs text-ds-smoke">Interactive visualization matrices illustrating mock progress trends over time.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Accuracy & Mastery Trend Chart */}
                  <div className="lg:col-span-2 bg-white/[0.01] border border-white/5 p-5 rounded-xl">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xs font-mono text-ds-white uppercase tracking-wider font-bold">Accuracy Trend Line (Weekly)</h4>
                      <span className="text-[10px] text-ds-cyan font-mono bg-ds-cyan/5 px-2 py-0.5 rounded border border-ds-cyan/15">Avg: 88.5%</span>
                    </div>

                    {/* Pure Responsive SVG Line/Area Chart */}
                    <div className="w-full h-48 relative">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                        <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                        <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

                        {/* Area gradient under the path */}
                        <path d="M0,100 L0,70 L15,65 L30,48 L45,55 L60,32 L75,25 L90,15 L100,12 L100,100 Z" fill="rgba(34, 211, 238, 0.08)" />

                        {/* Main Trend Line */}
                        <path d="M0,70 L15,65 L30,48 L45,55 L60,32 L75,25 L90,15 L100,12" fill="none" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                        {/* Circle data markers */}
                        <circle cx="15" cy="65" r="3" fill="#22d3ee" />
                        <circle cx="30" cy="48" r="3" fill="#3b82f6" />
                        <circle cx="60" cy="32" r="3" fill="#22d3ee" />
                        <circle cx="90" cy="15" r="3" fill="#3b82f6" />
                      </svg>
                      <div className="absolute inset-0 flex justify-between items-end text-[9px] font-mono text-ds-smoke px-1 select-none pointer-events-none">
                        <span>Wk 1</span>
                        <span>Wk 2</span>
                        <span>Wk 3</span>
                        <span>Wk 4</span>
                        <span>Wk 5</span>
                        <span>Wk 6</span>
                        <span>Wk 7</span>
                      </div>
                    </div>
                  </div>

                  {/* Distribution of Subjects Bar Chart */}
                  <div className="bg-white/[0.01] border border-white/5 p-5 rounded-xl flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-mono text-ds-white uppercase tracking-wider font-bold mb-4">Subject Weight Distribution</h4>
                      <div className="space-y-4">
                        {[
                          { subject: "AI Automation", count: "420 Questions", pct: 42, color: "bg-ds-cyan" },
                          { subject: "System Design", count: "240 Questions", pct: 24, color: "bg-ds-blue" },
                          { subject: "Analytics", count: "190 Questions", pct: 19, color: "bg-purple-500" },
                          { subject: "UI/UX Architecture", count: "150 Questions", pct: 15, color: "bg-zinc-600" }
                        ].map((bar, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-ds-silver font-light">{bar.subject}</span>
                              <span className="text-ds-white font-mono">{bar.count}</span>
                            </div>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex">
                              <div className={`${bar.color} h-full rounded-full`} style={{ width: `${bar.pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/5 text-center">
                      <span className="text-[10px] text-ds-smoke/50 uppercase tracking-widest font-mono">Statistical Demo Model</span>
                    </div>
                  </div>
                </div>

                {/* Heat Map Grid representing Daily Activity */}
                <div className="p-5 bg-white/[0.01] border border-white/5 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-mono text-ds-white uppercase tracking-wider font-bold">Candidate Learning Heat Map</h4>
                    <span className="text-[9px] text-ds-smoke font-mono">Daily interaction logging frequency index</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 28 }).map((_, idx) => {
                      const activityLevel = (idx * 17) % 5; // pseudo random frequency
                      const colors = [
                        'bg-white/5',
                        'bg-ds-cyan/10 border border-ds-cyan/10',
                        'bg-ds-cyan/30 border border-ds-cyan/20',
                        'bg-ds-cyan/60 border border-ds-cyan/30',
                        'bg-ds-cyan border border-ds-cyan/40 text-ds-black'
                      ];
                      return (
                        <div 
                          key={idx} 
                          className={`aspect-video rounded-md flex items-center justify-center text-[8px] font-mono font-bold ${colors[activityLevel]}`}
                          title={`Day ${idx + 1}: ${activityLevel * 2}h registered`}
                        >
                          D{idx + 1}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. AI STUDY ASSISTANCE PORTAL EXPLANATION */}
            {activeTab === 'assistant' && (
              <motion.div
                key="assistant"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-ds-cyan/10 border border-ds-cyan/20 text-xs font-mono text-ds-cyan mb-4">
                    <Sparkles size={14} /> AI-Assisted Study Curation
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display text-ds-white mb-6">
                    Explain, generate, and adapt candidate progress automatically.
                  </h3>
                  <p className="text-ds-smoke text-sm font-light leading-relaxed mb-6">
                    Our platform architecture integrates semantic pipelines that analyze incorrect selections and feed candidate metrics straight back into mock generations.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { title: "Dynamic Question Generator", desc: "Build mock parameters matching selected syllabus constraints instantly." },
                      { title: "Smart Concept Summaries", desc: "Convert massive chapters into high-density reference logs." },
                      { title: "Blindspot Reminders", desc: "Predictive algorithms that highlight high-probability test items based on candidate gaps." }
                    ].map((feat, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                        <div className="w-8 h-8 rounded-lg bg-ds-cyan/15 flex items-center justify-center shrink-0 text-ds-cyan">
                          <CheckCircle2 size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-ds-white mb-1">{feat.title}</h4>
                          <p className="text-xs text-ds-smoke leading-relaxed font-light">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Assistant UI Widget */}
                <div className="bg-ds-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between h-[420px]">
                  <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-ds-cyan animate-pulse" />
                      <span className="text-xs font-mono font-bold text-ds-white">IntelliScribe AI Assistant</span>
                    </div>
                    <span className="text-[9px] font-mono text-ds-cyan px-1.5 py-0.5 rounded bg-ds-cyan/10">Active Curation</span>
                  </div>

                  <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-mono text-[9px]">U</div>
                      <div className="p-3 rounded-xl rounded-tl-none bg-white/5 text-ds-smoke font-light">
                        "I constantly confuse relational JOIN constraints with distributed transaction models. Can you summarize?"
                      </div>
                    </div>

                    <div className="flex gap-3 max-w-[85%] ml-auto flex-row-reverse">
                      <div className="w-6 h-6 rounded-full bg-ds-cyan/20 flex items-center justify-center shrink-0 font-mono text-[9px] text-ds-cyan">AI</div>
                      <div className="p-3 rounded-xl rounded-tr-none bg-ds-cyan/10 border border-ds-cyan/10 text-ds-white">
                        <strong className="text-ds-cyan">Summary Concept Profile:</strong>
                        <ul className="list-disc pl-4 mt-2 space-y-1 font-light opacity-90">
                          <li>Relational JOINs: Client operations on static table pointers (Schema strict).</li>
                          <li>Distributed States: Independent ledger nodes reconciling consistency guarantees (CAP Theorem context).</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border-t border-white/10 bg-white/[0.02] flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ask the study assistant a candidate query..." 
                      className="flex-1 bg-ds-black border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-ds-cyan/40 text-ds-white"
                      disabled
                    />
                    <button className="p-2 rounded-lg bg-ds-cyan text-ds-black hover:bg-ds-cyan/80 transition-colors cursor-not-allowed" disabled>
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. LMS ADMINISTRATION / PORTAL MANAGEMENTS */}
            {activeTab === 'institute' && (
              <motion.div
                key="institute"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-display text-ds-white">Institute Administration Panel</h3>
                    <p className="text-xs text-ds-smoke">Verifiable question inventory lists and student roster indexing.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-ds-silver flex items-center gap-1.5 border border-white/10">
                      <Plus size={12} /> Create Question
                    </button>
                  </div>
                </div>

                {/* Filter Controls Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/[0.01] p-4 rounded-xl border border-white/5">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-ds-smoke" size={14} />
                    <input 
                      type="text"
                      placeholder="Search Question Code..."
                      value={qbSearch}
                      onChange={(e) => setQbSearch(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-ds-cyan text-ds-white"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter size={12} className="text-ds-smoke shrink-0" />
                    <select 
                      value={qbFilterSubject} 
                      onChange={(e) => setQbFilterSubject(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-lg p-1.5 text-xs text-ds-white focus:outline-none"
                    >
                      <option value="All">All Subjects</option>
                      <option value="Algorithms">Algorithms</option>
                      <option value="Web Dev">Web Dev</option>
                      <option value="Databases">Databases</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="System Design">System Design</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={12} className="text-ds-smoke shrink-0" />
                    <select 
                      value={qbFilterDifficulty} 
                      onChange={(e) => setQbFilterDifficulty(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-lg p-1.5 text-xs text-ds-white focus:outline-none"
                    >
                      <option value="All">All Difficulties</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div className="text-right flex items-center justify-end text-[10px] font-mono text-ds-smoke">
                    Showing {filteredQuestions.length} item(s)
                  </div>
                </div>

                {/* Question Inventory Grid list */}
                <div className="border border-white/10 rounded-xl overflow-hidden bg-ds-black/50">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 text-ds-smoke font-mono uppercase text-[9px] tracking-wider border-b border-white/10">
                      <tr>
                        <th className="p-3">Ref Code</th>
                        <th className="p-3">Question Statement</th>
                        <th className="p-3">Subject</th>
                        <th className="p-3">Difficulty</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-light">
                      {filteredQuestions.map((q, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3 font-mono font-bold text-ds-cyan">{q.code}</td>
                          <td className="p-3 text-ds-white truncate max-w-xs">{q.question}</td>
                          <td className="p-3 text-ds-silver">{q.subject}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                              q.difficulty === "Hard" ? "bg-red-500/10 text-red-400" :
                              q.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-500" :
                              "bg-emerald-500/10 text-emerald-400"
                            }`}>{q.difficulty}</span>
                          </td>
                          <td className="p-3 text-right font-mono">
                            <button className="text-ds-cyan hover:underline text-[10px] mr-2">Edit</button>
                            <button className="text-ds-smoke hover:text-ds-white text-[10px]">Inspect</button>
                          </td>
                        </tr>
                      ))}
                      {filteredQuestions.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-ds-smoke font-mono">
                            No mock assets match selected filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Dynamic Learning Journey Roadmap */}
        <div className="pt-12 border-t border-white/5 mb-24">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-display text-ds-white mb-2">Adaptive Learning Journeys</h3>
            <p className="text-ds-smoke text-sm font-light">How candidate preparation cycles systematically evolve.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningJourneySteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative group p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-ds-cyan/30 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-xs font-mono text-ds-cyan/40 font-bold group-hover:text-ds-cyan transition-colors">
                  0{idx + 1}
                </div>
                <div className="text-[10px] font-mono text-ds-cyan uppercase tracking-wider mb-2 font-bold">{step.step}</div>
                <h4 className="text-sm font-medium text-ds-white mb-2 group-hover:text-ds-cyan transition-colors">{step.title}</h4>
                <p className="text-xs text-ds-smoke font-light leading-relaxed">{step.desc}</p>
                {idx < learningJourneySteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-white/10 group-hover:text-ds-cyan transition-colors">
                    <ChevronRight size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificate Editable Preview Mockup Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-y border-white/5 py-16">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-ds-blue/10 border border-ds-blue/20 text-xs font-mono text-ds-blue">
              <Award size={14} /> Certificate Customization Studio
            </div>
            <h3 className="text-3xl font-display text-ds-white leading-tight">
              Verifiable completion credentials for candidates.
            </h3>
            <p className="text-sm text-ds-smoke font-light leading-relaxed">
              Dahiya Solution designs verifiable micro-credentialing pipelines complete with customizable templates, signature assets, and dynamic QR placeholders.
            </p>

            {/* Custom Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider mb-2">Student Reference Name</label>
                <input 
                  type="text" 
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-cyan focus:ring-1 focus:ring-ds-cyan/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider mb-2">Subject Syllabus Path</label>
                <input 
                  type="text" 
                  value={certCourse}
                  onChange={(e) => setCertCourse(e.target.value)}
                  className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-cyan focus:ring-1 focus:ring-ds-cyan/30 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Certificate SVG Canvas Mockup */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-xl aspect-[1.414/1] bg-[#0c0d0e] border-4 border-double border-ds-cyan/30 p-8 rounded relative overflow-hidden flex flex-col justify-between text-center select-none shadow-2xl">
              {/* Artistic corners */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-ds-cyan/50" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-ds-cyan/50" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-ds-cyan/50" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-ds-cyan/50" />

              <div className="space-y-2 mt-4">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full border border-ds-cyan/40 flex items-center justify-center text-ds-cyan">
                    <GraduationCap size={24} />
                  </div>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ds-cyan">Certificate of Professional Proficiency</div>
                <div className="h-px bg-gradient-to-r from-transparent via-ds-cyan/30 to-transparent w-2/3 mx-auto" />
              </div>

              <div className="space-y-4">
                <div className="text-[10px] text-ds-smoke italic font-light">This administrative micro-credential is proud to acknowledge</div>
                <div className="text-xl md:text-2xl font-display text-ds-white tracking-wide border-b border-white/10 pb-2 w-3/4 mx-auto uppercase">{certName || "Candidate Name"}</div>
                <div className="text-[10px] text-ds-smoke font-light max-w-md mx-auto">
                  for successfully scoring above target proficiency index in the intensive assessment program on
                </div>
                <div className="text-xs font-mono text-ds-cyan uppercase tracking-wider font-bold">{certCourse || "Syllabus Path"}</div>
              </div>

              <div className="flex justify-between items-end border-t border-white/5 pt-4 mt-6">
                <div className="text-left font-mono text-[9px] text-ds-smoke">
                  <div>Date Issued: {certDate}</div>
                  <div>ID: DAH-REF-2026-AI</div>
                </div>
                
                {/* QR Code Simulation */}
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded p-1 flex flex-wrap gap-0.5 justify-center items-center opacity-60">
                  <div className="grid grid-cols-4 gap-0.5 w-full h-full">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`w-full h-full ${i % 3 === 0 || i % 5 === 0 ? 'bg-ds-cyan' : 'bg-transparent'}`} />
                    ))}
                  </div>
                </div>

                <div className="text-right font-mono text-[9px] text-ds-smoke">
                  <div className="italic text-ds-white">{settings.certificateSignatoryName}</div>
                  <div className="border-t border-white/20 mt-1 pt-0.5">{settings.certificateSignatoryDesignation}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Education CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full glass-panel border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-gradient-to-b from-ds-cyan/5 to-transparent pointer-events-none" />
           <h2 className="font-display text-3xl md:text-5xl text-ds-white mb-6 relative z-10">
             Build Your Next-Generation Learning Platform
           </h2>
           <p className="text-ds-smoke max-w-2xl mx-auto mb-10 relative z-10 text-base font-light leading-relaxed">
             From bespoke adaptive practice interfaces to comprehensive learning analytics and institutional content management systems. Dahiya Solution is ready to bring your learning architecture to life.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
             <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold tracking-wide shadow-[0_0_20px_rgba(34,211,238,0.25)] !bg-ds-cyan !text-ds-black hover:!bg-ds-cyan/80">
               Request a Demo
             </Button>
             <Button variant="glass" size="lg" className="w-full sm:w-auto">
               Discuss Your Project
             </Button>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
