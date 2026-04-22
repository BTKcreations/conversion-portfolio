import { motion } from "motion/react";
import { Check, ArrowRight, Brain, Shield, Terminal, Globe, Cpu, Layers, SearchCode } from "lucide-react";

const services = [
  {
    name: "AI & RAG Integration",
    icon: <Brain className="w-6 h-6" />,
    desc: "Integrating LLMs and RAG architecture into your existing workflows.",
    features: [
      "Vector DB Setup (ChromaDB)",
      "LLM Orchestration (Ollama/OpenAI)",
      "Smart Content Generation",
      "Context-Aware Chatbots"
    ],
    cta: "AI Automate Me",
    highlight: true,
  },
  {
    name: "Secure Full-Stack Apps",
    icon: <Terminal className="w-6 h-6" />,
    desc: "End-to-end development of scalable, high-performance web applications.",
    features: [
      "Next.js / React Frontend",
      "FastAPI / Node.js Backend",
      "Database Optimization",
      "Cloud Deployment (Docker)"
    ],
    cta: "Start Building",
    highlight: false,
  },
  {
    name: "Cybersecurity & Logic",
    icon: <Shield className="w-6 h-6" />,
    desc: "Implementing military-grade security and authentication for your data.",
    features: [
      "AES-256 File Encryption",
      "RBAC & JWT Authentication",
      "Secure API Architecture",
      "System Integrity Audits"
    ],
    cta: "Secure My App",
    highlight: false,
  },
  {
    name: "Automation Scripts",
    icon: <Cpu className="w-6 h-6" />,
    desc: "Zero-touch workflows for repetitive digital tasks and data processing.",
    features: [
      "Python / Node.js Automation",
      "Custom Workflow Design",
      "API & Tool Integration",
      "Error Handling & Logging"
    ],
    cta: "Automate Now",
    highlight: false,
  },
  {
    name: "Web Scraping & Data",
    icon: <Layers className="w-6 h-6" />,
    desc: "Large-scale data extraction from complex and dynamic websites.",
    features: [
      "Anti-Bot Bypass Solutions",
      "Dynamic Content Handling",
      "Structured Data Delivery",
      "Automated Monitoring"
    ],
    cta: "Extract Data",
    highlight: false,
  },
  {
    name: "Reverse Engineering",
    icon: <SearchCode className="w-6 h-6" />,
    desc: "Deciphering logic from pre-built systems to understand architecture.",
    features: [
      "System Logic Analysis",
      "Architecture Reconstruction",
      "Binary/Code Decompression",
      "Security Vulnerability Discovery"
    ],
    cta: "Analyze System",
    highlight: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4 block">Expertise</span>
          <h2 className="text-5xl font-heading font-bold mb-6">Premium Solutions<span className="text-emerald-500">.</span></h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            High-end technical services leveraging Artificial Intelligence, 
            Cybersecurity, and Advanced Web Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[32px] flex flex-col transition-all duration-500 hover:translate-y-[-10px] ${
                service.highlight 
                  ? 'bg-emerald-500 text-black shadow-[0_20px_50px_rgba(16,185,129,0.2)]' 
                  : 'glass border-white/5 text-white hover:bg-white/10'
              }`}
            >
              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                  service.highlight ? 'bg-black/10' : 'bg-emerald-500/10 text-emerald-500'
                }`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className={`text-sm leading-relaxed ${service.highlight ? 'text-black/70' : 'text-gray-400'}`}>
                  {service.desc}
                </p>
              </div>


              <ul className="space-y-4 mb-10 flex-grow">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3 text-xs font-bold uppercase tracking-tight">
                    <Check size={14} className={`mt-0.5 ${service.highlight ? 'text-black' : 'text-emerald-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group transition-all ${
                  service.highlight 
                    ? 'bg-black text-white hover:shadow-2xl' 
                    : 'bg-white/10 text-white hover:bg-emerald-500 hover:text-black'
                }`}
              >
                {service.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
