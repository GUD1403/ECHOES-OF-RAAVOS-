import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Sparkles, Check, Paintbrush, Compass } from 'lucide-react';

interface CursorCustomizerProps {
  currentTheme: 'gold' | 'green-white' | 'purple-white' | 'cyan-blue' | 'crimson-white' | 'amber-rose' | 'silver-charcoal' | 'turquoise' | 'tan' | 'peach' | 'terracotta' | 'lime-neon' | 'rose-cosmic' | 'lavender-dream' | 'coral-reef';
  onChangeTheme: (theme: 'gold' | 'green-white' | 'purple-white' | 'cyan-blue' | 'crimson-white' | 'amber-rose' | 'silver-charcoal' | 'turquoise' | 'tan' | 'peach' | 'terracotta' | 'lime-neon' | 'rose-cosmic' | 'lavender-dream' | 'coral-reef') => void;
  currentMode: 'orbit' | 'corners' | 'aura' | 'glitch' | 'crosshair' | 'bloom' | 'triangle' | 'shield' | 'swirl' | 'dna' | 'atom';
  onChangeMode: (mode: 'orbit' | 'corners' | 'aura' | 'glitch' | 'crosshair' | 'bloom' | 'triangle' | 'shield' | 'swirl' | 'dna' | 'atom') => void;
}

const THEMES = [
  {
    id: 'gold' as const,
    name: 'Golden Sun',
    colorClass: 'bg-[#f2c55a]',
    description: 'Traditional warm gold radiance',
  },
  {
    id: 'green-white' as const,
    name: 'Emerald Flora',
    colorClass: 'bg-[#10b981]',
    description: 'Vibrant emerald green & stardust',
  },
  {
    id: 'purple-white' as const,
    name: 'Betrayal Iris',
    colorClass: 'bg-[#a855f7]',
    description: 'Mystical violet & pure light rifts',
  },
  {
    id: 'cyan-blue' as const,
    name: 'Abyssal Space',
    colorClass: 'bg-[#06b6d4]',
    description: 'Cybernetic cyan & ocean sapphire',
  },
  {
    id: 'crimson-white' as const,
    name: 'Crimson Blood',
    colorClass: 'bg-[#ef233c]',
    description: 'Gothic bloodline crimson & silver sparks',
  },
  {
    id: 'amber-rose' as const,
    name: 'Solar Sunset',
    colorClass: 'bg-[#f4a261]',
    description: 'Celestial solar amber & sunset rose',
  },
  {
    id: 'silver-charcoal' as const,
    name: 'Platinum Chronos',
    colorClass: 'bg-[#e2e8f0]',
    description: 'Polished titanium & dark slate charcoal',
  },
  {
    id: 'turquoise' as const,
    name: 'Turquoise Glimmer',
    colorClass: 'bg-[#30d5c8]',
    description: 'Vibrant tropical turquoise aura',
  },
  {
    id: 'tan' as const,
    name: 'Desert Dune',
    colorClass: 'bg-[#d2b48c]',
    description: 'Elegant gold-tan desert bronze',
  },
  {
    id: 'peach' as const,
    name: 'Peach Blossom',
    colorClass: 'bg-[#ffb07c]',
    description: 'Soft celestial glowing peach blossom',
  },
  {
    id: 'terracotta' as const,
    name: 'Earthen Clay',
    colorClass: 'bg-[#e2725b]',
    description: 'Rich baked terracotta clay warmth',
  },
  {
    id: 'lime-neon' as const,
    name: 'Neon Viper',
    colorClass: 'bg-[#adff2f]',
    description: 'Hyperactive lime-neon laser beam',
  },
  {
    id: 'rose-cosmic' as const,
    name: 'Cosmic Nebula',
    colorClass: 'bg-[#ff007f]',
    description: 'Intense rose & stellar dust nebula',
  },
  {
    id: 'lavender-dream' as const,
    name: 'Astral Lavender',
    colorClass: 'bg-[#e6e6fa]',
    description: 'Soothing lavender & dream particle mist',
  },
  {
    id: 'coral-reef' as const,
    name: 'Sunken Coral',
    colorClass: 'bg-[#ff7f50]',
    description: 'Warm luminous coral reef glimmer',
  },
];

const MODES = [
  {
    id: 'orbit' as const,
    name: 'Liquid Orbit',
    icon: '🌀',
    description: 'Snappy core dot with a smooth lagging circle',
  },
  {
    id: 'corners' as const,
    name: '4 Corners',
    icon: '⌗',
    description: 'Technical crosshair brackets framing the pointer',
  },
  {
    id: 'aura' as const,
    name: 'Betrayal Aura',
    icon: '✨',
    description: 'Four mini-particles orbiting in perfect sync',
  },
  {
    id: 'glitch' as const,
    name: 'Magnetic Glitch',
    icon: '☄️',
    description: 'Spring-chained cometic physics tail trailing behind',
  },
  {
    id: 'crosshair' as const,
    name: 'Combat Crosshair',
    icon: '🎯',
    description: 'Intersecting tactical HUD ticks rotating on interactive triggers',
  },
  {
    id: 'bloom' as const,
    name: 'Chronal Bloom',
    icon: '🌸',
    description: 'Sacred concentric flower geometry breathing and scaling',
  },
  {
    id: 'triangle' as const,
    name: 'Trinity Prism',
    icon: '🔺',
    description: 'Three orbiting glass-like shards spinning around the core',
  },
  {
    id: 'shield' as const,
    name: 'Cyber Shield',
    icon: '🛡️',
    description: 'Concentric rotating hexagonal/octagonal protective fields',
  },
  {
    id: 'swirl' as const,
    name: 'Cosmic Swirl',
    icon: '🌪️',
    description: 'Yin-yang spiral orbits collapsing on user click',
  },
  {
    id: 'dna' as const,
    name: 'Helix Wave',
    icon: '🧬',
    description: 'Double helix wave resonance drifting symmetrically',
  },
  {
    id: 'atom' as const,
    name: 'Quantum Atom',
    icon: '⚛️',
    description: 'Concentric dashed electron loops around the nucleus core',
  },
];

