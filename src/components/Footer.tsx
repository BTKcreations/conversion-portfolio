import { Github, Twitter, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";

const socials = [
  { Icon: Github, href: "https://github.com/BTKcreations", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/budde-tharunkumar-362296261/", label: "LinkedIn" },
  { Icon: Twitter, href: "https://x.com/", label: "X / Twitter" },
  { Icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
  { Icon: Mail, href: "mailto:buddetharunkumar123@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 pt-16 pb-8">
      <div className="container-site">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 pb-12 border-b border-white/10">
          <div className="text-center md:text-left">
            <a href="#top" className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-lg bg-white text-neutral-950 grid place-items-center font-heading font-bold text-sm">
                TK
              </span>
              <span className="font-heading font-semibold tracking-tight text-lg text-white">
                Tharun Kumar
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed">
              Full-Stack &amp; AI Engineer building intelligent, production-grade
              software for teams worldwide.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {["About", "Skills", "Work", "Services", "Pricing", "FAQ", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase() === "work" ? "projects" : item.toLowerCase()}`}
                className="text-sm font-medium hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center hover:bg-emerald-500 hover:text-neutral-950 hover:border-emerald-500 transition-all"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © 2026 Tharun Kumar — bstk.in. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-neutral-600">
              Designed &amp; built with ♥ in Hyderabad
            </span>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              Back to top <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
