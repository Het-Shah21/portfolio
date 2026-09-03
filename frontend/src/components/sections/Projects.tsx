"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="py-24 container mx-auto px-6 border-t border-slate-900 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-serif text-white mb-12">Projects.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resume.projects.map((project, idx) => (
            <Card key={idx} className="bg-slate-900 border-slate-800 hover:border-sky-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-8 h-8 text-sky-400" />
              </div>
              <CardHeader>
                <span className="text-sky-400 font-mono text-sm mb-2">{project.metric}</span>
                <CardTitle className="text-2xl text-slate-100 font-sans">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 leading-relaxed mb-6">{project.description}</p>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center text-sm font-mono text-slate-300 hover:text-white"
                >
                  [ VIEW_SOURCE ]
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
