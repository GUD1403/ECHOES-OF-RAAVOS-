import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SUPPORT_TIERS } from '../data/lore';
import { SupportTier } from '../types';

interface OrderViewProps {
  onNavigate: (viewId: string) => void;
  onOpenModal: (tier: SupportTier) => void;
}

// Highly optimized self-contained Canvas component for card ambient highlights
function TierCardCanvas({ type }: { type: 'witness' | 'mark' | 'breaker' }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = canvas.offsetWidth || 300);
    let H = (canvas.height = canvas.offsetHeight || 450);

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth || 300;
      H = canvas.height = canvas.offsetHeight || 450;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // ── Witness states (Drifting gold stars) ──
    const witnessMotes = Array.from({ length: 18 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.8 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.06 - Math.random() * 0.1,
      a: 0.04 + Math.random() * 0.12,
    }));

    // ── Mark states (Orbiting golden stardust rings) ──
    const markMotes = Array.from({ length: 28 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 40 + Math.random() * 90,
      speed: 0.002 + Math.random() * 0.004,
      r: 0.6 + Math.random() * 1.2,
      a: 0.06 + Math.random() * 0.18,
    }));

    // ── Breaker states (Lightning sparks) ──
    const sparks: { segs: [number, number, number, number][]; age: number; life: number; alpha: number }[] = [];
    let sparkTimer = 0;

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      if (type === 'witness') {
        // Render drifting specs
        for (const m of witnessMotes) {
          m.x += m.vx;
          m.y += m.vy;
          if (m.y < -4) {
            m.y = H + 4;
            m.x = Math.random() * W;
          }
          ctx.save();
          ctx.globalAlpha = m.a;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          ctx.fillStyle = '#c8a84b';
          ctx.shadowColor = '#f2c55a';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        }
      } else if (type === 'mark') {
        // Render core radial glow
        const glowPulse = 0.5 + 0.5 * Math.sin(t * 1.2);
        const grd = ctx.createRadialGradient(W / 2, H * 0.38, 0, W / 2, H * 0.38, W * 0.45);
        grd.addColorStop(0, `rgba(200, 168, 75, ${0.06 + glowPulse * 0.06})`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        // Orbiting rings
        for (const m of markMotes) {
          m.angle += m.speed;
          const mx = W / 2 + Math.cos(m.angle) * m.radius * (W / 300);
          const my = H * 0.38 + Math.sin(m.angle) * m.radius * 0.35;
          ctx.save();
          ctx.globalAlpha = m.a * (0.6 + 0.4 * Math.sin(t + m.angle));
          ctx.beginPath();
          ctx.arc(mx, my, m.r, 0, Math.PI * 2);
          ctx.fillStyle = '#f2c55a';
          ctx.shadowColor = '#f2c55a';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
      } else if (type === 'breaker') {
        // Render blue cosmic mist
        const shimmer = 0.5 + 0.5 * Math.sin(t * 0.9);
        const grd = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, W * 0.5);
        grd.addColorStop(0, `rgba(136, 187, 238, ${0.04 + shimmer * 0.05})`);
        grd.addColorStop(0.5, `rgba(200, 168, 75, ${0.015 + shimmer * 0.02})`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        // Spawn occasional lightning arcs
        sparkTimer++;
        if (sparkTimer > 15 + Math.random() * 20) {
          sparkTimer = 0;
          const sx = Math.random() * W;
          const segs: [number, number, number, number][] = [];
          let cx = sx;
          let cy = 0;
          const ey = H * (0.15 + Math.random() * 0.5);
          while (cy < ey) {
            const nx = cx + (Math.random() - 0.5) * 40;
            const ny = cy + 8 + Math.random() * 14;
            segs.push([cx, cy, nx, ny]);
            cx = nx;
            cy = ny;
          }
          sparks.push({ segs, age: 0, life: 8 + Math.random() * 10, alpha: 0.35 + Math.random() * 0.3 });
        }

        // Draw and update active sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          const a = s.alpha * (1 - s.age / s.life);
          ctx.save();
          ctx.globalAlpha = a * 0.5;
          ctx.strokeStyle = '#aaddff';
          ctx.lineWidth = 1.2;
          ctx.shadowColor = '#88bbee';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          for (const [x1, y1, x2, y2] of s.segs) {
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.stroke();
          ctx.restore();

          s.age++;
          if (s.age > s.life) sparks.splice(i, 1);
        }

        // Edge electric sparks flicker
        if (Math.sin(t * 3.1) > 0.85) {
          ctx.save();
          ctx.globalAlpha = 0.04;
          ctx.fillStyle = '#88bbee';
          ctx.fillRect(0, 0, W, H);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [type]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-55 group-hover:opacity-100 transition-opacity duration-500 z-0" />;
}

export default function OrderView({ onNavigate, onOpenModal }: OrderViewProps) {
  return (
    <div id="view-order" className="select-none pb-12">
      
      {/* ── Order Hero ── */}
      <section 
        id="order-hero" 
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 md:py-36 z-10 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_65%_50%_at_50%_40%,rgba(200,168,75,0.06)_0%,transparent_65%),radial-gradient(ellipse_100%_36%_at_50%_100%,rgba(2,2,8,0.94),transparent)]" />
        
        <motion.p 
          className="oh-pre font-cinzel text-[11px] tracking-[0.65em] text-gold-d uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          The Order of Raavos
        </motion.p>
        
        <motion.h1 
          className="oh-title font-decorative text-4xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-white tracking-tight drop-shadow-[0_8px_40px_rgba(0,0,0,1)] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          Enter<br />
          <span className="oh-title-gold text-gold-b font-decorative block gold-glow select-none">The Order</span>
        </motion.h1>

        <motion.div 
          className="oh-div flex items-center gap-5 w-[min(440px,88%)] mx-auto my-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.62 }}
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
          <div className="oh-gem w-1.5 h-1.5 bg-gold rotate-45 shadow-[0_0_14px_rgba(200,168,75,0.9)]" />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/50 to-transparent" />
        </motion.div>

        <motion.p 
          className="oh-tagline font-serif italic text-base md:text-xl lg:text-2xl text-text/72 leading-relaxed max-w-[580px] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.78 }}
        >
          This world was not built alone.<br />
          Every great saga needs those who witness it, carry it — and those who dare to <em className="not-italic text-white">shape</em> it.
        </motion.p>

        <motion.p 
          className="oh-lore font-cinzel text-[11px] tracking-[0.22em] text-gold-d uppercase mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95 }}
        >
          Choose your place. <span className="text-gold/80">Choose your fate.</span>
        </motion.p>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.4 }}
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

      {/* ── Tiers Grid Layout ── */}
      <section 
        id="order-tiers" 
        className="px-6 py-24 md:py-32 relative z-10 bg-gradient-to-b from-black via-deep to-black border-t border-gold/5"
      >
        <div className="max-w-[1160px] mx-auto">
          <motion.p 
            className="text-center font-cinzel text-[11px] md:text-sm tracking-[0.18em] italic text-text-d mb-16 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Every world needs its witnesses.<br />
            Few earn a place within it.<br />
            <em className="text-gold/70 not-italic">Fewer still… shape it.</em>
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-gold/10 border border-gold/10 relative">
            
            {SUPPORT_TIERS.map((tier, idx) => {
              // Color mappings for top highlights per tier
              let highlightGradient = 'linear-gradient(90deg, transparent, rgba(200, 168, 75, 0.4), transparent)';
              let borderHover = 'hover:border-gold/25';
              let btnClass = 'border-gold/25 text-gold-d/70 hover:border-gold/50 hover:text-gold hover:bg-gold/5';

              if (tier.id === 'mark') {
                highlightGradient = 'linear-gradient(90deg, transparent, var(--color-gold), transparent)';
                borderHover = 'hover:border-gold/50';
                btnClass = 'bg-gradient-to-r from-gold via-gold-b to-gold text-black border-transparent hover:shadow-[0_8px_36px_rgba(200,168,75,0.5)] hover:-translate-y-0.5';
              } else if (tier.id === 'breaker') {
                highlightGradient = 'linear-gradient(90deg, transparent, rgba(136, 187, 238, 0.7), rgba(200, 168, 75, 0.5), rgba(136, 187, 238, 0.7), transparent)';
                borderHover = 'hover:border-blue/45';
                btnClass = 'bg-gradient-to-r from-[#589bdc]/90 via-[#88bbee] to-[#589bdc]/90 text-black border-transparent hover:shadow-[0_8px_40px_rgba(136,187,238,0.55)] hover:-translate-y-0.5';
              }

              return (
                <motion.div
                  key={tier.id}
                  onClick={() => onOpenModal(tier)}
                  className={`tier-card group relative p-10 md:p-14 bg-panel border border-gold/10 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-1.5 cursor-none overflow-hidden ${borderHover} ${
                    tier.id === 'breaker' ? 'bg-gradient-to-b from-[#08081a] to-[#040410]' : ''
                  }`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  {/* Custom canvas renderer for high fidelity card specific ambient shaders */}
                  <TierCardCanvas type={tier.id as any} />

                  {/* Special Breaker distortion ring */}
                  {tier.id === 'breaker' && (
                    <div className="absolute inset-[-1px] pointer-events-none border border-blue/15 shadow-[inset_0_0_40px_rgba(136,187,238,0.04)] animate-[distortRing_4s_ease-in-out_infinite]" />
                  )}

                  {/* Badges */}
                  {tier.recommended && (
                    <span className="absolute top-5 right-5 font-cinzel text-[8px] tracking-[0.32em] text-gold border border-gold/45 py-1 px-3 bg-gold/8 uppercase select-none">
                      Most Chosen
                    </span>
                  )}
                  {tier.p2w && (
                    <span className="absolute top-5 left-5 font-cinzel text-[8px] tracking-[0.28em] text-blue/65 border border-blue/30 py-1 px-2.5 bg-blue/5 uppercase select-none">
                      P2W 🥀
                    </span>
                  )}

                  {/* Gold Highlight Line */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: highlightGradient }}
                  />

                  {/* Body components */}
                  <span className="text-5xl block mb-6 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] select-none">
                    {tier.glyph}
                  </span>

                  <span className="font-cinzel text-[9px] tracking-[0.48em] text-text-d uppercase block mb-3">
                    {tier.concept}
                  </span>

                  <h3 className={`font-decorative text-xl md:text-2xl leading-none mb-1 font-bold ${
                    tier.id === 'mark' ? 'text-gold-b' : tier.id === 'breaker' ? 'text-blue' : 'text-gold-d group-hover:text-gold'
                  }`}>
                    {tier.name}
                  </h3>

                  <div className="font-cinzel text-[9px] tracking-[0.26em] text-text-d uppercase mb-6">
                    {tier.subtitle}
                  </div>

                  <div className="w-12 h-[1px] bg-current opacity-25 mb-6" />

                  {/* Pricing block */}
                  <div className="mb-8">
                    <span className={`font-decorative text-3xl font-black block mb-1.5 ${
                      tier.id === 'breaker' ? 'text-blue' : tier.id === 'mark' ? 'text-gold-b' : 'text-text-d'
                    }`}>
                      {tier.price}
                    </span>
                    <span className="font-cinzel text-[8px] tracking-[0.3em] text-text-d uppercase">
                      {tier.priceNote}
                    </span>
                  </div>

                  {/* Perks list */}
                  <ul className="list-none w-full flex-1 mb-8">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="text-[13px] leading-relaxed text-text py-2 border-b border-gold/5 flex gap-3 text-left">
                        <span className="text-[8px] text-text-d mt-1.5 select-none">◆</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button className={`tier-btn font-cinzel text-[10px] tracking-[0.28em] uppercase py-3.5 px-8 w-full clip-btn-sm transition-all duration-300 ${btnClass}`}>
                    {tier.id === 'witness' ? 'Claim Your Place' : tier.id === 'mark' ? 'Receive the Mark' : 'Break Fate'}
                  </button>
                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ── Closing section ── */}
      <section id="order-closing" className="relative z-10 px-6 py-20 text-center bg-black border-t border-gold/5">
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-d to-transparent mx-auto mb-8" />
        <p className="font-serif italic text-base md:text-lg text-text-d/60 max-w-[620px] mx-auto mb-8 leading-relaxed">
          "The Raavos saga exists because one person refused to let the idea die.<br />
          Every person who steps into the Order keeps that refusal alive."
        </p>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-d to-transparent mx-auto mb-8" />
        <span 
          onClick={() => onNavigate('home')}
          className="oc-back font-cinzel text-[10px] tracking-[0.32em] text-gold-d hover:text-gold uppercase flex items-center gap-2 justify-center transition-colors cursor-none"
        >
          ← Return to the Saga
        </span>
      </section>

      <footer className="relative z-10 px-6 py-12 text-center bg-black border-t border-gold/5">
        <div className="font-decorative text-2xl text-gold filter drop-shadow-[0_0_15px_rgba(200,168,75,0.4)] mb-3 select-none">⚡</div>
        <div className="font-cinzel text-[10px] tracking-[0.44em] text-text-d uppercase mb-6">Enter the Order · Echoes of Raavos</div>
        <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-d to-transparent mx-auto mb-5" />
        <p className="text-[11px] text-text-d/30 tracking-wider">Written with lightning and will. All rights reserved.</p>
      </footer>
    </div>
  );
}
