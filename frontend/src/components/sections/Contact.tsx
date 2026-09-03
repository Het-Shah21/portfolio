"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to transmit");
      
      setStatus("success");
      setMessage("Transmission successful. Your message has been queued.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setMessage("Transmission failed. Please check network connection or verify the FastAPI backend is running.");
    }
  };

  return (
    <section id="contact" className="py-24 container mx-auto px-6 border-t border-slate-900 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="bg-slate-900 border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-500" />
          <CardHeader>
            <CardTitle className="text-3xl text-white font-serif mb-2">Get in Touch.</CardTitle>
            <p className="text-slate-400 font-sans">Send me a message to discuss opportunities.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase">NAME</label>
                <Input name="name" required placeholder="Your Name" className="bg-slate-950 border-slate-800 text-white font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase">EMAIL</label>
                <Input name="email" type="email" required placeholder="you@example.com" className="bg-slate-950 border-slate-800 text-white font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase">MESSAGE</label>
                <Textarea name="message" required placeholder="Your message..." className="bg-slate-950 border-slate-800 text-white min-h-[120px] font-mono" />
              </div>
              
              <Button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-mono uppercase tracking-widest"
              >
                {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
              </Button>

              {message && (
                <p className={`text-sm font-mono text-center mt-4 ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                  {message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
