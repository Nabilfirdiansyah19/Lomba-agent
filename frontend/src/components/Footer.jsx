import React from 'react';

const Footer = () => {
  return (
    <footer className="py-20 bg-white border-t border-slate-200 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="font-black text-2xl uppercase italic text-slate-900 mb-2 font-serif">Grade AI.</div>
          <p className="text-slate-600 text-[10px] max-w-xs leading-relaxed uppercase tracking-widest font-bold">
            Built for Academic Efficiency.
          </p>
        </div>
        
       
      </div>
    </footer>
  );
};

export default Footer;