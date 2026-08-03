import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { sanitizeInput } from '../../utils/security';

export default function SettingsModal({
  currentName,
  currentSender,
  currentTheme,
  onSave,
  onResetExperience,
  onClose
}) {
  const [recipient, setRecipient] = useState(currentName);
  const [sender, setSender] = useState(currentSender);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playMatchSuccess();
    const cleanRecipient = sanitizeInput(recipient, 40, 'Luyuromo');
    const cleanSender = sanitizeInput(sender, 40, 'Tu Amor');
    onSave({
      name: cleanRecipient,
      sender: cleanSender,
      theme: selectedTheme
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card-strong max-w-md w-full p-6 sm:p-8 text-center relative animate-pop-in flex flex-col items-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-rose-600 text-xl font-bold w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        <span className="text-3xl mb-1">⚙️</span>
        <h3 className="text-2xl font-bold text-rose-900 font-pacifico mb-1">
          Ajustes & Personalización
        </h3>
        <p className="text-xs text-rose-700 font-quicksand mb-6">
          Personaliza los nombres y la atmósfera visual a tu gusto.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 text-left">
          <div>
            <label className="text-xs font-bold text-rose-900 block mb-1">Nombre de tu Pareja:</label>
            <input
              type="text"
              value={recipient}
              maxLength={30}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-rose-300 text-sm bg-white/90 focus:outline-rose-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-rose-900 block mb-1">Tu Nombre o Apodo:</label>
            <input
              type="text"
              value={sender}
              maxLength={30}
              onChange={(e) => setSender(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-rose-300 text-sm bg-white/90 focus:outline-rose-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-rose-900 block mb-2">Tema Visual & Atmósfera:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'romantic-pink', name: '🌸 Rosa Romántico', desc: 'Clásico y dulce' },
                { id: 'midnight', name: '🌌 Noche Estrellada', desc: 'Místico y profundo' },
                { id: 'golden', name: '✨ Oro y Atardecer', desc: 'Cálido y brillante' },
                { id: 'enchanted', name: '🌿 Bosque Encantado', desc: 'Fresco y primaveral' }
              ].map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedTheme(t.id);
                  }}
                  className={`p-2 rounded-xl text-xs font-medium transition-all text-left border ${
                    selectedTheme === t.id
                      ? 'border-rose-500 bg-rose-500 text-white font-bold shadow-md'
                      : 'border-rose-200 bg-white/80 text-rose-900 hover:bg-rose-50'
                  }`}
                >
                  <div>{t.name}</div>
                  <div className={`text-[10px] ${selectedTheme === t.id ? 'text-rose-100' : 'text-gray-500'}`}>
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-rose-200">
            <button type="submit" className="btn-primary w-full text-sm py-2.5">
              Guardar Cambios ✨
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('¿Quieres reiniciar la propuesta para ver el sobre y la pregunta desde el inicio?')) {
                  onResetExperience();
                  onClose();
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold py-1.5 cursor-pointer text-center"
            >
              🔄 Reiniciar Experiencia desde el Inicio
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
