import { motion } from 'motion/react';
import { CHARACTERS } from '../data/lore';
import CharacterEntrance from './CharacterEntrance';

interface CharacterViewProps {
  charId: string;
  onNavigate: (viewId: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function CharacterView({ charId, onNavigate, onScrollToSection }: CharacterViewProps) {
  const char = CHARACTERS[charId];
  if (!char) return null;

  const handleReturnToAll = () => {
    onNavigate('home');
    setTimeout(() => {
      onScrollToSection('#characters');
    }, 500);
  };

  return (
    <div className="select-none pb-12">
      {/* Dynamic Entrance Animation Overlay */}
      <CharacterEntrance charId={charId} themePrimary={char.themePrimary} />

      {/* Hero Banner styled dynamically to match the character's unique element */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 md:py-36 z-10 overflow-hidden">
        {/* Dynamic theme glow background element */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 42%, ${char.themePrimary} 0%, transparent 65%)` }}
        />
        
        {/* Animated large icon with infinite hovering motion */}
        <motion.div 
          className="char-hero-icon text-7xl md:text-8xl mb-6 filter float-slow select-none"
          style={{ filter: `drop-shadow(0 0 22px ${char.themePrimary})` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {char.icon}
        </motion.div>
        
        <motion.p 
          className="font-cinzel text-[11px] tracking-[0.62em] text-gold-d uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.26 }}
        >
          {char.books}
        </motion.p>
        
        <motion.h1 
          className="font-decorative text-4xl md:text-7xl font-black leading-[0.95] text-white tracking-tight drop-shadow-[0_8px_40px_rgba(0,0,0,1)] mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{ textShadow: `0 0 60px ${char.themePrimary}, 0 8px 40px rgba(0,0,0,1)` }}
        >
          {char.name}
        </motion.h1>

        <div className="font-cinzel text-[11px] tracking-[0.34em] text-text-d uppercase mt-2">{char.role}</div>

        <motion.div 
          className="flex items-center gap-5 w-[min(380px,85%)] mx-auto my-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.68 }}
        >
          <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${char.themePrimary})` }} />
          <div className="w-[5px] h-[5px] rotate-45" style={{ backgroundColor: char.themePrimary, boxShadow: `0 0 10px ${char.themePrimary}` }} />
          <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, ${char.themePrimary}, transparent)` }} />
        </motion.div>

        <motion.p 
          className="font-serif italic text-base md:text-xl text-text/70 leading-relaxed max-w-[560px] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.82 }}
        >
          {char.tagline}
        </motion.p>

        <motion.div 
          className="flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
        >
          <button 
            onClick={handleReturnToAll}
            className="btn btn-gold font-cinzel text-[10px] tracking-widest uppercase bg-gradient-to-r from-gold via-gold-b to-gold py-4 px-9 text-black clip-btn hover:scale-105 active:scale-95 transition-all cursor-none"
          >
            ← All Characters
          </button>
          <button 
            onClick={() => onNavigate('home')}
            className="btn border border-gold/30 text-gold hover:border-gold hover:bg-gold/5 font-cinzel text-[10px] tracking-widest uppercase py-4 px-9 transition-all cursor-none"
          >
            Return to Saga
          </button>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.5 }}
        >
          <span className="font-cinzel text-[8px] tracking-[0.55em] text-text-d uppercase select-none">Descend</span>
          <div className="w-[1px] h-12 overflow-hidden bg-gold/10">
            <motion.div 
              className="w-full h-full bg-gradient-to-b from-gold to-transparent"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Lore details and bio sections */}
      <section className="px-6 py-24 md:py-32 relative z-10 bg-gradient-to-b from-black to-deep border-t border-gold/5">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-cinzel text-[10px] tracking-[0.6em] text-gold-d uppercase block mb-3">The Legend</span>
            <h2 className="font-decorative text-3xl md:text-5xl text-white tracking-wide mb-5 filter drop-shadow-[0_0_30px_rgba(200,168,75,0.15)]">
              {char.name} Lore
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-d" />
              <div className="w-1.5 h-1.5 bg-gold-d rotate-45" />
              <div className="w-20 h-[1px] bg-gradient-to-r from-gold-d to-transparent" />
            </div>
          </div>

          <div className="flex flex-col gap-6 mb-12">
            {char.lore.map((p, idx) => (
              <p key={idx} className="font-serif text-[16px] md:text-[17px] leading-relaxed text-text/90">
                {p}
              </p>
            ))}
          </div>

          {/* Traits tags */}
          <div className="flex flex-wrap gap-2.5 justify-center mt-12 py-6 border-t border-b border-gold/5">
            {char.traits.map((trait, idx) => (
              <span 
                key={idx} 
                className="font-cinzel text-[10px] tracking-[0.22em] text-gold uppercase border border-gold/25 py-2 px-5 bg-gold/5 opacity-75 hover:opacity-100 transition-opacity"
                style={{ borderColor: char.themePrimary, color: char.themePrimary }}
              >
                {trait}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-16">
            <button 
              onClick={handleReturnToAll}
              className="btn btn-gold w-full sm:w-auto font-cinzel text-[10px] tracking-widest uppercase bg-gradient-to-r from-gold via-gold-b to-gold py-4 px-9 text-black clip-btn hover:scale-105 active:scale-95 transition-all cursor-none"
            >
              ← All Characters
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="btn border border-gold/30 text-gold hover:border-gold hover:bg-gold/5 w-full sm:w-auto font-cinzel text-[10px] tracking-widest uppercase py-4 px-9 transition-all cursor-none"
            >
              Return to Saga
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 text-center bg-black border-t border-gold/5 mt-16">
        <div className="font-decorative text-2xl text-gold filter drop-shadow-[0_0_15px_rgba(200,168,75,0.4)] mb-3 select-none">{char.icon}</div>
        <div className="font-cinzel text-[10px] tracking-[0.44em] text-text-d uppercase mb-6">{char.name} · Echoes of Raavos</div>
        <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-d to-transparent mx-auto mb-5" />
        <p className="text-[11px] text-text-d/30 tracking-wider">Written with lightning and will. All rights reserved.</p>
      </footer>
    </div>
  );
}
