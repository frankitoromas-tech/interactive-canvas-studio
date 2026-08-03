import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/soundEffects';

export default function LoveLetter({ recipientName = 'Luyuromo', senderName = 'Tu Amor' }) {
  const [copied, setCopied] = useState(false);
  const [isTypewriter, setIsTypewriter] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const letterBody = `Desde el primer instante en que nuestras miradas y nuestras almas se cruzaron, supe que había encontrado a la persona con la que quiero compartir cada risa, cada sueño y cada atardecer.

Tu dulzura ilumina incluso mis días más grises, tu sonrisa es mi refugio favorito y tu ternura hace que todo tenga sentido. No hay palabras suficientes en ningún idioma para expresar lo inmensamente feliz que me haces.

Prometo cuidarte, escucharte, hacerte reír hasta que te duela la pancita y recordarte cada día lo maravillosa y única que eres para mí.

Gracias por existir, por ser tú y por decir que sí a ser mi San Valentín hoy, mañana y siempre.`;

  // Efecto máquina de escribir / escritura viva
  useEffect(() => {
    if (!isTypewriter) {
      setDisplayedText(letterBody);
      return;
    }

    setDisplayedText('');
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < letterBody.length) {
        setDisplayedText(letterBody.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isTypewriter, letterBody]);

  const handleCopy = () => {
    sound.playPop();
    navigator.clipboard.writeText(`Para ${recipientName}:\n\n${letterBody}\n\nCon todo mi amor,\n${senderName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-12 animate-slide-up mx-auto max-w-3xl flex flex-col items-center">
      
      {/* Distintivo minimalista */}
      <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-400/20 py-1 px-3.5 rounded-full mb-4">
        <span className="text-xs font-semibold text-rose-800 uppercase tracking-widest font-outfit">
          📜 Carta Escrita con el Corazón
        </span>
      </div>

      {/* Barra de Acciones de la Carta */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => {
            sound.playPop();
            setIsTypewriter(t => !t);
          }}
          className={`btn-secondary text-xs py-1.5 px-3.5 ${
            isTypewriter ? 'bg-rose-500 text-white border-rose-500 font-bold' : ''
          }`}
        >
          {isTypewriter ? '📜 Ver Texto Completo' : '✨ Modo Escritura en Vivo'}
        </button>

        <button
          onClick={handleCopy}
          className="btn-secondary text-xs py-1.5 px-3.5"
        >
          {copied ? '✅ ¡Copiada!' : '📋 Copiar'}
        </button>
      </div>

      {/* Papel Pergamino Romántico */}
      <div
        className="w-full bg-[#fdfbf7] border border-[#e7dec8] rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
        style={{
          boxShadow: 'inset 0 0 35px rgba(217, 119, 6, 0.04), 0 10px 30px rgba(0,0,0,0.04)'
        }}
      >
        {/* Filigranas tenues */}
        <div className="absolute top-2 left-3 text-amber-300 text-lg sm:text-2xl select-none opacity-40">❧</div>
        <div className="absolute top-2 right-3 text-amber-300 text-lg sm:text-2xl select-none opacity-40">☙</div>
        <div className="absolute bottom-2 left-3 text-amber-300 text-lg sm:text-2xl select-none opacity-40">❧</div>
        <div className="absolute bottom-2 right-3 text-amber-300 text-lg sm:text-2xl select-none opacity-40">☙</div>

        {/* Encabezado */}
        <h3 className="text-2xl sm:text-3xl font-bold text-rose-950 font-pacifico mb-6 text-left">
          Mi queridísima {recipientName},
        </h3>

        {/* Texto de la Carta */}
        <p className="text-base sm:text-xl text-gray-800 font-dancing leading-relaxed whitespace-pre-line text-left font-semibold">
          {displayedText}
          {isTypewriter && displayedText.length < letterBody.length && (
            <span className="inline-block w-1.5 h-5 bg-rose-500 ml-1 animate-pulse" />
          )}
        </p>

        {/* Firma */}
        <div className="mt-8 pt-6 border-t border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-amber-900 font-quicksand font-bold block uppercase tracking-wider">
              Con amor eterno,
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-rose-700 font-great-vibes">
              {senderName}
            </span>
          </div>

          <div className="wax-seal scale-90 sm:scale-100">
            <span>💖</span>
          </div>
        </div>

      </div>

    </div>
  );
}
