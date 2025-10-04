"use client";
import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "AI Weather-Based Smart Fan",
    description:
      "An intelligent cooling system that adjusts fan speed in real-time based on ambient temperature using DHT11 and Arduino integration.",
    align: "left",
  },
  {
    id: 2,
    title: "Movie Explorer App",
    description:
      "A dynamic React app that fetches and displays movie data from TMDB API with cast, crew, and detailed insights.",
    align: "right",
  },
  {
    id: 3,
    title: "Multi-Feature Timer Web App",
    description:
      "A feature-rich stopwatch, timer, and alarm app built using React Context API with persistent states and audio feedback.",
    align: "left",
  },
  {
    id: 4,
    title: "Eco-Terrain Vehicle Prototype",
    description:
      "A lightweight, eco-friendly multi-terrain vehicle prototype designed with recyclable materials for sustainability challenges.",
    align: "right",
  },
  {
    id: 5,
    title: "AI-Powered Groundwater Platform",
    description:
      "A conversational platform using AI and GIS maps to simplify groundwater data accessibility for non-technical users.",
    align: "left",
  },
];

const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
      },
    },
  };
};

const Projectsection = () => {
  return (
    <section id="projects" className="min-h-screenm">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          A glimpse into some of my best works — blending design, engineering, and innovation.
        </p>
      </motion.div>

      <div className="flex flex-col gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeIn(project.align === "left" ? "left" : "right", index * 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
              project.align === "right" ? "md:flex-row-reverse" : ""
            }`}
          >
            <motion.div
              className="w-full md:w-1/2 p-6 rounded-2xl bg-card shadow-md hover:shadow-xl transition-shadow duration-300 border border-border"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-semibold text-primary mb-3">
                {project.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            <motion.div
              className="hidden md:flex w-full md:w-1/2 justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 + 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-3/4 aspect-video rounded-xl bg-gradient-to-br from-primary/40 to-accent/40 blur-[1px] hover:blur-0 transition-all duration-500"></div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projectsection;
