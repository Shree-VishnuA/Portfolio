"use client";
import ThemeToggle from "./Themetoggle";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  House,
  Hammer,
  BriefcaseBusiness,
  GraduationCap,
  Phone,
} from "lucide-react";

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
  const ScrollYP = useScroll().scrollYProgress;
  const navWidth = useTransform(ScrollYP, [0, 1.2], ["95%", "40%"]);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    });

    // ✅ Track sections in viewport
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // 60% visible = active
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <motion.nav
      animate={{
        border: isOpen ? 0 : 4,
        height: isOpen ? 56 + menuHeight : 14 * 4,
      }}
      style={{ width: navWidth }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "w-full rounded-full sticky top-3  backdrop-blur-3xl h-14 mx-auto flex flex-col justify-center px-5 border z-50"
      )}
    >
      <div className="w-full flex justify-between items-center">
        <div>Logo</div>
        <nav>
          <ul className="flex gap-8 max-md:hidden relative">
            {navs.map(({ title, link, icon: Icon }, ind) => (
              <motion.a
                key={ind}
                href={link} // use "link" instead of "nav.link"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ind * 0.1 }}
                className={cn(
                  "cursor-pointer relative px-2 py-1 transition",
                  activeSection === link.slice(1)
                    ? "text-blue-600 dark:text-blue-400 font-semibold flex justify-center items-center gap-1"
                    : "text-gray-700 dark:text-gray-200 flex justify-center items-center gap-2"
                )}
              ><Icon size={15} weight="duotone" className="text-current" />{title}
                {activeSection === link.slice(1) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 dark:bg-blue-400 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2 justify-center">
          <ThemeToggle />

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden"
          >
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
              navs.map((nav, ind) => (
                <motion.li
                  key={ind}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ ease: "linear", duration: (ind + 1) * 0.1 }}
                  className={cn(
                    "opacity-85 hover:font-semibold hover:opacity-100 border-b last-of-type:border-none my-1 text-lg",
                    activeSection === nav.link.slice(1)
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : ""
                  )}
                >
                  <a href={nav.link}>{nav.title}</a>
                </motion.li>
              ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
