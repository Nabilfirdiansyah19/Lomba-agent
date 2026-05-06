import React, { useState } from 'react';
import { 
  FileText, BrainCircuit, Send, CheckCircle2, History, 
  Loader2, MessageSquarePlus, Archive, X, Table 
} from 'lucide-react';

const AIAgentEvaluator = () => {
  const [files, setFiles] = useState({ soal: null, jawaban: null });
  const [extraContext, setExtraContext] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState([]);

  const WEBHOOK_POST = 'https://cyogiswara.app.n8n.cloud/webhook/upload-tugas';

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }));
      setLogs(prev => [...prev, { id: Date.now(), msg: `${type.toUpperCase()} siap: ${file.name}` }]);
    }
  };

  const removeFile = (type) => {
    setFiles(prev => ({ ...prev, [type]: null }));
  };

  const handleEvaluation = async () => {
    if (!files.soal || !files.jawaban) return;
    
    setIsEvaluating(true);
    setLogs(prev => [...prev, { id: Date.now(), msg: "Memulai proses evaluasi..." }]);

    const formData = new FormData();
    formData.append('file_soal', files.soal);
    formData.append('file_zip', files.jawaban);
    formData.append('catatan', extraContext);

    try {
      const response = await fetch(WEBHOOK_POST, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const rawData = await response.json();
        let finalRows = [];

        if (rawData.all_data && rawData.all_data[0] && Array.isArray(rawData.all_data[0].data)) {
          finalRows = rawData.all_data[0].data;
        } 
        else if (rawData.all_data && Array.isArray(rawData.all_data)) {
          finalRows = rawData.all_data;
        }

        const uniqueMap = new Map();
        finalRows.forEach(item => {
          const nim = item["NIM / File"];
          if (nim) uniqueMap.set(nim, item);
        });
        
        const uniqueRows = Array.from(uniqueMap.values());
        setResults([...uniqueRows].reverse());
        setLogs(prev => [
          ...prev, 
          { id: Date.now(), msg: `Sukses: ${uniqueRows.length} data mahasiswa diperbarui.` }
        ]);
      } else {
        setLogs(prev => [...prev, { id: Date.now(), msg: "Server Error (500): Cek alur n8n." }]);
      }
    } catch (error) {
      setLogs(prev => [...prev, { id: Date.now(), msg: "Gagal memproses data. Cek koneksi." }]);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 relative z-10 font-sans text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* INPUT PANEL */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* PDF Soal */}
            <div className="relative group">
              {files.soal && (
                <button onClick={() => removeFile('soal')} className="absolute top-3 right-3 z-30 p-1 bg-red-500 rounded-full text-white hover:scale-110">
                  <X size={14} />
                </button>
              )}
              <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'soal')} className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer" />
              <div className={`h-44 rounded-3xl border-2 border-dashed transition-all p-6 bg-white flex flex-col items-center justify-center ${files.soal ? 'border-blue-900 bg-blue-900/5' : 'border-slate-300'}`}>
                <div className={`p-4 rounded-xl mb-3 ${files.soal ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'bg-slate-100 text-slate-400'}`}>
                  {files.soal ? <CheckCircle2 size={20} /> : <FileText size={20} />}
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">PDF Soal & Rubrik</span>
              </div>
            </div>

            {/* ZIP Jawaban */}
            <div className="relative group">
              {files.jawaban && (
                <button onClick={() => removeFile('jawaban')} className="absolute top-3 right-3 z-30 p-1 bg-red-500 rounded-full text-white hover:scale-110">
                  <X size={14} />
                </button>
              )}
              <input type="file" accept=".zip" onChange={(e) => handleFileUpload(e, 'jawaban')} className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer" />
              <div className={`h-44 rounded-3xl border-2 border-dashed transition-all p-6 bg-white flex flex-col items-center justify-center ${files.jawaban ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-300'}`}>
                <div className={`p-4 rounded-xl mb-3 ${files.jawaban ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 text-slate-400'}`}>
                  {files.jawaban ? <CheckCircle2 size={20} /> : <Archive size={20} />}
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">ZIP File Jawaban</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <MessageSquarePlus size={16} />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Instruksi Khusus AI</h3>
            </div>
            <textarea 
              value={extraContext}
              onChange={(e) => setExtraContext(e.target.value)}
              className="w-full bg-slate-950/40 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 min-h-[120px] resize-none"
              placeholder="Tambahkan catatan khusus untuk penilaian..."
            />
          </div>
        </div>

        {/* LOGS & ACTION PANEL */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
            <h3 className="text-xl font-bold mb-2">Execute AI Evaluator</h3>
            <p className="text-white/60 text-[11px] mb-6 leading-relaxed">Mulai otomatisasi penilaian untuk seluruh file mahasiswa di dalam folder ZIP.</p>
            <button
              onClick={handleEvaluation}
              disabled={!files.soal || !files.jawaban || isEvaluating}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${!files.soal || !files.jawaban ? 'bg-black/20 text-white/30 cursor-not-allowed' : 'bg-white text-blue-900 shadow-lg hover:bg-slate-50'}`}
            >
              {isEvaluating ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              <span className="uppercase tracking-wider">{isEvaluating ? 'Evaluating...' : 'Kirim Sekarang'}</span>
            </button>
            <BrainCircuit className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10" />
          </div>
        </div>

          <div className="bg-[#020617] border border-slate-800 rounded-3xl p-6 h-[200px] overflow-y-auto shadow-inner custom-scrollbar">
            <div className="flex items-center gap-2 mb-4">
              <History size={12} className="text-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">System Logs</span>
            </div>
            <div className="space-y-2">
              {logs.length > 0 ? logs.map(log => (
                <div key={log.id} className="text-[11px] text-slate-600 flex gap-2 animate-in fade-in slide-in-from-left-1">
                  <span className="text-emerald-500">›</span> {log.msg}
                </div>
              )) : (
                <div className="text-[11px] text-slate-400 italic">Menunggu aktivitas...</div>
              )}
            </div>
          </div>
        </div>

        {/* DATABASE TABLE (Full Width) */}
        <div className="lg:col-span-12">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <Table size={18} className="text-blue-900" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Database Hasil Penilaian</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[9px] tracking-widest border-b border-slate-200">
                  <tr>
                    <th className="p-4 font-bold border-b border-slate-200">Mahasiswa (Folder)</th>
                    <th className="p-4 text-center font-bold border-b border-slate-200">Skor</th>
                    <th className="p-4 font-bold border-b border-slate-200">Mata Kuliah</th>
                    <th className="p-4 font-bold border-b border-slate-200">Feedback AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {results.length > 0 ? results.map((res, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4 text-slate-800 font-medium">{res["NIM / File"] || "N/A"}</td>
                      <td className="p-4 text-center text-emerald-600 font-bold text-sm">{res["Score"] ?? 0}</td>
                      <td className="p-4 text-slate-600">{res["Matkul"] || "N/A"}</td>
                      <td className="p-4 max-w-xs text-slate-500 italic text-[11px] leading-relaxed group-hover:text-slate-700 transition-colors">
                        {res["Feedback"] || "-"}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="p-20 text-center text-slate-400 italic">
                        Belum ada data penilaian yang tersinkron.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentEvaluator;