"use client";

import { useState, useEffect } from "react";
import { resume } from "@/data/resume";
import { motion } from "framer-motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Recognition", href: "#recognition" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800" : "bg-transparent"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="text-2xl font-serif text-white tracking-wide">
          {resume.name.split(" ")[0]}<span className="text-sky-500">.</span>
        </a>
        <nav className="hidden md:flex gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-mono text-slate-300 hover:text-sky-400 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
