import { motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Journey", href: "#experience" },
  { name: "Work", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-neutral-200/80 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-neutral-950 text-white grid place-items-center font-heading font-bold text-sm group-hover:bg-emerald-600 transition-colors">
            TK
          </span>
          <span className="font-heading font-semibold tracking-tight text-lg">
            Tharun Kumar
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1 bg-neutral-100/80 border border-neutral-200/70 rounded-full px-2 py-1.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-950 hover:bg-white transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#faq"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
          >
            FAQ
          </a>
          <a href="#contact" className="btn-primary !px-5 !py-2 text-[13px]">
            Hire Me <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="lg:hidden w-10 h-10 grid place-items-center rounded-lg border border-neutral-200 bg-white text-neutral-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-neutral-200 shadow-xl p-6 flex flex-col gap-1"
        >
          {[...navLinks, { name: "FAQ", href: "#faq" }].map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-3 text-base font-medium text-neutral-700 border-b border-neutral-100 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="btn-primary mt-4 w-full"
          >
            Hire Me <ArrowUpRight size={16} />
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
