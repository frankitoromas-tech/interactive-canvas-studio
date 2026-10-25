/**
 * LanguageSelector.jsx — Selector Dinámico y Elegante de Localización
 * Incorpora la Tríada Filosófica de Frankosyni: Ἀγάπη · Φιλία · Τέχνη
 * Cambio reactivo instantáneo sin refrescar la página.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import { sound } from '../../utils/soundEffects';

export default function LanguageSelector({ variant = 'pill' }) {
  const { language, setLanguage, t, languages, currentMeta, greekTrinity } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [showTrinityModal, setShowTrinityModal] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectLanguage = (code) => {
    try {
      sound.playPop();
    } catch (_) {}
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Botón Principal del Selector */}
      <button
        type="button"
        onClick={() => {
          try { sound.playPop(); } catch (_) {}
          setIsOpen(!isOpen);
        }}
        className={`quick-action-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 shadow-sm ${
          isOpen
            ? 'bg-rose-500 text-white border-rose-400 ring-2 ring-rose-300/50'
            : 'bg-white/85 hover:bg-white text-rose-950 border-rose-200/80 hover:border-rose-400'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={t('selectorModal.title', {}, 'Seleccionar Idioma')}
      >
        <span className="text-base select-none">{currentMeta.flag}</span>
        <span className="text-xs font-bold font-outfit uppercase tracking-wider hidden sm:inline">
          {currentMeta.code}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold bg-rose-100 text-rose-800 hidden md:inline border border-rose-200">
          {languages.find(l => l.code === language)?.greekBadge}
        </span>
        <span className="text-[10px] opacity-70 transition-transform duration-200">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Menú Desplegable con Alta Neuroestética */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl glass-card-strong p-3 shadow-2xl border border-white/95 z-50 animate-pop-in text-left origin-top-right"
          role="menu"
        >
          {/* Cabecera del Menú */}
          <div className="px-2 py-1.5 mb-2 border-b border-rose-200/60 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-rose-950 font-outfit">
                {t('selectorModal.title', {}, 'Localización & Dialéctica')}
              </p>
              <p className="text-[10px] text-rose-700/80 font-quicksand">
                {t('selectorModal.subtitle', {}, 'Fluido y en tiempo real')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                try { sound.playChime(); } catch (_) {}
                setShowTrinityModal(true);
                setIsOpen(false);
              }}
              className="text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300/60 rounded-lg px-2 py-1 transition-colors"
              title="Ver filosofía griega de Frankosyni"
            >
              🏛️ Tríada
            </button>
          </div>

          {/* Opciones de Idiomas */}
          <div className="space-y-1.5" role="none">
            {languages.map((langItem) => {
              const isSelected = language === langItem.code;
              return (
                <button
                  key={langItem.code}
                  type="button"
                  onClick={() => handleSelectLanguage(langItem.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 border ${
                    isSelected
                      ? 'bg-rose-500 text-white font-bold border-rose-600 shadow-md transform scale-[1.01]'
                      : 'bg-white/70 hover:bg-white text-rose-900 hover:text-rose-950 border-rose-100 hover:border-rose-300'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl select-none">{langItem.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold leading-tight">
                        {langItem.label}
                      </span>
                      <span
                        className={`text-[10px] font-medium ${
                          isSelected ? 'text-rose-100' : 'text-rose-600'
                        }`}
                      >
                        {langItem.code === 'es' && 'Nativo · Lengua Matriz'}
                        {langItem.code === 'en' && 'Global · Universal Voice'}
                        {langItem.code === 'el' && 'Κλασική · Φιλοσοφία & Τέχνη'}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-serif border ${
                      isSelected
                        ? 'bg-white/20 text-white border-white/40'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    {langItem.greekBadge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pie del Menú con el Sello de Frankosyni */}
          <div className="mt-2.5 pt-2 border-t border-rose-200/60 px-1 text-center">
            <span className="text-[10px] text-rose-700/80 font-quicksand block">
              Sello: <strong>Φρανκοσύνη/Francus.</strong>
            </span>
            <span className="text-[9px] text-rose-500/90 font-serif tracking-wider">
              « Ἀγάπη · Φιλία · Τέχνη »
            </span>
          </div>
        </div>
      )}

      {/* Modal Explicativo de la Tríada Griega de Frankosyni */}
      {showTrinityModal && (
        <div
          onClick={() => setShowTrinityModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in text-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card-strong max-w-lg w-full p-6 sm:p-8 rounded-3xl shadow-2xl relative border border-white/95 animate-pop-in text-left flex flex-col gap-4"
          >
            <button
              onClick={() => setShowTrinityModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-rose-600 text-xl font-bold w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <span className="text-3xl">🏛️</span>
              <div>
                <h3 className="text-xl font-bold text-rose-950 font-pacifico">
                  La Tríada de Frankosyni
                </h3>
                <p className="text-xs text-rose-700 font-quicksand">
                  Homenaje conceptual a las tres dimensiones del amor y la creación
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-1">
              {/* Ἀγάπη */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-50/90 to-pink-50/90 border border-rose-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg font-serif font-bold text-rose-900 tracking-wide">
                    {greekTrinity.agape.term} ({greekTrinity.agape.transcription})
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                    Amor Supremo
                  </span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed font-quicksand">
                  {language === 'el' ? greekTrinity.agape.meaningEl : language === 'en' ? greekTrinity.agape.meaningEn : greekTrinity.agape.meaningEs}
                </p>
              </div>

              {/* Φιλία */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50/90 to-orange-50/90 border border-amber-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg font-serif font-bold text-amber-950 tracking-wide">
                    {greekTrinity.philia.term} ({greekTrinity.philia.transcription})
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                    Conexión del Alma
                  </span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-quicksand">
                  {language === 'el' ? greekTrinity.philia.meaningEl : language === 'en' ? greekTrinity.philia.meaningEn : greekTrinity.philia.meaningEs}
                </p>
              </div>

              {/* Τέχνη */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50/90 to-indigo-50/90 border border-purple-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg font-serif font-bold text-purple-950 tracking-wide">
                    {greekTrinity.techne.term} ({greekTrinity.techne.transcription})
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white">
                    Artesanía de Software
                  </span>
                </div>
                <p className="text-xs text-purple-900 leading-relaxed font-quicksand">
                  {language === 'el' ? greekTrinity.techne.meaningEl : language === 'en' ? greekTrinity.techne.meaningEn : greekTrinity.techne.meaningEs}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-rose-200/60 text-center">
              <p className="text-xs text-rose-900 font-semibold font-outfit">
                Firmado con devoción: <span className="font-serif italic text-rose-700">Frankosyni (Φρανκοσύνη/Francus.)</span>
              </p>
              <button
                type="button"
                onClick={() => setShowTrinityModal(false)}
                className="mt-3 px-5 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                Entendido ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
