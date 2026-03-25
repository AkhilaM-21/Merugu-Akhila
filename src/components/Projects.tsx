"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Little Hearts Foundation",
    description: "Designed and developed a fully responsive, mobile-first website for a non-profit empowering orphaned and disabled children.",
    highlights: [
      "Integrated Razorpay Checkout for seamless donations via UPI, debit/credit card & digital wallets",
      "Built mobile-first UI using HTML and Bootstrap",
      "Handled full production deployment on Hostinger — DNS setup, SSL & go-live"
    ],
    tech: ["HTML", "Bootstrap", "Node.js", "Razorpay", "Hostinger"],
    url: "https://littleheartsfoundations.com"
  },
  {
    name: "Dating Web App",
    description: "Built a full-featured dating application from scratch — solo project, zero to production.",
    highlights: [
      "Card-based profile swiping with smooth gesture interactions",
      "Google & email-based authentication with secure session management",
      "Profile creation with photo uploads, bio & interest tags",
      "Smart filters for age, location & preferences",
      "Real-time match notifications & in-app chat via Socket.IO"
    ],
    tech: ["React.js", "Node.js", "MongoDB", "Socket.IO"]
  },
  {
    name: "ENV Safe Solutions",
    description: "Developed a professional business website for an environmental solutions company — design to deployment.",
    highlights: [
      "Responsive layouts using Bootstrap & Tailwind CSS",
      "Backend setup, DNS configuration & production hosting on GoDaddy",
      "Clean corporate UI to establish brand credibility online"
    ],
    tech: ["HTML", "Bootstrap", "Tailwind CSS", "GoDaddy"],
    url: "https://envsafesolutions.com"
  },
  {
    name: "Tradotsav",
    description: "Developed the frontend interface for a SEBI-registered stock advisory platform serving retail investors in Hyderabad.",
    highlights: [
      "Trust-focused, compliance-friendly UI communicating regulatory credibility",
      "Responsive design optimized for desktop & mobile investors",
      "Clean information architecture to present advisory services clearly"
    ],
    tech: ["React.js", "HTML", "CSS", "Bootstrap"]
  },
  {
    name: "Employee Portal",
    description: "Architected and shipped a production-grade internal employee portal used by 50+ employees.",
    highlights: [
      "JWT authentication & RBAC for multi-tier secure access",
      "Attendance tracking, role-based dashboards & internal workflows",
      "Real-time chat & announcements via Socket.IO",
      "Scalable REST APIs built with FastAPI and MongoDB"
    ],
    tech: ["React.js", "FastAPI", "MongoDB", "Socket.IO", "JWT", "Python"],
    associated: "ShowTime Consulting"
  },
  {
    name: "Social Media Analytics Dashboard",
    description: "Built an internal analytics tool integrated within the employee portal.",
    highlights: [
      "Live unified dashboard for Instagram, YouTube & Facebook metrics",
      "AWS-powered backend for real-time data fetching, scraping & processing",
      "Enabled teams to track trends & measure campaign ROI in one view"
    ],
    tech: ["React.js", "FastAPI", "MongoDB", "AWS", "Python"],
    associated: "ShowTime Consulting"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-white/40 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/60 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm flex flex-col h-full"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-slate-800 line-clamp-2">{project.name}</h3>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-2 text-purple-600 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors flex-shrink-0">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {project.associated && (
                    <p className="text-sm font-semibold text-pink-600 mb-4 bg-pink-50 inline-block px-3 py-1 rounded-full border border-pink-100">
                      {project.associated}
                    </p>
                  )}

                  <p className="text-slate-600 mb-6 font-medium">
                    {project.description}
                  </p>

                  <ul className="space-y-2 mb-8 text-sm text-slate-700 marker:text-purple-400 list-disc list-inside">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="leading-relaxed">
                        <span className="inline">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto relative z-10 pt-6 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100 shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}