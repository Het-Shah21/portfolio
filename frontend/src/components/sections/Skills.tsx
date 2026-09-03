"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";

export function Skills() {
  return (
    <section id="skills" className="py-24 container mx-auto px-6 border-t border-slate-900 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-serif text-white mb-12">Technical Skills.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resume.skills.map((skillGroup, idx) => (
            <div key={idx} className="p-6 border border-slate-800 bg-slate-900/50 rounded-xl">
              <h3 className="text-sm text-sky-400 font-mono mb-4 uppercase tracking-wider">{skillGroup.category}</h3>
              <ul className="space-y-3">
                {skillGroup.items.map(item => (
                  <li key={item} className="flex items-center text-slate-300 font-sans">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
