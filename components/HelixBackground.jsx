"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Helix from "./Helix";

export default function HelixBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 50 
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // Device pixel ratio for crisp rendering
      >
        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.8}
          panSpeed={0.8}
          rotateSpeed={0.5}
          minDistance={3}
          maxDistance={15}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />

        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        
        {/* Directional lighting */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.5}
          color="#ffffff"
        />
        
        {/* Point lights for extra glow */}
        <pointLight position={[2, 2, 2]} intensity={0.3} color="#00ffff" />
        <pointLight position={[-2, -2, -2]} intensity={0.3} color="#ff0080" />
        
        <Suspense fallback={null}>
          <Helix 
            count={4}           // More helixes for denser background
            radius={2}          // Slightly larger radius
            turns={10}          // More turns for longer helixes
            height={20}         // Taller to cover more screen
            speed={0.3}         // Slower for subtle movement
            scrollSpeed={0.001} // Reduced scroll sensitivity
            theme="auto"        // Auto-detect theme
          />
        </Suspense>
      </Canvas>
    </div>
  );
}