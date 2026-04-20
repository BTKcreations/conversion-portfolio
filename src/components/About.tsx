import { motion } from "motion/react";
import profileImg from "../profile.png";

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">
              B.Tech in AI & ML <br />
              <span className="text-emerald-500 italic font-serif">Specialization at Holy Mary</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-400">
              <p>
                Motivated Software Engineer specializing in Artificial Intelligence and Machine Learning. 
                I offer a robust foundation in full-stack development, backend architecture, and algorithmic problem-solving.
              </p>
              <p>
                Committed to contributing to enterprise-scale environments while utilizing modern SDLC 
                and secure coding standards. I don't just build apps; I engineer high-performance systems.
              </p>
              <p>
                With a CGPA of 8.05 and published research in AI-driven misinformation detection, 
                I bring academic rigor to production-grade challenges.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass relative z-10 p-2">
               <img 
                src={profileImg} 
                alt="Tharun Kumar Budde" 
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 text-emerald-500/10 font-display text-9xl -z-0 select-none">
              ROI
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
