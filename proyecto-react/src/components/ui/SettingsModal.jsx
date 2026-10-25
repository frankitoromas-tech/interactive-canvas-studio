import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { sanitizeInput } from '../../utils/security';
import { useI18n } from '../../i18n/I18nContext';

export default function SettingsModal({
  currentName,
  currentSender,
  currentTheme,
  onSave,
  onResetExperience,
  onOpenDiagnostics,
  onClose
}) {
  const { language, setLanguage, t, languages } = useI18n();
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
        className="glass-card-strong max-w-md w-full p-6 sm:p-8 text-center relative animate-pop-in flex flex-col items-center max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-rose-600 text-xl font-bold w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        <span className="text-3xl mb-1">⚙️</span>
        <h3 className="text-2xl font-bold text-rose-900 font-pacifico mb-1">
          {t('settings.title', {}, 'Ajustes & Personalización')}
        </h3>
        <p className="text-xs text-rose-700 font-quicksand mb-5">
          {t('settings.subtitle', {}, 'Personaliza los nombres, atmósfera visual e idioma a tu gusto.')}
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 text-left">
          <div>
            <label className="text-xs font-bold text-rose-900 block mb-1">
              {t('settings.recipientLabel', {}, 'Nombre de tu Pareja:')}
            </label>
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
            <label className="text-xs font-bold text-rose-900 block mb-1">
              {t('settings.senderLabel', {}, 'Tu Nombre o Apodo:')}
            </label>
            <input
              type="text"
              value={sender}
              maxLength={30}
              onChange={(e) => setSender(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-rose-300 text-sm bg-white/90 focus:outline-rose-500"
              required
            />
          </div>

          {/* Selector de Idioma & Dialéctica Clásica */}
          <div>
            <label className="text-xs font-bold text-rose-900 block mb-1.5 flex items-center justify-between">
              <span>{t('settings.languageLabel', {}, 'Idioma & Dialéctica:')}</span>
              <span className="text-[10px] text-amber-700 font-serif">« Ἀγάπη · Φιλία · Τέχνη »</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((l) => (
                <button
                  type="button"
                  key={l.code}
                  onClick={() => {
                    sound.playPop();
                    setLanguage(l.code);
                  }}
                  className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all border ${
                    language === l.code
                      ? 'border-rose-500 bg-rose-500 text-white font-bold shadow-md'
                      : 'border-rose-200 bg-white/80 text-rose-900 hover:bg-rose-50'
                  }`}
                >
                  <span className="text-lg mb-0.5">{l.flag}</span>
                  <span className="text-xs font-semibold">{l.name}</span>
                  <span className={`text-[9px] font-serif ${language === l.code ? 'text-rose-100' : 'text-rose-600'}`}>
                    {l.greekBadge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-rose-900 block mb-2">
              {t('settings.themeLabel', {}, 'Tema Visual & Atmósfera:')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'romantic-pink', name: '🌸 Rosa Romántico', desc: 'Clásico y dulce' },
                { id: 'midnight', name: '🌌 Noche Estrellada', desc: 'Místico y profundo' },
                { id: 'golden', name: '✨ Oro y Atardecer', desc: 'Cálido y brillante' },
                { id: 'enchanted', name: '🌿 Bosque Encantado', desc: 'Fresco y primaveral' }
              ].map((thm) => (
                <button
                  type="button"
                  key={thm.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedTheme(thm.id);
                  }}
                  className={`p-2 rounded-xl text-xs font-medium transition-all text-left border ${
                    selectedTheme === thm.id
                      ? 'border-rose-500 bg-rose-500 text-white font-bold shadow-md'
                      : 'border-rose-200 bg-white/80 text-rose-900 hover:bg-rose-50'
                  }`}
                >
                  <div>{thm.name}</div>
                  <div className={`text-[10px] ${selectedTheme === thm.id ? 'text-rose-100' : 'text-gray-500'}`}>
                    {thm.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-rose-200">
            <button type="submit" className="btn-primary w-full text-sm py-2.5">
              {t('settings.saveBtn', {}, 'Guardar Cambios ✨')}
            </button>

            {onOpenDiagnostics && (
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  onClose();
                  onOpenDiagnostics();
                }}
                className="btn-secondary w-full text-xs py-2 flex items-center justify-center gap-1.5"
              >
                <span>🛡️</span> {t('settings.diagnosticsBtn', {}, 'Auditoría & Diagnóstico de Sistema')}
              </button>
            )}

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
              {t('settings.resetBtn', {}, '🔄 Reiniciar Experiencia desde el Inicio')}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
