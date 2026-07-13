import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CharacterEntranceProps {
  charId: string;
  themePrimary: string;
}

export default function CharacterEntrance({ charId, themePrimary }: CharacterEntranceProps) {
  const [active, setActive] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Reactivate the transition whenever character switches
    setActive(true);
    
    // Standardized duration is 2.4 seconds to let the magnificent visual spectacles play out fully
    const duration = 2400;
    const timer = setTimeout(() => {
      setActive(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [charId]);

  // Master canvas particle engines and physical simulation loops
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Global particle structure array
    const particles: any[] = [];
    const cx = W / 2;
    const cy = H / 2;

    // Initialize custom data based on character classes
    if (charId === 'char-raavos' || charId === 'char-crius') {
      // Solar stardust and radiant light sparks
      for (let i = 0; i < 150; i++) {
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * (1 + Math.random() * 11),
          vy: Math.sin(angle) * (1 + Math.random() * 11),
          size: 1 + Math.random() * 5,
          color: charId === 'char-raavos' ? '#f5cb5c' : '#aaddff',
          alpha: 1.0,
          decay: 0.015 + Math.random() * 0.02,
        });
      }
    } else if (charId === 'char-soreign') {
      // Steel cutting sparks emitted from slashed seams
      for (let i = 0; i < 180; i++) {
        const angle = -0.43 + (Math.random() - 0.5) * 0.25; // Slashed angle bias
        particles.push({
          x: cx + (Math.random() - 0.5) * 200,
          y: cy + (Math.random() - 0.5) * 200,
          vx: Math.cos(angle) * (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 16),
          vy: Math.sin(angle) * (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 16),
          size: 1.5 + Math.random() * 4,
          color: Math.random() > 0.4 ? '#ffffff' : Math.random() > 0.5 ? '#ff4d4d' : '#88bbee',
          alpha: 1.0,
          decay: 0.02 + Math.random() * 0.025,
        });
      }
    } else if (charId === 'char-rega') {
      // Fire embers and rising billows of hot smoke
      for (let i = 0; i < 160; i++) {
        const isSmoke = Math.random() > 0.65;
        particles.push({
          x: Math.random() * W,
          y: H + Math.random() * 150,
          vx: (Math.random() - 0.5) * 4,
          vy: -4 - Math.random() * 10,
          size: isSmoke ? 15 + Math.random() * 30 : 3 + Math.random() * 8,
          hue: Math.random() > 0.3 ? 15 + Math.random() * 25 : 340 + Math.random() * 30, // Oranges & deep roses
          alpha: isSmoke ? 0.15 + Math.random() * 0.2 : 0.6 + Math.random() * 0.4,
          decay: isSmoke ? 0.003 + Math.random() * 0.005 : 0.006 + Math.random() * 0.012,
          isSmoke,
        });
      }
    } else if (charId === 'char-koni') {
      // Swirling horizontal winds and drifting autumn leaves
      for (let i = 0; i < 110; i++) {
        const isLeaf = Math.random() > 0.75;
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          len: 100 + Math.random() * 150,
          speed: 16 + Math.random() * 22,
          thickness: 1.5 + Math.random() * 3,
          opacity: Math.random() * 0.5 + 0.2,
          waveFreq: 0.003 + Math.random() * 0.005,
          waveAmp: 15 + Math.random() * 25,
          offset: Math.random() * 1000,
          isLeaf,
          leafColor: Math.random() > 0.5 ? '#ff9f1c' : '#2d6a4f',
          leafSize: 6 + Math.random() * 6,
          leafRot: Math.random() * Math.PI * 2,
          leafSpin: (Math.random() - 0.5) * 0.1,
        });
      }
    } else if (charId === 'char-daren' || charId === 'char-munchkin') {
      // Accretion particles orbiting into the dark gravity void
      for (let i = 0; i < 300; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 150 + Math.random() * 550;
        particles.push({
          angle,
          radius,
          speed: 0.025 + Math.random() * 0.035,
          radialSpeed: -2.5 - Math.random() * 3.5,
          size: 1 + Math.random() * 4.5,
          color: Math.random() > 0.4 ? 'rgba(168,96,224,0.95)' : 'rgba(244,162,97,0.9)', // Void iris violet & amber cosmic gold
          opacity: 0.5 + Math.random() * 0.5,
        });
      }
    } else if (charId === 'char-rex') {
      // Impact combat sparks & exploding concrete rubble
      for (let i = 0; i < 140; i++) {
        const isRubble = Math.random() > 0.6;
        particles.push({
          x: cx + (Math.random() - 0.5) * 80,
          y: cy + (Math.random() - 0.5) * 80,
          vx: (Math.random() - 0.5) * (10 + Math.random() * 25),
          vy: (Math.random() - 0.5) * (10 + Math.random() * 25) - 6,
          size: isRubble ? 5 + Math.random() * 12 : 2 + Math.random() * 5,
          gravity: 0.45,
          color: isRubble ? '#4a4a4a' : Math.random() > 0.5 ? '#ff9f1c' : '#e07030',
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.2,
          alpha: 1.0,
          isRubble,
        });
      }
    } else if (charId === 'char-doctor') {
      // Forest roots growing out, blooming spores, flower blossoms
      const sideNodes = [
        { x: 0, y: H * 0.2, angle: 0 },
        { x: 0, y: H * 0.8, angle: 0 },
        { x: W, y: H * 0.3, angle: Math.PI },
        { x: W, y: H * 0.7, angle: Math.PI },
        { x: W * 0.3, y: 0, angle: Math.PI / 2 },
        { x: W * 0.7, y: 0, angle: Math.PI / 2 },
        { x: W * 0.5, y: H, angle: -Math.PI / 2 },
      ];
      sideNodes.forEach((node) => {
        particles.push({
          x: node.x,
          y: node.y,
          angle: node.angle + (Math.random() - 0.5) * 0.4,
          speed: 7 + Math.random() * 5,
          thickness: 18 + Math.random() * 12,
          points: [{ x: node.x, y: node.y }],
          leaves: [] as any[],
          flowers: [] as any[],
          done: false,
        });
      });
    } else if (charId === 'char-gatekeeper') {
      // Floating kitchen eggs, pancakes, butter slides, blazing heat embers
      for (let i = 0; i < 110; i++) {
        const rnd = Math.random();
        const type = rnd > 0.75 ? 'egg' : rnd > 0.50 ? 'pancake' : rnd > 0.35 ? 'butter' : 'ember';
        particles.push({
          x: cx + (Math.random() - 0.5) * 100,
          y: cy + 60,
          vx: (Math.random() - 0.5) * 22,
          vy: -18 - Math.random() * 18,
          gravity: 0.55,
          size: type === 'ember' ? 2 + Math.random() * 5 : type === 'butter' ? 12 + Math.random() * 6 : 22 + Math.random() * 12,
          type,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.25,
          alpha: 1.0,
          color: type === 'egg' ? '#ffffff' : type === 'pancake' ? '#f4a261' : type === 'butter' ? '#fff3b0' : '#ff7a00',
        });
      }
    } else if (charId === 'char-toro') {
      // Swirling multi-dimensional portal loops & coordinates
      for (let i = 0; i < 220; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 450;
        particles.push({
          angle,
          radius,
          speed: 0.015 + Math.random() * 0.03,
          radialSpeed: 2.0 + Math.random() * 4.0, // spiraling outward
          size: 1.5 + Math.random() * 4,
          color: Math.random() > 0.5 ? '#f4a261' : '#00b4d8', // Amber and azure spatial coordinate lines
          opacity: 0.4 + Math.random() * 0.6,
        });
      }
    } else if (charId === 'char-robby') {
      // Mind-control brain ripples and orbiting telepathy circles
      for (let i = 0; i < 160; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: 2 + Math.random() * 5,
          color: Math.random() > 0.5 ? '#b050c0' : '#ff007f', // Betrayal violet and psychic magenta
          opacity: 0.4 + Math.random() * 0.6,
          pulseSpeed: 0.05 + Math.random() * 0.08,
          angle: Math.random() * Math.PI * 2,
        });
      }
    } else if (charId === 'char-bloodborne') {
      // Crimson crystal crown shards and glass fractures
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: cx + (Math.random() - 0.5) * 50,
          y: cy + (Math.random() - 0.5) * 50,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.5) * 14 - 4,
          size: 3 + Math.random() * 9,
          color: Math.random() > 0.4 ? '#d90429' : '#300004', // Velvet red and gothic coagulated ruby
          opacity: 0.6 + Math.random() * 0.4,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.12,
          gravity: 0.22,
        });
      }
    }

    let frame = 0;

    const animate = () => {
      frame++;

      if (charId === 'char-raavos' || charId === 'char-crius') {
        // Solar rays and stardust rendering
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, W, H);

        // Draw rotating rays
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(frame * 0.005);
        const rayCount = 16;
        const color = charId === 'char-raavos' ? 'rgba(245,203,92,0.06)' : 'rgba(170,221,255,0.06)';
        ctx.fillStyle = color;
        for (let i = 0; i < rayCount; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos((i * Math.PI * 2) / rayCount - 0.15) * W, Math.sin((i * Math.PI * 2) / rayCount - 0.15) * W);
          ctx.lineTo(Math.cos((i * Math.PI * 2) / rayCount + 0.15) * W, Math.sin((i * Math.PI * 2) / rayCount + 0.15) * W);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // Animate particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          // Recycle
          if (p.alpha <= 0) {
            p.x = cx;
            p.y = cy;
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 11;
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed;
            p.alpha = 1.0;
          }
        }
        ctx.globalAlpha = 1.0;
      } else if (charId === 'char-soreign') {
        // Sequenced dimensional slicing sparks
        ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          // Apply slight resistance to simulate cutting metal dragging friction
          p.vx *= 0.98;
          p.vy *= 0.98;

          if (p.alpha <= 0) {
            p.x = cx + (Math.random() - 0.5) * 100;
            p.y = cy + (Math.random() - 0.5) * 100;
            const angle = -0.43 + (Math.random() - 0.5) * 0.25;
            p.vx = Math.cos(angle) * (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 16);
            p.vy = Math.sin(angle) * (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 16);
            p.alpha = 1.0;
          }
        }
        ctx.globalAlpha = 1.0;
      } else if (charId === 'char-rega') {
        // Fire embers and smoke rendering
        ctx.fillStyle = 'rgba(5, 2, 2, 0.16)';
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

          if (p.isSmoke) {
            ctx.fillStyle = `rgba(100, 40, 30, ${p.alpha * 0.5})`;
          } else {
            ctx.fillStyle = `hsla(${p.hue}, 100%, 55%, ${p.alpha})`;
            ctx.shadowBlur = p.size * 3.5;
            ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, 0.8)`;
          }
          ctx.fill();
          ctx.shadowBlur = 0;

          // Apply thermal sine wave oscillation to simulate fire plumes
          p.x += p.vx + Math.sin(frame * 0.05 + p.y * 0.01) * 0.4;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0 || p.y < -50) {
            p.x = Math.random() * W;
            p.y = H + Math.random() * 120;
            p.alpha = p.isSmoke ? 0.15 + Math.random() * 0.2 : 0.6 + Math.random() * 0.4;
          }
        }
      } else if (charId === 'char-koni') {
        // Wind gusts and foliage
        ctx.fillStyle = 'rgba(2, 6, 8, 0.14)';
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.save();

          if (p.isLeaf) {
            // Render spinning wind leaves
            ctx.translate(p.x, p.y);
            ctx.rotate(p.leafRot);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.leafSize * 1.5, p.leafSize, 0, 0, Math.PI * 2);
            ctx.fillStyle = p.leafColor;
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.stroke();

            p.leafRot += p.leafSpin;
            p.x += p.speed * 0.6;
            p.y += Math.sin(frame * p.waveFreq + p.offset) * 4;
          } else {
            // Render glowing wind currents
            ctx.strokeStyle = 'rgba(168, 229, 224, 0.4)';
            ctx.lineWidth = p.thickness;
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            for (let j = 0; j < p.len; j += 20) {
              const tx = p.x - j;
              const ty = p.y + Math.sin((p.x - j) * p.waveFreq + p.offset) * p.waveAmp;
              ctx.lineTo(tx, ty);
            }
            ctx.stroke();

            p.x += p.speed;
          }

          ctx.restore();

          if (p.x - p.len > W) {
            p.x = -p.len;
            p.y = Math.random() * H;
          }
        }
        ctx.globalAlpha = 1.0;
      } else if (charId === 'char-daren' || charId === 'char-munchkin') {
        // Swirling centripetal black hole accretion disk
        ctx.fillStyle = 'rgba(4, 2, 8, 0.22)';
        ctx.fillRect(0, 0, W, H);

        // Core Event Horizon
        const grad = ctx.createRadialGradient(cx, cy, 35, cx, cy, 140);
        grad.addColorStop(0, '#000000');
        grad.addColorStop(0.32, '#000000');
        grad.addColorStop(0.55, 'rgba(156, 82, 219, 0.75)'); // Singularity boundary purple
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(cx, cy, 150, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const px = cx + Math.cos(p.angle) * p.radius;
          const py = cy + Math.sin(p.angle) * p.radius;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();

          // Centripetal acceleration physics
          const rRatio = Math.max(0.08, p.radius / 380);
          p.angle += p.speed / rRatio;
          p.radius += p.radialSpeed;

          if (p.radius < 32) {
            p.radius = 450 + Math.random() * 300;
            p.angle = Math.random() * Math.PI * 2;
          }
        }
        ctx.globalAlpha = 1.0;
      } else if (charId === 'char-rex') {
        // Kinetic strike impact debris
        ctx.fillStyle = 'rgba(10, 5, 2, 0.2)';
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.alpha;

          if (p.isRubble) {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            // Draw faceted blocky rubble shapes
            ctx.moveTo(-p.size, -p.size);
            ctx.lineTo(p.size, -p.size * 0.7);
            ctx.lineTo(p.size * 0.8, p.size);
            ctx.lineTo(-p.size * 0.8, p.size * 0.8);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#222';
            ctx.stroke();
          } else {
            // Intense orange lightning sparks
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          }

          ctx.restore();

          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.angle += p.spin;
          p.alpha -= 0.012;

          if (p.alpha <= 0) {
            p.x = cx + (Math.random() - 0.5) * 80;
            p.y = cy + (Math.random() - 0.5) * 80;
            p.vx = (Math.random() - 0.5) * (10 + Math.random() * 25);
            p.vy = (Math.random() - 0.5) * (10 + Math.random() * 25) - 6;
            p.alpha = 1.0;
          }
        }
        ctx.globalAlpha = 1.0;
      } else if (charId === 'char-doctor') {
        // Growth of biological vines, roots and spores
        ctx.fillStyle = 'rgba(6, 12, 8, 0.06)';
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
          const v = particles[i];
          if (v.done) {
            // Completed biological network pathing
            ctx.beginPath();
            ctx.moveTo(v.points[0].x, v.points[0].y);
            for (let j = 1; j < v.points.length; j++) {
              ctx.lineTo(v.points[j].x, v.points[j].y);
            }
            ctx.strokeStyle = '#1e5e3a';
            ctx.lineWidth = v.thickness;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            // Symmetrically render foliage and spores
            v.leaves.forEach((lf: any) => {
              ctx.save();
              ctx.translate(lf.x, lf.y);
              ctx.rotate(lf.rot);
              ctx.beginPath();
              ctx.ellipse(0, 0, lf.w, lf.h, 0, 0, Math.PI * 2);
              ctx.fillStyle = lf.color;
              ctx.fill();
              ctx.restore();
            });

            // Draw blooming nature flowers
            v.flowers.forEach((fl: any) => {
              ctx.beginPath();
              ctx.arc(fl.x, fl.y, fl.size, 0, Math.PI * 2);
              ctx.fillStyle = '#ff8fa3';
              ctx.fill();
              ctx.beginPath();
              ctx.arc(fl.x, fl.y, fl.size * 0.4, 0, Math.PI * 2);
              ctx.fillStyle = '#ffe3e8';
              ctx.fill();
            });
            continue;
          }

          // Growing new segments
          const last = v.points[v.points.length - 1];
          const toCenter = Math.atan2(cy - last.y, cx - last.x);
          v.angle = v.angle * 0.84 + toCenter * 0.16 + (Math.random() - 0.5) * 0.38;

          const nxtX = last.x + Math.cos(v.angle) * v.speed;
          const nxtY = last.y + Math.sin(v.angle) * v.speed;

          v.points.push({ x: nxtX, y: nxtY });
          v.thickness *= 0.985;

          // Growing leaves
          if (Math.random() < 0.4) {
            v.leaves.push({
              x: nxtX,
              y: nxtY,
              rot: v.angle + (Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2),
              w: 8 + Math.random() * 6,
              h: 14 + Math.random() * 10,
              color: Math.random() > 0.4 ? '#40916c' : '#74c69d',
            });
          }

          // Growing flower buds
          if (Math.random() < 0.08) {
            v.flowers.push({
              x: nxtX,
              y: nxtY,
              size: 5 + Math.random() * 9,
            });
          }

          ctx.beginPath();
          ctx.moveTo(last.x, last.y);
          ctx.lineTo(nxtX, nxtY);
          ctx.strokeStyle = '#1b4332';
          ctx.lineWidth = v.thickness + 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(last.x, last.y);
          ctx.lineTo(nxtX, nxtY);
          ctx.strokeStyle = '#40916c';
          ctx.lineWidth = v.thickness;
          ctx.stroke();

          if (v.thickness < 1.5 || v.points.length > 170) {
            v.done = true;
          }
        }
      } else if (charId === 'char-gatekeeper') {
        // Sizzling kitchen food and glowing pan debris
        ctx.fillStyle = 'rgba(12, 8, 4, 0.18)';
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.alpha;

          if (p.type === 'egg') {
            // Egg whites
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            // Creamy yolk
            ctx.beginPath();
            ctx.arc(-p.size * 0.15, -p.size * 0.15, p.size * 0.44, 0, Math.PI * 2);
            ctx.fillStyle = '#ffb703';
            ctx.fill();
          } else if (p.type === 'pancake') {
            // Hot Pancake
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.72, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#e5989b';
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = '#b5828c';
            ctx.stroke();
            // Golden melting butter squares
            ctx.fillStyle = '#ffe5ec';
            ctx.fillRect(-p.size * 0.3, -p.size * 0.3, p.size * 0.4, p.size * 0.4);
          } else if (p.type === 'butter') {
            // Sliding cubes of butter
            ctx.fillStyle = '#ffee32';
            ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#ffd60a';
            ctx.stroke();
          } else {
            // Pan cookfire sparks
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#fb8500';
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          ctx.restore();

          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.angle += p.spin;
          p.alpha -= 0.013;

          if (p.alpha <= 0) {
            p.x = cx + (Math.random() - 0.5) * 80;
            p.y = cy + 40;
            p.vx = (Math.random() - 0.5) * 22;
            p.vy = -18 - Math.random() * 18;
            p.alpha = 1.0;
          }
        }
        ctx.globalAlpha = 1.0;
      } else if (charId === 'char-toro') {
        // Space realignment portal warp
        ctx.fillStyle = 'rgba(2, 2, 8, 0.22)';
        ctx.fillRect(0, 0, W, H);

        // Orbiting coordinate grid system
        ctx.strokeStyle = 'rgba(0, 180, 216, 0.05)';
        ctx.lineWidth = 1;
        for (let j = 1; j < 8; j++) {
          ctx.beginPath();
          ctx.arc(cx, cy, j * 75, 0, Math.PI * 2);
          ctx.stroke();
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const px = cx + Math.cos(p.angle) * p.radius;
          const py = cy + Math.sin(p.angle) * p.radius;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();

          p.angle += p.speed;
          p.radius += p.radialSpeed;

          if (p.radius > 600) {
            p.radius = 15 + Math.random() * 60;
            p.angle = Math.random() * Math.PI * 2;
          }
        }
        ctx.globalAlpha = 1.0;
      } else if (charId === 'char-robby') {
        // Psychic waves of betrayal
        ctx.fillStyle = 'rgba(6, 2, 12, 0.18)';
        ctx.fillRect(0, 0, W, H);

        // Circular mental ripple ring
        ctx.strokeStyle = '#b050c0';
        for (let j = 0; j < 5; j++) {
          const rad = ((frame * 3.5 + j * 110) % 500);
          const o = Math.max(0, 1 - rad / 500) * 0.4;
          ctx.beginPath();
          ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.lineWidth = 1.5 + j;
          ctx.globalAlpha = o;
          ctx.stroke();
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 + Math.sin(frame * p.pulseSpeed) * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) {
            p.x = Math.random() * W;
            p.y = Math.random() * H;
          }
        }
        ctx.globalAlpha = 1.0;
      } else if (charId === 'char-bloodborne') {
        // Gothic crown crystals & ruby shatter fragments
        ctx.fillStyle = 'rgba(12, 1, 3, 0.2)';
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.opacity;

          // Ruby glass diamond cuts
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.2);
          ctx.lineTo(p.size * 0.8, -p.size * 0.2);
          ctx.lineTo(p.size * 0.5, p.size * 0.8);
          ctx.lineTo(-p.size * 0.5, p.size * 0.8);
          ctx.lineTo(-p.size * 0.8, -p.size * 0.2);
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.fill();

          ctx.lineWidth = 1;
          ctx.strokeStyle = '#ef233c';
          ctx.stroke();

          ctx.restore();

          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.angle += p.spin;

          if (p.y > H + 50 || p.x < -50 || p.x > W + 50) {
            p.x = cx + (Math.random() - 0.5) * 60;
            p.y = cy + (Math.random() - 0.5) * 60;
            p.vx = (Math.random() - 0.5) * 14;
            p.vy = (Math.random() - 0.5) * 14 - 4;
          }
        }
        ctx.globalAlpha = 1.0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, charId]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          id="char-transition"
          className="fixed inset-0 z-[999] bg-black pointer-events-none select-none flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          {/* Master high-performance canvas engine */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* ── 1. SOLAR FLARES / BLINDING LIGHT (Raavos, Crius) ── */}
          {(charId === 'char-raavos' || charId === 'char-crius') && (
            <motion.div className="absolute inset-0 flex items-center justify-center">
              {/* Blinding shockwave background flash */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 1, 0] }}
                transition={{ duration: 1.8, times: [0, 0.55, 1], ease: 'easeInOut' }}
              />

              {/* Stellar center lightburst core */}
              <motion.div
                className="absolute w-[360px] h-[360px] rounded-full bg-white blur-2xl"
                style={{
                  boxShadow: `0 0 150px 75px ${charId === 'char-raavos' ? '#ff9f1c' : '#88bbee'}, 0 0 250px 125px #ffffff`,
                }}
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: [0.1, 4.5, 7.5], opacity: [1, 0.9, 0] }}
                transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Sonic light ring expanders */}
              <motion.div
                className="absolute w-[600px] h-[600px] rounded-full border-[10px] border-white/40"
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 3.8, opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute w-[400px] h-[400px] rounded-full border-[5px] border-amber-300/30"
                initial={{ scale: 0.1, opacity: 0.8 }}
                animate={{ scale: 5.2, opacity: 0 }}
                transition={{ duration: 1.7, ease: 'easeOut', delay: 0.12 }}
              />
            </motion.div>
          )}

          {/* ── 2. SOREIGN'S DIMENSIONAL CHROME CUTS (Soreign) ── */}
          {charId === 'char-soreign' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              {/* Slash 1: Diagonal Right */}
              <motion.div
                className="absolute h-[3px] bg-white z-[50] rotate-[-22deg]"
                style={{
                  width: '160vw',
                  boxShadow: '0 0 30px 8px #ffffff, 0 0 15px 4px #b0b8c8',
                  top: '35%',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1.1, 1.1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.8, times: [0, 0.12, 0.75, 1], ease: 'easeInOut' }}
              />
              {/* Slash 2: Counter Diagonal Crimson */}
              <motion.div
                className="absolute h-[3.5px] bg-[#ef233c] z-[51] rotate-[15deg]"
                style={{
                  width: '160vw',
                  boxShadow: '0 0 40px 10px #ff4d4d',
                  top: '52%',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1.1, 1.1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.9, times: [0, 0.1, 0.78, 1], ease: 'easeInOut', delay: 0.08 }}
              />
              {/* Slash 3: Core Blue Razor Line */}
              <motion.div
                className="absolute h-[4px] bg-[#00b4d8] z-[52] rotate-[-22deg]"
                style={{
                  width: '160vw',
                  boxShadow: '0 0 45px 12px #90e0ef, 0 0 20px 5px #00b4d8',
                  top: '65%',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1.1, 1.1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.0, times: [0, 0.08, 0.82, 1], ease: 'easeInOut', delay: 0.15 }}
              />

              {/* Shaking Sliding Split Screen Layers */}
              <motion.div
                className="absolute inset-0 bg-zinc-950 flex items-center justify-center select-none pointer-events-none"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 46%, 0 76%)',
                }}
                initial={{ x: 0, y: 0 }}
                animate={{ x: -240, y: -240, opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="font-decorative text-gold/25 text-5xl tracking-widest uppercase">DIMENSIONAL FRACTURE</div>
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-zinc-950 flex items-center justify-center select-none pointer-events-none"
                style={{
                  clipPath: 'polygon(0 76%, 100% 46%, 100% 100%, 0 100%)',
                }}
                initial={{ x: 0, y: 0 }}
                animate={{ x: 240, y: 240, opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="font-decorative text-gold/25 text-5xl tracking-widest uppercase">DIMENSIONAL FRACTURE</div>
              </motion.div>
            </div>
          )}

          {/* ── 3. FIRE BURSTS (Rega) ── */}
          {charId === 'char-rega' && (
            <motion.div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[140px] h-[140px] rounded-full bg-[#ff4d4d] blur-3xl opacity-75"
                animate={{ scale: [1, 6.5, 13], opacity: [0.75, 0.9, 0] }}
                transition={{ duration: 2.0, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute w-[60px] h-[60px] rounded-full bg-white blur-xl"
                style={{ boxShadow: '0 0 90px 45px #fb8500' }}
                animate={{ scale: [0.5, 4.5, 1], opacity: [1, 0.85, 0] }}
                transition={{ duration: 1.7 }}
              />
            </motion.div>
          )}

          {/* ── 4. GRAVITY BLACK HOLE CORE (Daren, Munchkin) ── */}
          {(charId === 'char-daren' || charId === 'char-munchkin') && (
            <motion.div className="absolute inset-0 flex items-center justify-center">
              {/* Orbit distortion lens circles */}
              <motion.div
                className="absolute w-[240px] h-[240px] rounded-full border border-[#9c52db]/40"
                initial={{ scale: 0.4, opacity: 0.9 }}
                animate={{ scale: 4.8, opacity: 0, rotate: -240 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                style={{
                  background: 'radial-gradient(circle, transparent 35%, rgba(156, 82, 219, 0.22) 100%)',
                  boxShadow: 'inset 0 0 100px rgba(156,82,219,0.5)',
                }}
              />
              
              {/* Sucking Void center */}
              <motion.div
                className="absolute w-[180px] h-[180px] rounded-full bg-black border border-purple-500/35 shadow-[0_0_80px_rgba(156,82,219,0.7)]"
                initial={{ scale: 0.05 }}
                animate={{ scale: [0.05, 1.9, 0] }}
                transition={{ duration: 1.9, times: [0, 0.72, 1], ease: 'easeInOut' }}
              />

              {/* Singularity flash bang */}
              <motion.div
                className="absolute w-[40px] h-[40px] rounded-full bg-white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 0, 110], opacity: [0, 1, 0] }}
                transition={{ duration: 2.0, times: [0, 0.75, 1], ease: 'easeInOut' }}
              />
            </motion.div>
          )}

          {/* ── 5. KINETIC COMBAT SPEED IMPACT (Rex) ── */}
          {charId === 'char-rex' && (
            <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
              {/* Comic speedlines */}
              <div className="absolute inset-x-0 h-full flex flex-col justify-around opacity-60 pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-[2.5px] bg-gradient-to-r from-transparent via-[#ff9f1c] to-transparent w-full"
                    initial={{ scaleX: 0, x: i % 2 === 0 ? '-100%' : '100%' }}
                    animate={{ scaleX: [0, 2.0, 0], x: i % 2 === 0 ? '120%' : '-120%' }}
                    transition={{
                      duration: 0.55,
                      repeat: 3,
                      delay: i * 0.04,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Dynamic chromatic smash logo text */}
              <motion.div
                className="absolute font-decorative text-9xl font-black text-[#e07030]/30 select-none text-center tracking-tighter"
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: [0.1, 2.8, 0.9, 6], opacity: [0, 0.9, 1, 0] }}
                transition={{ duration: 1.7, times: [0, 0.3, 0.6, 1], ease: 'easeOut' }}
              >
                👊 BOOM!
              </motion.div>

              {/* Glass shatter overlay */}
              <motion.div
                className="absolute inset-0 bg-transparent pointer-events-none"
                animate={{
                  backdropFilter: ['blur(15px)', 'blur(5px)', 'blur(0px)'],
                  backgroundColor: ['rgba(255,159,28,0.22)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0)'],
                }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
              />

              {/* Expanding chromatic ring shockwaves */}
              <motion.div
                className="w-[100px] h-[100px] rounded-full border-[5px] border-[#e07030]"
                style={{ boxShadow: '0 0 70px #e07030, inset 0 0 30px #e07030' }}
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: 15, opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              />
              <motion.div
                className="w-[70px] h-[70px] rounded-full border-[3px] border-[#f5cb5c]"
                style={{ boxShadow: '0 0 50px #ffb703' }}
                initial={{ scale: 0.1, opacity: 0.95 }}
                animate={{ scale: 11, opacity: 0 }}
                transition={{ duration: 1.25, ease: 'easeOut', delay: 0.08 }}
              />
            </motion.div>
          )}

          {/* ── 6. GROWING FOREST NATURE COCOON (Doctor) ── */}
          {charId === 'char-doctor' && (
            <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <motion.div
                className="absolute inset-0 bg-emerald-950/25 mix-blend-color-burn"
                animate={{ opacity: [0, 0.5, 0.9, 0] }}
                transition={{ duration: 2.1, times: [0, 0.35, 0.72, 1] }}
              />

              <motion.div
                className="relative w-96 h-96 rounded-full border border-emerald-500/25 flex items-center justify-center"
                initial={{ scale: 0.1, rotate: -30, opacity: 0 }}
                animate={{
                  scale: [0.1, 1.25, 1.0, 3.8],
                  rotate: [-30, 0, 10, 45],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 2.1, ease: 'easeInOut' }}
                style={{
                  background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(4,120,87,0.08) 50%, transparent 100%)',
                  boxShadow: '0 0 140px rgba(16,185,129,0.45), inset 0 0 70px rgba(16,185,129,0.2)',
                }}
              >
                <div className="absolute w-80 h-80 rounded-full border border-dashed border-emerald-400/40 animate-spin" style={{ animationDuration: '11s' }} />
                <div className="absolute w-72 h-72 rounded-full border border-emerald-500/20 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
                
                <motion.div
                  className="font-cinzel text-xs tracking-[0.6em] text-emerald-400 uppercase select-none opacity-90"
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  LIFE FORCE REBIRTH
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* ── 7. FRYING PAN SLAM IMPACT (Gatekeeper) ── */}
          {charId === 'char-gatekeeper' && (
            <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <motion.div
                className="relative flex flex-col items-center justify-center"
                initial={{ 
                  rotate: -120, 
                  scale: 0.05, 
                  x: typeof window !== 'undefined' ? -window.innerWidth : -1200, 
                  y: typeof window !== 'undefined' ? -window.innerHeight : -800, 
                  opacity: 0 
                }}
                animate={{
                  rotate: [ -120, 0, 10, 360 ],
                  scale: [ 0.05, 1.6, 1.5, 3.8 ],
                  x: [ 
                    typeof window !== 'undefined' ? -window.innerWidth : -1200, 
                    0, 
                    0, 
                    typeof window !== 'undefined' ? window.innerWidth : 1200 
                  ],
                  y: [ 
                    typeof window !== 'undefined' ? -window.innerHeight : -800, 
                    0, 
                    -20, 
                    typeof window !== 'undefined' ? window.innerHeight : 800 
                  ],
                  opacity: [ 0, 1, 1, 0 ],
                }}
                transition={{
                  duration: 2.1,
                  times: [0, 0.42, 0.62, 1],
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Visual Cast Iron Frying Pan outline */}
                <div className="relative w-80 h-80 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black rounded-full border-[10px] border-zinc-700 shadow-[0_0_100px_rgba(251,133,0,0.5)] flex items-center justify-center">
                  <div className="absolute w-64 h-64 rounded-full border-4 border-dashed border-red-500/40 animate-spin" style={{ animationDuration: '9s' }} />
                  <div className="absolute w-44 h-44 rounded-full border-2 border-red-500/25" />
                  
                  {/* Glowing core logo label */}
                  <div className="text-zinc-500 font-cinzel text-xs tracking-[0.4em] uppercase select-none opacity-60 z-10">THE COOKING KING</div>
                  <div className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-red-600/40 via-orange-600/30 to-amber-600/20 blur-2xl" />
                  
                  {/* Frying Pan Cast Handle */}
                  <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-12 h-64 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 rounded-b-xl border-x-4 border-zinc-600 flex items-center justify-center shadow-2xl">
                    <div className="w-5 h-5 rounded-full bg-black/80 border border-zinc-700 mt-auto mb-6" />
                  </div>
                </div>

                {/* Blazing "CLANG!" Text burst */}
                <motion.div
                  className="absolute z-50 font-decorative text-gold text-8xl font-black filter drop-shadow-[0_0_40px_rgba(242,197,90,0.9)] tracking-widest text-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 0, 2.1, 1.2, 0],
                    opacity: [0, 0, 1, 1, 0],
                    rotate: [0, 0, -15, -15, -25],
                  }}
                  transition={{
                    duration: 2.1,
                    times: [0, 0.41, 0.45, 0.72, 1],
                  }}
                >
                  CLANG!
                  <span className="block text-2xl font-cinzel tracking-[0.2em] text-orange-500 mt-3 font-semibold">THE S.S. CHEF ARRIVES</span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* ── 8. PORTAL WORMHOLE REALIGNMENT (Toro) ── */}
          {charId === 'char-toro' && (
            <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <motion.div
                className="relative flex items-center justify-center"
                initial={{ scale: 0.1, rotate: 0, opacity: 0 }}
                animate={{
                  scale: [0.1, 1.35, 1.15, 4.8],
                  rotate: [0, 190, 260, 720],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 2.1, times: [0, 0.4, 0.7, 1], ease: 'easeInOut' }}
              >
                {/* Spatial Cyan containment field */}
                <div 
                  className="w-96 h-96 rounded-full border-4 border-[#00b4d8] shadow-[0_0_60px_rgba(0,180,216,0.75)] flex items-center justify-center"
                >
                  {/* Golden rotating grid rings */}
                  <div className="w-80 h-80 rounded-full border-2 border-[#f4a261] border-dashed animate-spin flex items-center justify-center" style={{ animationDuration: '5s' }}>
                    {/* Dark deep coordinate backdrop core */}
                    <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-950 via-zinc-950 to-amber-950 border border-white/20 flex items-center justify-center shadow-[inset_0_0_50px_rgba(244,162,97,0.5)]">
                      <motion.div 
                        className="font-mono text-xs tracking-[0.5em] text-white/90 uppercase text-center"
                        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 1.4 }}
                      >
                        PORTAL ACTIVE<br/>
                        <span className="text-[#00b4d8] text-[10px] tracking-wider mt-1 block">REALIGNING SPACE-TIME</span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanding space coordinate warp lines */}
                <motion.div
                  className="absolute w-[520px] h-[520px] rounded-full border-2 border-dashed border-[#00b4d8]/50"
                  animate={{ scale: [0.5, 1.7], opacity: [0.85, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute w-[360px] h-[360px] rounded-full border-2 border-dotted border-[#f4a261]/50"
                  animate={{ scale: [0.5, 1.9], opacity: [0.85, 0] }}
                  transition={{ duration: 1.7, repeat: Infinity, delay: 0.25 }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* ── 9. BETRAYAL PURPLE MIND EYE (Robby) ── */}
          {charId === 'char-robby' && (
            <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <motion.div
                className="relative flex items-center justify-center"
                initial={{ scale: 0.15, opacity: 0 }}
                animate={{
                  scale: [0.15, 1.45, 1.25, 5.2],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 2.1, times: [0, 0.35, 0.75, 1], ease: 'easeInOut' }}
              >
                {/* Mind Eye Socket frame */}
                <div className="relative w-80 h-48 bg-black rounded-[50%] border-4 border-[#b050c0] flex items-center justify-center overflow-hidden shadow-[0_0_90px_rgba(176,80,192,0.85)]">
                  {/* Glowing psychic pink/violet iris */}
                  <motion.div 
                    className="w-40 h-40 rounded-full bg-gradient-to-r from-[#b050c0] via-[#ff007f] to-[#501080] flex items-center justify-center shadow-[0_0_40px_#ff007f]"
                    animate={{ scale: [0.9, 1.2, 0.95, 1.45], rotate: 360 }}
                    transition={{ duration: 2.1, ease: 'easeInOut' }}
                  >
                    {/* Dilating void pupil */}
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-black flex items-center justify-center relative"
                      animate={{ scale: [1, 0.5, 1.6, 0.05] }}
                      transition={{ duration: 2.1, ease: 'easeInOut' }}
                    >
                      <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_20px_#ff007f]" />
                    </motion.div>
                  </motion.div>

                  {/* Eyelids */}
                  <div className="absolute inset-0 border-y-[12px] border-black/50" />
                </div>

                {/* Orbiting geometric telepathy runic path */}
                <motion.div 
                  className="absolute w-[420px] h-[420px] rounded-full border-[3px] border-dashed border-[#ff007f]/40"
                  animate={{ rotate: -360, scale: [0.85, 1.7] }}
                  transition={{ duration: 2.1, ease: 'linear' }}
                />
                
                {/* Telepathy banner */}
                <motion.div
                  className="absolute font-decorative text-white font-extrabold text-3xl tracking-[0.3em] bg-black/90 px-8 py-2.5 border-y-2 border-[#b050c0]/60 uppercase mt-72 shadow-lg"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.9, times: [0, 0.18, 0.82, 1] }}
                >
                  MIND CONTROL
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* ── 10. CROWN & sapphire/ruby GEM COLLAPSE (Blood Borne V) ── */}
          {charId === 'char-bloodborne' && (
            <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <motion.div
                className="absolute inset-0 bg-red-950/30"
                animate={{ opacity: [0, 0.8, 1, 0] }}
                transition={{ duration: 2.3, times: [0, 0.4, 0.7, 1] }}
              />

              <motion.div
                className="relative flex flex-col items-center justify-center"
                initial={{ scale: 0.15, y: 80, opacity: 0 }}
                animate={{
                  scale: [0.15, 1.05, 1.05, 16.0], // Cinematic zoom in on the central core ruby crystal
                  y: [80, 0, 0, -280],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 2.3, times: [0, 0.4, 0.7, 1], ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Spiky Dark Thorn Crown */}
                <div className="relative w-80 h-48 flex items-end justify-center mb-4">
                  <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-[0_0_25px_rgba(217,4,41,0.55)]">
                    <path 
                      d="M 10,110 L 10,55 L 42,90 L 70,25 L 100,75 L 130,25 L 158,90 L 190,55 L 190,110 Z" 
                      fill="#120c0d" 
                      stroke="#d90429" 
                      strokeWidth="3" 
                      strokeLinejoin="round" 
                    />
                    <rect x="10" y="100" width="180" height="10" fill="#2d0a0d" rx="2" />
                    {Array.from({ length: 6 }).map((_, i) => (
                      <circle key={i} cx={25 + i * 30} cy="105" r="3.5" fill="#ef233c" />
                    ))}
                  </svg>

                  {/* Centered Ruby Gem */}
                  <div className="absolute top-[45%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex items-center justify-center">
                    <motion.div
                      className="w-18 h-18 bg-gradient-to-br from-red-500 via-rose-600 to-red-950 border border-white/50 flex items-center justify-center shadow-[0_0_70px_#ef233c]"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                      }}
                      animate={{
                        scale: [0.85, 1.25, 1.0, 3.5],
                        filter: ['brightness(1)', 'brightness(1.6)', 'brightness(1.25)', 'brightness(2.8)'],
                      }}
                      transition={{ duration: 2.3, times: [0, 0.4, 0.7, 1], ease: 'easeInOut' }}
                    >
                      <div className="w-5 h-14 bg-white/35 rotate-45 blur-[1.5px] animate-pulse" />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  className="font-cinzel text-[#d90429] text-xl tracking-[0.6em] font-extrabold uppercase select-none opacity-90"
                  animate={{ opacity: [1, 1, 0] }}
                  transition={{ duration: 1.7 }}
                >
                  BLOODTHIRSTY CROWN
                </motion.div>
              </motion.div>

              {/* Red-out blinding flash overlay */}
              <motion.div
                className="absolute inset-0 bg-[#d90429]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 0] }}
                transition={{ duration: 2.3, times: [0, 0.72, 0.86, 1], ease: 'easeIn' }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
