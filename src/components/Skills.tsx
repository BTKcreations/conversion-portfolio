import { motion } from "motion/react";
import { Code2, Palette, Terminal, Shield, Brain, Database } from "lucide-react";

const skills = [
  { name: "Programming & DSA", icon: Code2, tech: "Python · Java · JavaScript · C", desc: "Solid foundation in OOPS, data structures, and efficient problem solving." },
  { name: "Web Development", icon: Palette, tech: "React · Next.js · Tailwind · PWA", desc: "Crafting modern interfaces and high-performance Progressive Web Apps." },
  { name: "Backend & APIs", icon: Terminal, tech: "Node.js · FastAPI · Django", desc: "Designing robust server-side logic and highly scalable RESTful APIs." },
  { name: "AI/ML & NLP", icon: Brain, tech: "LLM · RAG · Ollama · spaCy", desc: "Specializing in RAG architecture, LLM orchestration, and NLP workflows." },
  { name: "Security & DevOps", icon: Shield, tech: "AES-256 · JWT · RBAC · Git", desc: "Ensuring data integrity with strong encryption and secure auth patterns." },
  { name: "Databases & Vector DB", icon: Database, tech: "Postgres · MongoDB · ChromaDB", desc: "Expertise in relational storage and vector DBs for AI retrieval." },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32 bg-neutral-50 border-y border-neutral-200/70">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="eyebrow">Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold">The tech stack<span className="text-emerald-600">.</span></h2>
          </div>
          <p className="max-w-md text-neutral-600">
            Selected technology that lets me build fast, scalable, and reliable applications for my clients.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              className="card p-7 group"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <skill.icon size={21} />
              </div>
              <h3 className="text-lg font-bold mb-1.5">{skill.name}</h3>
              <p className="text-emerald-700 text-[13px] font-mono mb-3">{skill.tech}</p>
              <p className="text-neutral-600 text-sm leading-relaxed">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
