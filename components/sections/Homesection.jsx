"use client";

import React from "react";
import ParticleField from "../ParticleLayout";
import { motion } from "framer-motion";

// Utility to generate random starting positions
const randomOffset = () => ({
  x: Math.random() * 800 , // random between -400 and +400
  y: Math.random() * 600 , // random between -300 and +300
});

const Homesection = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen transition-colors duration-500"
    >
      {/* Particle Background */}
      <ParticleField />

      {/* Overlay with content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-12">
        {/* Animated Greeting */}
        <motion.h1
          initial={{ opacity: 0, ...randomOffset() }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-wide drop-shadow-lg transition-colors duration-500"
        >
          Hi, I'm Vishnu
        </motion.h1>

        {/* Animated Subheading */}
        <motion.p
          initial={{ opacity: 0, ...randomOffset() }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="mt-6 text-lg md:text-2xl text-gray-900 dark:text-white max-w-2xl drop-shadow-md transition-colors duration-500"
        >
          I'm an AI & ML enthusiast, building sleek and futuristic web experiences.
        </motion.p>

        {/* Call-to-action buttons */}
        <motion.div
          initial={{ opacity: 0, ...randomOffset() }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300"
          >
            My Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Subtle floating elements for depth */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-2 h-2 bg-purple-500 rounded-full top-1/4 left-1/3 opacity-50"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-3 h-3 bg-indigo-400 rounded-full top-1/2 left-2/3 opacity-40"
        />
      </div>
    </section>
  );
};

export default Homesection;
