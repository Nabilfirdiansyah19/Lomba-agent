import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AIAgentEvaluator from './components/AIAgentEvaluator';
import AIAnalyticsAgent from './components/AIAnalyticsAgent';
import Footer from './components/Footer';
import Closing from './components/Closing';
 
function App() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-indigo-500/20">
      <Navbar />
      <main>
        <Hero />
        <Features />
 
        {/* Workspace Section — Score Agent */}
        <section id="workspace" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 italic uppercase tracking-tighter mb-4 font-serif">
              Mulai <span className="text-blue-900">Evaluasi.</span>
            </h2>
          </div>
          <AIAgentEvaluator />
        </section>
 
        {/* Analytics Section — Analytics Agent */}
        <section id="analytics" className="py-24 px-6 relative overflow-hidden border-t border-slate-200">
          <AIAnalyticsAgent />
        </section>
 
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
 
export default App;