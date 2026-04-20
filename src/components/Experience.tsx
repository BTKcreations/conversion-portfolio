import { motion } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "HackersDaddy Cyber Security Solutions Ltd",
    role: "Intern Developer",
    date: "Oct 2024 – Oct 2025",
    points: [
      "Executed development tasks for cybersecurity-centric projects, focusing on system integrity and backend scalability.",
      "Collaborated on backend feature implementation and rigorous debugging to ensure high uptime.",
      "Applied advanced secure coding standards and contributed to end-to-end deployment activities."
    ]
  },
  {
    company: "Academor",
    role: "Artificial Intelligence Intern",
    date: "July 2023 – Aug 2023",
    points: [
      "Designed and implemented foundational machine learning models for data classification problems.",
      "Evaluated model performance through optimization techniques and rigorous data preprocessing.",
      "Gained expertise in AI workflows: collection, cleaning, and feature engineering."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4 block">Professional Journey</span>
            <h2 className="text-5xl font-heading font-bold">Experience<span className="text-emerald-500">.</span></h2>
          </div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 md:p-12 rounded-[32px] border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-emerald-500/10 transition-colors">
                <Briefcase size={120} />
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                    <p className="text-emerald-500 font-bold">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-bold bg-white/5 px-4 py-2 rounded-full w-fit">
                    <Calendar size={16} />
                    {exp.date}
                  </div>
                </div>

                <ul className="space-y-4">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="flex gap-4 text-gray-400 leading-relaxed">
                      <span className="text-emerald-500 mt-1.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
