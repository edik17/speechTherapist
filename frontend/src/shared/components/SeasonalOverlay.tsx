import React, { useEffect, useRef } from 'react';
import './SeasonalOverlay.scss';

export type SeasonType = 'autumn' | 'winter' | 'spring' | 'summer' | 'off';

/**
 * Rileva automaticamente la stagione corrente in base al mese del calendario.
 */
export function getCurrentSeason(): Exclude<SeasonType, 'off'> {
  const month = new Date().getMonth(); // 0 = Gennaio, 10 = Novembre
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  spin: number;
  swayAmp: number;
  swaySpeed: number;
  phase: number;
  flip: number;
  flipSpeed: number;
  alpha: number;
  color: string;
  variant: number;
}

const SEASON_PALETTES: Record<Exclude<SeasonType, 'off'>, string[]> = {
  autumn: ['#D46A4E', '#E07A5F', '#D97706', '#B45309', '#C2410C', '#9A3412'],
  winter: ['#FFFFFF', '#E0F2FE', '#BAE6FD', '#F0F9FF'],
  spring: ['#FBCFE8', '#F9A8D4', '#E9D5FF', '#FDBA74', '#FDA4AF'],
  summer: ['#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B'],
};

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function createParticle(
  season: Exclude<SeasonType, 'off'>,
  width: number,
  height: number,
  randomY: boolean
): Particle {
  const palette = SEASON_PALETTES[season];
  const color = palette[Math.floor(Math.random() * palette.length)];

  const isSummer = season === 'summer';
  const isWinter = season === 'winter';

  const size = isWinter
    ? randomBetween(4, 8.5)
    : isSummer
    ? randomBetween(3.5, 7.5)
    : randomBetween(5.5, 10);

  const vy = isSummer
    ? randomBetween(-0.18, 0.16)
    : isWinter
    ? randomBetween(0.38, 0.9)
    : randomBetween(0.42, 0.95);

  const vx = isSummer
    ? randomBetween(-0.2, 0.2)
    : randomBetween(-0.18, 0.22);

  return {
    x: randomBetween(0, width),
    y: randomY ? randomBetween(-20, height + 20) : randomBetween(-40, -10),
    vx,
    vy,
    size,
    angle: randomBetween(0, Math.PI * 2),
    spin: randomBetween(-0.014, 0.014),
    swayAmp: isSummer ? randomBetween(0.18, 0.5) : randomBetween(0.25, 0.75),
    swaySpeed: randomBetween(0.008, 0.018),
    phase: randomBetween(0, Math.PI * 2),
    flip: randomBetween(0, Math.PI * 2),
    flipSpeed: randomBetween(0.01, 0.024),
    alpha: isWinter
      ? randomBetween(0.35, 0.65)
      : isSummer
      ? randomBetween(0.3, 0.6)
      : randomBetween(0.35, 0.62),
    color,
    variant: Math.random() > 0.45 ? 0 : 1,
  };
}

function drawAutumnLeaf(ctx: CanvasRenderingContext2D, p: Particle): void {
  const s = p.size;
  ctx.scale(1, Math.max(0.28, Math.abs(Math.cos(p.flip))));
  ctx.fillStyle = p.color;
  ctx.strokeStyle = 'rgba(255, 248, 240, 0.38)';
  ctx.lineWidth = 0.7;

  ctx.beginPath();
  if (p.variant === 0) {
    // Piccola foglia affusolata con punta e picciolo
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.85, -s * 0.45, s * 0.8, s * 0.5, 0, s * 0.85);
    ctx.bezierCurveTo(-s * 0.8, s * 0.5, -s * 0.85, -s * 0.45, 0, -s);
  } else {
    // Piccola foglia lobata autunnale
    ctx.moveTo(0, -s);
    ctx.quadraticCurveTo(s * 0.45, -s * 0.65, s * 0.85, -s * 0.15);
    ctx.quadraticCurveTo(s * 0.5, s * 0.1, s * 0.7, s * 0.45);
    ctx.quadraticCurveTo(s * 0.25, s * 0.55, 0, s * 0.85);
    ctx.quadraticCurveTo(-s * 0.25, s * 0.55, -s * 0.7, s * 0.45);
    ctx.quadraticCurveTo(-s * 0.5, s * 0.1, -s * 0.85, -s * 0.15);
    ctx.quadraticCurveTo(-s * 0.45, -s * 0.65, 0, -s);
  }
  ctx.fill();
  ctx.stroke();

  // Nervatura centrale + picciolo
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.65);
  ctx.lineTo(0, s * 1.05);
  ctx.strokeStyle = 'rgba(92, 34, 15, 0.35)';
  ctx.lineWidth = 0.8;
  ctx.stroke();
}

