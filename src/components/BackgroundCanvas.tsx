import { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  themePrimary: string;
  themeGlow: string;
}

export default function BackgroundCanvas({ themePrimary, themeGlow }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themePrimaryRef = useRef(themePrimary);
  const themeGlowRef = useRef(themeGlow);

  // Keep colors updated in refs to avoid restarting animation loop
  useEffect(() => {
    themePrimaryRef.current = themePrimary;
    themeGlowRef.current = themeGlow;
  }, [themePrimary, themeGlow]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Core structures
    interface Bolt {
      segs: [number, number, number, number][];
      branches: [number, number, number, number][][];
      age: number;
      life: number;
      alpha: number;
      far: boolean;
      lc: string;
      gc: string;
    }

    interface Particle {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      gold: boolean;
    }

    const bolts: Bolt[] = [];
    let bTimer = 0;
    let mTimer = 0;

    // Create particles
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.4 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.03 - Math.random() * 0.14,
      a: 0.06 + Math.random() * 0.2,
      gold: Math.random() > 0.5,
    }));

    // Slithering Snake (Wyvern) class
    class Snake {
      n: number = 0;
      pts: { x: number; y: number }[] = [];
      dir: number = 0;
      sx: number = 0;
      by: number = 0;
      t: number = 0;
      spd: number = 0;
      wA: number = 0;
      wF: number = 0;
      fA: number = 0;
      fF: number = 0;
      fO: number = 0;
      tk: number = 0;
      kind: 'green' | 'gold' = 'gold';
      dead: boolean = false;

      constructor(init: boolean) {
        this.reset(init);
      }

      reset(init: boolean) {
        this.n = 90 + Math.floor(Math.random() * 140);
        this.pts = [];
        this.dir = Math.random() > 0.5 ? 1 : -1;
        this.sx = init ? Math.random() * W : this.dir === 1 ? -80 : W + 80;
        this.by = 50 + Math.random() * (H - 100);
        this.t = init ? Math.random() * 280 : 0;
        this.spd = 0.18 + Math.random() * 0.28;
        this.wA = 18 + Math.random() * 66;
        this.wF = 0.014 + Math.random() * 0.024;
        this.fA = 6 + Math.random() * 25;
        this.fF = 0.003 + Math.random() * 0.006;
        this.fO = Math.random() * Math.PI * 2;
        this.tk = 3 + Math.random() * 6.5;
        this.kind = Math.random() > 0.32 ? 'green' : 'gold';
        this.dead = false;

        for (let i = 0; i < this.n; i++) {
          this.pts.push({ x: this.sx, y: this.by });
        }
      }

      update() {
        this.t += this.spd;
        const x = this.sx + this.dir * this.t * 1.75;
        const y = this.by + Math.sin(this.t * this.fF + this.fO) * this.fA + Math.sin(this.t * this.wF) * this.wA;
        
        this.pts.unshift({ x, y });
        if (this.pts.length > this.n) this.pts.pop();

        if (this.dir === 1 && x > W + 240) this.dead = true;
        if (this.dir === -1 && x < -240) this.dead = true;
      }

      draw(context: CanvasRenderingContext2D) {
        const n = this.pts.length;
        if (n < 3) return;

        const isGreen = this.kind === 'green';
        context.save();
        context.lineCap = 'round';
        context.lineJoin = 'round';

        // Draw body trail
        for (let i = 1; i < n; i++) {
          const f = 1 - i / n;
          const pat = Math.floor(i / 5) % 2;
          context.globalAlpha = f * 0.54;
          context.beginPath();
          context.moveTo(this.pts[i - 1].x, this.pts[i - 1].y);
          context.lineTo(this.pts[i].x, this.pts[i].y);
          context.lineWidth = Math.max(0.25, this.tk * f);
          context.strokeStyle = isGreen
            ? pat ? '#1a5530' : '#246640'
            : pat ? '#70560f' : '#9a7620';
          context.shadowColor = isGreen ? '#0a2e18' : '#c8a84b';
          context.shadowBlur = isGreen ? 5 : 9;
          context.stroke();
        }

        // Head orb
        const hp = this.pts[0];
        context.globalAlpha = 0.8;
        context.shadowBlur = 18;
        context.shadowColor = isGreen ? '#30ff80' : '#f0c060';
        context.fillStyle = isGreen ? '#30bb60' : '#cc9e30';
        context.beginPath();
        context.ellipse(hp.x, hp.y, this.tk * 1.5, this.tk * 0.9, 0, 0, Math.PI * 2);
        context.fill();

        // Forked tongue flickering
        if (Math.abs(Math.sin(this.t * 0.28)) > 0.2) {
          const tx = hp.x + this.dir * this.tk * 2;
          context.globalAlpha = 0.7;
          context.shadowColor = '#ff4040';
          context.shadowBlur = 7;
          context.strokeStyle = '#ff3030';
          context.lineWidth = 0.9;
          context.beginPath();
          context.moveTo(tx, hp.y);
          context.lineTo(tx + this.dir * 7, hp.y - 4.5);
          context.stroke();
          context.beginPath();
          context.moveTo(tx, hp.y);
          context.lineTo(tx + this.dir * 7, hp.y + 4.5);
          context.stroke();
        }

        // Glowing eyes
        context.globalAlpha = 0.9;
        context.shadowColor = '#ffee44';
        context.shadowBlur = 12;
        context.fillStyle = '#ffe840';
        context.beginPath();
        context.arc(hp.x + this.dir * this.tk * 0.6, hp.y - this.tk * 0.32, 1.6, 0, Math.PI * 2);
        context.fill();

        context.restore();
      }
    }

    interface CombatParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      alpha: number;
      decay: number;
    }

    const combatParticles: CombatParticle[] = [];

    class Knight {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      r: number = 0;
      t: number = 0;
      dead: boolean = false;
      isGeneral: boolean = false;
      isRed: boolean = false;

      constructor(isGeneral: boolean = false, isRed: boolean = false) {
        this.isGeneral = isGeneral;
        this.isRed = isRed;
        this.reset();
      }

      reset() {
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { // Top
          this.x = Math.random() * W;
          this.y = -30;
        } else if (side === 1) { // Right
          this.x = W + 30;
          this.y = Math.random() * H;
        } else if (side === 2) { // Bottom
          this.x = Math.random() * W;
          this.y = H + 30;
        } else { // Left
          this.x = -30;
          this.y = Math.random() * H;
        }

        const angle = Math.random() * Math.PI * 2;
        const speed = this.isGeneral ? (0.6 + Math.random() * 0.5) : (0.5 + Math.random() * 0.5);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.r = this.isGeneral ? (13 + Math.random() * 3.5) : (9 + Math.random() * 3.5);
        this.t = Math.random() * 1000;
        this.dead = false;
      }

      update(snakesList: Snake[], knightsList: Knight[]) {
        this.t += 1;

        // 1. Target Snake or Opposing Knight only if within sensory/engagement radius (250px)
        let minDist = 250;
        let targetX: number | null = null;
        let targetY: number | null = null;
        let hasTarget = false;

        // Scan Snakes
        for (const s of snakesList) {
          if (s.dead || s.pts.length === 0) continue;
          const head = s.pts[0];
          const dist = Math.hypot(head.x - this.x, head.y - this.y);
          if (dist < minDist) {
            minDist = dist;
            targetX = head.x;
            targetY = head.y;
            hasTarget = true;
          }
        }

        // Scan Opposing Faction Knights
        for (const other of knightsList) {
          if (other.dead || other === this) continue;
          if (this.isRed !== other.isRed) {
            const dist = Math.hypot(other.x - this.x, other.y - this.y);
            if (dist < minDist) {
              minDist = dist;
              targetX = other.x;
              targetY = other.y;
              hasTarget = true;
            }
          }
        }

        // Steering force accumulator
        let steerX = 0;
        let steerY = 0;

        if (hasTarget && targetX !== null && targetY !== null) {
          // Attack force: steer towards closest enemy target
          const dx = targetX - this.x;
          const dy = targetY - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0) {
            steerX += (dx / dist) * 0.14;
            steerY += (dy / dist) * 0.14;
          }
        } else {
          // Patrol wander: wavy sinusoidal sweeps for natural group strolling
          const wanderAngle = (this.t * 0.02) + (this.r * 10);
          steerX += Math.cos(wanderAngle) * 0.06;
          steerY += Math.sin(wanderAngle) * 0.06;
        }

        // 2. Flocking: Separation, Alignment, Cohesion with other knights
        let sepX = 0;
        let sepY = 0;
        let alignX = 0;
        let alignY = 0;
        let cohX = 0;
        let cohY = 0;
        let neighbors = 0;

        for (const other of knightsList) {
          if (other === this || other.dead) continue;
          const dist = Math.hypot(other.x - this.x, other.y - this.y);

          // Separation (Avoid colliding/crowding with ALL live knights)
          if (dist < 45) {
            const diffX = this.x - other.x;
            const diffY = this.y - other.y;
            const weight = (45 - dist) / 45;
            sepX += (dist > 0 ? (diffX / dist) : (Math.random() - 0.5)) * weight;
            sepY += (dist > 0 ? (diffY / dist) : (Math.random() - 0.5)) * weight;
          }

          // Cohesion and Alignment (Only with same-faction friendly knights)
          if (this.isRed === other.isRed) {
            if (dist < 180) {
              alignX += other.vx;
              alignY += other.vy;
              cohX += other.x;
              cohY += other.y;
              neighbors++;
            }
          }
        }

        if (neighbors > 0) {
          // Alignment (Match velocity direction)
          alignX /= neighbors;
          alignY /= neighbors;
          const speed = Math.hypot(alignX, alignY);
          if (speed > 0) {
            steerX += (alignX / speed) * 0.04;
            steerY += (alignY / speed) * 0.04;
          }

          // Cohesion (Head towards average group center)
          cohX /= neighbors;
          cohY /= neighbors;
          const toCenterX = cohX - this.x;
          const toCenterY = cohY - this.y;
          const centerDist = Math.hypot(toCenterX, toCenterY);
          if (centerDist > 0) {
            steerX += (toCenterX / centerDist) * 0.03;
            steerY += (toCenterY / centerDist) * 0.03;
          }
        }

        // Apply high priority separation force
        steerX += sepX * 0.16;
        steerY += sepY * 0.16;

        // Apply accrued steering forces to velocity
        this.vx += steerX;
        this.vy += steerY;

        // Dynamic speed limit: fast during assault, steady and leisurely during group patrol
        const velocityMagnitude = Math.hypot(this.vx, this.vy);
        const maxSpeedLimit = hasTarget ? 2.0 : 1.1;
        const minSpeedLimit = 0.4;

        if (velocityMagnitude > maxSpeedLimit) {
          this.vx = (this.vx / velocityMagnitude) * maxSpeedLimit;
          this.vy = (this.vy / velocityMagnitude) * maxSpeedLimit;
        } else if (velocityMagnitude < minSpeedLimit && velocityMagnitude > 0) {
          this.vx = (this.vx / velocityMagnitude) * minSpeedLimit;
          this.vy = (this.vy / velocityMagnitude) * minSpeedLimit;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Boundary awareness: turn away gracefully before hitting walls
        const margin = 35;
        if (this.x < margin) {
          this.x = margin;
          this.vx = Math.abs(this.vx) * 0.85;
        } else if (this.x > W - margin) {
          this.x = W - margin;
          this.vx = -Math.abs(this.vx) * 0.85;
        }

        if (this.y < margin) {
          this.y = margin;
          this.vy = Math.abs(this.vy) * 0.85;
        } else if (this.y > H - margin) {
          this.y = H - margin;
          this.vy = -Math.abs(this.vy) * 0.85;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);

        // Armor shadow
        if (this.isRed) {
          context.shadowColor = this.isGeneral ? '#ff003c' : '#ff4d4d';
        } else {
          context.shadowColor = this.isGeneral ? '#ffd700' : '#88bbee';
        }
        context.shadowBlur = this.isGeneral ? 18 : 10;

        // Draw medieval shield / crest armor body
        if (this.isRed) {
          context.fillStyle = this.isGeneral ? '#800000' : '#b33939'; // Dark blood-maroon vs ruby brick red
          context.strokeStyle = this.isGeneral ? '#ff003c' : '#ff5252'; // Vibrant glowing crimson vs glowing red highlights
        } else {
          context.fillStyle = this.isGeneral ? '#d4af37' : '#94a3b8'; // Gold vs Steel
          context.strokeStyle = this.isGeneral ? '#ffffff' : '#e2e8f0'; // Platinum highlight
        }
        context.lineWidth = this.isGeneral ? 2.5 : 1.5;

        context.beginPath();
        context.moveTo(0, -this.r);
        context.lineTo(this.r * 0.85, -this.r * 0.4);
        context.lineTo(this.r * 0.85, this.r * 0.4);
        context.lineTo(0, this.r * 1.2);
        context.lineTo(-this.r * 0.85, this.r * 0.4);
        context.lineTo(-this.r * 0.85, -this.r * 0.4);
        context.closePath();
        context.fill();
        context.stroke();

        // General's Extra Crest Aura Rings
        if (this.isGeneral) {
          context.strokeStyle = this.isRed ? 'rgba(255, 0, 60, 0.45)' : 'rgba(255, 215, 0, 0.45)';
          context.lineWidth = 1;
          context.beginPath();
          context.arc(0, 0, this.r * 1.45, 0, Math.PI * 2);
          context.stroke();
        }

        // Visor line
        context.strokeStyle = '#0f172a';
        context.lineWidth = this.isGeneral ? 3 : 2;
        context.beginPath();
        context.moveTo(-this.r * 0.5, -this.r * 0.1);
        context.lineTo(this.r * 0.5, -this.r * 0.1);
        context.stroke();

        // Helmet Plume / Crest
        context.fillStyle = this.isGeneral ? (this.isRed ? '#ff003c' : '#ffd700') : (this.isRed ? '#1e293b' : '#ef233c');
        context.beginPath();
        context.arc(0, -this.r, this.r * 0.45, Math.PI, 0);
        context.fill();

        // General crown / wing details on helm
        if (this.isGeneral) {
          context.fillStyle = '#ffffff';
          context.beginPath();
          context.moveTo(-this.r * 0.25, -this.r * 1.1);
          context.lineTo(0, -this.r * 1.5);
          context.lineTo(this.r * 0.25, -this.r * 1.1);
          context.closePath();
          context.fill();
        }

        // Draw shining weapon / lance pointing in move direction
        const angle = Math.atan2(this.vy, this.vx);
        context.rotate(angle);
        context.strokeStyle = this.isRed ? (this.isGeneral ? '#ff003c' : '#ff5252') : (this.isGeneral ? '#ffe066' : '#ffffff');
        context.lineWidth = this.isGeneral ? 3.0 : 1.8;
        context.shadowColor = this.isRed ? '#ff003c' : (this.isGeneral ? '#ffd700' : '#ffffff');
        context.shadowBlur = this.isGeneral ? 12 : 5;
        context.beginPath();
        context.moveTo(this.r * 0.5, 0);
        context.lineTo(this.r * (this.isGeneral ? 2.2 : 1.9), 0);
        context.stroke();

        context.restore();
      }
    }

    const snakes: Snake[] = Array.from({ length: 8 }, () => new Snake(true));
    const knights: Knight[] = [
      // Regular knights: 8 Blue, 8 Red
      ...Array.from({ length: 8 }, () => new Knight(false, false)),
      ...Array.from({ length: 8 }, () => new Knight(false, true)),
      // General knights: 2 Blue, 2 Red
      ...Array.from({ length: 2 }, () => new Knight(true, false)),
      ...Array.from({ length: 2 }, () => new Knight(true, true))
    ];
    let knightSpawnCooldown = 0;

    function buildBolt(x: number, intensity: number, far: boolean): Bolt {
      const b: Bolt = {
        segs: [],
        branches: [],
        age: 0,
        life: 9 + Math.random() * 15,
        alpha: far ? intensity * 0.26 : intensity * 0.62,
        far,
        lc: themePrimaryRef.current,
        gc: themeGlowRef.current,
      };

      let cx = x;
      let cy = 0;
      const ey = H * (0.2 + Math.random() * 0.58);

      while (cy < ey) {
        const nx = cx + (Math.random() - 0.5) * (far ? 55 : 95);
        const ny = cy + 12 + Math.random() * 20;
        b.segs.push([cx, cy, nx, ny]);

        if (!far && Math.random() < 0.24) {
          const br: [number, number, number, number][] = [];
          let bx = nx;
          let by = ny;
          for (let k = 0; k < 2 + Math.floor(Math.random() * 4); k++) {
            const bnx = bx + (Math.random() - 0.5) * 50;
            const bny = by + 13 + Math.random() * 17;
            br.push([bx, by, bnx, bny]);
            bx = bnx;
            by = bny;
          }
          b.branches.push(br);
        }
        cx = nx;
        cy = ny;
      }
      return b;
    }

    function drawBolt(b: Bolt) {
      const a = Math.max(0, b.alpha * (1 - Math.pow(b.age / b.life, 0.65)));
      if (a < 0.004) return;

      ctx.save();
      ctx.lineCap = 'round';
      
      // Shadow / glow path
      ctx.globalAlpha = a * 0.36;
      ctx.strokeStyle = b.gc;
      ctx.lineWidth = b.far ? 2 : 6;
      ctx.shadowColor = b.gc;
      ctx.shadowBlur = b.far ? 10 : 26;
      ctx.beginPath();
      for (const [x1, y1, x2, y2] of b.segs) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();

      // Main core bolt
      ctx.globalAlpha = a;
      ctx.strokeStyle = b.far ? b.lc : '#e8f4ff';
      ctx.lineWidth = b.far ? 0.7 : 1.7;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      for (const [x1, y1, x2, y2] of b.segs) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();

      // Sub-branches
      if (!b.far) {
        ctx.globalAlpha = a * 0.32;
        ctx.strokeStyle = b.lc;
        ctx.lineWidth = 0.65;
        ctx.shadowColor = b.gc;
        ctx.shadowBlur = 7;
        for (const br of b.branches) {
          ctx.beginPath();
          for (const [x1, y1, x2, y2] of br) {
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw floating particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -8) {
          p.y = H + 8;
          p.x = Math.random() * W;
        }

        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(((p.x % W) + W) % W, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? '#c8a84b' : '#88bbee';
        ctx.shadowColor = p.gold ? '#f2c55a' : '#aaddff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // Update & Draw slithering wyverns
      for (let i = snakes.length - 1; i >= 0; i--) {
        const s = snakes[i];
        s.update();
        s.draw(ctx);
        if (s.dead) {
          snakes.splice(i, 1);
          snakes.push(new Snake(false));
        }
      }

      // Spawn Knights if we have less than required, with a cooldown
      const numRegulars = knights.filter(k => !k.isGeneral).length;
      const numGenerals = knights.filter(k => k.isGeneral).length;

      if (numRegulars < 16 || numGenerals < 4) {
        if (knightSpawnCooldown <= 0) {
          if (numGenerals < 4) {
            // Spawn a General, maintaining 50/50 red ratio
            const currentRedGenerals = knights.filter(k => k.isGeneral && k.isRed).length;
            const currentNormalGenerals = knights.filter(k => k.isGeneral && !k.isRed).length;
            const spawnRed = currentRedGenerals < currentNormalGenerals ? true : (currentRedGenerals > currentNormalGenerals ? false : Math.random() < 0.5);
            knights.push(new Knight(true, spawnRed));
          } else {
            // Spawn a Regular, maintaining 50/50 red ratio
            const currentRedRegulars = knights.filter(k => !k.isGeneral && k.isRed).length;
            const currentNormalRegulars = knights.filter(k => !k.isGeneral && !k.isRed).length;
            const spawnRed = currentRedRegulars < currentNormalRegulars ? true : (currentRedRegulars > currentNormalRegulars ? false : Math.random() < 0.5);
            knights.push(new Knight(false, spawnRed));
          }
          knightSpawnCooldown = 60; // spawn cooldown in frames (~1s)
        } else {
          knightSpawnCooldown--;
        }
      }

      // Update & Draw Knights & Handle Interactions
      for (let i = knights.length - 1; i >= 0; i--) {
        const k = knights[i];
        k.update(snakes, knights);
        k.draw(ctx);

        // Knight-vs-Knight Combat (Only between opposing factions)
        for (let j = i - 1; j >= 0; j--) {
          const other = knights[j];
          if (other.dead || k.isRed === other.isRed) continue;

          const dist = Math.hypot(k.x - other.x, k.y - other.y);
          if (dist < k.r + other.r + 3) {
            // Opposing knights collide!
            let kWinChance = 0.50;
            if (k.isGeneral && !other.isGeneral) {
              kWinChance = 0.80; // General beats regular
            } else if (!k.isGeneral && other.isGeneral) {
              kWinChance = 0.20; // Regular loses to general
            }

            const roll = Math.random();
            if (roll < kWinChance) {
              other.dead = true;
              
              // Spawn gorgeous explosion of other's faction particles
              const otherColor = other.isRed ? '#ff3b30' : (other.isGeneral ? '#ffd700' : '#88bbee');
              const pCount = (other.isGeneral ? 40 : 25) + Math.floor(Math.random() * 15);
              for (let p = 0; p < pCount; p++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1.5 + Math.random() * 3.5;
                combatParticles.push({
                  x: other.x,
                  y: other.y,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  r: 1 + Math.random() * (other.isGeneral ? 3.5 : 2),
                  color: otherColor,
                  alpha: 1,
                  decay: 0.012 + Math.random() * 0.018
                });
              }
            } else {
              k.dead = true;
              
              // Spawn gorgeous explosion of k's faction particles
              const kColor = k.isRed ? '#ff3b30' : (k.isGeneral ? '#ffd700' : '#88bbee');
              const pCount = (k.isGeneral ? 40 : 25) + Math.floor(Math.random() * 15);
              for (let p = 0; p < pCount; p++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1.5 + Math.random() * 3.5;
                combatParticles.push({
                  x: k.x,
                  y: k.y,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  r: 1 + Math.random() * (k.isGeneral ? 3.5 : 2),
                  color: kColor,
                  alpha: 1,
                  decay: 0.012 + Math.random() * 0.018
                });
              }
            }
            break; // Stop checking other knights for k since k or other died
          }
        }

        if (k.dead) {
          knights.splice(i, 1);
          continue; // skip snake collision check if already dead
        }

        // Check collision with snakes
        for (const s of snakes) {
          if (s.dead || s.pts.length === 0) continue;
          
          // Check collision with the snake's head
          const head = s.pts[0];
          const dist = Math.hypot(k.x - head.x, k.y - head.y);
          if (dist < k.r + s.tk + 12) {
            // Collision! Generals have 50/50 win/loss. Regulars have 20/80 win/loss.
            const winChance = k.isGeneral ? 0.50 : 0.20;
            const roll = Math.random();
            if (roll < winChance) {
              // Knight kills the snake
              s.dead = true;
              
              // Spawn gorgeous explosion of green/gold/red particles based on snake/knight
              const isGreen = s.kind === 'green';
              const pColor = k.isRed ? '#ff3b30' : (k.isGeneral ? '#ffd700' : (isGreen ? '#30ff80' : '#f0c060'));
              const pCount = (k.isGeneral ? 50 : 30) + Math.floor(Math.random() * 20);
              for (let p = 0; p < pCount; p++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = (k.isGeneral ? 2.5 : 1.5) + Math.random() * 3.5;
                combatParticles.push({
                  x: head.x,
                  y: head.y,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  r: 1 + Math.random() * (k.isGeneral ? 4 : 2.5),
                  color: pColor,
                  alpha: 1,
                  decay: 0.008 + Math.random() * 0.015
                });
              }
            } else {
              // Knight gets eaten by snake
              k.dead = true;
              
              // Spawn blood (crimson) and steel/shield debris particles (Generals/Red have different debris!)
              const pCount = (k.isGeneral ? 40 : 25) + Math.floor(Math.random() * 15);
              const armorColor = k.isRed ? '#ff3b30' : (k.isGeneral ? '#ffd700' : '#94a3b8');
              for (let p = 0; p < pCount; p++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1 + Math.random() * 3;
                combatParticles.push({
                  x: k.x,
                  y: k.y,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  r: 1 + Math.random() * (k.isGeneral ? 3.5 : 2),
                  color: Math.random() > 0.4 ? '#ef233c' : armorColor,
                  alpha: 1,
                  decay: 0.015 + Math.random() * 0.02
                });
              }
              
              // Snake gets temporarily thicker and faster to show it fed
              s.tk = Math.min(16, s.tk + (k.isGeneral ? 3.0 : 1.5));
              s.spd = Math.min(0.85, s.spd + (k.isGeneral ? 0.12 : 0.06));
            }
            break; // Stop checking other snakes for this knight
          }
        }

        if (k.dead) {
          knights.splice(i, 1);
        }
      }

      // Update & Draw Combat Particles
      for (let i = combatParticles.length - 1; i >= 0; i--) {
        const cp = combatParticles[i];
        cp.x += cp.vx;
        cp.y += cp.vy;
        cp.alpha -= cp.decay;
        if (cp.alpha <= 0) {
          combatParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = cp.alpha;
        ctx.fillStyle = cp.color;
        ctx.shadowColor = cp.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, cp.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Spontaneous Lightning
      bTimer++;
      if (bTimer > 50 + Math.random() * 80) {
        bTimer = 0;
        const intensity = 0.3 + Math.random() * 0.45;
        bolts.push(buildBolt(W * (0.05 + Math.random() * 0.9), intensity, false));
        if (Math.random() > 0.5) {
          bolts.push(buildBolt(W * (0.1 + Math.random() * 0.8), intensity * 0.5, true));
        }
      }

      mTimer++;
      if (mTimer > 280 + Math.random() * 380) {
        mTimer = 0;
        const mx = W * (0.15 + Math.random() * 0.7);
        bolts.push(buildBolt(mx, 1.0, false));
        bolts.push(buildBolt(mx + (Math.random() - 0.5) * 130, 0.75, false));
        if (Math.random() > 0.4) {
          bolts.push(buildBolt(mx + (Math.random() - 0.5) * 240, 0.5, true));
        }
      }

      // Draw active lightning bolts
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        drawBolt(b);
        b.age++;
        if (b.age > b.life) bolts.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
