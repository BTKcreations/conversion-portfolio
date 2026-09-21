import { motion } from "motion/react";
import {
  GraduationCap,
  BookMarked,
  MapPin,
  Languages,
  Briefcase,
} from "lucide-react";

const facts = [
  { icon: GraduationCap, label: "Education", value: "B.Tech — AI & ML, Holy Mary (CGPA 8.05)" },
  { icon: BookMarked, label: "Research", value: "Published — AI misinformation detection (RAG)" },
  { icon: Briefcase, label: "Focus", value: "LLM apps · Secure backends · Web platforms" },
  { icon: MapPin, label: "Based in", value: "Hyderabad, India · Remote worldwide" },
  { icon: Languages, label: "Languages", value: "English · Telugu · Hindi" },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">About me</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-7">
              Engineer first. <span className="text-gradient">AI specialist</span> by craft.
            </h2>

            <div className="space-y-5 text-neutral-600 text-[17px] leading-relaxed">
              <p>
                Motivated software engineer specializing in Artificial Intelligence and
                Machine Learning, with a robust foundation in full-stack development,
                backend architecture, and algorithmic problem-solving.
              </p>
              <p>
                I don't just build apps — I engineer high-performance systems with
                modern SDLC practices and secure coding standards, ready for
                enterprise-scale environments.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">See my work</a>
              <a href="#contact" className="btn-secondary">Get in touch</a>
            </div>
          </motion.div>

          {/* Quick facts card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="card p-8 lg:p-9"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2.5">
              <span className="w-1.5 h-6 rounded-full bg-emerald-600" />
              Quick facts
            </h3>
            <ul className="space-y-5">
              {facts.map((f) => (
                <li key={f.label} className="flex gap-4">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center">
                    <f.icon size={19} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      {f.label}
                    </p>
                    <p className="text-[15px] font-medium text-neutral-800 mt-0.5">{f.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
