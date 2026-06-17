import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * CountdownTimer — Live countdown to June 26, 2026, 09:00 AM IST
 * Standalone inline element that complements the date pill.
 */
export function CountdownTimer() {
  const TARGET_DATE = new Date("2026-06-29T09:00:00+05:30").getTime();
  const END_DATE = new Date("2026-06-30T17:00:00+05:30").getTime();

  const calculateTimeLeft = () => {
    const now = Date.now();
    const diff = TARGET_DATE - now;
    const isEnded = now >= END_DATE;

    if (isEnded) {
      return { days: 0, hours: 0, mins: 0, secs: 0, isLive: false, isEnded: true };
    }

    if (diff <= 0) {
      return { days: 0, hours: 0, mins: 0, secs: 0, isLive: true, isEnded: false };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
      isLive: false,
      isEnded: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.mins },
    { label: "Secs", value: timeLeft.secs },
  ];

  if (timeLeft.isEnded) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="px-8 py-3 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md cursor-default">
          <span className="font-orbitron font-bold text-[16px] sm:text-[18px] tracking-[0.15em] text-blue-300/80">
            EVENT CONCLUDED
          </span>
        </div>
        <div className="text-[10px] tracking-[0.2em] uppercase font-medium text-center text-blue-300/40 mt-1">
          Thank you for participating
        </div>
      </motion.div>
    );
  }

  if (timeLeft.isLive) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2"
      >
        <motion.div 
          animate={{ 
            boxShadow: ["0px 0px 10px rgba(34,197,94,0.3)", "0px 0px 30px rgba(34,197,94,0.8)", "0px 0px 10px rgba(34,197,94,0.3)"],
            borderColor: ["rgba(34,197,94,0.4)", "rgba(34,197,94,1)", "rgba(34,197,94,0.4)"]
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="px-8 py-3 rounded-full border bg-[#22C55E]/10 backdrop-blur-md cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 rounded-full bg-[#22C55E]"
            />
            <span className="font-orbitron font-black text-[16px] sm:text-[18px] tracking-[0.15em] text-[#22C55E] group-hover:text-white transition-colors duration-300">
              EVENT IS LIVE
            </span>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Micro-copy label */}
      <div className="text-[12px] tracking-[0.2em] uppercase font-medium text-center text-white/60">
        STARTS IN
      </div>
      <div className="flex items-center justify-center gap-3">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="font-orbitron text-[18px] font-bold leading-none text-white tabular-nums min-w-[2ch] text-center">
                {pad(unit.value)}
              </div>
              <div className="text-[8px] tracking-[0.1em] mt-[4px] uppercase font-medium text-white/50">
                {unit.label}
              </div>
            </div>
            {i < units.length - 1 && (
              <span className="text-[14px] font-light leading-none mb-3 text-white/20">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
