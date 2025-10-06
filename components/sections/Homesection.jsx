"use client";

import React from "react";
import ParticleField from "../ParticleLayout";
import { motion } from "framer-motion";
import { ChevronDown, Download, ArrowRight } from "lucide-react";

const Homesection = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen  transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-60">
        <ParticleField />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_2px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl font-medium text-cyan-600 dark:text-cyan-400 mb-4 tracking-wide uppercase"
          >
            Welcome to My Portfolio
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            <span>Hi, I'm </span>
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Vishnu
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2 font-light">
              Frontend Developer
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
              Crafting intelligent solutions and cutting-edge web experiences 
              through artificial intelligence and modern full-stack development
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            className="group px-8 py-4 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-400 dark:hover:bg-cyan-600 text-white rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View My Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf" 
            download
            className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-cyan-600 dark:hover:border-cyan-400 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 backdrop-blur-sm"
          >
             Resume
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </motion.a>
        </motion.div>

        
      </div>

      
    </section>
  );
};

export default Homesection;