import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import securevaultImg from "../assets/securevault.png";
import shopsmartImg from "../assets/shopsmart.png";
import factVsFictionImg from "../assets/fact_vs_fiction.png";
import snookerImg from "../assets/snooker.png";
import dashboardImg from "../assets/dashboard.png";

const projects = [
  {
    title: "SecureVault | Encrypted Cloud Storage",
    image: securevaultImg,
    tags: ["React", "AES-256", "Node.js"],
    desc: "Cloud-based encrypted file sharing with military-grade security standards.",
    problem: "Traditional cloud storage lacks client-side encryption and granular owner control.",
    solution: "Implemented AES-256 encryption-at-rest and on-the-fly decryption streams.",
    link: "https://github.com/BTKcreations",
  },
  {
    title: "ShopSmart AI | Intelligent E-commerce",
    image: shopsmartImg,
    tags: ["Next.js", "OpenAI", "PostgreSQL"],
    desc: "Autonomous product discovery platform with AI-driven recommendations.",
    problem: "Users get overwhelmed by static categories and irrelevant suggestions.",
    solution: "Engineered an LLM-based system for context-aware, subcategory-specific suggestions.",
    link: "https://github.com/BTKcreations",
  },
  {
    title: "Fact vs Fiction | AI Detection System",
    image: factVsFictionImg,
    tags: ["Python", "RAG", "ChromaDB"],
    desc: "Published research: distributed AI pipeline for misinformation detection.",
    problem: "Rapid spread of fake news across social platforms without verified grounding.",
    solution: "Built a 4-step pipeline integrating RAG (ChromaDB), web search, and LLM verdicts.",
    link: "https://github.com/BTKcreations",
  },
  {
    title: "Snooker Management System",
    image: snookerImg,
    tags: ["Next.js", "Firebase", "Real-time"],
    desc: "Web-based billing and management solution for commercial centers.",
    problem: "Manual billing leading to human error and revenue tracking difficulties.",
    solution: "Next.js frontend with Firebase Realtime DB for automated sync and calculations.",
    link: "https://github.com/BTKcreations",
  },
  {
    title: "Multi App Dashboard | PWA",
    image: dashboardImg,
    tags: ["PWA", "Service Workers", "OAuth"],
    desc: "Offline-capable modular dashboard with productivity tool integration.",
    problem: "Productivity loss due to tool fragmentation and poor offline access.",
    solution: "Modular PWA with service workers and zero-latency tool switching.",
    link: "https://github.com/BTKcreations",
  },
];

export default function Projects() {
  const featured = projects[0];
  const others = projects.slice(1);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-neutral-50 border-y border-neutral-200/70">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Projects that <span className="text-gradient">ship results</span>.
            </h2>
          </div>
          <a
            href="https://github.com/BTKcreations"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0"
          >
            <Github size={16} /> All projects on GitHub
          </a>
        </div>

        {/* Featured project */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="card overflow-hidden mb-8 !hover:-translate-y-0"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-neutral-100 min-h-[280px]">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-5 left-5 bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                Featured
              </span>
            </div>
            <div className="p-8 lg:p-10 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {featured.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-3">{featured.title}</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">{featured.desc}</p>

              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">The problem</p>
                  <p className="text-[13px] text-neutral-600 leading-relaxed">{featured.problem}</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-1.5">The solution</p>
                  <p className="text-[13px] text-neutral-700 leading-relaxed">{featured.solution}</p>
                </div>
              </div>

              <div className="mt-auto flex gap-3">
                <a href={featured.link} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5 text-[13px]">
                  View case study <ArrowUpRight size={15} />
                </a>
                <a href="https://github.com/BTKcreations" target="_blank" rel="noopener noreferrer" className="btn-secondary !py-2.5 text-[13px]">
                  <Github size={15} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other projects */}
        <div className="grid md:grid-cols-2 gap-8">
          {others.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 2) * 0.1, duration: 0.55 }}
              className="card overflow-hidden group flex flex-col"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity w-11 h-11 bg-white rounded-full grid place-items-center shadow-lg">
                    <ArrowUpRight size={18} className="text-neutral-900" />
                  </span>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2.5 group-hover:text-emerald-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-5">{project.desc}</p>

                <div className="mt-auto pt-5 border-t border-neutral-100 grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Problem</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-1">Solution</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">{project.solution}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
