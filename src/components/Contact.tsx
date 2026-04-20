import { motion } from "motion/react";
import { Send, MessageCircle, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
       {/* Bg Accent */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[160px] rounded-full -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4 block">Connection</span>
            <h2 className="text-6xl font-heading font-bold mb-8 italic">Let's build <br /> something big.</h2>
            
            <div className="space-y-8 mt-12">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 glass flex items-center justify-center rounded-2xl text-emerald-500">
                  <Mail size={24} />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold">Email Me</span>
                  <p className="text-xl font-bold">buddetharunkumar123@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 glass flex items-center justify-center rounded-2xl text-emerald-500">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold">WhatsApp</span>
                  <p className="text-xl font-bold">+91 9346487255</p>
                </div>
              </div>

              <motion.a
                href="https://wa.me/919346487255"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 bg-[#25D366] text-black p-6 rounded-3xl w-full sm:w-fit mt-12 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all"
              >
                <MessageCircle size={28} />
                <div className="text-left">
                  <span className="text-[10px] uppercase font-black opacity-70 block">Fastest Response</span>
                  <p className="text-lg font-bold">Message on WhatsApp</p>
                </div>
              </motion.a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[40px] border-white/5"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase px-1">Your Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-emerald-500 outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase px-1">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-emerald-500 outline-none transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase px-1">Subject</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-emerald-500 outline-none transition-colors appearance-none">
                  <option className="bg-black">Website Project</option>
                  <option className="bg-black">UI/UX Design</option>
                  <option className="bg-black">Optimization Audit</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase px-1">Your Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-emerald-500 outline-none transition-colors" placeholder="Tell me about your project..."></textarea>
              </div>

              <button className="w-full bg-white text-black p-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-500 transition-colors group">
                Send Request <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
