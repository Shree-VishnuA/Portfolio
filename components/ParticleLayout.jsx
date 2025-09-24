"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function ParticleField({ count = 300 }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouseRef = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const prevMouseRef = useRef({ x: mouseRef.current.x, y: mouseRef.current.y });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const darkColors = ["#3b3b3b", "#222222", "#242424", "#141414"];
    const lightColors = [
      "#D4D4D8",
      // "#C5C6C9",
      "#B6B8BB",
      // "#A8AAAD",
      "#FFFFFF",
      // "#FAFAFA",
      "#F5F5F5",
      // "#EDEDED",
    ];

    const getColors = () => (theme === "dark" ? darkColors : lightColors);

    const createPolygon = (size) => {
      const sides = Math.floor(Math.random() * 3) + 5; // 5–7 sides
      const points = [];
      for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 * i) / sides;
        const radius = size * (0.7 + Math.random() * 0.8);
        points.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        });
      }
      return points;
    };

    // Initialize particles only once
    if (particles.current.length === 0) {
      particles.current = Array.from({ length: count }, () => {
        const r = Math.random();
        const size = r * r * 30 + 5; // increase large particle size
        const shapeType = Math.random() < 0.7 ? "polygon" : "circle";
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size,
          shape: shapeType,
          points: shapeType === "polygon" ? createPolygon(size) : null,
          color: getColors()[Math.floor(Math.random() * getColors().length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        };
      });
    } else {
      const colors = getColors();
      particles.current.forEach((p) => {
        p.color = colors[Math.floor(Math.random() * colors.length)];
      });
    }

    const handleMouseMove = (e) => {
      const mouse = mouseRef.current;
      const prevMouse = prevMouseRef.current;
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const mouse = mouseRef.current;
      const prevMouse = prevMouseRef.current;

      ctx.clearRect(0, 0, w, h);

      const dxMouse = mouse.x - prevMouse.x;
      const dyMouse = mouse.y - prevMouse.y;
      const mouseSpeed = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      particles.current.forEach((p, i) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // Stabilized force calculation - normalize by particle size to create mass-like behavior
        const baseForce = 0 / (dist * dist + 50); // Added distance offset to prevent extreme forces
        const massNormalizedForce = baseForce * (p.size / 20); // Scale force proportionally to particle size (mass)

        if (mouseSpeed < 30) {
          p.vx += dx * massNormalizedForce * 0.001;
          p.vy += dy * massNormalizedForce * 0.001;
        }
        p.vx += dx * massNormalizedForce * 0.0005;
        p.vy += dy * massNormalizedForce * 0.0005;

        if (dist < 120 && mouseSpeed > 1) {
          const repulse = ((120 - dist) / 30) * mouseSpeed * 0.1 * (p.size / 20);
          p.vx -= (dx / dist) * repulse;
          p.vy -= (dy / dist) * repulse;
        }

        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dx2 = p2.x - p.x;
          const dy2 = p2.y - p.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          const minDist = p.size + p2.size;

          if (dist2 < minDist && dist2 > 0) {
            const overlap = (minDist - dist2) / 2;
            const nx = dx2 / dist2;
            const ny = dy2 / dist2;
            p.x -= nx * overlap * 0.5;
            p.y -= ny * overlap * 0.5;
            p2.x += nx * overlap * 0.5;
            p2.y += ny * overlap * 0.5;

            const vxAvg = (p.vx + p2.vx) / 2;
            const vyAvg = (p.vy + p2.vy) / 2;
            p.vx = vxAvg * 0.95;
            p2.vx = vxAvg * 0.95;
            p.vy = vyAvg * 0.95;
            p2.vy = vyAvg * 0.95;
          }
        }

        // Increased damping for smaller particles to add stability
        const dampingFactor = Math.max(0.92, 0.98 - (1 / p.size) * 10);
        p.vx *= dampingFactor;
        p.vy *= dampingFactor;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x - p.size < 0) {
          p.x = p.size;
          p.vx *= -0.8; // Reduced bounce for stability
        }
        if (p.x + p.size > w) {
          p.x = w - p.size;
          p.vx *= -0.8;
        }
        if (p.y - p.size < 0) {
          p.y = p.size;
          p.vy *= -0.8;
        }
        if (p.y + p.size > h) {
          p.y = h - p.size;
          p.vy *= -0.8;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        if (p.shape === "circle") {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        } else {
          p.points.forEach((pt, index) => {
            const x =
              pt.x * Math.cos(p.rotation) - pt.y * Math.sin(p.rotation) + p.x;
            const y =
              pt.x * Math.sin(p.rotation) + pt.y * Math.cos(p.rotation) + p.y;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
        }
        ctx.closePath();
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [count, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-9999]"
    />
  );
}