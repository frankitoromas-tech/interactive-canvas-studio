// Motor de Confeti, Pétalos de Rosa y Fuegos Artificiales en Canvas Puro
// Diseñado para 60FPS sin caídas de framerate y soporte para dispositivos móviles.

class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrame = null;
    this.active = false;
  }

  ensureCanvas() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'love-confetti-canvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '99999';
      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  // Corazones, estrellas, círculos y cintas doradas
  burst({ x = window.innerWidth / 2, y = window.innerHeight / 2, count = 80, spread = 360, velocity = 12 }) {
    this.ensureCanvas();
    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fbbf24', '#f59e0b', '#a855f7', '#ffffff', '#e11d48'];
    const shapes = ['heart', 'star', 'circle', 'ribbon', 'petal'];

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * spread - spread / 2) * (Math.PI / 180) - Math.PI / 2;
      const speed = (Math.random() * 0.7 + 0.3) * velocity;
      
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
        vy: Math.sin(angle) * speed - Math.random() * 3,
        size: Math.random() * 14 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.1 + 0.05,
        opacity: 1,
        decay: Math.random() * 0.008 + 0.006,
        gravity: 0.22,
        drag: 0.98
      });
    }

    if (!this.active) {
      this.active = true;
      this.loop();
    }
  }

  // Fuegos artificiales de amor desde los laterales
  cannonCelebration() {
    this.ensureCanvas();
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Ráfagas coordinadas estilo cañón de confeti
    const shots = [
      { x: w * 0.1, y: h * 0.8, angle: 45, count: 60 },
      { x: w * 0.9, y: h * 0.8, angle: 135, count: 60 },
      { x: w * 0.5, y: h * 0.6, angle: 90, count: 80 },
      { x: w * 0.25, y: h * 0.7, angle: 60, count: 50 },
      { x: w * 0.75, y: h * 0.7, angle: 120, count: 50 }
    ];

    shots.forEach((shot, index) => {
      setTimeout(() => {
        this.burst({
          x: shot.x,
          y: shot.y,
          count: shot.count,
          spread: 80,
          velocity: 16
        });
      }, index * 250);
    });
  }

  // Dibujar corazón en canvas
  drawHeart(ctx, x, y, size, color, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 20, size / 20);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20);
    ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fill();
    ctx.restore();
  }

  // Dibujar pétalo de rosa suave
  drawPetal(ctx, x, y, size, color, opacity, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.6, size * 1.2, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity * 0.9;
    ctx.fill();
    ctx.restore();
  }

  // Dibujar estrella brillante
  drawStar(ctx, x, y, size, color, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const spikes = 5;
    const outer = size * 0.6;
    const inner = size * 0.3;
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    ctx.moveTo(0, -outer);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(Math.cos(rot) * outer, Math.sin(rot) * outer);
      rot += step;
      ctx.lineTo(Math.cos(rot) * inner, Math.sin(rot) * inner);
      rot += step;
    }
    ctx.lineTo(0, -outer);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fill();
    ctx.restore();
  }

  loop() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.rotation += p.rotationSpeed;
      p.wobble += p.wobbleSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      const xPos = p.x + Math.sin(p.wobble) * 4;

      if (p.shape === 'heart') {
        this.drawHeart(this.ctx, xPos, p.y, p.size, p.color, p.opacity);
      } else if (p.shape === 'petal') {
        this.drawPetal(this.ctx, xPos, p.y, p.size, p.color, p.opacity, p.rotation);
      } else if (p.shape === 'star') {
        this.drawStar(this.ctx, xPos, p.y, p.size, p.color, p.opacity);
      } else if (p.shape === 'ribbon') {
        this.ctx.save();
        this.ctx.translate(xPos, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillRect(-p.size / 2, -p.size / 6, p.size, p.size / 3);
        this.ctx.restore();
      } else {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(xPos, p.y, p.size / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fill();
        this.ctx.restore();
      }
    }

    if (this.particles.length > 0) {
      this.animationFrame = requestAnimationFrame(() => this.loop());
    } else {
      this.active = false;
      if (this.canvas && this.canvas.parentNode) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
}

export const confetti = new ConfettiEngine();
