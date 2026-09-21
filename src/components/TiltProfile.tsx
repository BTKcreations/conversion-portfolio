import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { useRef } from "react";
import profileImg from "../profile.png";

/**
 * Interactive 3D tilt card using the profile photo.
 * - Tracks cursor to rotate the card in 3D (spring physics)
 * - Photo sits at a deeper Z level; badges float above in parallax
 * - Dynamic glare + shifting shadow follow the light direction
 * - On touch devices falls back to a gentle float animation
 */
export default function TiltProfile() {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5); // 0..1 across card width
  const my = useMotionValue(0.5); // 0..1 across card height

  const springCfg = { stiffness: 180, damping: 20, mass: 0.6 };

  const rotateX = useSpring(useTransform(my, [0, 1], [11, -11]), springCfg);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-13, 13]), springCfg);

  // Glare position follows the cursor
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 30%, transparent 60%)`;

  // Shadow shifts opposite to tilt for realistic light
  const shadowX = useTransform(mx, [0, 1], [14, -14]);
  const shadowY = useTransform(my, [0, 1], [18, -10]);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 45px rgba(10, 10, 10, 0.18)`;

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full max-w-md mx-auto"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Ambient glow under card */}
      <div className="absolute -inset-8 bg-linear-to-tr from-emerald-200/70 via-transparent to-teal-100/60 blur-3xl rounded-full" />

      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, boxShadow, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative bg-white rounded-[2rem] border border-neutral-200/90 p-3 will-change-transform cursor-default"
      >
        {/* Photo at depth */}
        <div style={{ transform: "translateZ(-24px)" }} className="relative">
          <img
            src={profileImg}
            alt="Tharun Kumar Budde — Full-Stack & AI Engineer"
            className="w-full aspect-[4/5] object-cover rounded-[1.6rem] pointer-events-none select-none"
            draggable={false}
          />
          {/* Dynamic glare overlay */}
          <motion.div
            style={{ background: glare }}
            className="absolute inset-0 rounded-[1.6rem] pointer-events-none"
          />
        </div>

        {/* Floating badge: identity — highest layer */}
        <motion.div
          style={{ transform: "translateZ(56px)" }}
          className="absolute -left-4 lg:-left-9 top-10"
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="bg-white/95 backdrop-blur border border-neutral-200 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
          >
            <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white grid place-items-center text-sm font-bold">
              AI
            </span>
            <div>
              <p className="text-[13px] font-bold text-neutral-900 leading-tight">
                AI Engineer
              </p>
              <p className="text-[11px] text-neutral-500">LLM · RAG · Agents</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating badge: stats — mid layer */}
        <motion.div
          style={{ transform: "translateZ(38px)" }}
          className="absolute -right-3 lg:-right-7 bottom-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.6 }}
            className="bg-white/95 backdrop-blur border border-neutral-200 rounded-2xl shadow-xl px-4 py-3"
          >
            <p className="text-lg font-heading font-bold text-neutral-950 leading-none">
              15+
            </p>
            <p className="text-[11px] text-neutral-500 font-medium">Apps shipped</p>
          </motion.div>
        </motion.div>

        {/* Floating badge: location — bottom left */}
        <motion.div
          style={{ transform: "translateZ(30px)" }}
          className="absolute left-6 -bottom-5"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.1 }}
            className="bg-neutral-950 text-white rounded-full shadow-xl px-4 py-2 flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide">
              Available for work
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
