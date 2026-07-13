import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { BOOKS, CHAPTERS_BOOK_I, CHAPTERS_BOOK_II, CHAPTERS_BOOK_III } from '../data/lore';

interface BookViewProps {
  bookId: string;
  onNavigate: (viewId: string) => void;
}

export default function BookView({ bookId, onNavigate }: BookViewProps) {
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return null;

  const chapters = bookId === 'book1' 
    ? CHAPTERS_BOOK_I 
    : bookId === 'book2' 
    ? CHAPTERS_BOOK_II 
    : CHAPTERS_BOOK_III;

  return (
    <div className="select-none pb-12">
      {/* Hero Banner */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 md:py-36 z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,rgba(136,187,238,0.05),transparent_65%),radial-gradient(ellipse_100%_38%_at_50%_100%,rgba(2,2,8,0.9),transparent)]" />
        
        <motion.p 
          className="font-cinzel text-[11px] tracking-[0.62em] text-gold-d uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Book {book.volume} of III
        </motion.p>
        
        <motion.h1 
          className="font-decorative text-4xl md:text-7xl lg:text-8xl font-black leading-[0.93] text-white tracking-tight drop-shadow-[0_8px_40px_rgba(0,0,0,1)] mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          Echoes of<br />
          <span className="text-gold-b font-decorative block gold-glow select-none">{book.title.split('of ').pop()}</span>
        </motion.h1>

        <div className="font-cinzel text-[11px] tracking-[0.28em] text-text-d uppercase mt-2">{book.subtitle}</div>

        <motion.div 
          className="flex items-center gap-5 w-[min(420px,85%)] mx-auto my-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.68 }}
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/55" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45 shadow-[0_0_14px_rgba(200,168,75,0.9)]" />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/55 to-transparent" />
        </motion.div>

        <motion.p 
          className="font-serif italic text-base md:text-xl text-text/75 leading-relaxed max-w-[570px] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.82 }}
        >
          {bookId === 'book1' 
            ? 'A boy dragged from the gallows, a fortress forged in darkness, and the moment an archangel finally wakes.'
            : bookId === 'book2'
            ? 'The universe is on trial. Thirteen Alpha Beasts. One sealed archangel waiting inside the light.'
            : 'The ultimate trial has arrived. A planet-sized Colosseum of Gods, Mahoraga, Sukuna, and a permanent, god-killing black lightning.'}
        </motion.p>

        <motion.div 
          className="flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <button 
            onClick={() => onNavigate(bookId === 'book1' ? 'char-raavos' : bookId === 'book2' ? 'char-crius' : 'char-soreign')}
            className="btn btn-gold font-cinzel text-[10px] tracking-widest uppercase bg-gradient-to-r from-gold via-gold-b to-gold py-4 px-9 text-black clip-btn hover:scale-105 active:scale-95 transition-all cursor-none"
          >
            {bookId === 'book1' ? 'Meet Raavos' : bookId === 'book2' ? 'Meet Crius' : 'Meet Soreign'}
          </button>
          <button 
            onClick={() => onNavigate('home')}
            className="btn border border-gold/30 text-gold hover:border-gold hover:bg-gold/5 font-cinzel text-[10px] tracking-widest uppercase py-4 px-9 transition-all cursor-none"
          >
            ← Back to Saga
          </button>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
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

      {/* Plot briefs section */}
      <section className="px-6 py-24 md:py-32 relative z-10 bg-gradient-to-b from-black to-deep border-t border-gold/5">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-cinzel text-[10px] tracking-[0.6em] text-gold-d uppercase block mb-3">The Story</span>
            <h2 className="font-decorative text-3xl md:text-5xl text-white tracking-wide mb-5 filter drop-shadow-[0_0_30px_rgba(200,168,75,0.15)]">
              Book {book.volume} Synopsis
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-d" />
              <div className="w-1.5 h-1.5 bg-gold-d rotate-45" />
              <div className="w-20 h-[1px] bg-gradient-to-r from-gold-d to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mb-12">
            <p className="font-serif text-[16px] leading-relaxed text-text/90">{book.description1}</p>
            <p className="font-serif text-[16px] leading-relaxed text-text/90">{book.description2}</p>
          </div>

          <div className="border border-gold/20 border-l-3 border-l-gold bg-gold/5 p-8 md:p-10 mb-14 text-center">
            <p className="font-serif italic text-base md:text-lg text-text/85">"{book.stakes}"</p>
          </div>

          <div className="text-center">
            <button 
              onClick={() => onNavigate('home')}
              className="btn btn-gold font-cinzel text-[10px] tracking-widest uppercase bg-gradient-to-r from-gold via-gold-b to-gold py-4 px-9 text-black clip-btn hover:scale-105 active:scale-95 transition-all cursor-none"
            >
              Meet Every Character
            </button>
          </div>
        </div>
      </section>

      {/* Chapters Grid section */}
      <section className="px-6 py-24 md:py-32 relative z-10 bg-deep border-t border-gold/5">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-cinzel text-[10px] tracking-[0.6em] text-gold-d uppercase block mb-3">Chapters list</span>
            <h2 className="font-decorative text-3xl md:text-5xl text-white tracking-wide mb-5 filter drop-shadow-[0_0_30px_rgba(200,168,75,0.15)]">
              Book {book.volume} Chapters
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-d" />
              <div className="w-1.5 h-1.5 bg-gold-d rotate-45" />
              <div className="w-20 h-[1px] bg-gradient-to-r from-gold-d to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0.5 bg-gold/10 border border-gold/10">
            {chapters.map((chap) => (
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
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 text-center bg-black border-t border-gold/5 mt-16">
        <div className="font-decorative text-2xl text-gold filter drop-shadow-[0_0_15px_rgba(200,168,75,0.4)] mb-3 select-none">⚡</div>
        <div className="font-cinzel text-[10px] tracking-[0.44em] text-text-d uppercase mb-6">Echoes of Raavos · Book {book.volume} · {book.subtitle}</div>
        <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-d to-transparent mx-auto mb-5" />
        <p className="text-[11px] text-text-d/30 tracking-wider">Written with lightning and will. All rights reserved.</p>
      </footer>
    </div>
  );
}
