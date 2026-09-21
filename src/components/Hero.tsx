import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import TiltProfile from "./TiltProfile";

const stats = [
  { value: "15+", label: "Projects Delivered" },
  { value: "3+", label: "Years Experience" },
  { value: "8.05", label: "CGPA (AI & ML)" },
  { value: "100%", label: "Client Satisfaction" },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "FastAPI", "Python",
  "PostgreSQL", "MongoDB", "ChromaDB", "Docker", "Tailwind CSS", "OpenAI", "RAG",
];

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      {/* Dotted grid background */}
      <div className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black_35%,transparent_100%)]" />
      {/* Soft emerald glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-200/40 blur-[140px] rounded-full -z-0" />

      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 pl-2 pr-4 py-1.5 bg-white border border-neutral-200 rounded-full shadow-sm text-[13px] font-medium text-neutral-700 mb-7"
            >
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold text-xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
                </span>
                Available
              </span>
              for freelance & full-time roles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-5xl md:text-6xl lg:text-[4.4rem] font-heading font-bold leading-[1.05] tracking-tight mb-6"
            >
              Building intelligent,
              <br />
              <span className="text-gradient">production-grade</span> software.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9"
            >
              I'm <strong className="text-neutral-900 font-semibold">Tharun Kumar</strong> — a
              Full-Stack &amp; AI Engineer specializing in LLM applications, secure
              backend systems, and high-performance web apps that turn ideas
              into reliable products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-12"
            >
              <a href="#contact" className="btn-primary w-full sm:w-auto">
                <Sparkles size={17} />
                Start a Project
              </a>
              <a
                href="https://docs.google.com/document/d/1uDUjIq4mxVX2SChuHV9Ls01atF7hmjWgOQJTd1O4FCk/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto"
              >
                View Résumé <ArrowUpRight size={16} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl mx-auto lg:mx-0"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl font-heading font-bold text-neutral-950">{s.value}</dd>
                  <dd className="text-xs font-medium text-neutral-500 mt-1 uppercase tracking-wide">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right: interactive 3D profile card */}
          <TiltProfile />
        </div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-16 lg:mt-20"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-6">
            Technologies I work with
          </p>
          <div className="marquee-mask overflow-hidden">
            <div className="flex gap-3 w-max animate-marquee">
              {[...techStack, ...techStack].map((tech, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap px-4 py-2 rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-14 flex justify-center"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-1.5 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
            <ArrowDown size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
