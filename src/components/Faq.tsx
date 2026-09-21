import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What does a typical project timeline look like?",
    a: "A landing page usually takes 5–7 days. Full business websites run 2–3 weeks including revisions. AI/LLM projects vary by scope — after our first call I'll give you a concrete milestone plan with delivery dates.",
  },
  {
    q: "How do we communicate during the project?",
    a: "Directly with me — via WhatsApp, email, or scheduled calls. You get progress updates at every milestone, and a staging link you can review throughout. No account managers, no lost messages.",
  },
  {
    q: "Can you work with my existing codebase?",
    a: "Absolutely. I regularly audit, refactor, and extend existing React/Node/FastAPI projects. I'll start with a short technical assessment so you know exactly what needs fixing vs. what can stay.",
  },
  {
    q: "Do you provide AI features like chatbots?",
    a: "Yes — that's my specialty. RAG pipelines over your own data, context-aware chatbots, recommendation engines, and automation agents. This very site has a live AI assistant you can try right now.",
  },
  {
    q: "What about hosting, domains, and deployment?",
    a: "Handled end-to-end. I deploy to GitHub Pages, Vercel, Render, or your own VPS with Docker, configure DNS and SSL, and set up analytics — you get a fully live product, not just code.",
  },
  {
    q: "What if I need changes after delivery?",
    a: "Every package includes free support (2 weeks to 2 months depending on tier). After that, I offer flexible maintenance retainers or one-off update sprints at transparent rates.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-neutral-50 border-y border-neutral-200/70">
      <div className="container-site">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Questions,<br />answered<span className="text-emerald-600">.</span>
            </h2>
            <p className="text-neutral-600 text-lg mb-8">
              Everything clients usually ask before we start. Something else on
              your mind?
            </p>
            <a href="#contact" className="btn-secondary">
              <MessageCircle size={16} />
              Ask me directly
            </a>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                  className={`rounded-2xl border transition-colors overflow-hidden ${
                    isOpen ? "bg-white border-neutral-300 shadow-md" : "bg-white/60 border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  >
                    <span className="font-semibold text-[15px] text-neutral-900">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`shrink-0 w-8 h-8 rounded-full grid place-items-center ${isOpen ? "bg-emerald-600 text-white" : "bg-neutral-100 text-neutral-500"}`}
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="px-6 pb-6 text-[15px] text-neutral-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
