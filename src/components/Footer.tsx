import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <div className="text-2xl font-display tracking-wider mb-4">
              THARUN<span className="text-emerald-500">.</span>
            </div>
            <p className="max-w-xs text-gray-500 text-sm">
              Specializing in Artificial Intelligence and Machine Learning solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {["About", "Projects", "Services", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {[
              { Icon: Github, href: "https://github.com/BTKcreations" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/budde-tharunkumar-362296261/" },
              { Icon: Mail, href: "mailto:buddetharunkumar123@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 glass flex items-center justify-center rounded-xl text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            &copy; 2026 Conversion Portfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] text-gray-600 uppercase tracking-widest font-bold hover:text-white">Privacy Policy</a>
            <a href="#" className="text-[10px] text-gray-600 uppercase tracking-widest font-bold hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
