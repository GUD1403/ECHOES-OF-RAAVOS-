import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Send, X, Sparkles, HelpCircle, BookOpen } from 'lucide-react';
import { Message } from '../types';
import { LORE_KB, SEARCH_CORE_NOUNS } from '../data/lore';

interface ArchivePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_SUGGESTIONS = [
  { label: '⚡ Raavos', query: 'Raavos' },
  { label: '⚔️ Soreign', query: 'Soreign' },
  { label: '🗡️ Munchkin of Doom', query: 'Munchkin' },
  { label: '🍳 The Gatekeeper', query: 'Gatekeeper' },
  { label: '💤 Sleepy Daren', query: 'Daren' },
  { label: '🧠 Robby\'s Mind', query: 'Robby' },
  { label: '🔥 Rega', query: 'Rega' },
  { label: '📖 Book III Colosseum', query: 'Book 3' }
];

export default function ArchivePanel({ isOpen, onClose }: ArchivePanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greet',
      sender: 'system',
      text: 'You are not the first to seek answers. Speak to the Entity, and listen carefully.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTypingResponse, setIsTypingResponse] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTypingResponse]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Ambient canvas inside panel
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = canvas.offsetWidth || 500);
    let H = (canvas.height = canvas.offsetHeight || 400);

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth || 500;
      H = canvas.height = canvas.offsetHeight || 400;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Drifting particles inside the panel
    const motes = Array.from({ length: 18 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.6 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.16,
      vy: -0.05 - Math.random() * 0.12,
      a: 0.05 + Math.random() * 0.12,
      gold: Math.random() > 0.45
    }));

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;

        if (m.y < -6) {
          m.y = H + 6;
          m.x = Math.random() * W;
        }
        if (m.x < -6) m.x = W + 6;
        if (m.x > W + 6) m.x = -6;

        ctx.save();
        ctx.globalAlpha = m.a;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = m.gold ? '#c8a84b' : '#88bbee';
        ctx.shadowColor = m.gold ? '#f2c55a' : '#aaddff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isOpen]);

  // Lore search logic matching standard static database index query
  const findLoreAnswer = (query: string): string | null => {
    const q = query.toLowerCase().trim();
    for (const entry of LORE_KB) {
      if (entry.keys.some(k => q.includes(k))) {
        return entry.answer;
      }
    }
    if (SEARCH_CORE_NOUNS.some(n => q.includes(n))) {
      return 'That thread runs deep in the Archive, but its full record has not yet been transcribed. Ask something more specific and the knowledge may surface.';
    }
    return null;
  };

  const triggerAnswerWorkflow = (queryText: string) => {
    if (isTypingResponse) return;

    // Add user message
    const userMsgId = 'msg-' + Date.now();
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: queryText }]);

    // Trigger cursor responding animations
    setIsTypingResponse(true);
    document.body.classList.add('cur-responding');

    // Simulate typing delay
    setTimeout(() => {
      const answer = findLoreAnswer(queryText);
      const replyId = 'reply-' + Date.now();

      if (answer) {
        // Start typing out response character-by-character
        setMessages(prev => [...prev, { id: replyId, sender: 'response', text: '' }]);
        
        let typedText = '';
        let charIndex = 0;
        const typingSpeed = 12; // slightly faster typing for immediate feedback

        const typeNextChar = () => {
          if (charIndex < answer.length) {
            typedText += answer[charIndex];
            charIndex++;
            setMessages(prev => prev.map(m => m.id === replyId ? { ...m, text: typedText } : m));
            setTimeout(typeNextChar, typingSpeed + Math.random() * 6);
          } else {
            // Typing complete
            setIsTypingResponse(false);
            document.body.classList.remove('cur-responding');
          }
        };

        typeNextChar();
      } else {
        // Handle unrecognized prompts gracefully
        setMessages(prev => [
          ...prev,
          {
            id: replyId,
            sender: 'denied',
            text: 'That knowledge does not belong to this world. Query the names of characters or books to reveal their forbidden chronicles.'
          }
        ]);
        setIsTypingResponse(false);
        document.body.classList.remove('cur-responding');
      }
    }, 900 + Math.random() * 500);
  };

  const handleSend = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isTypingResponse) return;

    setInputValue('');
    triggerAnswerWorkflow(trimmedInput);
  };

  const handleSuggestionClick = (queryText: string) => {
    if (isTypingResponse) return;
    triggerAnswerWorkflow(queryText);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="archive-backdrop"
            className="fixed inset-0 z-[1500] bg-black/80 backdrop-blur-md cursor-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Archive Main Panel - Centered precisely with Framer Motion spring positioning */}
          <motion.div
            id="archive-panel"
            className={`fixed top-1/2 left-1/2 z-[1600] 
              w-[92vw] max-w-[640px] h-[85vh] max-h-[660px]
              bg-gradient-to-br from-[#0a081a]/95 via-[#04040c]/98 to-[#09071c]/95
              border-2 border-gold/20 shadow-[0_0_100px_rgba(200,168,75,0.06),0_40px_120px_rgba(0,0,0,0.95)]
              rounded-lg overflow-hidden flex flex-col backdrop-blur-lg`}
            initial={{ opacity: 0, scale: 0.92, x: '-50%', y: '-47%' }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: '-50%', 
              y: '-50%',
              borderColor: isTypingResponse ? '#88bbee40' : '#c8a84b33',
              boxShadow: isTypingResponse 
                ? '0 0 100px rgba(136,187,238,0.12), 0 40px 120px rgba(0,0,0,0.95)'
                : '0 0 100px rgba(200,168,75,0.06), 0 40px 120px rgba(0,0,0,0.95)'
            }}
            exit={{ opacity: 0, scale: 0.92, x: '-50%', y: '-47%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          >
            {/* Ambient internal drifting canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />

            {/* Glowing gold top header seam */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] transition-colors duration-500 z-10 ${
              isTypingResponse 
                ? 'bg-gradient-to-r from-transparent via-blue/50 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-gold/45 to-transparent'
            }`} />

            {/* Panel Inner Wrapper */}
            <div className="relative z-10 flex flex-col h-full overflow-hidden">
              
              {/* Header Container */}
              <div className="p-5 md:p-6 flex justify-between items-center border-b border-gold/10 bg-black/40 backdrop-blur-sm select-none">
                <div className="flex items-center gap-3">
                  <motion.div 
                    id="archive-glyph" 
                    className="w-10 h-10 rounded-full bg-gold/5 border border-gold/30 flex items-center justify-center text-xl text-gold-b filter drop-shadow-[0_0_10px_rgba(242,197,90,0.3)]"
                    animate={isTypingResponse ? {
                      scale: [1, 1.15, 0.95, 1],
                      borderColor: ['rgba(242,197,90,0.3)', 'rgba(136,187,238,0.6)', 'rgba(242,197,90,0.3)'],
                      boxShadow: ['0 0 5px rgba(242,197,90,0.2)', '0 0 20px rgba(136,187,238,0.5)', '0 0 5px rgba(242,197,90,0.2)']
                    } : {
                      scale: [1, 1.06, 1],
                      borderColor: 'rgba(242,197,90,0.3)',
                    }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  >
                    {isTypingResponse ? '🌀' : '✨'}
                  </motion.div>
                  <div>
                    <h3 className="font-decorative text-base text-white tracking-widest font-bold">The Archive</h3>
                    <p className="font-cinzel text-[9px] tracking-[0.2em] text-text-d uppercase">Saga Chronologies & Entity database</p>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="group flex items-center gap-1.5 font-cinzel text-[10px] tracking-[0.25em] text-text-d hover:text-gold uppercase transition-colors py-1.5 px-3 border border-transparent hover:border-gold/20 rounded bg-white/5"
                >
                  <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
                  <span>Close</span>
                </button>
              </div>

              {/* Suggestions Quick Bar */}
              <div className="bg-black/20 border-b border-gold/5 px-5 py-3 select-none">
                <p className="font-cinzel text-[8px] tracking-[0.2em] text-text-d uppercase mb-2 flex items-center gap-1">
                  <HelpCircle className="w-2.5 h-2.5 text-gold/60" /> Click to query the chronicle:
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-gold-d max-w-full">
                  {QUICK_SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => handleSuggestionClick(s.query)}
                      disabled={isTypingResponse}
                      className="whitespace-nowrap font-serif text-[11px] px-3 py-1.5 bg-[#120f26]/80 border border-gold/15 text-text hover:text-gold hover:border-gold/40 hover:bg-gold/5 active:scale-95 transition-all rounded"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat messages viewport */}
              <div className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-4 scrollbar-thin bg-black/10">
                {messages.map(msg => {
                  const isUser = msg.sender === 'user';
                  const isSys = msg.sender === 'system';
                  const isDenied = msg.sender === 'denied';

                  return (
                    <motion.div
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] ${
                        isUser ? 'self-end items-end' : 'self-start items-start'
                      }`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Sender label metadata */}
                      <span className="font-cinzel text-[8px] tracking-widest text-text-d uppercase mb-1 px-1">
                        {isUser ? 'Seeker of Truth' : isSys ? 'Chronicle System' : 'The Entity'}
                      </span>

                      {/* Bubble box */}
                      <div className={`font-serif text-sm md:text-base leading-relaxed p-4 rounded-lg border shadow-lg ${
                        isUser
                          ? 'bg-gradient-to-l from-[#362a12]/30 to-[#1c160a]/50 border-gold/25 text-white'
                          : isDenied
                          ? 'bg-gradient-to-r from-[#2c090e]/40 to-[#120406]/50 border-red-500/20 text-red-300/90 italic'
                          : 'bg-gradient-to-r from-[#0d162d]/40 to-[#040814]/50 border-[#88bbee]/25 text-text-b font-light'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Animated Typing indicator bubble */}
                {isTypingResponse && messages[messages.length - 1]?.sender === 'user' && (
                  <motion.div
                    className="flex flex-col self-start items-start max-w-[85%]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="font-cinzel text-[8px] tracking-widest text-text-d uppercase mb-1 px-1">
                      Connecting...
                    </span>
                    <div className="flex gap-1.5 p-4 rounded-lg border border-blue/15 bg-gradient-to-r from-blue/5 to-transparent">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-blue"
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.9,
                            delay: i * 0.15,
                            ease: 'easeInOut'
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Console Form Row */}
              <div className="p-4 md:p-5 bg-black/40 border-t border-gold/10 flex flex-col gap-2">
                <div className="flex gap-3 items-center">
                  <input
                    id="archive-input"
                    type="text"
                    placeholder="Inquire about Raavos, Soreign, or a specific book..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    disabled={isTypingResponse}
                    className="flex-1 bg-[#120f26]/60 border border-gold/20 text-white font-serif text-sm md:text-base px-4 py-3 outline-none focus:border-gold/50 focus:bg-gold/5 transition-all rounded placeholder-text-d/60"
                  />
                  
                  <motion.button
                    onClick={handleSend}
                    disabled={isTypingResponse || !inputValue.trim()}
                    className="w-12 h-12 border border-gold/20 text-gold-b flex items-center justify-center hover:text-white hover:border-gold/50 hover:bg-gold/5 transition-all disabled:opacity-20 disabled:pointer-events-none rounded active:scale-95"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="flex justify-between items-center text-[8px] font-cinzel tracking-[0.25em] text-text-d px-1 mt-1 opacity-70">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-2.5 h-2.5 text-gold/55" /> 3 Books Transcribed
                  </span>
                  <span>Press ENTER to query the cosmos</span>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
