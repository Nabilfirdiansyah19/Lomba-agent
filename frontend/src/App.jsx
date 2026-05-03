import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AIAgentEvaluator from './components/AIAgentEvaluator';
import Footer from './components/Footer';
import Closing from './components/Closing';

function App() {
  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 selection:bg-indigo-500/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* Workspace Section */}
        <section id="workspace" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
              Mulai <span className="text-indigo-500">Evaluasi.</span>
            </h2>
          </div>
          <AIAgentEvaluator />
        </section>
      <Closing />
      </main>
      <Footer />
    </div>
  );
}

export default App;