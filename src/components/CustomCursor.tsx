import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface CustomCursorProps {
  theme?: 'gold' | 'green-white' | 'purple-white' | 'cyan-blue' | 'crimson-white' | 'amber-rose' | 'silver-charcoal' | 'turquoise' | 'tan' | 'peach' | 'terracotta' | 'lime-neon' | 'rose-cosmic' | 'lavender-dream' | 'coral-reef';
  mode?: 'orbit' | 'corners' | 'aura' | 'glitch' | 'crosshair' | 'bloom' | 'triangle' | 'shield' | 'swirl' | 'dna' | 'atom';
}

export default function CustomCursor({ theme = 'gold', mode = 'orbit' }: CustomCursorProps) {
  const [hasPointer, setHasPointer] = useState(false);
  const [hoverType, setHoverType] = useState<'none' | 'hover' | 'archive' | 'responding'>('none');
  const [isClicking, setIsClicking] = useState(false);
  const [isMouseInsideWindow, setIsMouseInsideWindow] = useState(false);

  // Motion values for client mouse coordinate tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Optimized dual-spring physics parameters for maximum butteriness:
  // 1. Ultra-snappy, zero-latency inner core (no dragging feel)
  const innerSpringConfig = { damping: 25, stiffness: 480, mass: 0.12 };
  const smoothInnerX = useSpring(cursorX, innerSpringConfig);
  const smoothInnerY = useSpring(cursorY, innerSpringConfig);

  // 2. Liquid, organic lagging outer ring (feels like a velvet gravitational field)
  const outerSpringConfig = { damping: 32, stiffness: 190, mass: 0.45 };
  const smoothOuterX = useSpring(cursorX, outerSpringConfig);
  const smoothOuterY = useSpring(cursorY, outerSpringConfig);

  // 3. Multi-spring physics chain for the gorgeous "Magnetic Glitch" trailing snake/comet tail
  const trailSpringConfig1 = { damping: 25, stiffness: 350, mass: 0.25 };
  const trailSpringConfig2 = { damping: 28, stiffness: 240, mass: 0.5 };
  const trailSpringConfig3 = { damping: 32, stiffness: 160, mass: 0.85 };
  const trailSpringConfig4 = { damping: 36, stiffness: 100, mass: 1.3 };

  const trailX1 = useSpring(cursorX, trailSpringConfig1);
  const trailY1 = useSpring(cursorY, trailSpringConfig1);
  const trailX2 = useSpring(cursorX, trailSpringConfig2);
  const trailY2 = useSpring(cursorY, trailSpringConfig2);
  const trailX3 = useSpring(cursorX, trailSpringConfig3);
  const trailY3 = useSpring(cursorY, trailSpringConfig3);
  const trailX4 = useSpring(cursorX, trailSpringConfig4);
  const trailY4 = useSpring(cursorY, trailSpringConfig4);

  useEffect(() => {
    // Check if device supports fine precision pointer interactions (ignore touch devices)
    const media = window.matchMedia('(pointer: fine)');
    setHasPointer(media.matches);

    const onMediaChange = (e: MediaQueryListEvent) => setHasPointer(e.matches);
    media.addEventListener('change', onMediaChange);

    return () => {
      media.removeEventListener('change', onMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!hasPointer) return;

    const moveMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      // Auto-reveal on first move inside window
      setIsMouseInsideWindow(true);
    };

    window.addEventListener('mousemove', moveMouse, { passive: true });

    // Precise interactive target tracking with extreme DOM-safety checks to prevent crash bugs
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== 'function') return;

      const isInsideArchive = target.closest('#archive-panel') !== null;
      const isInteractive = target.closest(
        'a, button, [role="button"], [onclick], .book-card, .char-tile, .tier-card, .btn-sm, input, textarea, select, .cursor-pointer, [data-interactive="true"]'
      ) !== null;
      const isResponding = document.body.classList.contains('cur-responding');

      if (isResponding) {
        setHoverType('responding');
      } else if (isInsideArchive) {
        setHoverType(isInteractive ? 'hover' : 'archive');
      } else if (isInteractive) {
        setHoverType('hover');
      } else {
        setHoverType('none');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    // Handle mouse leaving and entering browser window bounds to fade cursor
    const handleMouseEnter = () => setIsMouseInsideWindow(true);
    const handleMouseLeaveWindow = () => {
      setIsMouseInsideWindow(false);
      setHoverType('none');
    };

    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [hasPointer, cursorX, cursorY]);

  // Dynamic status-class observer on document body to keep in sync
  useEffect(() => {
    if (!hasPointer) return;

    const observer = new MutationObserver(() => {
      const isResponding = document.body.classList.contains('cur-responding');
      if (isResponding) {
        setHoverType('responding');
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [hasPointer]);

  if (!hasPointer) return null;

  // Resolve active theme colors based on chosen theme profile
  const getThemeColors = () => {
    switch (theme) {
      case 'green-white':
        return {
          inner: '#10b981',       // vibrant emerald green
          outer: '#ffffff',       // crisp white
          glow: 'rgba(16, 185, 129, 0.6)',
          innerHover: '#34d399',
          outerHover: '#ffffff',
          pulse: '#10b981',
        };
      case 'purple-white':
        return {
          inner: '#a855f7',       // betrayal violet
          outer: '#ffffff',       // crisp white
          glow: 'rgba(168, 85, 247, 0.6)',
          innerHover: '#c084fc',
          outerHover: '#ffffff',
          pulse: '#a855f7',
        };
      case 'cyan-blue':
        return {
          inner: '#06b6d4',       // digital cyan
          outer: '#2563eb',       // royal sapphire blue
          glow: 'rgba(6, 182, 212, 0.6)',
          innerHover: '#22d3ee',
          outerHover: '#3b82f6',
          pulse: '#06b6d4',
        };
      case 'crimson-white':
        return {
          inner: '#ef233c',       // gothic bloodline crimson
          outer: '#ffffff',       // stark spectral white
          glow: 'rgba(239, 35, 60, 0.65)',
          innerHover: '#ff4d6d',
          outerHover: '#ffffff',
          pulse: '#d90429',
        };
      case 'amber-rose':
        return {
          inner: '#f4a261',       // celestial solar amber
          outer: '#e76f51',       // dynamic sunset rose
          glow: 'rgba(244, 162, 97, 0.6)',
          innerHover: '#ffb703',
          outerHover: '#fb8500',
          pulse: '#ff007f',
        };
      case 'silver-charcoal':
        return {
          inner: '#e2e8f0',       // platinum chronos silver
          outer: '#475569',       // depthful midnight slate charcoal
          glow: 'rgba(226, 232, 240, 0.45)',
          innerHover: '#ffffff',
          outerHover: '#94a3b8',
          pulse: '#ffffff',
        };
      case 'turquoise':
        return {
          inner: '#30d5c8',       // vibrant turquoise glimmer
          outer: 'rgba(48, 213, 200, 0.45)',
          glow: 'rgba(48, 213, 200, 0.7)',
          innerHover: '#40e0d0',
          outerHover: '#ffffff',
          pulse: '#10b981',
        };
      case 'tan':
        return {
          inner: '#d2b48c',       // desert tan sand
          outer: 'rgba(210, 180, 140, 0.45)',
          glow: 'rgba(210, 180, 140, 0.6)',
          innerHover: '#e6c280',
          outerHover: '#ffffff',
          pulse: '#f2c55a',
        };
      case 'peach':
        return {
          inner: '#ffb07c',       // celestial peach dawn
          outer: 'rgba(255, 176, 124, 0.45)',
          glow: 'rgba(255, 176, 124, 0.7)',
          innerHover: '#ffcba4',
          outerHover: '#ffffff',
          pulse: '#ef233c',
        };
      case 'terracotta':
        return {
          inner: '#e2725b',       // earthen terracotta clay
          outer: 'rgba(226, 114, 91, 0.45)',
          glow: 'rgba(226, 114, 91, 0.7)',
          innerHover: '#f48c71',
          outerHover: '#ffffff',
          pulse: '#ff9f1c',
        };
      case 'lime-neon':
        return {
          inner: '#adff2f',       // viper lime neon
          outer: 'rgba(173, 255, 47, 0.4)',
          glow: 'rgba(173, 255, 47, 0.8)',
          innerHover: '#ccff33',
          outerHover: '#ffffff',
          pulse: '#00ff00',
        };
      case 'rose-cosmic':
        return {
          inner: '#ff007f',       // rose cosmic nebula
          outer: 'rgba(255, 0, 127, 0.4)',
          glow: 'rgba(255, 0, 127, 0.8)',
          innerHover: '#ff409f',
          outerHover: '#ffffff',
          pulse: '#a855f7',
        };
      case 'lavender-dream':
        return {
          inner: '#e6e6fa',       // ethereal lavender dream
          outer: 'rgba(230, 230, 250, 0.45)',
          glow: 'rgba(230, 230, 250, 0.7)',
          innerHover: '#ffffff',
          outerHover: '#b0c4de',
          pulse: '#a855f7',
        };
      case 'coral-reef':
        return {
          inner: '#ff7f50',       // vivid sun coral reef
          outer: 'rgba(255, 127, 80, 0.45)',
          glow: 'rgba(255, 127, 80, 0.7)',
          innerHover: '#ff9f7d',
          outerHover: '#ffffff',
          pulse: '#ef233c',
        };
      case 'gold':
      default:
        return {
          inner: '#f2c55a',       // traditional warm gold
          outer: 'rgba(242, 197, 90, 0.45)',
          glow: 'rgba(242, 197, 90, 0.7)',
          innerHover: '#ff9f1c',  // deep active amber/orange
          outerHover: '#ff9f1c',
          pulse: '#b050c0',       // default secondary pulse color
        };
    }
  };

  const colors = getThemeColors();

  // ── A. INNER CORE SEED STYLES ──
  const getInnerStyles = () => {
    const clickScale = isClicking ? 0.5 : 1;
    switch (hoverType) {
      case 'hover':
        return {
          scale: 1.5 * clickScale,
          backgroundColor: colors.innerHover,
          boxShadow: `0 0 16px ${colors.innerHover}, 0 0 32px ${colors.glow}`,
        };
      case 'archive':
        return {
          scale: 1.1 * clickScale,
          backgroundColor: colors.inner,
          boxShadow: `0 0 12px ${colors.glow}`,
        };
      case 'responding':
        return {
          scale: [1, 1.7, 1],
          backgroundColor: '#ffffff',
          boxShadow: `0 0 20px #ffffff, 0 0 40px ${colors.pulse}`,
          transition: {
            scale: { repeat: Infinity, duration: 1, ease: 'easeInOut' }
          }
        };
      case 'none':
      default:
        return {
          scale: 1.0 * clickScale,
          backgroundColor: colors.inner,
          boxShadow: `0 0 10px ${colors.glow}`,
        };
    }
  };

  // ── B. MODE 1: LIQUID ORBIT (STANDARD) STYLES ──
  const getOrbitStyles = () => {
    const clickScale = isClicking ? 0.7 : 1;
    switch (hoverType) {
      case 'hover':
        return {
          width: 48,
          height: 48,
          border: `1.5px solid ${colors.innerHover}`,
          backgroundColor: 'rgba(255, 159, 28, 0.08)',
          scale: 1.2 * clickScale,
          rotate: 45,
          borderRadius: '32%', // squircle-like
          boxShadow: `0 0 20px ${colors.glow}`,
        };
      case 'archive':
        return {
          width: 40,
          height: 40,
          border: `1.5px solid ${colors.inner}`,
          backgroundColor: `${colors.inner}08`,
          scale: 1.0 * clickScale,
          rotate: -45,
          borderRadius: '50%',
          boxShadow: `0 0 15px ${colors.glow}`,
        };
      case 'responding':
        return {
          width: 54,
          height: 54,
          border: `2px solid ${colors.pulse}`,
          backgroundColor: 'rgba(176, 80, 192, 0.15)',
          scale: [1, 1.25, 1],
          rotate: [0, 180, 360],
          borderRadius: '38%',
          boxShadow: `0 0 25px ${colors.pulse}40`,
          transition: {
            scale: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
            rotate: { repeat: Infinity, duration: 2.5, ease: 'linear' }
          }
        };
      case 'none':
      default:
        return {
          width: 32,
          height: 32,
          border: `1px solid ${colors.outer}`,
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          scale: 1.0 * clickScale,
          rotate: 0,
          borderRadius: '50%',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.04)',
        };
    }
  };

  // ── C. MODE 2: 4 CORNERS STYLES ──
  // Calculate dynamic spacing from mouse core
  const getCornerDistance = () => {
    if (isClicking) return 10;
    if (hoverType === 'hover') return 22;
    if (hoverType === 'archive') return 20;
    if (hoverType === 'responding') return 25;
    return 16;
  };

  const cornerDist = getCornerDistance();

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[999999] select-none"
      animate={{ opacity: isMouseInsideWindow ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* 1. Snappy Inner Core Point (rendered for all modes) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: smoothInnerX,
          y: smoothInnerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-2.5 h-2.5 rounded-full"
          animate={getInnerStyles() as any}
          transition={{ duration: 0.12, ease: 'easeOut' }}
        />
      </motion.div>

      {/* 2. MODE-SPECIFIC OUTER COMPONENTS */}
      
      {/* ── MODE 1: LIQUID ORBIT (STANDARD) ── */}
      {mode === 'orbit' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{
            x: smoothOuterX,
            y: smoothOuterY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="rounded-full flex items-center justify-center transition-all duration-300"
            animate={getOrbitStyles() as any}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          />
        </motion.div>
      )}

      {/* ── MODE 2: 4 CORNER TECH HUD ── */}
      {mode === 'corners' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{
            x: smoothOuterX,
            y: smoothOuterY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="relative w-12 h-12 flex items-center justify-center"
            animate={{
              rotate: isClicking ? 45 : hoverType === 'hover' ? 90 : 0,
              scale: isClicking ? 0.9 : 1
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Top Left Bracket */}
            <motion.div
              className="absolute w-2.5 h-2.5 border-t-2 border-l-2"
              style={{ borderColor: hoverType === 'hover' ? colors.innerHover : colors.outer }}
              animate={{ x: -cornerDist, y: -cornerDist }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            />
            {/* Top Right Bracket */}
            <motion.div
              className="absolute w-2.5 h-2.5 border-t-2 border-r-2"
              style={{ borderColor: hoverType === 'hover' ? colors.innerHover : colors.outer }}
              animate={{ x: cornerDist, y: -cornerDist }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            />
            {/* Bottom Left Bracket */}
            <motion.div
              className="absolute w-2.5 h-2.5 border-b-2 border-l-2"
              style={{ borderColor: hoverType === 'hover' ? colors.innerHover : colors.outer }}
              animate={{ x: -cornerDist, y: cornerDist }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            />
            {/* Bottom Right Bracket */}
            <motion.div
              className="absolute w-2.5 h-2.5 border-b-2 border-r-2"
              style={{ borderColor: hoverType === 'hover' ? colors.innerHover : colors.outer }}
              animate={{ x: cornerDist, y: cornerDist }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* ── MODE 3: BETRAYAL AURA (ORBITING PARTICLES) ── */}
      {mode === 'aura' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{
            x: smoothOuterX,
            y: smoothOuterY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          {/* Rotates infinitely */}
          <motion.div
            className="relative w-12 h-12 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
          >
            {/* Outer dotted guidelines */}
            <div 
              className="absolute w-8 h-8 rounded-full border border-dashed opacity-25"
              style={{ borderColor: colors.outer }}
            />

            {/* Orbiting Satellite Dot 1 */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.outer }}
              animate={{ y: isClicking ? -6 : -16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            {/* Orbiting Satellite Dot 2 */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.outer }}
              animate={{ y: isClicking ? 6 : 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            {/* Orbiting Satellite Dot 3 */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.inner }}
              animate={{ x: isClicking ? -6 : -16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            {/* Orbiting Satellite Dot 4 */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.inner }}
              animate={{ x: isClicking ? 6 : 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* ── MODE 4: MAGNETIC GLITCH (SPRING TAIL) ── */}
      {mode === 'glitch' && (
        <>
          {/* Spring Tail Particle 1 */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[99997]"
            style={{
              x: trailX1,
              y: trailY1,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div 
              className="w-2 h-2 rounded-full opacity-80" 
              style={{ 
                backgroundColor: hoverType === 'hover' ? colors.innerHover : colors.outer,
                boxShadow: `0 0 6px ${colors.glow}`
              }}
            />
          </motion.div>

          {/* Spring Tail Particle 2 */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[99996]"
            style={{
              x: trailX2,
              y: trailY2,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full opacity-60" 
              style={{ 
                backgroundColor: colors.outer,
                boxShadow: `0 0 4px ${colors.glow}`
              }}
            />
          </motion.div>

          {/* Spring Tail Particle 3 */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[99995]"
            style={{
              x: trailX3,
              y: trailY3,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div 
              className="w-1 h-1 rounded-full opacity-40" 
              style={{ backgroundColor: colors.outer }}
            />
          </motion.div>

          {/* Spring Tail Particle 4 */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[99994]"
            style={{
              x: trailX4,
              y: trailY4,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div 
              className="w-[3px] h-[3px] rounded-full opacity-20" 
              style={{ backgroundColor: colors.inner }}
            />
          </motion.div>
        </>
      )}

      {/* ── MODE 5: COMBAT CROSSHAIR ── */}
      {mode === 'crosshair' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{
            x: smoothOuterX,
            y: smoothOuterY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="relative w-12 h-12 flex items-center justify-center"
            animate={{
              rotate: isClicking ? 135 : hoverType === 'hover' ? 90 : 45,
              scale: isClicking ? 0.8 : 1
            }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          >
            {/* Center target ring */}
            <div 
              className="absolute w-4 h-4 rounded-full border opacity-45"
              style={{ borderColor: colors.outer }}
            />
            {/* Top tick */}
            <div 
              className="absolute w-[1.5px] h-2.5 top-1"
              style={{ backgroundColor: colors.inner }}
            />
            {/* Bottom tick */}
            <div 
              className="absolute w-[1.5px] h-2.5 bottom-1"
              style={{ backgroundColor: colors.inner }}
            />
            {/* Left tick */}
            <div 
              className="absolute h-[1.5px] w-2.5 left-1"
              style={{ backgroundColor: colors.inner }}
            />
            {/* Right tick */}
            <div 
              className="absolute h-[1.5px] w-2.5 right-1"
              style={{ backgroundColor: colors.inner }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* ── MODE 6: CHRONAL BLOOM (SACRED GEOMETRY) ── */}
      {mode === 'bloom' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{
            x: smoothOuterX,
            y: smoothOuterY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="relative w-14 h-14 flex items-center justify-center"
            animate={{
              rotate: 360,
              scale: isClicking ? 0.75 : hoverType === 'hover' ? 1.25 : [1, 1.1, 1]
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 6, ease: 'linear' },
              scale: isClicking || hoverType === 'hover' 
                ? { type: 'spring', stiffness: 300, damping: 20 }
                : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
            }}
          >
            {/* Nested blooming rings */}
            <div 
              className="absolute w-10 h-10 rounded-full border opacity-15"
              style={{ borderColor: colors.outer, borderWidth: '1px' }}
            />
            <div 
              className="absolute w-6 h-6 rounded-full border opacity-30"
              style={{ borderColor: colors.inner, borderWidth: '1px' }}
            />

            {/* 6 beautiful flower petal nodes */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <motion.div
                key={angle}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ 
                  backgroundColor: colors.outer,
                  boxShadow: `0 0 5px ${colors.glow}`,
                  transform: `rotate(${angle}deg) translateY(-14px)` 
                }}
                animate={isClicking ? {
                  transform: `rotate(${angle}deg) translateY(-6px)`
                } : {
                  transform: `rotate(${angle}deg) translateY(-14px)`
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* ── MODE 7: TRINITY PRISM (TRIANGLE SHARDS) ── */}
      {mode === 'triangle' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{
            x: smoothOuterX,
            y: smoothOuterY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="relative w-12 h-12 flex items-center justify-center"
            animate={{
              rotate: -360,
              scale: isClicking ? 0.7 : hoverType === 'hover' ? 1.15 : 1
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 4, ease: 'linear' },
              scale: { type: 'spring', stiffness: 300, damping: 20 }
            }}
          >
            {/* Dotted Trinity guidelines */}
            <svg className="absolute w-10 h-10 opacity-20 overflow-visible" viewBox="0 0 40 40">
              <polygon 
                points="20,4 36,32 4,32" 
                fill="none" 
                stroke={colors.outer} 
                strokeWidth="1" 
                strokeDasharray="2,2"
              />
            </svg>

            {/* Orbiting Point A */}
            <motion.div
              className="absolute w-2 h-2"
              style={{
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderBottom: `7px solid ${colors.inner}`,
                top: 2,
              }}
              animate={isClicking ? { top: 12 } : { top: 2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            />

            {/* Orbiting Point B */}
            <motion.div
              className="absolute w-2 h-2"
              style={{
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderBottom: `7px solid ${colors.outer}`,
                bottom: 6,
                left: 2,
                transform: 'rotate(-120deg)'
              }}
              animate={isClicking ? { bottom: 12, left: 12 } : { bottom: 6, left: 2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            />

            {/* Orbiting Point C */}
            <motion.div
              className="absolute w-2 h-2"
              style={{
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderBottom: `7px solid ${colors.outer}`,
                bottom: 6,
                right: 2,
                transform: 'rotate(120deg)'
              }}
              animate={isClicking ? { bottom: 12, right: 12 } : { bottom: 6, right: 2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* ── MODE 8: CYBERNETIC SHIELD (OCTAGONAL WALLS) ── */}
      {mode === 'shield' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{
            x: smoothOuterX,
            y: smoothOuterY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="relative w-14 h-14 flex items-center justify-center"
            animate={{
              rotate: isClicking ? -90 : hoverType === 'hover' ? 45 : 0,
              scale: isClicking ? 0.85 : 1
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 15 }}
          >
            {/* Outer Hexagon/Octagon Outline */}
            <svg className="absolute w-12 h-12 opacity-40 overflow-visible" viewBox="0 0 40 40">
              <polygon
                points="20,2 35,11 35,29 20,38 5,29 5,11"
                fill="none"
                stroke={colors.outer}
                strokeWidth="1.5"
                strokeDasharray={hoverType === 'hover' ? "0" : "4,2"}
              />
            </svg>
            {/* Inner Hexagon/Octagon Outline */}
            <svg className="absolute w-8 h-8 opacity-25 overflow-visible" viewBox="0 0 40 40">
              <polygon
                points="20,5 33,12 33,28 20,35 7,28 7,12"
                fill="none"
                stroke={colors.inner}
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* ── MODE 9: COSMIC SWIRL (YIN-YANG SPIRAL) ── */}
      {mode === 'swirl' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{
            x: smoothOuterX,
            y: smoothOuterY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="relative w-12 h-12 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          >
            {/* Spiral Arm 1 */}
            <motion.div
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: colors.inner,
                boxShadow: `0 0 8px ${colors.glow}`,
              }}
              animate={isClicking ? { x: 0, y: 0, scale: 0.5 } : { x: -14, y: -6, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 15 }}
            />
            {/* Spiral Arm 2 */}
            <motion.div
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: colors.outer,
                boxShadow: `0 0 6px ${colors.glow}`,
              }}
              animate={isClicking ? { x: 0, y: 0, scale: 0.5 } : { x: 14, y: 6, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 15 }}
            />
            {/* Trace spiral path */}
            <div 
              className="absolute w-10 h-10 border border-t-transparent border-b-transparent rounded-full opacity-10"
              style={{ borderColor: colors.outer }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* ── MODE 10: HELIX RESONANCE (DNA STRANDS) ── */}
      {mode === 'dna' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{
            x: smoothOuterX,
            y: smoothOuterY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div className="relative w-12 h-12 flex items-center justify-center">
            {/* Strand Alpha */}
            <motion.div
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: colors.inner, boxShadow: `0 0 6px ${colors.glow}` }}
              animate={{
                x: [-14, 14, -14],
                y: [-3, 3, -3],
                scale: [1, 0.7, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut"
              }}
            />
            {/* Strand Beta */}
            <motion.div
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: colors.outer }}
              animate={{
                x: [14, -14, 14],
                y: [3, -3, 3],
                scale: [0.7, 1, 0.7]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut"
              }}
            />
            {/* Center link bridge line */}
            <div className="w-6 h-[0.5px] bg-white/10" />
          </motion.div>
        </motion.div>
      )}

      {/* ── MODE 11: QUANTUM ATOM (ORBITAL RINGS) ── */}
      {mode === 'atom' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998]"
          style={{
            x: smoothOuterX,
            y: smoothOuterY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Orbit Ring 1 (45deg tilted) */}
            <motion.div
              className="absolute w-12 h-4 border border-dashed rounded-full opacity-35"
              style={{ borderColor: colors.outer, rotate: 45 }}
              animate={{ rotate: 45 + 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            {/* Orbit Ring 2 (-45deg tilted) */}
            <motion.div
              className="absolute w-12 h-4 border border-dashed rounded-full opacity-35"
              style={{ borderColor: colors.inner, rotate: -45 }}
              animate={{ rotate: -45 - 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            {/* Orbiting Electron 1 */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.inner, boxShadow: `0 0 6px ${colors.glow}` }}
              animate={{
                scale: [1, 1.4, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
