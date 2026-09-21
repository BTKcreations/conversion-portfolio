import { motion } from "motion/react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter Site",
    tagline: "For personal brands & landing pages",
    monthly: 149,
    priceNote: "one-time",
    features: [
      "1–3 page responsive website",
      "Modern UI with animations",
      "Contact form + WhatsApp integration",
      "Basic SEO & analytics setup",
      "Delivered in 5–7 days",
      "2 weeks free support",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Business Pro",
    tagline: "For growing companies & products",
    monthly: 499,
    priceNote: "starting from",
    features: [
      "Up to 8 pages + CMS-ready blog",
      "Custom design system & components",
      "AI chatbot / recommendation features",
      "Advanced SEO + performance audit",
      "Delivered in 2–3 weeks",
      "1 month priority support",
    ],
    cta: "Scale my business",
    popular: true,
  },
  {
    name: "AI Engineering",
    tagline: "For LLM apps & automation at scale",
    monthly: 999,
    priceNote: "project-based",
    features: [
      "RAG pipelines & vector search",
      "LLM agent workflows & integrations",
      "Secure backend + API architecture",
      "Deployment (Docker / cloud) included",
      "Dedicated timeline & SLA",
      "2 months maintenance included",
    ],
    cta: "Book a consultation",
    popular: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const priceFor = (p: (typeof plans)[number]) =>
    annual ? Math.round(p.monthly * 10) : p.monthly;

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-neutral-50 border-y border-neutral-200/70">
      <div className="container-site">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="eyebrow justify-center">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Transparent packages<span className="text-emerald-600">.</span>
          </h2>
          <p className="text-neutral-600 text-lg">
            Clear scope, clear price. Every engagement includes direct
            communication with me — no middlemen, no surprises.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm font-semibold ${!annual ? "text-neutral-950" : "text-neutral-400"}`}>
            Per project
          </span>
          <button
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-7 rounded-full transition-colors ${annual ? "bg-emerald-600" : "bg-neutral-300"}`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow ${annual ? "right-1" : "left-1"}`}
            />
          </button>
          <span className={`text-sm font-semibold ${annual ? "text-neutral-950" : "text-neutral-400"}`}>
            Retainer <span className="text-emerald-700 font-bold">(save ~17%)</span>
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                plan.popular
                  ? "bg-neutral-950 text-white shadow-2xl shadow-neutral-950/25 lg:scale-[1.04]"
                  : "card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-emerald-500 text-neutral-950 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                  <Sparkles size={12} /> Most popular
                </span>
              )}

              <h3 className="text-xl font-bold mb-1.5">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? "text-neutral-400" : "text-neutral-500"}`}>
                {plan.tagline}
              </p>

              <div className="mb-7">
                <span className={`text-[11px] uppercase tracking-widest font-bold block mb-1 ${plan.popular ? "text-neutral-500" : "text-neutral-400"}`}>
                  {plan.priceNote}
                </span>
                <span className="text-[2.6rem] leading-none font-heading font-bold">
                  ${priceFor(plan)}
                </span>
                {annual && <span className="text-sm font-medium opacity-60"> /mo</span>}
                {!annual && <span className="text-sm font-medium opacity-60"> USD</span>}
              </div>

              <ul className="space-y-3.5 mb-9 flex-grow">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-start gap-3 text-sm ${plan.popular ? "text-neutral-200" : "text-neutral-700"}`}>
                    <span className={`mt-0.5 shrink-0 w-4.5 h-4.5 rounded-full grid place-items-center ${plan.popular ? "bg-emerald-500/20" : "bg-emerald-100"}`}>
                      <Check size={11} className={plan.popular ? "text-emerald-400" : "text-emerald-700"} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 group transition-all ${
                  plan.popular
                    ? "bg-emerald-500 text-neutral-950 hover:bg-emerald-400"
                    : "bg-neutral-950 text-white hover:bg-emerald-600"
                }`}
              >
                {plan.cta}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-neutral-500 mt-10">
          Need something custom? <a href="#contact" className="font-bold text-emerald-700 hover:underline">Let's talk</a> —
          I tailor scopes to your exact needs and budget.
        </p>
      </div>
    </section>
  );
}
