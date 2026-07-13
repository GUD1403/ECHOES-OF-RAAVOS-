import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, Zap } from 'lucide-react';

import Nav from './components/Nav';
import CustomCursor from './components/CustomCursor';
import CursorCustomizer from './components/CursorCustomizer';
import BackgroundCanvas from './components/BackgroundCanvas';
import ArchivePanel from './components/ArchivePanel';
import OrderModal from './components/OrderModal';

import HomeView from './components/HomeView';
import BookView from './components/BookView';
import CharacterView from './components/CharacterView';
import OrderView from './components/OrderView';

import { CHARACTERS } from './data/lore';
import { SupportTier } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [themePrimary, setThemePrimary] = useState('#c8a84b');
  const [themeGlow, setThemeGlow] = useState('rgba(200,168,75,0.4)');
  
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [activeModalTier, setActiveModalTier] = useState<SupportTier | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // Custom persistent cursor theme and style modes
  const [cursorTheme, setCursorTheme] = useState<'gold' | 'green-white' | 'purple-white' | 'cyan-blue' | 'crimson-white' | 'amber-rose' | 'silver-charcoal' | 'turquoise' | 'tan' | 'peach' | 'terracotta' | 'lime-neon' | 'rose-cosmic' | 'lavender-dream' | 'coral-reef'>(() => {
    return (localStorage.getItem('cursor_theme') as any) || 'gold';
  });
  const [cursorMode, setCursorMode] = useState<'orbit' | 'corners' | 'aura' | 'glitch' | 'crosshair' | 'bloom' | 'triangle' | 'shield' | 'swirl' | 'dna' | 'atom'>(() => {
    return (localStorage.getItem('cursor_mode') as any) || 'orbit';
  });

  // Auto-clear initial load veil screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Update background lightning colors dynamically when navigating pages
  useEffect(() => {
    if (currentView.startsWith('char-')) {
      const char = CHARACTERS[currentView];
      if (char) {
        setThemePrimary(char.themePrimary);
        setThemeGlow(char.themeGlow);
      }
    } else {
      // Default gold styling for home and purchase pages
      setThemePrimary('#c8a84b');
      setThemeGlow('rgba(200,168,75,0.4)');
    }
  }, [currentView]);

  // Handle section jumping and anchor scrolling
  const handleScrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const el = document.querySelector(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  const handleOpenModal = (tier: SupportTier) => {
    setActiveModalTier(tier);
  };

  const handleCloseModal = () => {
    setActiveModalTier(null);
  };

  return (
    <div className="relative min-h-screen bg-black text-text font-serif overflow-x-hidden grain select-none">
      
      {/* ── Dynamic Living Background Canvas ── */}
      <BackgroundCanvas themePrimary={themePrimary} themeGlow={themeGlow} />

      {/* ── High-Performance Custom Cursor ── */}
      <CustomCursor theme={cursorTheme} mode={cursorMode} />

      {/* ── Introductory Veil Screen ── */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            id="veil"
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center gap-5 pointer-events-auto"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="text-4xl text-gold drop-shadow-[0_0_40px_rgba(200,168,75,0.4)]"
              animate={{
                scale: [0.96, 1.03, 0.96],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            >
              ⚡
            </motion.div>
            <div className="w-[200px] h-[1px] bg-gold/15 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 bottom-0 left-0 bg-gold"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Primary Navigation Header ── */}
      <Nav
        currentView={currentView}
        onNavigate={handleNavigate}
        onScrollToSection={handleScrollToSection}
        onToggleArchive={() => setIsArchiveOpen(!isArchiveOpen)}
        isArchiveOpen={isArchiveOpen}
      />

      {/* ── Route view layouts wrapper with smooth animation transitions ── */}
      <main className="relative pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {currentView === 'home' && (
              <HomeView 
                onNavigate={handleNavigate} 
                onScrollToSection={handleScrollToSection} 
              />
            )}

            {currentView.startsWith('book') && (
              <BookView 
                bookId={currentView} 
                onNavigate={handleNavigate} 
              />
            )}

            {currentView.startsWith('char-') && (
              <CharacterView 
                charId={currentView} 
                onNavigate={handleNavigate} 
                onScrollToSection={handleScrollToSection}
              />
            )}

            {currentView === 'order' && (
              <OrderView 
                onNavigate={handleNavigate} 
                onOpenModal={handleOpenModal} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Immersive Lore Chat Panel (The Archive) ── */}
      <ArchivePanel 
        isOpen={isArchiveOpen} 
        onClose={() => setIsArchiveOpen(false)} 
      />

      {/* ── Support Tier Purchase dialog ── */}
      <OrderModal
        isOpen={activeModalTier !== null}
        tier={activeModalTier}
        onClose={handleCloseModal}
      />

      {/* ── Custom Cursor Settings Console ── */}
      <CursorCustomizer
        currentTheme={cursorTheme}
        onChangeTheme={setCursorTheme}
        currentMode={cursorMode}
        onChangeMode={setCursorMode}
      />
    </div>
  );
}
