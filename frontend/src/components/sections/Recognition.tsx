"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Recognition() {
  return (
    <section id="recognition" className="py-24 container mx-auto px-6 border-t border-slate-900 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Education */}
          <div>
            <h2 className="text-3xl font-serif text-white mb-8">Education.</h2>
            <div className="space-y-6">
              {resume.education.map((edu, idx) => (
                <Card key={idx} className="bg-slate-900/50 border-slate-800 backdrop-blur">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-xl text-slate-100 font-sans">{edu.degree}</CardTitle>
                      <span className="text-sky-400 font-mono text-sm whitespace-nowrap mt-1">{edu.year}</span>
                    </div>
                    <h3 className="text-md text-slate-400 font-serif">{edu.school}</h3>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-block px-3 py-1 bg-slate-800 text-sky-400 text-xs font-mono rounded">
                      {edu.highlight}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div>
            <h2 className="text-3xl font-serif text-white mb-8">Awards.</h2>
            <div className="space-y-6">
              {resume.awards?.map((award, idx) => (
                <div key={idx} className="p-6 border border-slate-800 bg-slate-900/50 rounded-xl hover:border-sky-500/30 transition-colors">
                  <h3 className="text-lg text-slate-100 font-sans mb-2">{award.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{award.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
