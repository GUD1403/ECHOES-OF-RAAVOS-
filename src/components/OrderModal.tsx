import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, HelpCircle } from 'lucide-react';
import { SupportTier } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  tier: SupportTier | null;
  onClose: () => void;
}

export default function OrderModal({ isOpen, tier, onClose }: OrderModalProps) {
  // Key bindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!tier) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md cursor-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content Box */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2001]
              max-w-[500px] w-[90%] bg-panel border border-gold/25 p-8 md:p-12 text-center shadow-[0_0_50px_rgba(200,168,75,0.15)] rounded-sm"
            initial={{ opacity: 0, scale: 0.94, y: '-48%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.94, y: '-48%', x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            {/* Top gold line decoration */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 font-cinzel text-[10px] tracking-widest text-text-d hover:text-gold transition-colors"
            >
              ✕ Close
            </button>

            {/* Glyph Icon */}
            <motion.span 
              className="text-4xl block mb-5"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              {tier.glyph}
            </motion.span>

            {/* Title */}
            <h2 className="font-decorative text-2xl text-white mb-2 tracking-wide filter drop-shadow-[0_0_15px_rgba(200,168,75,0.3)]">
              {tier.name}
            </h2>

            {/* Subtitle / Level */}
            <span className="font-cinzel text-[10px] tracking-[0.4em] text-gold uppercase block mb-6">
              {tier.subtitle} · {tier.price}
            </span>

            <div className="w-14 h-[1px] bg-gold-d mx-auto mb-6" />

            {/* Descriptions */}
            <p className="font-serif text-md text-text leading-relaxed mb-4">
              {tier.id === 'witness' && 'You have always been part of this. Every reader who carries the story forward is woven into the world of Raavos — whether the book knows it yet or not.'}
              {tier.id === 'mark' && 'Your name will be written into the acknowledgments of a published book. A character bearing your mark will walk through the pages of the Raavos universe. This is not metaphor. This is permanent.'}
              {tier.id === 'breaker' && 'You do not support the story. You reshape it. A fully personalised character, built around you, written into the canon. A story element that exists because you decided it should. Your name in every acknowledgment, of every book, forever.'}
            </p>

            <p className="font-serif italic text-sm text-text-d leading-relaxed mb-8">
              {tier.id === 'witness' && 'Join the community and start recommending ideas for the saga.'}
              {tier.id === 'mark' && 'Payment system coming soon. Register your interest and you will be first to know.'}
              {tier.id === 'breaker' && 'This tier permanently alters the Raavos saga. Payment system coming soon — slots are extremely limited.'}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={onClose}
                className="btn btn-gold w-full sm:w-auto font-cinzel text-[10px] tracking-widest uppercase bg-gradient-to-r from-gold via-gold-b to-gold py-3 px-8 text-black clip-btn hover:scale-105 active:scale-95 transition-all cursor-none"
              >
                {tier.id === 'witness' ? 'Join the Witnesses' : tier.id === 'mark' ? 'Claim the Mark' : 'Break Fate'}
              </button>
              <button
                onClick={onClose}
                className="btn border border-gold/30 text-gold hover:border-gold hover:bg-gold/5 w-full sm:w-auto font-cinzel text-[10px] tracking-widest uppercase py-3 px-8 transition-all cursor-none"
              >
                Not Yet
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
