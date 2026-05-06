import React from 'react';
import { Send, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-5 md:py-8 flex justify-between items-center backdrop-blur-md bg-white/70 border-b border-slate-200">
      {/* Logo Area */}
      <div className="flex items-center gap-3 group cursor-pointer text-left">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-900 blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
          <div className="relative w-9 h-9 bg-blue-900 border border-blue-900/50 rotate-45 flex items-center justify-center rounded-sm overflow-hidden transition-transform group-hover:rotate-[135deg] duration-500">
            <span className="text-white font-black text-lg -rotate-45 group-hover:rotate-[-135deg] transition-transform duration-500">
              S
            </span>
          </div>
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="font-black tracking-tighter text-xl uppercase italic text-slate-900 leading-none font-serif">
            GRADE<span className="text-blue-900"> AI</span>
          </span>
          <span className="text-[7px] mt-2 font-bold tracking-[0.4em] text-slate-500 uppercase ml-0.5">
            AI Ecosystem
          </span>
        </div>
      </div>
      
      {/* Action Button */}
      <a href="#workspace" className="group">
        {/* Desktop Button */}
        <div className="hidden md:flex items-center gap-3 px-6 py-2.5 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-blue-900 hover:text-slate-900 transition-all bg-white shadow-sm">
          Gunakan Agent
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-900" />
        </div>
        
        {/* Mobile: Compact Highlighted Trigger */}
        <div className="flex md:hidden relative items-center justify-center">
          {/* Outer Glow Highlight */}
          <div className="absolute inset-0 bg-blue-900/20 blur-xl rounded-full opacity-100 group-active:bg-blue-900/40 transition-all" />
          
          {/* The Button */}
          <div className="relative w-10 h-10 bg-blue-900/10 border border-blue-900/40 rounded-full flex items-center justify-center text-blue-900 active:scale-90 transition-all">
            <Send 
              size={18} 
              fill="currentColor" 
              className="opacity-80 group-active:translate-x-1 group-active:-translate-y-1 transition-transform" 
            />
          </div>
        </div>
      </a>
    </nav>
  );
};

export default Navbar;