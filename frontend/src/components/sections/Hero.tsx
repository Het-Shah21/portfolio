"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import Scene3D from "@/components/3d/Scene3D";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <Scene3D />
      
      {/* Overlay Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-16 lg:py-0 grid grid-cols-1 lg:grid-cols-2 gap-12 pointer-events-none">
        
        {/* Left Column: Text & Telemetry */}
        <div className="flex flex-col justify-center gap-6 md:gap-8 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-4">
              {resume.name}
            </h1>
            <p className="text-lg md:text-xl text-sky-400 font-mono mb-6 uppercase tracking-wider">
              {resume.role}
            </p>
            <p className="text-slate-300 text-base md:text-lg max-w-xl font-sans leading-relaxed">
              {resume.hero.tagline}
            </p>
          </motion.div>

          {/* Telemetry Stats Strip */}
          <motion.div 
            className="flex gap-4 md:gap-8 justify-between lg:justify-start border-t border-slate-800 pt-6 mt-2 md:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {resume.hero.telemetry.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] md:text-xs text-slate-500 font-mono mb-1">{stat.label}</span>
                <span className="text-lg md:text-2xl text-white font-bold font-mono whitespace-nowrap">{stat.value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Holographic Profile Photo */}
        <div className="flex items-center justify-center pointer-events-auto mt-6 lg:mt-0 lg:order-none">
          <div className="w-48 lg:w-full lg:max-w-sm aspect-square lg:aspect-[3/4] border border-sky-500/30 rounded-full lg:rounded-xl relative overflow-hidden group bg-slate-900/50 backdrop-blur-sm shadow-[0_0_30px_rgba(14,165,233,0.1)]">
            {/* The Image (Replace with your actual photo path once you upload it) */}
            <img 
              src="/profile.jpeg" 
              alt="Profile" 
              className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700 ease-in-out"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                document.getElementById('img-fallback')?.classList.remove('hidden');
                document.getElementById('img-fallback')?.classList.add('flex');
              }}
            />
            
            {/* Fallback Text if image is missing */}
            <div id="img-fallback" className="hidden absolute inset-0 flex-col items-center justify-center text-center p-6 border-2 border-dashed border-sky-500/20 m-4 rounded-lg">
              <span className="text-xs text-sky-500/70 font-mono mb-2">[ AWAITING_IMAGE_DATA ]</span>
              <span className="text-[10px] text-slate-500 font-mono">Save your photo as 'profile.jpeg' in the frontend/public folder.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