function drawSnowflake(ctx: CanvasRenderingContext2D, p: Particle): void {
  const s = p.size;
  ctx.shadowColor = 'rgba(147, 197, 253, 0.7)';
  ctx.shadowBlur = 6;

  if (p.variant === 0) {
    // Cristallo a 6 rami
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.15;
    ctx.lineCap = 'round';
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const ex = Math.cos(a) * s;
      const ey = Math.sin(a) * s;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(ex, ey);
      // Piccole ramificazioni laterali
      const bx = Math.cos(a) * (s * 0.6);
      const by = Math.sin(a) * (s * 0.6);
      ctx.moveTo(bx, by);
      ctx.lineTo(
        bx + Math.cos(a + 0.55) * (s * 0.32),
        by + Math.sin(a + 0.55) * (s * 0.32)
      );
      ctx.moveTo(bx, by);
      ctx.lineTo(
        bx + Math.cos(a - 0.55) * (s * 0.32),
        by + Math.sin(a - 0.55) * (s * 0.32)
      );
      ctx.stroke();
    }
  } else {
    // Morbido fiocco soffice
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.72);
    grad.addColorStop(0, p.color);
    grad.addColorStop(0.65, 'rgba(224, 242, 254, 0.65)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.72, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawSpringPetal(ctx: CanvasRenderingContext2D, p: Particle): void {
  const s = p.size;
  ctx.scale(1, Math.max(0.32, Math.abs(Math.cos(p.flip))));
  ctx.fillStyle = p.color;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 0.6;

  // Petalo incurvato con leggero intaglio sulla punta
  ctx.beginPath();
  ctx.moveTo(0, s * 0.8);
  ctx.bezierCurveTo(s * 0.9, s * 0.35, s * 0.95, -s * 0.6, s * 0.22, -s * 0.85);
  ctx.lineTo(0, -s * 0.62);
  ctx.lineTo(-s * 0.22, -s * 0.85);
  ctx.bezierCurveTo(-s * 0.95, -s * 0.6, -s * 0.9, s * 0.35, 0, s * 0.8);
  ctx.fill();
  ctx.stroke();
}

function drawSummerFirefly(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  timeMs: number
): void {
  const pulse = 0.42 + 0.58 * Math.abs(Math.sin(timeMs * 0.002 + p.phase));
  const radius = p.size * 1.1;
  ctx.globalAlpha = p.alpha * pulse;
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
  grad.addColorStop(0, '#FFFBEB');
  grad.addColorStop(0.35, p.color);
  grad.addColorStop(1, 'rgba(251, 191, 36, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
}

export interface SeasonalOverlayProps {
  season: SeasonType;
}

export function SeasonalOverlay({ season }: SeasonalOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (season === 'off') return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const configureCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    configureCanvas();

    const getParticleCount = (viewportWidth: number) => (viewportWidth < 768 ? 7 : 12);

    const targetCount = getParticleCount(width);
    const particles: Particle[] = Array.from({ length: targetCount }, () =>
      createParticle(season, width, height, true)
    );

    const handleResize = () => {
      configureCanvas();
      const desired = getParticleCount(width);
      while (particles.length < desired) {
        particles.push(createParticle(season, width, height, true));
      }
      if (particles.length > desired) {
        particles.length = desired;
      }
    };

    window.addEventListener('resize', handleResize);

    let frameId = 0;
    const render = (timeMs: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.phase += p.swaySpeed;
        p.flip += p.flipSpeed;
        p.angle += p.spin;

        const sway = Math.sin(p.phase) * p.swayAmp;
        p.x += p.vx + sway * 0.55;
        p.y += p.vy;

        const margin = p.size * 2.5;
        if (season === 'summer') {
          if (p.y < -margin) p.y = height + margin;
          if (p.y > height + margin) p.y = -margin;
        } else if (p.y > height + margin) {
          p.y = -margin;
          p.x = randomBetween(0, width);
        }

        if (p.x < -margin) p.x = width + margin;
        if (p.x > width + margin) p.x = -margin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;

        if (season === 'autumn') {
          drawAutumnLeaf(ctx, p);
        } else if (season === 'winter') {
          drawSnowflake(ctx, p);
        } else if (season === 'spring') {
          drawSpringPetal(ctx, p);
        } else {
          drawSummerFirefly(ctx, p, timeMs);
        }

        ctx.restore();
      }

      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [season]);

  if (season === 'off') return null;

  return <canvas ref={canvasRef} className="seasonal-overlay-canvas" aria-hidden="true" />;
}
