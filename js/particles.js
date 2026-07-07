/**
 * ParticleCanvas — Interactive particle field with mouse attraction
 * Creates an ambient, dynamic background of floating particles
 * with connection lines and mouse-reactive behavior.
 */

const PARTICLE_COUNT = 100;
const CONNECTION_DISTANCE = 120;
const MOUSE_DISTANCE = 200;
const MOUSE_ATTRACTION_RADIUS = 150;
const MOUSE_ATTRACTION_FORCE = 0.02;
const COLORS = ['#f59e0b', '#2dd4bf', '#ffffff'];

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.4 + (Math.random() > 0.5 ? 0.1 : -0.1);
    this.vy = (Math.random() - 0.5) * 0.4 + (Math.random() > 0.5 ? 0.1 : -0.1);
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  update(width, height, mouseX, mouseY) {
    // Mouse attraction
    if (mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_ATTRACTION_RADIUS && dist > 0) {
        this.vx += (dx / dist) * MOUSE_ATTRACTION_FORCE;
        this.vy += (dy / dist) * MOUSE_ATTRACTION_FORCE;
      }
    }

    // Dampen velocity to keep particles slow
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 0.5) {
      this.vx *= 0.98;
      this.vy *= 0.98;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Wrap edges
    if (this.x < -10) this.x = width + 10;
    if (this.x > width + 10) this.x = -10;
    if (this.y < -10) this.y = height + 10;
    if (this.y > height + 10) this.y = -10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export class ParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.warn(`ParticleCanvas: Canvas element #${canvasId} not found.`);
      return;
    }
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouseX = null;
    this.mouseY = null;
    this.animationId = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._loop = this._loop.bind(this);
  }

  _resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.scale(dpr, dpr);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  _createParticles() {
    this.particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      this.particles.push(new Particle(this.width, this.height));
    }
  }

  _onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  _onMouseLeave() {
    this.mouseX = null;
    this.mouseY = null;
  }

  _drawConnections() {
    const ctx = this.ctx;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 0.15 * (1 - dist / CONNECTION_DISTANCE);
          ctx.beginPath();
          ctx.moveTo(this.particles[i].x, this.particles[i].y);
          ctx.lineTo(this.particles[j].x, this.particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  _drawMouseConnections() {
    if (this.mouseX === null || this.mouseY === null) return;
    const ctx = this.ctx;

    for (const p of this.particles) {
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_DISTANCE) {
        const alpha = 0.2 * (1 - dist / MOUSE_DISTANCE);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(this.mouseX, this.mouseY);
        ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  _loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const p of this.particles) {
      p.update(this.width, this.height, this.mouseX, this.mouseY);
      p.draw(this.ctx);
    }

    this._drawConnections();
    this._drawMouseConnections();

    this.animationId = requestAnimationFrame(this._loop);
  }

  _renderStatic() {
    this._resize();
    this._createParticles();
    for (const p of this.particles) {
      p.draw(this.ctx);
    }
    this._drawConnections();
  }

  init() {
    if (!this.canvas) return;

    this._resize();
    this._createParticles();

    if (this.reducedMotion) {
      this._renderStatic();
      return;
    }

    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseleave', this._onMouseLeave);
    window.addEventListener('resize', () => {
      this._resize();
    });

    this._loop();
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseleave', this._onMouseLeave);
  }
}
