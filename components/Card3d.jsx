"use client";

import { Html } from "@react-three/drei";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Card3D({ 
  title, 
  description, 
  onClick, 
  glowColor = "#00ffff",
  size = { width: "w-48", height: "h-auto" } // ✅ new size prop
}) {
  return (
    <Html center distanceFactor={6}>
      <div className="relative group">
        {/* Glow effect background */}
        <div 
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300 blur-xl"
          style={{
            background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
            transform: "scale(1.2)"
          }}
        />

        <Card
          onClick={onClick}
          className={`cursor-pointer ${size.width} ${size.height} 
                      bg-black/30 backdrop-blur-md border border-white/10 
                      text-white hover:scale-110 transition-all duration-500 ease-out
                      hover:bg-black/40 hover:border-white/30 group-hover:shadow-2xl
                      relative overflow-hidden`}
          style={{
            boxShadow: `0 0 20px ${glowColor}20`
          }}
        >
          <CardHeader className="relative">
            <CardTitle 
              className="text-lg font-bold transition-colors duration-300"
              style={{ color: glowColor }}
            >
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-300 group-hover:text-white 
                                transition-colors duration-300 relative">
            {description}
          </CardContent>
        </Card>
      </div>
    </Html>
  );
}
