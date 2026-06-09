import { MapPin, Wifi, Calendar } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer.jsx";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   StarField — static background stars
   ═══════════════════════════════════════════════════════════ */
export function StarField() {
  const stableStars = [
    { id: 0, x: 5, y: 8, size: 1.2, opacity: 0.4 }, { id: 1, x: 15, y: 3, size: 0.8, opacity: 0.6 },
    { id: 2, x: 25, y: 12, size: 1.5, opacity: 0.3 }, { id: 3, x: 38, y: 5, size: 0.6, opacity: 0.5 },
    { id: 4, x: 55, y: 9, size: 1.0, opacity: 0.4 }, { id: 5, x: 68, y: 4, size: 1.3, opacity: 0.7 },
    { id: 6, x: 80, y: 11, size: 0.7, opacity: 0.3 }, { id: 7, x: 92, y: 6, size: 1.1, opacity: 0.5 },
    { id: 8, x: 10, y: 20, size: 0.9, opacity: 0.4 }, { id: 9, x: 30, y: 25, size: 1.4, opacity: 0.3 },
    { id: 10, x: 48, y: 18, size: 0.6, opacity: 0.6 }, { id: 11, x: 72, y: 22, size: 1.2, opacity: 0.4 },
    { id: 12, x: 88, y: 17, size: 0.8, opacity: 0.5 }, { id: 13, x: 3, y: 35, size: 1.0, opacity: 0.3 },
    { id: 14, x: 20, y: 40, size: 0.7, opacity: 0.7 }, { id: 15, x: 42, y: 32, size: 1.5, opacity: 0.4 },
    { id: 16, x: 62, y: 38, size: 0.9, opacity: 0.3 }, { id: 17, x: 78, y: 30, size: 1.1, opacity: 0.5 },
    { id: 18, x: 95, y: 42, size: 0.6, opacity: 0.4 }, { id: 19, x: 8, y: 55, size: 1.3, opacity: 0.3 },
    { id: 20, x: 35, y: 50, size: 0.8, opacity: 0.6 }, { id: 21, x: 58, y: 48, size: 1.0, opacity: 0.4 },
    { id: 22, x: 82, y: 52, size: 0.7, opacity: 0.5 }, { id: 23, x: 12, y: 65, size: 1.2, opacity: 0.3 },
    { id: 24, x: 28, y: 70, size: 0.9, opacity: 0.4 }, { id: 25, x: 50, y: 62, size: 1.5, opacity: 0.3 },
    { id: 26, x: 70, y: 68, size: 0.6, opacity: 0.7 }, { id: 27, x: 90, y: 60, size: 1.1, opacity: 0.4 },
    { id: 28, x: 6, y: 80, size: 0.8, opacity: 0.5 }, { id: 29, x: 22, y: 85, size: 1.3, opacity: 0.3 },
    { id: 30, x: 45, y: 78, size: 0.7, opacity: 0.6 }, { id: 31, x: 65, y: 82, size: 1.0, opacity: 0.4 },
    { id: 32, x: 85, y: 75, size: 1.2, opacity: 0.3 }, { id: 33, x: 15, y: 92, size: 0.9, opacity: 0.5 },
    { id: 34, x: 40, y: 95, size: 0.6, opacity: 0.4 }, { id: 35, x: 60, y: 90, size: 1.4, opacity: 0.3 },
    { id: 36, x: 75, y: 88, size: 0.8, opacity: 0.6 }, { id: 37, x: 96, y: 85, size: 1.1, opacity: 0.4 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-5]">
      {stableStars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            background: "white",
            opacity: star.opacity,
            animation: `pulse ${2 + star.id % 3}s infinite alternate`
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PortalVideo — right-column portal
   ═══════════════════════════════════════════════════════════ */
function PortalVideo({ children, className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center aspect-square mx-auto my-0 md:my-4 w-full max-w-[clamp(340px,85vw,600px)] lg:max-w-none lg:w-full ${className}`}
    >
      <div className="absolute rounded-full blur-[40px] mix-blend-screen z-0 inset-[-15%] bg-portal-glow-outer" />
      <div className="absolute inset-0 rounded-full blur-[20px] mix-blend-screen z-0 bg-portal-glow-inner" />
      <video
        ref={videoRef}
        src="/Portal Animation.webm"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover drop-shadow-[0_0_30px_rgba(181,141,255,0.4)] portal-mask"
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Global Easing & Timing Constants
   ═══════════════════════════════════════════════════════════ */
const BUTTERY_EASE = [0.16, 1, 0.3, 1];
const PHASE3_DURATION = 1.2;

const portalVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: BUTTERY_EASE,
      delay: 0,
    },
  },
};

const animCSI = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 0.2, ease: BUTTERY_EASE } },
};
const animTitle = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 0.4, ease: BUTTERY_EASE } },
};
const animYear = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0, delay: 0.6, ease: BUTTERY_EASE } },
};
const animLine = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 1.0, delay: 0.6, ease: BUTTERY_EASE } },
};
const animBlock = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 1.0, ease: BUTTERY_EASE } },
};
const animBtn = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 1.5, ease: BUTTERY_EASE } },
};

/* ═══════════════════════════════════════════════════════════
   HeroSection Component
   ═══════════════════════════════════════════════════════════ */
export function HeroSection() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  return (
    <div className="relative z-10 flex flex-col w-full max-w-[1400px] mx-auto px-5 pt-4 md:pt-8 lg:pt-6 pb-8 lg:pb-6 min-h-[calc(100dvh-80px)] lg:min-h-0">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start w-full">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LEFT COLUMN — Phase 2: Staggered Content Reveal
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="contents lg:flex lg:flex-col lg:items-center lg:w-[40%] lg:max-w-[560px] text-center lg:pl-12"
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setEntranceComplete(true)}
      >
        <motion.div
          className="order-1 flex justify-center items-center gap-1 mb-3 w-full text-[10px] text-[#C8D3F5]"
          variants={animCSI}
        >
          <div className="w-[12px] h-[12px] rounded-full border border-[#3FE0FF] shrink-0 shadow-[0_0_4px_rgba(63,224,255,0.4)] bg-badge-gradient" />
          <span className="whitespace-nowrap font-semibold tracking-[0.02em] text-[clamp(10px,2vw,12px)]">
            Computer Society of India, VNRVJIET
          </span>
        </motion.div>

        <motion.h1
          className={`order-2 font-orbitron text-[clamp(38px,7vw,65px)] font-black text-[#F8FAFC] tracking-[0.06em] text-glow m-0 leading-[1.05] ${entranceComplete ? "animate-title-glow" : ""}`}
          variants={animTitle}
        >
          FLASHFORTE
        </motion.h1>

        <motion.div
          className="order-3 flex justify-center items-center gap-[clamp(8px,2vw,16px)] w-full font-orbitron text-[clamp(26px,5vw,48px)] font-black tracking-[0.12em] mt-0 mb-2 lg:mb-0"
        >
          <div className="flex items-center gap-[6px]">
            <motion.div className="divider-line-left" variants={animLine} />
            <motion.div className="divider-circle-left" variants={animYear} />
          </div>

          <motion.span variants={animYear} className="text-2k26-gradient">
            2K26
          </motion.span>

          <div className="flex items-center gap-[6px]">
            <motion.div className="divider-circle-right" variants={animYear} />
            <motion.div className="divider-line-right" variants={animLine} />
          </div>
        </motion.div>

        <motion.p
          className="order-5 w-full mt-4 mb-2 lg:mt-16 lg:mb-8 text-[#FFFFFF] text-[clamp(20px,4vw,32px)] font-extrabold leading-[1.3] tracking-[0.01em]"
          variants={animBlock}
        >
          One Event.{" "}
          <span className="bg-gradient-to-r from-[#8F6BFF] to-[#3FE0FF] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Many Realities.
          </span>
        </motion.p>

        <motion.p
          className="order-6 w-full mx-auto mb-8 lg:mb-16 text-[#C8D3F5] text-[clamp(14px,2vw,17px)] leading-[1.6] max-w-[480px]"
          variants={animBlock}
        >
          Step into a universe of ideas, innovation,
          <br />
          games, voices, and designs.
          <br />
          Where imagination meets impact.
        </motion.p>

        <motion.div
          className="order-7 flex justify-center w-full mb-8 lg:mb-8"
          variants={animBtn}
        >
          <Link
            to="/registration-test"
            className={`flex items-center justify-center gap-2 w-full max-w-[320px] px-10 py-4 rounded-[50px] border-none text-[#FFFFFF] text-[clamp(15px,2vw,17px)] font-bold tracking-[0.02em] cursor-pointer no-underline shadow-[0_4px_30px_rgba(66,183,255,0.3),inset_0_0_15px_rgba(143,107,255,0.5)] ${entranceComplete ? "animate-cta-gradient" : "bg-cta-initial"}`}
          >
            <span className="text-[12px]">✦</span> Enter the Multiverse{" "}
            <span>→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RIGHT COLUMN — Phase 1: Portal Fade-In
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="order-4 lg:order-none lg:w-[55%] flex justify-center lg:justify-end -mt-2 -mb-2 lg:-mt-16 lg:mb-0 w-full relative lg:translate-x-12 lg:-translate-y-8 will-change-opacity"
        variants={portalVariants}
        initial="hidden"
        animate="visible"
      >
        <PortalVideo className="w-[110%] lg:w-[120%]" />
      </motion.div>
      </div>

      <motion.div
        className="flex w-full mx-auto justify-center mt-6 lg:mt-6 z-20"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Unified Date/Venue + Timer Container */}
        <div
          className={`glass-timer-card flex flex-col items-center gap-4 lg:gap-8 px-8 py-5 lg:px-16 lg:py-8 ${entranceComplete ? "animate-card-levitate" : ""}`}
        >
          {/* Date & Venue Ribbon */}
          <div className="flex items-center gap-2 sm:gap-5 lg:gap-10">
            {/* Left: Date */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="flex flex-col text-right">
                <span className="text-[#FFFFFF] text-[12px] sm:text-[14px] lg:text-[18px] font-semibold whitespace-nowrap tracking-[0.02em] leading-tight">
                  June 26 – 27, 2026
                </span>
                <span className="text-[#8F6BFF] text-[9px] sm:text-[11px] lg:text-[13px] font-semibold uppercase whitespace-nowrap tracking-[0.06em] leading-tight mt-[4px]">
                  Friday & Saturday
                </span>
              </div>
              <div className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-full bg-[#8F6BFF]/10 border border-[#8F6BFF]/30 shrink-0">
                <Calendar size={12} className="sm:w-[14px] sm:h-[14px] lg:w-[18px] lg:h-[18px]" color="#8F6BFF" />
              </div>
            </div>

            {/* Center Divider */}
            <div className="w-[1px] h-[32px] lg:h-[48px] shrink-0 bg-white/15" />

            {/* Right: Venue */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-full bg-[#3FE0FF]/10 border border-[#3FE0FF]/30 shrink-0">
                <Wifi size={12} className="sm:w-[14px] sm:h-[14px] lg:w-[18px] lg:h-[18px]" color="#3FE0FF" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[#FFFFFF] text-[12px] sm:text-[14px] lg:text-[18px] font-semibold whitespace-nowrap tracking-[0.02em] leading-tight">
                  Online
                </span>
                <span className="text-[#3FE0FF] text-[9px] sm:text-[11px] lg:text-[13px] font-semibold uppercase whitespace-nowrap tracking-[0.06em] leading-tight mt-[4px]">
                  Virtual Event
                </span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mt-1 lg:mt-3 lg:scale-125 lg:mb-2 transform origin-top">
            <CountdownTimer />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
