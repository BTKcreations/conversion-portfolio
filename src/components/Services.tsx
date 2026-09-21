import { motion } from "motion/react";
import { Check, ArrowRight, Brain, Terminal, Shield, Cpu, Layers, SearchCode } from "lucide-react";

const services = [
  {
    name: "AI & RAG Integration",
    icon: Brain,
    desc: "Integrating LLMs and RAG architecture into your existing workflows.",
    features: [
      "Vector DB Setup (ChromaDB)",
      "LLM Orchestration (Ollama/OpenAI)",
      "Smart Content Generation",
      "Context-Aware Chatbots",
    ],
    cta: "AI-automate my workflow",
    highlight: true,
  },
  {
    name: "Secure Full-Stack Apps",
    icon: Terminal,
    desc: "End-to-end development of scalable, high-performance web applications.",
    features: [
      "Next.js / React Frontend",
      "FastAPI / Node.js Backend",
      "Database Optimization",
      "Cloud Deployment (Docker)",
    ],
    cta: "Start building",
    highlight: false,
  },
  {
    name: "Cybersecurity & Logic",
    icon: Shield,
    desc: "Implementing military-grade security and authentication for your data.",
    features: [
      "AES-256 File Encryption",
      "RBAC & JWT Authentication",
      "Secure API Architecture",
      "System Integrity Audits",
    ],
    cta: "Secure my app",
    highlight: false,
  },
  {
    name: "Automation Scripts",
    icon: Cpu,
    desc: "Zero-touch workflows for repetitive digital tasks and data processing.",
    features: [
      "Python / Node.js Automation",
      "Custom Workflow Design",
      "API & Tool Integration",
      "Error Handling & Logging",
    ],
    cta: "Automate now",
    highlight: false,
  },
  {
    name: "Web Scraping & Data",
    icon: Layers,
    desc: "Large-scale data extraction from complex and dynamic websites.",
    features: [
      "Anti-Bot Bypass Solutions",
      "Dynamic Content Handling",
      "Structured Data Delivery",
      "Automated Monitoring",
    ],
    cta: "Extract data",
    highlight: false,
  },
  {
    name: "Reverse Engineering",
    icon: SearchCode,
    desc: "Deciphering logic from pre-built systems to understand architecture.",
    features: [
      "System Logic Analysis",
      "Architecture Reconstruction",
      "Binary/Code Decompression",
      "Security Vulnerability Discovery",
    ],
    cta: "Analyze system",
    highlight: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="container-site">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="eyebrow justify-center">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Premium solutions<span className="text-emerald-600">.</span>
          </h2>
          <p className="text-neutral-600 text-lg">
            High-end technical services leveraging Artificial Intelligence,
            Cybersecurity, and Advanced Web Engineering.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              className={`p-8 rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 ${
                service.highlight
                  ? "bg-neutral-950 text-white shadow-xl shadow-neutral-950/20"
                  : "card"
              }`}
            >
              {service.highlight && (
                <span className="absolute" />
              )}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${
                  service.highlight
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                <service.icon size={21} />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className={`text-sm leading-relaxed mb-6 ${service.highlight ? "text-neutral-400" : "text-neutral-600"}`}>
                {service.desc}
              </p>

              <ul className="space-y-3.5 mb-8 flex-grow">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 text-[13px] font-semibold ${
                      service.highlight ? "text-neutral-200" : "text-neutral-700"
                    }`}
                  >
                    <Check size={15} className={`mt-0.5 shrink-0 ${service.highlight ? "text-emerald-400" : "text-emerald-600"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full py-3.5 rounded-full text-[13px] font-bold flex items-center justify-center gap-2 group transition-all ${
                  service.highlight
                    ? "bg-emerald-500 text-neutral-950 hover:bg-emerald-400"
                    : "bg-neutral-100 text-neutral-900 hover:bg-neutral-950 hover:text-white"
                }`}
              >
                {service.cta}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
