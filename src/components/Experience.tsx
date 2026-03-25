"use client";

import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-gradient-to-br from-slate-50/80 to-purple-50/80 backdrop-blur-md">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            Experience
          </h2>

          <div className="bg-white/70 p-8 rounded-3xl shadow-xl backdrop-blur-sm border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Full Stack Developer</h3>
                <h4 className="text-xl text-purple-600 font-semibold mb-2">ShowTime Consulting</h4>
                <p className="text-slate-500">Hyderabad, Telangana, India (On-site)</p>
              </div>
              <span className="inline-block px-4 py-2 mt-4 md:mt-0 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full font-bold shadow-sm">
                Aug 2025 – Present
              </span>
            </div>

            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              Building and maintaining production-grade internal tools and portals for the company.
            </p>

            <div className="space-y-8">
              <div className="border-l-4 border-purple-400 pl-6 py-2">
                <h5 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="text-purple-600">🔐</span> Employee Portal
                </h5>
                <ul className="list-disc list-inside space-y-2 text-slate-700 marker:text-purple-400">
                  <li>Architected a secure employee portal with login, attendance tracking & role-based dashboards.</li>
                  <li>Implemented JWT authentication + RBAC to protect sensitive data across user tiers.</li>
                  <li>Built real-time internal chat & announcements using Socket.IO.</li>
                  <li>Designed scalable REST APIs with FastAPI and MongoDB.</li>
                </ul>
              </div>

              <div className="border-l-4 border-pink-400 pl-6 py-2">
                <h5 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="text-pink-600">📊</span> Social Media Analytics Dashboard
                </h5>
                <ul className="list-disc list-inside space-y-2 text-slate-700 marker:text-pink-400">
                  <li>Built a live unified dashboard tracking Instagram, YouTube & Facebook metrics in one place.</li>
                  <li>Implemented AWS-powered backend services for real-time data fetching, scraping & processing.</li>
                  <li>Enabled teams to monitor trends & measure campaign ROI from a single interface.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-2">
              {['React.js', 'FastAPI', 'MongoDB', 'Node.js', 'Socket.IO', 'JWT', 'AWS', 'REST APIs'].map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full font-medium border border-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}