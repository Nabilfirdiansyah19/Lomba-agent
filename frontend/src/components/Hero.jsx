import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden px-6 text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[60%] h-[40%] bg-indigo-600/20 blur-[100px] md:blur-[160px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] text-slate-300 uppercase italic">
            Next-Gen AI Assistant
          </span>
        </div>

        {/* Font di mobile dibuat 5xl/6xl biar kerasa penuh */}
        <h1 className="text-[52px] sm:text-7xl md:text-[130px] font-black text-white leading-[0.9] tracking-[ -0.04em] italic uppercase mb-8">
          EVALUATE <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-400 to-indigo-600">
            ANYTHING.
          </span>
        </h1>

        <p className="text-slate-400 text-sm md:text-xl max-w-[300px] md:max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Satu asisten cerdas untuk segala jenis penilaian akademik. Analisis mendalam dan feedback instan.
        </p>

        <a 
          href="#workspace"
          className="inline-flex items-center gap-4 px-10 py-5 md:px-12 md:py-6 bg-white text-black text-xs md:text-base rounded-full font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
        >
          MULAI SEKARANG
          <ArrowDown size={18} className="animate-bounce" />
        </a>
      </motion.div>

      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};

export default Hero;