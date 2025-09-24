"use client";

import { useEffect } from "react";

import Homesection from "@/components/sections/Homesection";
import Skillssections from "@/components/sections/Skillssections";
import Projectsection from "@/components/sections/Projectsection";
import Educationsection from "@/components/sections/Educationsection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  useEffect(() => {
    // Always reset scroll position on reload
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <Homesection />
      <Skillssections />
      <Projectsection />
      <Educationsection />
      <ContactSection />
    </div>
  );
}
