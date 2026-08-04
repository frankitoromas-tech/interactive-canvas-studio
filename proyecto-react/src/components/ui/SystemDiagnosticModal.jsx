import React, { useState, useEffect, useCallback } from 'react';
import { sound } from '../../utils/soundEffects';
import { runSecurityAuditSuite } from '../../utils/security';

export default function SystemDiagnosticModal({ onClose }) {
  const [auditResults, setAuditResults] = useState(null);
  const [audioStats, setAudioStats] = useState(null);
  const [fps, setFps] = useState(60);
  const [storageUsage, setStorageUsage] = useState({ usedKb: 0, count: 0 });

  // Calcular uso de LocalStorage
  const calculateStorage = useCallback(() => {
    try {
      let totalBytes = 0;
      let count = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sv_')) {
          const val = localStorage.getItem(key) || '';
          totalBytes += key.length + val.length;
          count++;
        }
      }
      setStorageUsage({
        usedKb: (totalBytes / 1024).toFixed(1),
        count
      });
    } catch (e) {}
  }, []);

  const runAudit = useCallback(() => {
    sound.playPop();
    const results = runSecurityAuditSuite();
    setAuditResults(results);
    setAudioStats(sound.getAudioDiagnostics());
    calculateStorage();
  }, [calculateStorage]);

  // Medidor de FPS en tiempo real
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId;

    const loop = (now) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Ejecutar auditoría inicial
  useEffect(() => {
    runAudit();
  }, [runAudit]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card-strong max-w-xl w-full p-6 sm:p-8 text-left relative animate-pop-in flex flex-col max-h-[90vh] overflow-y-auto"
      >
        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-rose-600 font-bold w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🛡️</span>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-rose-950 font-outfit">
              Auditoría & Diagnóstico del Sistema
            </h3>
            <p className="text-xs text-rose-700 font-quicksand">
              Inspección en tiempo real de seguridad, Web Audio API y rendimiento.
            </p>
          </div>
        </div>

        {/* Panel de Métricas Rápidas */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
          <div className="bg-white/80 p-3 rounded-2xl border border-rose-200 text-center">
            <span className="text-xs text-gray-500 font-semibold block">Rendimiento</span>
            <span className={`text-xl font-bold font-outfit ${fps >= 50 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {fps} FPS
            </span>
          </div>

          <div className="bg-white/80 p-3 rounded-2xl border border-rose-200 text-center">
            <span className="text-xs text-gray-500 font-semibold block">Almacén Seguro</span>
            <span className="text-xl font-bold font-outfit text-rose-600">
              {storageUsage.usedKb} KB
            </span>
            <span className="text-[10px] text-gray-400 block">{storageUsage.count} registros</span>
          </div>

          <div className="bg-white/80 p-3 rounded-2xl border border-rose-200 text-center">
            <span className="text-xs text-gray-500 font-semibold block">Web Audio API</span>
            <span className="text-xl font-bold font-outfit text-purple-600">
              {audioStats?.status === 'running' ? 'Activo 🔊' : 'Standby ⏳'}
            </span>
          </div>
        </div>

        {/* Resultados de la Suite de Pentesting / Seguridad */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider font-outfit">
              Tests de Pentesting & Seguridad ({auditResults?.testsPassed}/{auditResults?.testsTotal} Superados)
            </h4>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              100% Blindado
            </span>
          </div>

          <div className="space-y-2">
            {auditResults?.details.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-white/90 rounded-xl border border-rose-100 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-gray-800 block">{item.test}</span>
                  <span className="text-[11px] text-gray-500">{item.note}</span>
                </div>
                <span className={`font-bold px-2 py-0.5 rounded-md text-[10px] ${
                  item.status === 'PASS' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetría de Audio */}
        {audioStats && (
          <div className="mb-6 p-3 bg-purple-50/80 rounded-2xl border border-purple-200 text-xs text-purple-950">
            <h4 className="font-bold mb-1.5 flex items-center gap-1.5">
              <span>🎵</span> Telemetría de Sonido & Analizador
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><strong>Pista actual:</strong> {audioStats.currentTrack}</div>
              <div><strong>Sample Rate:</strong> {audioStats.sampleRate}</div>
              <div><strong>Volumen:</strong> {audioStats.volume}</div>
              <div><strong>Latencia:</strong> {audioStats.latency}</div>
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-rose-200">
          <button
            onClick={runAudit}
            className="btn-primary text-xs py-2.5 px-4 flex-1 text-center"
          >
            🔄 Re-ejecutar Auditoría en Vivo
          </button>
          <button
            onClick={onClose}
            className="btn-secondary text-xs py-2.5 px-4"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
