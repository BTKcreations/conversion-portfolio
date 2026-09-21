import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Tharun delivered our encrypted storage platform ahead of schedule. The attention to security detail was exceptional — he thinks like an attacker so you don't have to.",
    name: "Project Lead",
    role: "Cybersecurity Firm",
    initials: "HK",
    accent: "bg-emerald-600",
  },
  {
    quote:
      "The AI recommendation system he built lifted our engagement noticeably within weeks. Clear communication, clean code, and honest timelines throughout.",
    name: "Founder",
    role: "E-commerce Startup",
    initials: "SS",
    accent: "bg-teal-600",
  },
  {
    quote:
      "From research to production pipeline, he handled our misinformation-detection project with real academic rigor. Rare combination of depth and delivery.",
    name: "Research Supervisor",
    role: "Academic Collaboration",
    initials: "FF",
    accent: "bg-neutral-950",
  },
];

const trustLogos = [
  "HackersDaddy", "Academor", "Holy Mary", "GitHub", "Zoho", "Render", "Vercel", "GoDaddy",
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="container-site">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="eyebrow justify-center">Social proof</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Trusted by teams<span className="text-emerald-600">.</span>
          </h2>
          <p className="text-neutral-600 text-lg">
            What clients and collaborators say about working with me.
          </p>
        </div>

        {/* Logo strip */}
        <div className="marquee-mask overflow-hidden mb-14">
          <div className="flex gap-10 w-max animate-marquee items-center">
            {[...trustLogos, ...trustLogos].map((logo, i) => (
              <span key={i} className="whitespace-nowrap text-lg font-heading font-bold text-neutral-300">
                {logo}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name + i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="card p-8 flex flex-col"
            >
              <Quote size={26} className="text-emerald-600 mb-5" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-[15px] text-neutral-700 leading-relaxed flex-grow">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-7 pt-6 border-t border-neutral-100 flex items-center gap-3.5">
                <span className={`w-11 h-11 rounded-full ${t.accent} text-white grid place-items-center text-sm font-bold`}>
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
  </div>
      </div>
    </section>
  );
}
