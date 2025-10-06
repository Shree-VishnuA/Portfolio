"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const projects = [
  {
    id: 1,
    title: "Clock",
    description:
      "An intelligent cooling system that adjusts fan speed in real-time based on ambient temperature using DHT11 and Arduino integration.",
  },
  {
    id: 2,
    title: "Weather App",
    description:
      "An intelligent cooling system that adjusts fan speed in real-time based on ambient temperature using DHT11 and Arduino integration.",
  },
  {
    id: 3,
    title: "MovieHunt",
    description:
      "An intelligent cooling system that adjusts fan speed in real-time based on ambient temperature using DHT11 and Arduino integration.",
  },
  {
    id: 4,
    title: "Arise(Codefury)",
    description:
      "An intelligent cooling system that adjusts fan speed in real-time based on ambient temperature using DHT11 and Arduino integration.",
  },
];

const Projectsection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["300vh", `-${projects.length * 100}vh`]
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative pt-20"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="left-0 right-0 w-full text-center z-10 pointer-events-none"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
          Projects
        </h2>
        <p className=" text-lg max-w-2xl mx-auto">
          A glimpse into some of my best works — blending design, engineering, and innovation.
        </p>
      </motion.div>

      <div className="sticky top-50 h-screen/2 overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full gap-10 scrollbar-hide   justify-center overflow-x-scroll items-center text-9xl"
        >
          
            {projects.map((project) => (
              <Card
                key={project.id}
                className="h-100 w-[872px] border border-gray-600 rounded-2xl p-5 flex flex-col justify-between shadow-md bg-background/80 backdrop-blur-sm"
              >
               <div className="w-1/2">
                 <CardHeader>
                  <CardTitle className="text-3xl font-semibold text-cyan-600 dark:text-cyan-400">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className=" text-lg">{project.description}</p>
                </CardContent>
               </div>
               <div className="w-1/2">

               </div>
              </Card>
            ))}
          
        </motion.div>
      </div>
    </section>
  );
};

export default Projectsection;
