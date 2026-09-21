import { motion } from "motion/react";
import { Send, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Website Project",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message =
      `*New Inquiry from bstk.in*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Subject:* ${formData.subject}%0A%0A` +
      `*Message:*%0A${formData.message}`;

    const whatsappUrl = `https://wa.me/919346487255?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Soft accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-100/60 blur-[140px] rounded-full -z-0" />

      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <span className="eyebrow">Connection</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">
              Let's build<br />
              <span className="text-gradient">something big.</span>
            </h2>
            <p className="text-neutral-600 text-lg mb-10 max-w-md">
              Tell me about your project and I'll respond within 24 hours with
              next steps and a clear estimate.
            </p>

            <div className="space-y-5">
              <a
                href="mailto:buddetharunkumar123@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 bg-white hover:border-emerald-600/40 hover:shadow-md transition-all group"
              >
                <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Mail size={20} />
                </span>
                <div>
                  <span className="text-xs text-neutral-400 uppercase font-bold tracking-wide">Email me</span>
                  <p className="text-[15px] font-semibold text-neutral-900">buddetharunkumar123@gmail.com</p>
                </div>
              </a>

              <a
                href="https://wa.me/919346487255"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 bg-white hover:border-emerald-600/40 hover:shadow-md transition-all group"
              >
                <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageCircle size={20} />
                </span>
                <div>
                  <span className="text-xs text-neutral-400 uppercase font-bold tracking-wide">WhatsApp — fastest response</span>
                  <p className="text-[15px] font-semibold text-neutral-900">+91 93464 87255</p>
                </div>
              </a>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <MapPin size={18} className="text-emerald-700 shrink-0" />
                  <div>
                    <p className="text-[13px] font-bold text-neutral-900">Hyderabad, IN</p>
                    <p className="text-xs text-neutral-500">Remote worldwide</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <Clock size={18} className="text-emerald-700 shrink-0" />
                  <div>
                    <p className="text-[13px] font-bold text-neutral-900">&lt; 24h reply</p>
                    <p className="text-xs text-neutral-500">Mon – Sat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white p-8 lg:p-10 rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-950/5"
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-neutral-500 uppercase tracking-wide px-1">
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-[15px] focus:border-emerald-600 focus:bg-white outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-neutral-500 uppercase tracking-wide px-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-[15px] focus:border-emerald-600 focus:bg-white outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-bold text-neutral-500 uppercase tracking-wide px-1">
                  What do you need?
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-[15px] focus:border-emerald-600 focus:bg-white outline-none transition-colors"
                >
                  <option>Website Project</option>
                  <option>AI / LLM Integration</option>
                  <option>UI/UX Design</option>
                  <option>Automation / Scraping</option>
                  <option>Optimization Audit</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold text-neutral-500 uppercase tracking-wide px-1">
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-[15px] focus:border-emerald-600 focus:bg-white outline-none transition-colors resize-none"
                  placeholder="Tell me about your goals, timeline, and budget..."
                />
              </div>

              <button type="submit" className="btn-primary w-full !py-4 text-[15px]">
                {sent ? (
                  <>Opening WhatsApp… ✓</>
                ) : (
                  <>
                    Send message <Send size={17} />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-neutral-400">
                Opens WhatsApp with your message pre-filled — no signup needed.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
