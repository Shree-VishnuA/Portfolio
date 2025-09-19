// components/Helix.js
"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "framer-motion";

// ✅ Create circular texture ONCE (outside component, not every frame)
function createCircleTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}
const circleTexture = createCircleTexture(); // 👈 make once globally

// Theme-aware palettes
const themes = {
  dark: {
    colors: ["#00ffff", "#ff0080", "#ffff00", "#00ff80", "#8000ff", "#ff4000"],
    coreColor: "#ffffff",
    intensity: { main: 0.8, glow: 0.9, particles: 1.2, core: 0.2 },
    lightColors: ["#ffffff", "#00ffff", "#ff0080", "#ffff00", "#00ff80"],
  },
  light: {
    colors: [
      "#0F172A",
      "#1D4ED8",
      "#7C3AED",
      "#DC2626",
      "#059669",
      "#D97706",
      "#0891B2",
    ],
    coreColor: "#374151",
    intensity: { main: 0.9, glow: 0.15, particles: 0.6, core: 0.1 },
    lightColors: [
      "#0F172A",
      "#1D4ED8",
      "#7C3AED",
      "#DC2626",
      "#059669",
      "#D97706",
      "#0891B2",
    ],
  },
};

export default function Helix({
  count = 3,
  radius = 1.5,
  turns = 8,
  height = 12,
  speed = 0.5,
  scrollSpeed = 0.002,
  theme = "dark", // 'dark' | 'light' | 'auto'
  customColors = null,
}) {
  const [currentTheme, setCurrentTheme] = useState(theme);
  const ScrollY = useScroll().scrollYProgress

  // Auto-detect system theme
  useEffect(() => {
    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setCurrentTheme(mediaQuery.matches ? "dark" : "light");

      const handleChange = (e) => setCurrentTheme(e.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      setCurrentTheme(theme);
    }
    console.log(ScrollY)
  }, [theme]);

  const themeConfig = themes[currentTheme] || themes.dark;
  const colors = customColors || themeConfig.colors;
  const groupRef = useRef();
  const helixRefs = useRef([]);
  const travelingLightsRefs = useRef([]);

  // Generate helix + particles
  const helixData = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const pointsPerTurn = 4000;
      const step = height / (turns * pointsPerTurn);
      const radiusOffset = radius + (index * 0.8 );
      const angleOffset = (index * Math.PI * 2) / count;

      const points = [];
      for (let i = 0; i < turns * pointsPerTurn; i++) {
        const angle = (i / pointsPerTurn) * Math.PI * 2 + angleOffset;
        const y = step * i - height / 2;
        const x = radiusOffset * Math.cos(angle);
        const z = radiusOffset * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, z));
      }

      // 🔥 Orbiting particles
      const particleCount = 1500;
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * turns * Math.PI * 2 + angleOffset;
        const y = (i / particleCount) * height - height / 2;
        const x = radiusOffset * Math.cos(angle);
        const z = radiusOffset * Math.sin(angle);

        particles.push({
          base: new THREE.Vector3(x, y, z),
          orbitRadius: 0.1 + Math.random() * 0.15,
          orbitSpeed: 0.5 + Math.random() * 1.0,
          orbitAngle: Math.random() * Math.PI * 2,
        });
      }

      const particlePositions = new Float32Array(particleCount * 3);
      particles.forEach((p, i) => {
        particlePositions.set([p.base.x, p.base.y, p.base.z], i * 3);
      });
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3)
      );

      // Traveling lights
      const lightCount = 4;
      const lights = Array.from({ length: lightCount }, (_, lightIndex) => ({
        position: new THREE.Vector3(),
        progress: lightIndex / lightCount + Math.random() * 0.2,
        speed: Math.random() * 0.4,
        intensity: 0.8 + Math.random() * 0.4,
        color:
          themeConfig.lightColors[lightIndex % themeConfig.lightColors.length],
      }));

      return {
        geometry: new THREE.BufferGeometry().setFromPoints(points),
        color: colors[index % colors.length],
        radiusOffset,
        angleOffset,
        points,
        particles,
        particleGeometry,
        lights,
      };
    });
  }, [count, radius, turns, height, colors, themeConfig.lightColors]);

  // Animate
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = window.scrollY * scrollSpeed + time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
      groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
    }

    helixRefs.current.forEach((helix, index) => {
      if (helix) {
        helix.rotation.y = time * speed * (0.5 + index * 0.2);
        helix.position.y = Math.sin(time * 0.8 + index) * 0.3;
        const scale = 1 + Math.sin(time * 2 + index * Math.PI) * 0.1;
        helix.scale.setScalar(scale);
      }
    });

    // Orbiting particles
    helixData.forEach((data) => {
      if (!data.particles) return;
      const positions = data.particleGeometry.attributes.position.array;

      data.particles.forEach((p, i) => {
        p.orbitAngle += p.orbitSpeed * 0.01;
        const offsetX = Math.cos(p.orbitAngle) * p.orbitRadius;
        const offsetZ = Math.sin(p.orbitAngle) * p.orbitRadius;
        positions[i * 3] = p.base.x + offsetX;
        positions[i * 3 + 1] = p.base.y;
        positions[i * 3 + 2] = p.base.z + offsetZ;
      });

      data.particleGeometry.attributes.position.needsUpdate = true;
    });

    // Traveling lights
    travelingLightsRefs.current.forEach((lightGroup, helixIndex) => {
      if (lightGroup && helixData[helixIndex]) {
        const data = helixData[helixIndex];
        const totalPoints = data.points.length;

        lightGroup.children.forEach((light, lightIndex) => {
          if (data.lights[lightIndex]) {
            const lightData = data.lights[lightIndex];
            lightData.progress += lightData.speed * 0.001;
            if (lightData.progress > 1) lightData.progress = 0;

            const pointIndex = Math.floor(
              lightData.progress * (totalPoints - 1)
            );
            const nextPointIndex = Math.min(pointIndex + 1, totalPoints - 1);
            const t = lightData.progress * (totalPoints - 1) - pointIndex;

            const currentPoint = data.points[pointIndex];
            const nextPoint = data.points[nextPointIndex];
            light.position.lerpVectors(currentPoint, nextPoint, t);

            const pulse =
              lightData.intensity *
              (0.7 + 0.3 * Math.sin(time * 4 + lightIndex + helixIndex));
            light.material.opacity = pulse;

            const scale = 0.8 + 0.4 * Math.sin(time * 3 + lightIndex * 2);
            light.scale.setScalar(scale);
          }
        });
      }
    });
  });

  return (
    <group ref={groupRef}>
      {helixData.map((data, index) => (
        <group key={index} ref={(el) => (helixRefs.current[index] = el)}>
          {/* Main helix line */}
          <line geometry={data.geometry}>
            <lineBasicMaterial
              color={data.color}
              linewidth={2}
              transparent
              opacity={themeConfig.intensity.main}
            />
          </line>

          {/* Glowing outer line */}
          <line geometry={data.geometry}>
            <lineBasicMaterial
              color={data.color}
              linewidth={4}
              transparent
              opacity={themeConfig.intensity.glow}
            />
          </line>

          {/* 🔥 Orbiting particles (circular now) */}
          <points geometry={data.particleGeometry}>
            <pointsMaterial
              color={data.color}
              size={currentTheme === "light" ? 0.15 : 0.15}
              transparent
              opacity={themeConfig.intensity.particles}
              sizeAttenuation
              alphaMap={circleTexture}  // 👈 makes them circular
              alphaTest={0.5}
              depthWrite={false}        // helps blending
            />
          </points>
        </group>
      ))}

      {/* Traveling lights */}
      {helixData.map((data, helixIndex) => (
        <group
          key={`lights-${helixIndex}`}
          ref={(el) => (travelingLightsRefs.current[helixIndex] = el)}
        >
          {data.lights.map((lightData, lightIndex) => (
            <mesh key={lightIndex}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial
                color={lightData.color}
                transparent
                opacity={lightData.intensity}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Core glow */}
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, height, 8]} />
        <meshBasicMaterial
          color={themeConfig.coreColor}
          transparent
          opacity={themeConfig.intensity.core}
        />
      </mesh>
    </group>
  );
}
