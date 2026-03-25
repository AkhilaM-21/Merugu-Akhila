"use client";

import { motion } from "framer-motion";

const skills = [
  "React.js", "Node.js", "FastAPI", "MongoDB", "REST API Design",
  "JavaScript", "HTML5", "CSS3", "Express.js", "Tailwind CSS",
  "Bootstrap", "MySQL", "Socket.IO", "AWS", "Razorpay Payment Integration",
  "JWT Authentication", "Role-Based Access Control (RBAC)", "Git"
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white/40 backdrop-blur-md">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            About Me
          </h2>

          <div className="bg-white/60 p-8 rounded-3xl shadow-xl backdrop-blur-sm border border-white/50">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              I&apos;m a Full Stack Developer based in Hyderabad, building production-ready web applications end to end — from clean, responsive React UIs to scalable FastAPI and Node.js backends.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-10">
              I care about clean code, fast APIs, and interfaces that actually make sense to users. Open to freelance projects & full-time opportunities.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-6">Top Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow hover:scale-105"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <hr className="my-12 border-slate-200" />

            <h3 className="text-2xl font-bold text-slate-800 mb-6">Education</h3>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white/50 rounded-2xl border border-white">
                <div>
                  <h4 className="text-xl font-bold text-slate-800">B.Tech in Computer Science</h4>
                  <p className="text-slate-600">Malla Reddy Institute of Engineering and Technology | JNTU, Hyderabad</p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-semibold">2019 - 2023</span>
                  <p className="text-slate-500 font-medium mt-1">CGPA: 8.2 / 10</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}