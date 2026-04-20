import { motion } from "motion/react";
import { Code2, Palette, Globe, Zap, Database, Terminal, Shield, Brain } from "lucide-react";

const skills = [
  { name: "Programming & DSA", icon: <Code2 />, tech: "Python, Java, JavaScript, C", desc: "Solid foundation in OOPS, Data Structures, and efficient problem solving." },
  { name: "Web Development", icon: <Palette />, tech: "React, Next.js, Tailwind, PWA", desc: "Crafting modern interfaces and high-performance Progressive Web Apps." },
  { name: "Backend & APIs", icon: <Terminal />, tech: "Node.js, FastAPI, Django", desc: "Designing robust server-side logic and highly scalable RESTful APIs." },
  { name: "AI/ML & NLP", icon: <Brain />, tech: "LLM, RAG, Ollama, spaCy", desc: "Specializing in RAG architecture, LLM orchestration, and NLP workflows." },
  { name: "Security & DevOps", icon: <Shield />, tech: "AES-256, JWT, RBAC, Git", desc: "Ensuring data integrity with military-grade encryption and secure auth." },
  { name: "Databases & Vector DB", icon: <Database />, tech: "Postgres, MongoDB, ChromaDB", desc: "Expertise in both relational storage and Vector DBs for AI retrieval." },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4 block">Capabilities</span>
            <h2 className="text-5xl font-heading font-bold">The Tech Stack<span className="text-emerald-500">.</span></h2>
          </div>
          <p className="max-w-md text-gray-400">
            Selected tech that allows me to build fast, scalable, and reliable applications for my clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl group hover:bg-white/10 transition-all border-white/5 hover:border-emerald-500/20"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
              <p className="text-emerald-400/80 text-sm font-mono mb-4">{skill.tech}</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
