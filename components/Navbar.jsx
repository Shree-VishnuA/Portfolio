"use client";
import ThemeToggle from "./Themetoggle";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { House, Hammer, BriefcaseBusiness, GraduationCap, Phone } from "lucide-react";

const Navbar = () => {
  const navs = [
    { title: "Home", link: "#home", icon: House },
    { title: "Skills", link: "#skills", icon: Hammer },
    { title: "Projects", link: "#projects", icon: BriefcaseBusiness },
    { title: "Education", link: "#education", icon: GraduationCap },
    { title: "Contact", link: "#contact", icon: Phone },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  const ScrollYP = useScroll().scrollYProgress;
  const navWidthDesktop = useTransform(ScrollYP, [0, 1.2], ["95%", "40%"]);

  // Update mobile flag
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    });

    // Improved Intersection Observer
    const sections = document.querySelectorAll("section[id]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.3, // Lower threshold for better detection
        rootMargin: "-20% 0px -20% 0px" // Adjust viewport area for detection
      }
    );

    sections.forEach((section) => observer.observe(section));
    
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Debug: Log active section changes
  useEffect(() => {
    console.log("Active Section:", activeSection);
  }, [activeSection]);

  return (
    <motion.nav
      animate={{
        border: isOpen ? 0 : 4,
        height: isOpen ? 56 + menuHeight : 14 * 4,
      }}
      style={{ width: isMobile ? "95%" : navWidthDesktop }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "w-full rounded-full mont sticky top-3 backdrop-blur-3xl h-14 mx-auto flex flex-col justify-center px-5 border border-cyan-600 drak:border-cyan-400 z-50"
      )}
    >
      <div className="w-full flex justify-between items-center">
        <div>Logo</div>
        <nav>
          <ul className="flex gap-8 max-md:hidden relative">
            {navs.map(({ title, link, icon: Icon }, ind) => {
              const sectionId = link.slice(1); // Remove the '#' to get 'projects'
              const isActive = activeSection === sectionId;
              
              return (
                <motion.a
                  key={ind}
                  href={link}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ind * 0.1 }}
                  className={cn(
                    "cursor-pointer relative px-2 py-1 transition",
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400 font-semibold flex justify-center items-center gap-1"
                      : "text-gray-700 dark:text-gray-200 flex justify-center items-center gap-2"
                  )}
                >
                  <Icon size={15} weight="duotone" className="text-current" />
                  {title}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-600 dark:bg-cyan-400 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2 justify-center">
          <ThemeToggle />

          <button onClick={() => setIsOpen((prev) => !prev)} className="md:hidden">
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              className="w-[18px] h-[1.5px] rounded-full bg-foreground"
            ></motion.div>
            <motion.div
              animate={{
                rotate: isOpen ? -45 : 0,
                width: isOpen ? 18 : 14,
                marginTop: isOpen ? -1 : 4,
              }}
              className="w-[14px] ml-auto h-[1.5px] rounded-full bg-foreground"
            ></motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        <motion.div
          ref={menuRef}
          animate={{
            height: isOpen ? menuHeight : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            height: { duration: 0.3, ease: "easeInOut" },
            opacity: { duration: 0.3, delay: isOpen ? 0.1 : 0 },
          }}
          className="md:hidden w-full h-max"
        >
          <ul className="flex flex-col gap-2 mt-2">
            {isOpen &&
              navs.map((nav, ind) => {
                const sectionId = nav.link.slice(1);
                const isActive = activeSection === sectionId;
                
                return (
                  <motion.li
                    key={ind}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ ease: "linear", duration: (ind + 1) * 0.1 }}
                    className={cn(
                      "opacity-85 hover:font-semibold hover:opacity-100 border-b last-of-type:border-none my-1 text-lg",
                      isActive
                        ? "text-cyan-600 dark:text-cyan-400 font-semibold"
                        : ""
                    )}
                  >
                    <a href={nav.link}>{nav.title}</a>
                  </motion.li>
                );
              })}
          </ul>
        </motion.div>
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;