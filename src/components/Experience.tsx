import { motion } from "motion/react";
import { Briefcase, Calendar, Check } from "lucide-react";

const experiences = [
  {
    company: "HackersDaddy Cyber Security Solutions Ltd",
    role: "Software Developer Intern",
    date: "Oct 2024 – Oct 2025",
    points: [
      "Executed development tasks for cybersecurity-centric projects, focusing on system integrity and backend scalability.",
      "Collaborated on backend feature implementation and rigorous debugging to ensure high uptime.",
      "Applied advanced secure coding standards and contributed to end-to-end deployment activities.",
    ],
  },
  {
    company: "Academor",
    role: "Artificial Intelligence Intern",
    date: "Jul 2023 – Aug 2023",
    points: [
      "Designed and implemented foundational machine learning models for data classification problems.",
      "Evaluated model performance through optimization techniques and rigorous data preprocessing.",
      "Gained expertise in AI workflows: collection, cleaning, and feature engineering.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32">
      <div className="container-site">
        <div className="mb-14">
          <span className="eyebrow">Professional journey</span>
          <h2 className="text-4xl md:text-5xl font-bold">Experience<span className="text-emerald-600">.</span></h2>
        </div>

        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-neutral-200" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className="relative pl-16"
              >
                {/* Node */}
                <span className="absolute left-0 top-1.5 w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-sm grid place-items-center text-emerald-700">
                  <Briefcase size={18} />
                </span>

                <div className="card p-7 lg:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-emerald-700 font-semibold text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 bg-neutral-100 border border-neutral-200 px-3.5 py-1.5 rounded-full w-fit">
                      <Calendar size={13} />
                      {exp.date}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {exp.points.map((point, idx) => (
                      <li key={idx} className="flex gap-3 text-neutral-600 text-[15px] leading-relaxed">
                        <Check size={16} className="text-emerald-600 mt-1 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
