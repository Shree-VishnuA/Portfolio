"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Database, Layout, Palette } from "lucide-react"; // example icons

const skills = [
  { name: "Frontend Development", icon: <Layout size={28} />, level: "React, Next.js, Tailwind CSS" },
  { name: "Backend Development", icon: <Database size={28} />, level: "Node.js, Express, MongoDB" },
  { name: "UI/UX Design", icon: <Palette size={28} />, level: "Figma, Responsive Design" },
  { name: "Programming", icon: <Code size={28} />, level: "Python, C++, JavaScript" },
  { name: "AI & ML", icon: <Cpu size={28} />, level: "TensorFlow, PyTorch, OpenAI APIs" },
];

const Skillssections = () => {
  return (
    <section
      id="skills"
      className="w-full py-20 "
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 10, y: 0 }}
          transition={{ duration: 0.6 }}
          // viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 "
        >
          Skills & Expertise
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/70 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-zinc-800 hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-500 dark:text-purple-400 mb-4">{skill.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{skill.level}</p>
              
            </motion.div>
            
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default Skillssections;
