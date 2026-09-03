"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Experience() {
  return (
    <section id="experience" className="py-24 container mx-auto px-6 border-t border-slate-900 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-serif text-white mb-12">Experience.</h2>
        <div className="grid gap-8 border-l border-slate-800 pl-8 relative">
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="relative">
              <span className="absolute -left-[2.1rem] top-1.5 w-4 h-4 rounded-full bg-sky-500 border-4 border-slate-950" />
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <CardTitle className="text-2xl text-slate-100 font-sans">{exp.role}</CardTitle>
                    <span className="text-sky-400 font-mono text-sm mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <h3 className="text-lg text-slate-400 font-serif">{exp.company}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-mono rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
