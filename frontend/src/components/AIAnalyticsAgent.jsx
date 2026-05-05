import React, { useState } from 'react';
import { 
  BarChart3, RefreshCw, Activity, 
  Server, Play, CheckCircle2,
  AlertCircle, TrendingUp, AlertTriangle,
  Star, BookOpen, Lightbulb, ChevronDown, ChevronUp
} from 'lucide-react';

const AIAnalyticsAgent = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [logs, setLogs] = useState([]);

  // State LOKAL analytics — tidak berhubungan dengan state manapun di luar komponen ini
  const [analyticsData, setAnalyticsData] = useState(null);
  
  const WEBHOOK_URL = 'https://cyogiswara.app.n8n.cloud/webhook/get-analitik';

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { id: Date.now() + Math.random(), msg, type }]);
  };

  const handleFetchAnalytics = async () => {
    setIsFetching(true);
    addLog("Memulai koneksi ke n8n...", "info");
    
    try {
      addLog("Menarik data dari Google Sheet dan memproses AI...", "info");
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const rawData = await response.json();
        console.log("Data Analytics n8n:", rawData);

        // n8n bisa bungkus dalam array — ambil object pertama
        const payload = Array.isArray(rawData) ? rawData[0] : rawData;

        // Sesuaikan dengan format JSON baru yang membungkus di dalam "data"
        const finalData = payload?.data || payload;

        // Simpan ke state lokal, tidak menyentuh state lain di luar komponen
        setAnalyticsData(finalData);
        addLog("Berhasil! Insight analitik berhasil dimuat.", "success");
      } else {
        addLog(`Server Error (${response.status}): Gagal memproses alur n8n.`, "error");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      addLog("Gagal terhubung ke webhook. Cek koneksi atau URL n8n.", "error");
    }

    setIsFetching(false);
  };

  // Semua derived dari state lokal analyticsData
  const ring        = analyticsData?.ringkasan ?? {};
  const dist        = analyticsData?.distribusi_nilai ?? {};
  const kriteria    = analyticsData?.analisis_kriteria ?? [];
  const pola        = analyticsData?.pola_kesalahan_umum ?? [];
  const perhatian   = analyticsData?.mahasiswa_perlu_perhatian ?? [];
  const berprestasi = analyticsData?.mahasiswa_berprestasi ?? [];
  const rekomendasi = analyticsData?.rekomendasi_dosen ?? [];
  const topik       = analyticsData?.topik_review ?? [];
  const kesimpulan  = analyticsData?.kesimpulan_umum ?? '';

  const gradeColor = (g) => ({
    A: { badge: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/30', bar: '#10b981' },
    B: { badge: 'bg-blue-500/10 text-blue-400 ring-blue-500/30',          bar: '#3b82f6' },
    C: { badge: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/30',    bar: '#f59e0b' },
    D: { badge: 'bg-orange-500/10 text-orange-400 ring-orange-500/30',    bar: '#f97316' },
    E: { badge: 'bg-red-500/10 text-red-400 ring-red-500/30',             bar: '#ef4444' },
  }[g] ?? { badge: 'bg-slate-800 text-slate-400', bar: '#64748b' });

  const CollapseList = ({ items, render, max = 4 }) => {
    const [open, setOpen] = useState(false);
    const shown = open ? items : items.slice(0, max);
    return (
      <div className="space-y-2">
        {shown.map((it, i) => render(it, i))}
        {items.length > max && (
          <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-[10px] text-slate-600 hover:text-slate-400 transition-colors pt-1">
            {open ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            {open ? 'Sembunyikan' : `+${items.length - max} lainnya`}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 relative z-10 font-sans text-left">
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mb-2">
          Analytics <span className="text-emerald-500">Dashboard.</span>
        </h2>
        <p className="text-slate-400 text-sm">Integrasi langsung dengan Google Sheet dan Agen AI n8n untuk insight otomatis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CONTROL PANEL & LOGS — struktur asli dipertahankan */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
            <h3 className="text-xl font-bold mb-2 z-10 relative">Jalankan Analitik</h3>
            <p className="text-white/70 text-[11px] mb-6 leading-relaxed z-10 relative">
              Sistem akan memicu webhook n8n, mengambil data terbaru dari spreadsheet, dan memprosesnya menggunakan model AI untuk menghasilkan summary.
            </p>
            <button
              onClick={handleFetchAnalytics}
              disabled={isFetching}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all z-10 relative ${isFetching ? 'bg-black/20 text-white/50 cursor-not-allowed' : 'bg-white text-teal-900 shadow-lg hover:bg-teal-50 active:scale-[0.98]'}`}
            >
              {isFetching ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
              <span className="uppercase tracking-wider">{isFetching ? 'Memproses Data...' : 'Mulai Analisa'}</span>
            </button>
            <Activity className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10" />
          </div>

          <div className="bg-[#020617] border border-slate-800 rounded-3xl p-6 h-[220px] overflow-y-auto shadow-inner custom-scrollbar">
            <div className="flex items-center gap-2 mb-4">
              <Server size={12} className="text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Server Logs</span>
            </div>
            <div className="space-y-3">
              {logs.length > 0 ? logs.map(log => (
                <div key={log.id} className="text-[11px] flex gap-2 animate-in fade-in slide-in-from-left-1">
                  {log.type === 'info'    && <span className="text-blue-400">›</span>}
                  {log.type === 'success' && <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 shrink-0" />}
                  {log.type === 'error'   && <AlertCircle  size={12} className="text-red-500 mt-0.5 shrink-0" />}
                  <span className={log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'}>
                    {log.msg}
                  </span>
                </div>
              )) : (
                <div className="text-[11px] text-slate-600 italic">Menunggu instruksi analitik...</div>
              )}
            </div>
          </div>

          {/* Stat strip — muncul setelah data ada */}
          {analyticsData && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Mahasiswa', val: ring.total_mahasiswa, color: 'text-white' },
                { label: 'Rata-rata Skor',  val: ring.rata_rata_skor,  color: 'text-emerald-400' },
                { label: 'Skor Tertinggi',  val: ring.skor_tertinggi,  color: 'text-blue-400' },
                { label: 'Skor Terendah',   val: ring.skor_terendah,   color: 'text-red-400' },
              ].map(s => (
                <div key={s.label} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
                  <div className={`text-xl font-black tabular-nums ${s.color}`}>{s.val ?? '—'}</div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-600 font-bold mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DASHBOARD VISUALIZATION */}
        <div className="lg:col-span-8 flex flex-col gap-5">

          {!analyticsData ? (
            /* Empty state */
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-4 p-24 text-center flex-grow">
              <BarChart3 size={32} className="text-slate-700" />
              <p className="text-slate-600 text-sm italic">
                Klik <span className="text-emerald-500 font-semibold">"Mulai Analisa"</span> untuk memuat insight AI dari data penilaian.
              </p>
            </div>
          ) : (
            <>
              {/* Distribusi Nilai */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={14} className="text-blue-400" />
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">Distribusi Nilai</span>
                </div>
                <div className="space-y-3">
                  {['A','B','C','D','E'].map(g => {
                    const c = gradeColor(g);
                    const jumlah = dist[g]?.jumlah ?? 0;
                    const totalMhs = ring.total_mahasiswa || 1;
                    const pct = dist[g]?.persentase ?? (jumlah / totalMhs * 100);
                    return (
                      <div key={g} className="flex items-center gap-3">
                        <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black ring-1 ${c.badge}`}>{g}</span>
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: c.bar }} />
                        </div>
                        <span className="text-[11px] text-slate-400 w-20 text-right shrink-0">
                          <span className="font-bold">{jumlah}</span>
                          <span className="text-slate-600"> ({pct.toFixed(0)}%)</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Kriteria + Pola — 2 col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {kriteria.length > 0 && (
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp size={14} className="text-purple-400" />
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">Performa Per Kriteria</span>
                    </div>
                    <div className="space-y-3">
                      {kriteria.map((k, i) => {
                        const avg = k.rata_rata ?? 0;
                        const pct = k.persentase_dari_max ?? (k.max ? Math.min((avg / k.max) * 100, 100) : avg);
                        const displayMax = k.max ? `/${k.max}` : '';
                        const col = pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
                        return (
                          <div key={i} className="space-y-1.5">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-slate-300">{k.nama ?? k.name ?? k.nama_kriteria}</span>
                              <span className="font-bold tabular-nums" style={{ color: col }}>{avg.toFixed(1)}{displayMax} ({pct.toFixed(1)}%)</span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: col, transition: 'width .8s ease' }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {pola.length > 0 && (
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle size={14} className="text-orange-400" />
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">Pola Kesalahan Umum</span>
                    </div>
                    <div className="space-y-2">
                      {pola.map((p, i) => (
                        <div key={i} className="flex gap-2.5 items-start">
                          <span className="shrink-0 w-4 h-4 rounded-full bg-slate-800 text-slate-500 text-[9px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                          <p className="text-[12px] text-slate-300 leading-relaxed">
                            {typeof p === 'string' ? p : p.masalah ?? p.issue ?? JSON.stringify(p)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {perhatian.length > 0 && (
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle size={14} className="text-red-400" />
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">Perlu Perhatian</span>
                    </div>
                    <CollapseList
                      items={perhatian}
                      render={(s, i) => (
                        <div key={i} className="flex flex-col gap-1 rounded-xl px-3 py-2 border border-red-900/40 bg-red-950/20">
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-slate-300 font-medium truncate">{s.nama ?? s.student_folder ?? '—'}</span>
                            <span className="text-[12px] font-black ml-3 shrink-0 text-red-400">{s.skor ?? s.score ?? '—'}</span>
                          </div>
                          {s.alasan && (
                            <span className="text-[10px] text-slate-400 leading-tight">{s.alasan}</span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                )}

                {berprestasi.length > 0 && (
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Star size={14} className="text-yellow-400" />
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">Mahasiswa Berprestasi</span>
                    </div>
                    <CollapseList
                      items={berprestasi}
                      render={(s, i) => (
                        <div key={i} className="flex flex-col gap-1 rounded-xl px-3 py-2 border border-emerald-900/40 bg-emerald-950/20">
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-slate-300 font-medium truncate">{s.nama ?? s.student_folder ?? '—'}</span>
                            <span className="text-[12px] font-black ml-3 shrink-0 text-emerald-400">{s.skor ?? s.score ?? '—'}</span>
                          </div>
                          {s.keunggulan && (
                            <span className="text-[10px] text-slate-400 leading-tight">{s.keunggulan}</span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Topik Review */}
              {topik.length > 0 && (
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={14} className="text-cyan-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">Topik yang Perlu Di-review</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topik.map((t, i) => (
                      <span key={i} className="bg-cyan-950/50 border border-cyan-900/40 text-cyan-400 text-[11px] font-medium px-3 py-1 rounded-full">
                        {typeof t === 'string' ? t : t.topik ?? JSON.stringify(t)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rekomendasi */}
              {rekomendasi.length > 0 && (
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb size={14} className="text-yellow-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">Rekomendasi untuk Dosen</span>
                  </div>
                  <div className="space-y-2">
                    {rekomendasi.map((r, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-1 h-1 rounded-full bg-yellow-500 mt-2 shrink-0" />
                        <p className="text-[12px] text-slate-300 leading-relaxed">
                          {typeof r === 'string' ? r : r.rekomendasi ?? JSON.stringify(r)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kesimpulan */}
              {kesimpulan && (
                <div className="border-l-2 border-emerald-600 bg-emerald-950/10 rounded-r-2xl px-5 py-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-700 mb-2">Kesimpulan Umum</p>
                  <p className="text-[13px] text-slate-300 leading-relaxed">{kesimpulan}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalyticsAgent;
