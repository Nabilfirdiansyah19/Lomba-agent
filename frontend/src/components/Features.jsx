import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Target, MessageSquareCode } from 'lucide-react';

const Features = () => {
  const featureList = [
    {
      icon: <Zap className="text-indigo-500" size={32} />,
      title: "Kecepatan Instan",
      desc: "Analisis dokumen mahasiswa selesai dalam hitungan detik tanpa perlu menunggu lama."
    },
    {
      icon: <ShieldCheck className="text-emerald-500" size={32} />,
      title: "Penilaian Objektif",
      desc: "Menghilangkan bias manusia dalam penilaian dengan standar kriteria yang konsisten."
    },
    {
      icon: <Target className="text-purple-500" size={32} />,
      title: "Akurasi Tinggi",
      desc: "Algoritma kami dilatih untuk mencocokkan logika soal dengan jawaban secara presisi."
    },
    {
      icon: <MessageSquareCode className="text-amber-500" size={32} />,
      title: "Feedback Cerdas",
      desc: "Bukan sekadar angka, asisten memberikan penjelasan konstruktif untuk setiap jawaban."
    }
  ];

  return (
    <section className="py-24 bg-[#030712] px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
            Mengapa Memilih <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">Kami?</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-xl">
            Solusi modern untuk tantangan akademik di era digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-[#0a0f1d] border border-white/5 hover:border-indigo-500/30 transition-all group"
            >
              <div className="mb-6 p-4 bg-slate-900 rounded-2xl inline-block group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-3 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;