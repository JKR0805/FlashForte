import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";

const winnersData = [
  {
    forte: "Speak-a-thon",
    winners: ["Hasini Bikkumalla", "Divya Sai Sravani Meka", "Kaveri Abburi"],
    color: "from-green-400 to-emerald-600"
  },
  {
    forte: "Game-a-thon",
    winners: ["Sunay Dornala", "Usikarla Venkat", "Suryansh Gande"],
    color: "from-purple-500 to-pink-500"
  },
  {
    forte: "Design-a-thon",
    winners: ["Damacharla Harshitha", "Hasini Bikkumalla & Tanguturi Jaswanth"],
    color: "from-orange-400 to-red-500"
  },
  {
    forte: "Ideathon",
    winners: ["Radha Krishna Sainadh", "Srinidhi Aakumalla", "Pranathi BPS"],
    color: "from-yellow-400 to-amber-500"
  },
];

export function WinnersPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted state for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-open modal after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="winners-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        >
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto hide-scrollbar glass-card rounded-2xl p-5 md:p-8 border border-[#06B6D4]/30 shadow-[0_0_50px_rgba(0,119,182,0.3)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 md:top-5 md:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/5 border border-yellow-500/30 mb-3 shadow-[0_0_30px_rgba(234,179,8,0.2)]"
              >
                <Trophy size={32} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
              </motion.div>
              <motion.h2 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-4xl font-orbitron font-black text-white tracking-widest mb-2"
              >
                FLASHFORTE 2k26 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]">WINNERS</span>
              </motion.h2>
              <motion.p 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#C8D3F5] text-sm md:text-base"
              >
                Celebrating the champions across all our realities.
              </motion.p>
            </div>

            {/* Winners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {winnersData.map((category, idx) => (
                <motion.div
                  key={category.forte}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="relative group p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Background Gradient Hint */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} rounded-full blur-[50px] opacity-10 group-hover:opacity-25 transition-opacity duration-500`} />
                  
                  <h3 className="uppercase font-orbitron text-lg md:text-xl font-black mb-4 tracking-wide relative z-10">
                    <span className="text-white">
                      {category.forte === 'Ideathon' ? 'IDEA' : category.forte.split('-')[0].toUpperCase()}
                    </span>
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                      {category.forte === 'Ideathon' ? 'THON' : '-A-THON'}
                    </span>
                  </h3>
                  
                  <div className="space-y-3 relative z-10">
                    {category.winners.map((winner, rank) => (
                      <div key={rank} className="flex items-center gap-3 bg-black/30 rounded-lg p-2 md:p-3 border border-white/5 hover:border-white/10 transition-colors">
                        <div className={`
                          flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-xs md:text-sm font-bold shadow-md
                          ${rank === 0 ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-black border-none' : 
                            rank === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black border-none' : 
                            'bg-gradient-to-br from-amber-600 to-amber-800 text-white border-none'}
                        `}>
                          {rank + 1}
                        </div>
                        <div className="text-[#F8FAFC] text-sm md:text-base font-semibold tracking-wide flex flex-col leading-snug">
                          {winner.includes('&') ? (
                            <>
                              <span>{winner.split('&')[0].trim()}</span>
                              <span className="text-sm md:text-base text-white/50 font-medium my-1 self-center">&amp;</span>
                              <span>{winner.split('&')[1].trim()}</span>
                            </>
                          ) : (
                            <span>{winner}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Floating / Inline Action Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.div
            key="winners-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative z-[90] flex items-center justify-center"
          >
            {/* Pulsing attention ring */}
            <div className="absolute inset-0 rounded-full bg-[#06B6D4]/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
            
            <motion.button
              onClick={() => setIsOpen(true)}
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative group flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#06B6D4] text-white font-orbitron font-bold text-xs md:text-sm tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300"
            >
              <Trophy className="w-4 h-4 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
              <span>WINNERS</span>
              
              {/* Subtle inner shine */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Outer glow ring (hover) */}
              <div className="absolute inset-[-4px] rounded-full border-2 border-[#06B6D4]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Overlay rendered via Portal */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