export default function CursorCustomizer({
  currentTheme,
  onChangeTheme,
  currentMode,
  onChangeMode,
}: CursorCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId: typeof currentTheme) => {
    onChangeTheme(themeId);
    localStorage.setItem('cursor_theme', themeId);
  };

  const handleModeChange = (modeId: typeof currentMode) => {
    onChangeMode(modeId);
    localStorage.setItem('cursor_mode', modeId);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[2000] select-none">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click-away shield */}
            <motion.div
              className="fixed inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Core control interface */}
            <motion.div
              className="absolute bottom-16 right-0 z-20 w-[310px] md:w-[340px] max-h-[75vh] overflow-y-auto
                bg-[#070514]/95 backdrop-blur-md border border-gold/20 rounded-lg
                shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(200,168,75,0.04)]
                p-5 flex flex-col gap-4 text-left scrollbar-thin"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              {/* Header */}
              <div className="border-b border-gold/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-gold-b" />
                  <h4 className="font-cinzel text-xs tracking-[0.2em] font-bold text-white uppercase">
                    Quantum Core Customizer
                  </h4>
                </div>
                <p className="font-sans text-[10px] text-text-d mt-1">
                  Reconfigure the chronal cursor resonance & geometry
                </p>
              </div>

              {/* 1. Theme Selection Grid */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider text-text-d uppercase">
                  <Paintbrush className="w-3 h-3 text-gold/60" /> Cursor Color Resonance:
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                  {THEMES.map((theme) => {
                    const isSelected = currentTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.id)}
                        className={`flex flex-col items-start gap-1 p-2 rounded border text-left transition-all relative overflow-hidden ${
                          isSelected
                            ? 'bg-gold/10 border-gold/40 shadow-[0_0_12px_rgba(200,168,75,0.06)]'
                            : 'bg-black/40 border-gold/5 hover:border-gold/20 hover:bg-[#120f26]/30'
                        }`}
                      >
                        <div className="flex items-center gap-1 w-full">
                          <span className={`w-2 h-2 rounded-full ${theme.colorClass} shadow-md`} />
                          <span className="font-serif text-[10.5px] font-medium text-white tracking-wide truncate">
                            {theme.name}
                          </span>
                          {isSelected && <Check className="w-2.5 h-2.5 text-gold-b ml-auto flex-shrink-0" />}
                        </div>
                        <span className="text-[7.5px] font-sans text-text-d leading-tight line-clamp-1">
                          {theme.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Mode Selection List */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider text-text-d uppercase">
                  <Compass className="w-3 h-3 text-gold/60" /> Tracking Geometry Mode:
                </div>
                <div className="flex flex-col gap-1.5 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin">
                  {MODES.map((mode) => {
                    const isSelected = currentMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => handleModeChange(mode.id)}
                        className={`flex items-center gap-2.5 p-2 rounded border text-left transition-all ${
                          isSelected
                            ? 'bg-gold/10 border-gold/40 shadow-[0_0_12px_rgba(200,168,75,0.06)]'
                            : 'bg-black/40 border-gold/5 hover:border-gold/20 hover:bg-[#120f26]/30'
                        }`}
                      >
                        <span className="text-sm flex-shrink-0">{mode.icon}</span>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-serif text-[11px] font-medium text-white tracking-wide">
                            {mode.name}
                          </span>
                          <span className="text-[8px] font-sans text-text-d leading-normal line-clamp-1">
                            {mode.description}
                          </span>
                        </div>
                        {isSelected && <Check className="w-3 h-3 text-gold-b flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Footer */}
              <div className="text-[8px] font-cinzel tracking-widest text-text-d/60 text-center border-t border-gold/5 pt-2">
                ⚡ DUAL SPRING LAG ENGINE LOADED
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-11 h-11 rounded-full border flex items-center justify-center shadow-lg transition-all relative ${
          isOpen
            ? 'bg-gold/15 border-gold/50 text-white'
            : 'bg-[#0b0821]/90 border-gold/20 text-gold-b hover:border-gold/50 hover:bg-gold/5'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Calibration Engine"
      >
        <motion.div
          animate={isOpen ? { rotate: 90 } : { rotate: [0, 5, -5, 0] }}
          transition={isOpen ? { duration: 0.3 } : { repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          {isOpen ? <Sparkles className="w-4 h-4 text-white" /> : <Sliders className="w-4 h-4" />}
        </motion.div>

        {/* Orbit Seam Halo decoration */}
        <div className="absolute inset-[-3px] border border-gold/10 rounded-full animate-spin-slow pointer-events-none" />
      </motion.button>
    </div>
  );
}
