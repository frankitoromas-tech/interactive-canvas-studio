import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { sanitizeInput } from '../utils/security';

export default function SettingsModal({
  currentName,
  currentSender,
  currentTheme,
  onSave,
  onClose
}) {
  const [name, setName] = useState(currentName);
  const [sender, setSender] = useState(currentSender);
  const [theme, setTheme] = useState(currentTheme);
  const [copiedLink, setCopiedLink] = useState(false);

  const themes = [
    { id: 'romantic-pink', name: 'Romance Rosa 🌸', color: 'from-pink-400 to-rose-500' },
    { id: 'midnight', name: 'Noche Estrellada 🌌', color: 'from-purple-900 to-indigo-900' },
    { id: 'golden', name: 'Atardecer Dorado 🌅', color: 'from-amber-400 to-rose-400' },
    { id: 'enchanted', name: 'Jardín Encantado 🌿', color: 'from-emerald-400 to-pink-400' }
  ];

  const handleSave = () => {
    sound.playPop();
    // Sanitización estricta de entradas
    const cleanName = sanitizeInput(name, 40, 'Luyuromo');
    const cleanSender = sanitizeInput(sender, 40, 'Tu Amor');
    onSave({ name: cleanName, sender: cleanSender, theme });
    onClose();
  };

  const handleShareLink = () => {
    sound.playPop();
    const cleanName = sanitizeInput(name, 40, 'Luyuromo');
    const cleanSender = sanitizeInput(sender, 40, 'Tu Amor');
    const url = new URL(window.location.href);
    url.searchParams.set('name', cleanName);
    url.searchParams.set('sender', cleanSender);
    url.searchParams.set('theme', theme);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white/95 p-8 rounded-3xl max-w-md w-full shadow-2xl border border-rose-200 animate-pop-in">
        
        <div className="text-center mb-6">
          <span className="text-3xl">⚙️</span>
          <h3 className="text-2xl font-bold text-rose-900 font-pacifico">
            Personalizar San Valentín
          </h3>
          <p className="text-xs text-rose-600 font-quicksand mt-1">
            Adapta los nombres, tema y comparte un enlace seguro
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Nombre del destinatario */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-outfit">
              Nombre de tu San Valentín
            </label>
            <input
              type="text"
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm font-medium"
              placeholder="Ej: Luyuromo"
            />
          </div>

          {/* Nombre de quien dedica */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-outfit">
              Tu Firma / Dedicatoria
            </label>
            <input
              type="text"
              maxLength={40}
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm font-medium"
              placeholder="Ej: Tu enamorado/a"
            />
          </div>

          {/* Selector de Tema */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-outfit">
              Tema Visual Romántico
            </label>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    theme === t.id
                      ? 'border-rose-500 bg-rose-50 text-rose-900 shadow-sm scale-105'
                      : 'border-gray-200 text-gray-600 hover:border-rose-300'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${t.color}`} />
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compartir enlace personalizado */}
        <div className="mb-6 pt-2 border-t border-gray-100">
          <button
            onClick={handleShareLink}
            className="w-full py-2 px-4 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold hover:bg-rose-200 transition-colors flex items-center justify-center gap-2"
          >
            {copiedLink ? '✅ ¡Enlace seguro copiado!' : '🔗 Copiar Enlace Personalizado'}
          </button>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 btn-primary text-sm py-2.5"
          >
            Guardar Cambios 💖
          </button>
          <button
            onClick={onClose}
            className="btn-secondary text-sm py-2.5 px-5"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}
