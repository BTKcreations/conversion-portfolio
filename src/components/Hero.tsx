import { motion } from "motion/react";
import { ArrowDown, Briefcase } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-emerald-400 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-[12vw] md:text-[8vw] lg:text-[112px] leading-[0.9] text-white uppercase mb-8"
        >
          Tharun<span className="text-emerald-500">.</span> <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">AI & Full Stack.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12"
        >
          Specializing in AI/ML & Scalable Backend Systems. Building secure, intelligent, and performance-optimized digital assets for global scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto bg-emerald-500 text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all hover:scale-105"
          >
            <Briefcase size={20} />
            Hire Me Now
          </a>
          <a
            href="#projects"
            className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
