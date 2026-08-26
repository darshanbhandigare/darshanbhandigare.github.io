import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let particles = [];
    let isDocumentVisible = true;
    let previousTime = 0;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.r = Math.random() * 1.2 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = (Math.random() - 0.5) * 0.12;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update(delta) {
        this.x += this.vx * delta;
        this.y += this.vy * delta;
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(22,138,165,${this.alpha})`;
        ctx.fill();
      }
    }

    const buildParticles = () => {
      const particleCount = window.innerWidth < 700 ? 45 : 75;
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const animate = (time = 0) => {
      if (!isDocumentVisible) {
        animationFrame = 0;
        return;
      }

      const delta = previousTime ? Math.min((time - previousTime) / 16.67, 2) : 1;
      previousTime = time;
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.update(delta);
        particle.draw();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < 10000) {
            const distance = Math.sqrt(distanceSquared);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(22,138,165,${0.06 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    setSize();
    buildParticles();
    animate();

    window.addEventListener("resize", setSize);
    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
      if (isDocumentVisible && !animationFrame) {
        previousTime = 0;
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", setSize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas id="canvas" ref={canvasRef}></canvas>;
}
