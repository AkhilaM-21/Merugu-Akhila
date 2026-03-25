"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-6"
        >
          <div>
            <motion.h1
              className="text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Merugu Akhila
            </motion.h1>
            <motion.h2
              className="text-2xl lg:text-3xl font-mono text-slate-700"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Full Stack Developer
            </motion.h2>
          </div>

          <motion.p
            className="text-lg text-slate-600 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            I build production-ready web apps end to end — from clean React UIs to scalable FastAPI/Node.js backends. Specializing in real-time systems, REST APIs, and modern frontends.
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a href="https://github.com/AkhilaM-21" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-slate-700 hover:text-purple-600">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/akhila-m21" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-slate-700 hover:text-blue-600">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:merugu.akhila21@gmail.com" className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-slate-700 hover:text-red-500">
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white/50 shadow-2xl backdrop-blur-sm bg-gradient-to-tr from-purple-100 to-pink-100">
            <Image
              src="/avatar.png"
              alt="Akhila Merugu"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}