import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "SecureVault | Encrypted Cloud Storage",
    image: "https://picsum.photos/seed/cyber-security-vault/800/600",
    tags: ["React", "AES-256", "Node.js"],
    desc: "Cloud-based encrypted file sharing with military-grade security standards.",
    problem: "Traditional cloud storage lacks client-side encryption and granular owner control.",
    solution: "Implemented AES-256 encryption-at-rest and on-the-fly decryption streams.",
    link: "https://github.com/BTKcreations",
  },
  {
    title: "ShopSmart AI | Intelligent E-commerce",
    image: "https://picsum.photos/seed/ai-shopping-smart/800/600",
    tags: ["Next.js", "OpenAI", "PostgreSQL"],
    desc: "Autonomous product discovery platform with AI-driven recommendations.",
    problem: "Users get overwhelmed by static categories and irrelevant suggestions.",
    solution: "Engineered an LLM-based system for context-aware, subcategory specific suggestions.",
    link: "https://github.com/BTKcreations",
  },
  {
    title: "Fact vs Fiction | AI Detection System",
    image: "https://picsum.photos/seed/fake-news-detector/800/600",
    tags: ["Python", "RAG", "ChromaDB"],
    desc: "Published Research: Distributed AI pipeline for misinformation detection.",
    problem: "Rapid spread of fake news across social platforms without verified grounding.",
    solution: "Built a 4-step pipeline integrating RAG (ChromaDB), web search, and LLM verdicts.",
    link: "https://github.com/BTKcreations",
  },
  {
    title: "Snooker Management System",
    image: "https://picsum.photos/seed/snooker-billiards-club/800/600",
    tags: ["Next.js", "Firebase", "Real-time"],
    desc: "Web-based billing and management solution for commercial centers.",
    problem: "Manual billing leading to human error and revenue tracking difficulties.",
    solution: "Next.js frontend with Firebase Realtime DB for automated sync and calculations.",
    link: "https://github.com/BTKcreations",
  },
  {
    title: "Multi App Dashboard | PWA",
    image: "https://picsum.photos/seed/productivity-dashboard-pwa/800/600",
    tags: ["PWA", "Service Workers", "OAuth"],
    desc: "Offline-capable modular dashboard with productivity tool integration.",
    problem: "Productivity loss due to tool fragmentation and poor offline access.",
    solution: "Modular PWA with service workers and zero-latency tool switching.",
    link: "https://github.com/BTKcreations",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4 block">Archive</span>
            <h2 className="text-5xl font-heading font-bold">Selected Works<span className="text-emerald-500">.</span></h2>
          </div>
          <button className="text-sm font-bold border-b border-emerald-500 pb-1 hover:text-emerald-500 transition-colors">
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col group"
            >
              <div className="relative overflow-hidden rounded-3xl mb-8 aspect-[4/3] glass border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                   <a href={project.link} className="w-12 h-12 bg-emerald-500 text-black flex items-center justify-center rounded-full hover:scale-110 transition-transform">
                      <ExternalLink size={20} />
                   </a>
                   <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-md text-white flex items-center justify-center rounded-full hover:scale-110 transition-transform font-bold">
                      <Github size={20} />
                   </a>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {project.desc}
              </p>

              <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
                <div className="text-xs">
                  <span className="text-white font-bold block mb-1">THE PROBLEM</span>
                  <p className="text-gray-500">{project.problem}</p>
                </div>
                <div className="text-xs">
                  <span className="text-emerald-500 font-bold block mb-1">THE SOLUTION</span>
                  <p className="text-gray-500">{project.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
