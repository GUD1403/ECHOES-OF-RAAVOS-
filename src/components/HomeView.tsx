import { motion } from 'motion/react';
import { Sparkles, Trophy, Lock, ChevronDown, Award } from 'lucide-react';
import { BOOKS, CHAPTERS_BOOK_I, CHAPTERS_BOOK_II, CHAPTERS_BOOK_III, CHARACTERS } from '../data/lore';
import { Book, Character } from '../types';

interface HomeViewProps {
  onNavigate: (viewId: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function HomeView({ onNavigate, onScrollToSection }: HomeViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const handleBookClick = (bookId: string) => {
    onNavigate(bookId);
  };

  const handleCharClick = (charId: string) => {
    onNavigate(charId);
  };

  return (
    <div id="view-home" className="min-height-100vh select-none pb-12">
      
      {/* ── Home Hero Section ── */}
      <section 
        id="home-hero" 
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 md:py-36 z-10 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,rgba(136,187,238,0.05),transparent_65%),radial-gradient(ellipse_100%_38%_at_50%_100%,rgba(2,2,8,0.9),transparent)]" />
        
        <motion.p 
          className="hh-eyebrow font-cinzel text-[11px] tracking-[0.62em] text-gold-d uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          An Epic Fantasy Trilogy
        </motion.p>
        
        <motion.h1 
          className="hh-title font-decorative text-5xl md:text-8xl lg:text-9xl font-black leading-[0.92] text-white tracking-tight drop-shadow-[0_8px_40px_rgba(0,0,0,1)] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          Echoes of<br />
          <span className="hh-gold text-gold-b font-decorative block gold-glow select-none">Raavos</span>
        </motion.h1>

        <motion.div 
          className="hh-div flex items-center gap-5 w-[min(440px,85%)] mx-auto my-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.64 }}
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/55" />
          <div className="hh-gem w-1.5 h-1.5 bg-gold rotate-45 shadow-[0_0_14px_rgba(200,168,75,0.9)]" />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/55 to-transparent" />
        </motion.div>

        <motion.p 
          className="hh-tagline font-serif italic text-base md:text-xl lg:text-2xl text-text/75 leading-relaxed max-w-[620px] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.82 }}
        >
          A boy dragged from the gallows became an archangel.<br />
          <strong className="not-italic text-white/90 font-medium">An archangel sealed became the universe's last hope.</strong><br />
          The question was never whether he would rise —<br />
          it was what would be left standing when he did.
        </motion.p>

        <motion.div 
          className="hh-cta flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          <button 
            onClick={() => handleBookClick('book1')}
            className="btn btn-gold font-cinzel text-[10px] tracking-widest uppercase bg-gradient-to-r from-gold via-gold-b to-gold py-4 px-9 text-black clip-btn hover:scale-105 active:scale-95 transition-all cursor-none"
          >
            Enter the Saga
          </button>
          <button 
            onClick={() => onScrollToSection('#characters')}
            className="btn border border-gold/30 text-gold hover:border-gold hover:bg-gold/5 font-cinzel text-[10px] tracking-widest uppercase py-4 px-9 transition-all cursor-none"
          >
            Meet the Characters
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

      {/* ── Books Section ── */}
      <section 
        id="books" 
        className="px-6 py-24 md:py-32 relative z-10 border-t border-gold/5 bg-gradient-to-b from-black via-deep to-black"
      >
        <div className="max-w-[1160px] mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="font-cinzel text-[10px] tracking-[0.6em] text-gold-d uppercase block mb-3">The Saga</motion.span>
            <motion.h2 variants={itemVariants} className="font-decorative text-3xl md:text-5xl text-white tracking-wide mb-5 filter drop-shadow-[0_0_30px_rgba(200,168,75,0.15)]">
              Three Books. One Legend.
            </motion.h2>
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-d" />
              <div className="w-1.5 h-1.5 bg-gold-d rotate-45" />
              <div className="w-20 h-[1px] bg-gradient-to-r from-gold-d to-transparent" />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px] bg-gold/10 border border-gold/10">
            {BOOKS.map((book, idx) => (
              <motion.div
                key={book.id}
                onClick={() => handleBookClick(book.id)}
                className="relative p-10 md:p-14 bg-panel border border-gold/5 hover:border-gold/25 overflow-hidden transition-all duration-500 hover:-translate-y-1 cursor-none group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Gold Top Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold-d to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                {/* Immersive radial theme background shimmer */}
                <div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_80%_70%_at_${idx === 0 ? '15%' : idx === 1 ? '50%' : '85%'}__50%,${idx === 0 ? 'rgba(200,168,75,0.09)' : idx === 1 ? 'rgba(136,187,238,0.07)' : 'rgba(168,96,224,0.08)'},transparent)]`} />

                <div className="font-decorative text-8xl font-black text-gold/5 select-none leading-none absolute top-4 right-10 group-hover:text-gold/15 transition-all duration-500">
                  {book.volume}
                </div>

                <div className="relative z-10">
                  <span className="font-cinzel text-[10px] tracking-[0.5em] text-gold-d uppercase block mb-2">Book {book.volume === 'I' ? 'One' : book.volume === 'II' ? 'Two' : 'Three'}</span>
                  <h3 className="font-decorative text-xl md:text-2xl lg:text-3xl text-gold-b leading-tight group-hover:drop-shadow-[0_0_20px_rgba(242,197,90,0.48)] transition-all duration-500 mb-1">
                    {book.title}
                  </h3>
                  <div className="font-cinzel text-[11px] tracking-[0.22em] text-text-d uppercase mb-6">{book.subtitle}</div>
                  <div className="w-10 h-[1px] bg-gold-d group-hover:w-20 transition-all duration-500 mb-6" />
                  
                  <p className="font-serif text-[15px] leading-relaxed text-text mb-4">{book.description1}</p>
                  <p className="font-serif text-[15px] leading-relaxed text-text mb-6">{book.description2}</p>
                  
                  <div className="border-l-2 border-gold/30 bg-gold/5 py-4 px-5 my-6 italic text-[14px] text-text/85 group-hover:border-gold/60 group-hover:bg-gold/10 transition-all duration-300">
                    "{book.stakes}"
                  </div>

                  <span className="font-cinzel text-[9px] tracking-[0.44em] text-gold-d uppercase block mb-3">Characters</span>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {book.characters.map((c, i) => (
                      <span key={i} className="font-cinzel text-[9px] tracking-wider uppercase border border-gold/20 py-1.5 px-3 bg-gold/5 text-text-d group-hover:border-gold/40 group-hover:text-text transition-all duration-300">
                        {c}
                      </span>
                    ))}
                  </div>

                  <span className="btn-sm font-cinzel text-[10px] tracking-widest uppercase text-gold-d group-hover:text-gold-b hover:translate-x-1.5 inline-flex items-center gap-2 transition-all">
                    Explore Book {book.volume} →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chapters Section ── */}
      <section 
        id="chapters" 
        className="px-6 py-24 md:py-32 relative z-10 bg-deep border-y border-gold/5"
      >
        <div className="max-w-[1160px] mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="font-cinzel text-[10px] tracking-[0.6em] text-gold-d uppercase block mb-3">The Journey</motion.span>
            <motion.h2 variants={itemVariants} className="font-decorative text-3xl md:text-5xl text-white tracking-wide mb-5 filter drop-shadow-[0_0_30px_rgba(200,168,75,0.15)]">
              Chapters
            </motion.h2>
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-d" />
              <div className="w-1.5 h-1.5 bg-gold-d rotate-45" />
              <div className="w-20 h-[1px] bg-gradient-to-r from-gold-d to-transparent" />
            </motion.div>
          </motion.div>

          {/* Book I Chapters Block */}
          <div className="mb-14">
            <div className="flex items-center gap-5 mb-6">
              <h4 className="font-decorative text-md text-gold filter drop-shadow-[0_0_15px_rgba(200,168,75,0.3)] select-none">
                Book I — The Rise
              </h4>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/25 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0.5 bg-gold/10 border border-gold/10">
              {CHAPTERS_BOOK_I.map((chap) => (
                <div 
                  key={chap.num} 
                  className="ch-tile relative p-6 bg-black/95 border border-gold/5 hover:border-gold/25 transition-all duration-300 hover:-translate-y-0.5 group flex flex-col justify-between"
                >
                  <div>
                    <div className="ch-num font-decorative text-3xl font-black text-gold/10 group-hover:text-gold/20 leading-none mb-2 transition-colors">
                      {chap.num}
                    </div>
                    <div className="w-5 h-[1px] bg-gold-d group-hover:w-10 transition-all duration-300 mb-2" />
                    <div className="ch-title font-cinzel text-[11px] tracking-wide uppercase text-gold leading-relaxed group-hover:text-gold-b transition-colors mb-4">
                      {chap.title}
                    </div>
                  </div>
                  <div className="ch-lock font-cinzel text-[8px] tracking-widest uppercase text-text-d/60 flex items-center gap-2 select-none">
                    <Lock className="w-2.5 h-2.5 flex-shrink-0" /> Coming Soon
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Book II Chapters Block */}
          <div className="mb-14">
            <div className="flex items-center gap-5 mb-6">
              <h4 className="font-decorative text-md text-gold filter drop-shadow-[0_0_15px_rgba(200,168,75,0.3)] select-none">
                Book II — The Destroyer of Worlds
              </h4>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/25 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0.5 bg-gold/10 border border-gold/10">
              {CHAPTERS_BOOK_II.map((chap) => (
                <div 
                  key={chap.num} 
                  className="ch-tile relative p-6 bg-black/95 border border-gold/5 hover:border-gold/25 transition-all duration-300 hover:-translate-y-0.5 group flex flex-col justify-between"
                >
                  <div>
                    <div className="ch-num font-decorative text-3xl font-black text-gold/10 group-hover:text-gold/20 leading-none mb-2 transition-colors">
                      {chap.num}
                    </div>
                    <div className="w-5 h-[1px] bg-gold-d group-hover:w-10 transition-all duration-300 mb-2" />
                    <div className="ch-title font-cinzel text-[11px] tracking-wide uppercase text-gold leading-relaxed group-hover:text-gold-b transition-colors mb-4">
                      {chap.title}
                    </div>
                  </div>
                  <div className="ch-lock font-cinzel text-[8px] tracking-widest uppercase text-text-d/60 flex items-center gap-2 select-none">
                    <Lock className="w-2.5 h-2.5 flex-shrink-0" /> Coming Soon
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Book III Chapters Block */}
          <div>
            <div className="flex items-center gap-5 mb-6">
              <h4 className="font-decorative text-md text-gold filter drop-shadow-[0_0_15px_rgba(200,168,75,0.3)] select-none">
                Book III — The Final Trial
              </h4>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/25 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0.5 bg-gold/10 border border-gold/10">
              {CHAPTERS_BOOK_III.map((chap) => (
                <div 
                  key={chap.num} 
                  className="ch-tile relative p-6 bg-black/95 border border-gold/5 hover:border-gold/25 transition-all duration-300 hover:-translate-y-0.5 group flex flex-col justify-between"
                >
                  <div>
                    <div className="ch-num font-decorative text-3xl font-black text-gold/10 group-hover:text-gold/20 leading-none mb-2 transition-colors">
                      {chap.num}
                    </div>
                    <div className="w-5 h-[1px] bg-gold-d group-hover:w-10 transition-all duration-300 mb-2" />
                    <div className="ch-title font-cinzel text-[11px] tracking-wide uppercase text-gold leading-relaxed group-hover:text-gold-b transition-colors mb-4">
                      {chap.title}
                    </div>
                  </div>
                  <div className="ch-lock font-cinzel text-[8px] tracking-widest uppercase text-text-d/60 flex items-center gap-2 select-none">
                    <Lock className="w-2.5 h-2.5 flex-shrink-0" /> Coming Soon
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Characters Section ── */}
      <section 
        id="characters" 
        className="px-6 py-24 md:py-32 relative z-10 bg-gradient-to-b from-black to-deep"
      >
        <div className="max-w-[1160px] mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="font-cinzel text-[10px] tracking-[0.6em] text-gold-d uppercase block mb-3">The Warriors</motion.span>
            <motion.h2 variants={itemVariants} className="font-decorative text-3xl md:text-5xl text-white tracking-wide mb-5 filter drop-shadow-[0_0_30px_rgba(200,168,75,0.15)]">
              Key Characters
            </motion.h2>
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-d" />
              <div className="w-1.5 h-1.5 bg-gold-d rotate-45" />
              <div className="w-20 h-[1px] bg-gradient-to-r from-gold-d to-transparent" />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-gold/10 border border-gold/10">
            {Object.values(CHARACTERS).map((char, idx) => (
              <motion.div
                key={char.id}
                onClick={() => handleCharClick(char.id)}
                className="char-tile group p-10 bg-panel border border-gold/5 hover:border-gold/25 relative overflow-hidden transition-all duration-400 hover:-translate-y-1 cursor-none"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {/* Glowing top line mapped to character color theme */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${char.themePrimary}, transparent)` }}
                />

                <div className="text-4xl mb-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 inline-block filter drop-shadow-sm select-none">
                  {char.icon}
                </div>

                <h3 className="font-decorative text-lg text-gold-b mb-1 group-hover:text-white transition-colors">{char.name}</h3>
                <div className="font-cinzel text-[9px] tracking-widest text-gold-d uppercase mb-4">{char.role}</div>
                <div className="w-7 h-[1px] bg-gold-d group-hover:w-12 transition-all duration-300 mb-4" />
                <p className="font-serif text-sm leading-relaxed text-text-d group-hover:text-text transition-colors duration-300">{char.tagline}</p>
                
                <div className="mt-5 inline-block font-cinzel text-[8px] tracking-[0.32em] text-gold-d border border-gold/15 py-1 px-3 bg-gold/5">
                  {char.books}
                </div>

                <div className="flex items-center gap-2 mt-5 font-cinzel text-[10px] tracking-[0.26em] text-gold/30 group-hover:text-gold-b group-hover:gap-3 transition-all duration-300 uppercase select-none">
                  Enter World →
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Author Section ── */}
      <section 
        id="author" 
        className="px-6 py-24 md:py-32 relative z-10 bg-black border-t border-gold/5"
      >
        <div className="max-w-[1160px] mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="font-cinzel text-[10px] tracking-[0.6em] text-gold-d uppercase block mb-3">The Creator</motion.span>
            <motion.h2 variants={itemVariants} className="font-decorative text-3xl md:text-5xl text-white tracking-wide mb-5 filter drop-shadow-[0_0_30px_rgba(200,168,75,0.15)]">
              About the Author
            </motion.h2>
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-d" />
              <div className="w-1.5 h-1.5 bg-gold-d rotate-45" />
              <div className="w-20 h-[1px] bg-gradient-to-r from-gold-d to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16 items-start max-w-[900px] mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Round dynamic author emblem */}
            <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] aspect-square rounded-full bg-panel border border-gold/20 relative overflow-hidden mx-auto">
              <div className="absolute inset-[-2px] rounded-full spin-slow bg-[conic-gradient(from_0deg,transparent_0%,rgba(200,168,75,0.22)_20%,transparent_40%,rgba(136,187,238,0.1)_60%,transparent_80%,rgba(200,168,75,0.12)_100%)]" />
              <div className="absolute inset-[3px] rounded-full bg-black flex flex-col items-center justify-center gap-2">
                <span className="text-4xl select-none">✍️</span>
                <span className="font-cinzel text-[8px] tracking-[0.44em] text-gold-d uppercase">Author</span>
              </div>
            </div>

            {/* Author description */}
            <div className="text-center md:text-left">
              <h3 className="font-decorative text-xl md:text-2xl text-white mb-1 tracking-wide">The Author</h3>
              <span className="font-cinzel text-[10px] tracking-[0.44em] text-gold-d uppercase block mb-6">Young Visionary · Creator of the Raavos Saga</span>
              <p className="font-serif text-md leading-relaxed text-text mb-4">
                This saga was never planned. It began as a random thought in school — something small, something private, something never expected to survive past the first paragraph. But the idea refused to stop.
              </p>
              <p className="font-serif text-md leading-relaxed text-text mb-6">
                Page by page, the world of Raavos grew from a single spark into two books — spanning execution docks and cosmic arenas, blind assassins and sealed archangels, kingdoms in ash and universes on trial.
              </p>
              <p className="font-serif text-md leading-relaxed text-text">
                Every word in these pages was written by someone who simply couldn't stop writing it.
              </p>

              {/* Author Quote */}
              <div className="mt-8 p-5 md:p-6 border-l-2 border-gold-d bg-gold/5 relative text-left">
                <div className="absolute top-[-10px] left-4 font-serif text-5xl text-gold-d leading-none opacity-40 select-none">
                  “
                </div>
                <p className="font-serif italic text-sm text-text/80 pl-4 leading-relaxed">
                  Those small moments of support — the ones you might have forgotten — meant more than you probably realize. And to everyone reading this: thank you for giving this story your time. I truly hope you feel what I felt writing it.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 px-6 py-12 text-center bg-black border-t border-gold/5">
        <div className="font-decorative text-2xl text-gold filter drop-shadow-[0_0_15px_rgba(200,168,75,0.4)] mb-3 select-none">⚡</div>
        <div className="font-cinzel text-[10px] tracking-[0.44em] text-text-d uppercase mb-6">Echoes of Raavos · Books I & II · An Epic Fantasy Saga</div>
        <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-d to-transparent mx-auto mb-5" />
        <p className="text-[11px] text-text-d/30 tracking-wider">Written with lightning and will. All rights reserved.</p>
      </footer>
    </div>
  );
}
