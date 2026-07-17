import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MessageSquare, X, Send, Sparkles, Check, DollarSign } from 'lucide-react';
import { Button } from './ui';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  options?: string[];
  isEmailLead?: boolean;
}

export default function AIBusinessAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [collectedEmail, setCollectedEmail] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: "Greetings. I am Dahiya's digital systems pilot. Let's expedite your inquiry.",
        options: [
          'Calculate Project Budget',
          'Sovereign Security SLA',
          'Schedule Live Demo',
          'Register for Executive Insights'
        ]
      }
    ]);
  }, []);

  // Scroll to bottom on updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const updatedMsgs = [...messages, { sender: 'user', text } as Message];
    setMessages(updatedMsgs);
    setInputVal('');

    // AI thinking latency simulation
    setTimeout(() => {
      let aiResponse: Message = { sender: 'ai', text: "Analyzing query constraints..." };

      if (text.toLowerCase().includes('budget') || text.toLowerCase().includes('calculate')) {
        aiResponse = {
          sender: 'ai',
          text: 'To compute accurate budget parameters, use our integrated scope estimator panel below, or enter your corporate email to schedule a 1-on-1 briefing with CEO Sahil Dahiya.',
          options: ['Schedule Live Demo', 'Register for Executive Insights']
        };
      } else if (text.toLowerCase().includes('security') || text.toLowerCase().includes('sla')) {
        aiResponse = {
          sender: 'ai',
          text: 'Dahiya Solution enforces AES-256 cloud container isolation, automated vulnerability scanning, and strict role policies on all production databases.',
          options: ['Calculate Project Budget', 'Register for Executive Insights']
        };
      } else if (text.toLowerCase().includes('demo') || text.toLowerCase().includes('schedule')) {
        aiResponse = {
          sender: 'ai',
          text: 'We would love to coordinate a high-fidelity demonstration. Enter your email address below to queue a secure corporate invite.',
          isEmailLead: true
        };
      } else if (text.toLowerCase().includes('insights') || text.toLowerCase().includes('register')) {
        aiResponse = {
          sender: 'ai',
          text: 'Executive insights are published monthly. Enter your primary email to subscribe securely:',
          isEmailLead: true
        };
      } else {
        // Validate if user submitted an email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(text)) {
          setCollectedEmail(text);
          aiResponse = {
            sender: 'ai',
            text: `Success: Email ${text} has been registered to the Dahiya queue. A technical strategist will briefing you shortly.`,
            options: ['Calculate Project Budget', 'Sovereign Security SLA']
          };
        } else {
          aiResponse = {
            sender: 'ai',
            text: 'I parsed your intent. To schedule specialized scoping, please provide your corporate email, or choose an option below.',
            options: ['Calculate Project Budget', 'Sovereign Security SLA', 'Schedule Live Demo']
          };
        }
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        
        {/* Toggle Pulse Trigger Button */}
        {!isOpen && (
          <motion.button
            layoutId="chat-bubble"
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-ds-blue hover:bg-ds-blue/90 text-ds-white flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.55)] cursor-pointer relative group border border-white/15"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot size={22} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-ds-cyan border-2 border-ds-black rounded-full animate-pulse" />
          </motion.button>
        )}

        {/* Expanded Assistant Dialog */}
        {isOpen && (
          <motion.div
            layoutId="chat-bubble"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="w-80 md:w-96 h-[480px] bg-ds-graphite/95 border border-white/10 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-ds-black px-5 py-4 flex justify-between items-center border-b border-white/10 select-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ds-cyan/15 flex items-center justify-center text-ds-cyan">
                  <Sparkles size={14} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-ds-white font-mono">Dahiya Pilot</h4>
                  <span className="text-[9px] font-mono text-emerald-400">Autonomous Core Active</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-ds-smoke hover:text-ds-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-ds-blue text-ds-white rounded-tr-none'
                      : 'bg-white/5 border border-white/5 text-ds-silver rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Suggestion Options Buttons */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(opt)}
                          className="px-2.5 py-1 text-[9px] font-mono rounded bg-ds-cyan/10 hover:bg-ds-cyan/20 border border-ds-cyan/25 text-ds-cyan transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input / Email submission bar */}
            <div className="p-3.5 bg-ds-black border-t border-white/10">
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Enter message or email address..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputVal)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-cyan transition-colors"
                />
                <button 
                  onClick={() => handleSendMessage(inputVal)}
                  className="p-2 rounded-lg bg-ds-cyan hover:bg-ds-cyan/90 text-ds-black transition-colors shrink-0"
                >
                  <Send size={13} />
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
