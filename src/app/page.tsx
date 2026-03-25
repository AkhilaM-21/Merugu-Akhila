import Background from "@/components/Background";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-purple-300 selection:text-purple-900">
      <Background />
      <Hero />
      <About />
      <Experience />
      <Projects />

      <footer className="py-8 text-center text-slate-500 bg-white/40 backdrop-blur-md">
        <p>© {new Date().getFullYear()} Merugu Akhila. Built with Next.js, Tailwind CSS & Three.js.</p>
      </footer>
    </main>
  );
}