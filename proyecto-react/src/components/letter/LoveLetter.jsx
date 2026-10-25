import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/soundEffects';
import { copyToClipboardSafe } from '../../utils/security';

export default function LoveLetter({ recipientName = 'Luyuromo', senderName = 'Frank' }) {
  const [copied, setCopied] = useState(false);
  const [isTypewriter, setIsTypewriter] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [easterEgg, setEasterEgg] = useState(null);

  const letterBody = `Hay encuentros que no se anuncian con estruendo, sino con la serena quietud con la que la marea abraza la orilla. Desde que tu paso acompasó mis días, descubrí que la ternura no es fragilidad: es el coraje más lúcido para sostener y honrar la vida del otro.

Tú me devuelves la calma en medio del ruido, el asombro ante las cosas menudas y esa forma limpia de mirar el mundo que solo habita en quien no teme mostrarse transparente. Tu risa desarma cualquier desvelo, y tu compañía hace que el silencio sea, por fin, un hogar completo.

No vengo a prometerte paraísos intactos ni días exentos de tormenta, sino la certeza incorruptible de mi presencia: escucharte con atención reposada, cuidar tus silencios, admirar tus alas y recordarte —sobre todo cuando la duda te roce— la luz noble, inmensa y generosa que desprendes.

Gracias por tu verdad, por coincidir en este rincón del tiempo y por regalarme el honor más dulce: aprender a amarte con paciencia, hondura y lealtad, hoy y en cada amanecer que nos aguarde.`;

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

  const handleCopy = async () => {
    sound.playPop();
    const success = await copyToClipboardSafe(`Para ${recipientName}:\n\n${letterBody}\n\nCon devoción constante,\n${senderName}`);
    if (success) {
      sound.playMatchSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const triggerEasterEgg = (title, text) => {
    sound.playPop();
    setEasterEgg({ title, text });
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-12 animate-slide-up mx-auto max-w-3xl flex flex-col items-center">
      
      {/* Distintivo minimalista */}
      <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-400/20 py-1 px-3.5 rounded-full mb-4">
        <span className="text-xs font-semibold text-rose-800 uppercase tracking-widest font-outfit">
          📜 Epístola del Corazón · Edición Íntima
        </span>
      </div>

      {/* Barra de Acciones de la Carta */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => {
            sound.playPop();
            setIsTypewriter(t => !t);
          }}
          className={`btn-secondary text-xs min-h-[44px] py-1.5 px-3.5 ${
            isTypewriter ? 'bg-rose-500 text-white border-rose-500 font-bold' : ''
          }`}
        >
          {isTypewriter ? '📜 Ver Texto Completo' : '✨ Modo Caligrafía en Vivo'}
        </button>

        <button
          onClick={handleCopy}
          className="btn-secondary text-xs min-h-[44px] py-1.5 px-3.5"
        >
          {copied ? '✨ ¡Guardada en el alma!' : '📋 Copiar Carta'}
        </button>
      </div>

      {/* Papel Pergamino Romántico */}
      <div
        className="w-full bg-[#fdfbf7] border border-[#e7dec8] rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
        style={{
          boxShadow: 'inset 0 0 35px rgba(217, 119, 6, 0.04), 0 10px 30px rgba(0,0,0,0.04)'
        }}
      >
        {/* Filigranas interactivas (Easter Eggs) */}
        <button
          type="button"
          onClick={() => triggerEasterEgg('Acotación al margen', '«Quien bien ama no apresura la flor: aprende a ser tierra tibia y abrigo seguro.»')}
          title="Toca para descubrir un susurro secreto"
          className="absolute top-2 left-3 text-amber-400/70 hover:text-amber-600 hover:scale-125 transition-all text-lg sm:text-2xl select-none cursor-pointer focus:outline-none"
        >
          ❧
        </button>
        <button
          type="button"
          onClick={() => triggerEasterEgg('Brújula secreta', '«Entre todas las coordenadas del mundo, mis manos siempre eligen las tuyas.»')}
          title="Toca para descubrir un susurro secreto"
          className="absolute top-2 right-3 text-amber-400/70 hover:text-amber-600 hover:scale-125 transition-all text-lg sm:text-2xl select-none cursor-pointer focus:outline-none"
        >
          ☙
        </button>
        <button
          type="button"
          onClick={() => triggerEasterEgg('Memoria viva', '«El amor verdadero no es un pacto de un día; es la costumbre sagrada de elegirse a diario.»')}
          title="Toca para descubrir un susurro secreto"
          className="absolute bottom-2 left-3 text-amber-400/70 hover:text-amber-600 hover:scale-125 transition-all text-lg sm:text-2xl select-none cursor-pointer focus:outline-none"
        >
          ❧
        </button>
        <button
          type="button"
          onClick={() => triggerEasterEgg('Destello íntimo', '«Tu sonrisa es el único reloj capaz de detener todos mis inviernos.»')}
          title="Toca para descubrir un susurro secreto"
          className="absolute bottom-2 right-3 text-amber-400/70 hover:text-amber-600 hover:scale-125 transition-all text-lg sm:text-2xl select-none cursor-pointer focus:outline-none"
        >
          ☙
        </button>

        {/* Notificación de Easter Egg sobre el pergamino */}
        {easterEgg && (
          <div
            className="absolute inset-x-4 top-14 sm:top-16 z-20 bg-amber-50/95 backdrop-blur-md border border-amber-300 rounded-xl p-4 shadow-xl animate-fade-in flex flex-col items-center text-center transition-all"
            role="alert"
          >
            <span className="text-amber-700 text-xs font-semibold tracking-wider uppercase mb-1 font-outfit">
              ✦ {easterEgg.title} ✦
            </span>
            <p className="text-rose-950 font-dancing text-lg sm:text-xl font-bold italic mb-3 leading-relaxed">
              {easterEgg.text}
            </p>
            <button
              type="button"
              onClick={() => setEasterEgg(null)}
              className="text-xs text-amber-900 hover:text-black bg-amber-200/80 hover:bg-amber-300 px-3.5 py-1 rounded-full font-quicksand font-bold transition-colors cursor-pointer"
            >
              Guardar en el corazón ✦
            </button>
          </div>
        )}

        {/* Encabezado */}
        <h3 className="text-2xl sm:text-3xl font-bold text-rose-950 font-pacifico mb-6 text-left break-words max-w-full">
          Mi queridísima {recipientName},
        </h3>

        {/* Texto de la Carta */}
        <p className="text-base sm:text-xl text-gray-800 font-dancing leading-relaxed whitespace-pre-line text-left font-semibold break-words" style={{ overflowWrap: 'break-word', hyphens: 'auto' }}>
          {displayedText}
          {isTypewriter && displayedText.length < letterBody.length && (
            <span className="inline-block w-1.5 h-5 bg-rose-500 ml-1 animate-pulse" />
          )}
        </p>

        {/* Firma */}
        <div className="mt-8 pt-6 border-t border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-amber-900 font-quicksand font-bold block uppercase tracking-wider">
              Con devoción constante,
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-rose-700 font-great-vibes">
              {senderName}
            </span>
          </div>

          <div
            onClick={() => triggerEasterEgg('Lacre de Confidencia', '«Este sello guarda una sola verdad: Frank te contempla con la serenidad de quien por fin halló su norte.»')}
            className="wax-seal scale-90 sm:scale-100 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            title="Toca el sello de cera para revelar un secreto"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerEasterEgg('Lacre de Confidencia', '«Este sello guarda una sola verdad: Frank te contempla con la serenidad de quien por fin halló su norte.»');
              }
            }}
          >
            <span>💖</span>
          </div>
        </div>

      </div>

    </div>
  );
}
