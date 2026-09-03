import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Recognition } from "@/components/sections/Recognition";
import { Contact } from "@/components/sections/Contact";
import { Nav } from "@/components/Nav";
import { resume } from "@/data/resume";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <Nav />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Recognition />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 border-t border-slate-900 bg-slate-950 text-center">
        <p className="text-slate-500 font-mono text-sm">
          &copy; {new Date().getFullYear()} {resume.name}. All rights reserved. 
        </p>
      </footer>
    </main>
  );
}
