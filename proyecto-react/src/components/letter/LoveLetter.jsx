import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';

export default function LoveLetter({ recipientName = 'Luyuromo', senderName = 'Tu Amor' }) {
  const [copied, setCopied] = useState(false);

  const letterBody = `Desde el primer instante en que nuestras miradas y nuestras almas se cruzaron, supe que había encontrado a la persona con la que quiero compartir cada risa, cada sueño y cada atardecer.

Tu dulzura ilumina incluso mis días más grises, tu sonrisa es mi refugio favorito y tu ternura hace que todo tenga sentido. No hay palabras suficientes en ningún idioma para expresar lo inmensamente feliz que me haces.

Prometo cuidarte, escucharte, hacerte reír hasta que te duela la pancita y recordarte cada día lo maravillosa y única que eres para mí.

Gracias por existir, por ser tú y por decir que sí a ser mi San Valentín hoy, mañana y siempre.`;

  const handleCopy = () => {
    sound.playPop();
    navigator.clipboard.writeText(`Para ${recipientName}:\n\n${letterBody}\n\nCon todo mi amor,\n${senderName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-12 animate-slide-up mx-auto max-w-3xl flex flex-col items-center">
      
      {/* Distintivo de Carta */}
      <div className="inline-flex items-center gap-2 bg-rose-100/90 border border-rose-300 py-1.5 px-4 rounded-full mb-6">
        <span>📜</span>
        <span className="text-xs sm:text-sm font-bold text-rose-900 font-outfit uppercase tracking-wider">
          Carta Escrita desde el Alma
        </span>
      </div>

      {/* Papel Pergamino Romántico */}
      <div
        className="w-full bg-[#fdfbf7] border-2 border-[#e7dec8] rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
        style={{
          boxShadow: 'inset 0 0 40px rgba(217, 119, 6, 0.05), 0 10px 30px rgba(0,0,0,0.05)'
        }}
      >
        {/* Filigranas decorativas */}
        <div className="absolute top-2 left-3 text-amber-300 text-lg sm:text-2xl select-none opacity-60">❧</div>
        <div className="absolute top-2 right-3 text-amber-300 text-lg sm:text-2xl select-none opacity-60">☙</div>
        <div className="absolute bottom-2 left-3 text-amber-300 text-lg sm:text-2xl select-none opacity-60">❧</div>
        <div className="absolute bottom-2 right-3 text-amber-300 text-lg sm:text-2xl select-none opacity-60">☙</div>

        {/* Encabezado de la Carta */}
        <h3 className="text-2xl sm:text-3xl font-bold text-rose-950 font-pacifico mb-6 text-left">
          Mi queridísima {recipientName},
        </h3>

        {/* Cuerpo de la Carta */}
        <p className="text-base sm:text-xl text-gray-800 font-dancing leading-relaxed whitespace-pre-line text-left font-semibold">
          {letterBody}
        </p>

        {/* Firma */}
        <div className="mt-8 pt-6 border-t border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-amber-900 font-quicksand font-bold block uppercase tracking-wider">
              Con amor infinito,
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

      {/* Botones de acción */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleCopy}
          className="btn-secondary text-xs sm:text-sm"
        >
          {copied ? '✅ ¡Copiada con éxito!' : '📋 Copiar Carta Romántica'}
        </button>
      </div>

    </div>
  );
}
