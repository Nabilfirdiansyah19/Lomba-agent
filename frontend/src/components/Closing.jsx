import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MoveRight } from 'lucide-react';

const Closing = () => {
  return (
    <section className="py-40 bg-slate-50 flex justify-center px-6 border-t border-slate-200">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl bg-gradient-to-br from-blue-900 to-indigo-900 border border-blue-900 shadow-2xl rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center"
      >
        {/* Dekorasi halus di sudut card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px]" />
        
        <div className="relative z-10">
          <div className="flex justify-center gap-4 mb-8">
            <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em]">
              <CheckCircle2 size={14} /> System Ready
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-6 font-serif">
            Siap untuk transformasi <br />
            <span className="text-blue-300">penilaian akademik?</span>
          </h2>
          
          <p className="text-slate-300 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed font-light">
            Gunakan teknologi AI untuk efisiensi maksimal tanpa mengurangi kualitas evaluasi. Mulai sekarang dan lihat perbedaannya.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3 text-white text-xs font-black uppercase tracking-widest hover:text-blue-300 transition-colors"
            >
              Back to top
              <MoveRight size={16} className="-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Closing;