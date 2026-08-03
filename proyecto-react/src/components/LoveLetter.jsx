import React, { useState, useEffect } from 'react';
import { sound } from '../utils/soundEffects';

export default function LoveLetter({ recipientName = 'Luyuromo', senderName = 'Con amor infinito' }) {
  const loveQuotes = [
    "Estar contigo me inspira a ser mejor cada día.",
    "Tu sonrisa ilumina hasta mis días más nublados.",
    "Contigo, cada instante se vuelve un tesoro inolvidable.",
    "Eres la casualidad más bonita que la vida me regaló.",
    "Tu abrazo es mi lugar favorito en todo el universo.",
    "Gracias por hacerme reír como nadie más puede hacerlo.",
    "Cada segundo a tu lado es una aventura que volvería a elegir mil veces.",
    "Eres mi persona favorita, hoy, mañana y siempre.",
    "Tu mirada tiene esa magia que calma todas mis tormentas.",
    "Amarte es fácil porque eres simplemente maravillosa."
  ];

  const reasons = [
    { title: "Tu hermosa risa", text: "Tiene el poder de alegrar cualquier habitación y contagiarme felicidad pura." },
    { title: "Tu forma de escuchar", text: "La ternura y atención con la que estás presente para mí en cada momento." },
    { title: "Tus abrazos sanadores", text: "El refugio más cálido y seguro donde cualquier problema desaparece." },
    { title: "Tu brillo único", text: "Esa luz tan tuya que hace especial todo lo que tocas y a todos los que te rodean." },
    { title: "Nuestras complicidades", text: "Esas miradas y chistes que solo tú y yo entendemos al instante." },
    { title: "Tu dulce paciencia", text: "El cariño con el que compartes tu tiempo, tus historias y tus sueños." }
  ];

  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [unlockedReasons, setUnlockedReasons] = useState([0]);
  const [copied, setCopied] = useState(false);

  const fullLetter = `Querida ${recipientName},\n\nDesde que llegaste a mi vida, entendí que el amor no se trata de encontrar a alguien perfecto, sino de descubrir en ti la magia más genuina. Gracias por tus sonrisas, por tu calidez y por hacer de este mundo un lugar infinitamente más brillante. Feliz San Valentín, mi persona favorita. 💕`;

  // Efecto máquina de escribir para la carta principal
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const timer = setInterval(() => {
      if (index < fullLetter.length) {
        setDisplayedText(fullLetter.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [recipientName]);

  const handleNextQuote = () => {
    sound.playPop();
    setActiveQuoteIndex((prev) => (prev + 1) % loveQuotes.length);
  };

  const toggleReason = (index) => {
    sound.playChime();
    setUnlockedReasons(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const copyToClipboard = () => {
    sound.playPop();
    navigator.clipboard.writeText(fullLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-slide-up">
      
      {/* Carta Principal con Textura Vintage y Caligrafía */}
      <div className="glass-card-strong p-8 md:p-12 relative overflow-hidden">
        
        {/* Decoraciones en esquinas */}
        <div className="absolute top-4 left-4 text-2xl text-rose-300">🌸</div>
        <div className="absolute top-4 right-4 text-2xl text-rose-300">🌸</div>
        <div className="absolute bottom-4 left-4 text-2xl text-rose-300">🌸</div>
        <div className="absolute bottom-4 right-4 text-2xl text-rose-300">🌸</div>

        <div className="text-center mb-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-rose-500 font-cinzel">
            Epístola de Amor & Admiración
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-rose-900 font-playfair mt-1">
            Para Mi {recipientName}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mt-3" />
        </div>

        {/* Texto de la carta mecanografiada */}
        <div className="bg-rose-50/70 p-6 md:p-8 rounded-2xl border border-rose-200/80 shadow-inner">
          <p className="text-lg md:text-2xl text-gray-800 font-playfair italic leading-relaxed whitespace-pre-line">
            {displayedText}
            {isTyping && <span className="inline-block w-2 h-6 bg-rose-500 ml-1 animate-pulse" />}
          </p>
        </div>

        {/* Botón de copiar carta */}
        <div className="flex justify-end mt-4">
          <button
            onClick={copyToClipboard}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1.5 transition-colors bg-white/70 py-1.5 px-3 rounded-full border border-rose-200"
          >
            {copied ? '✅ ¡Copiado con amor!' : '📋 Copiar esta carta'}
          </button>
        </div>

      </div>

      {/* Cápsula de Razones para Amarte */}
      <div className="glass-card p-8 md:p-10">
        <div className="text-center mb-8">
          <span className="text-3xl mb-2 inline-block animate-bounce">💎</span>
          <h3 className="text-2xl md:text-4xl font-bold text-rose-900 font-pacifico">
            Razones por las que te elijo cada día
          </h3>
          <p className="text-rose-700 text-sm md:text-base font-quicksand mt-1">
            Toca cada cápsula para revelar un motivo especial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((reason, idx) => {
            const isUnlocked = unlockedReasons.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => toggleReason(idx)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isUnlocked
                    ? 'bg-white/90 border-rose-300 shadow-md transform -translate-y-1'
                    : 'bg-white/40 border-rose-200/60 hover:bg-white/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-900 text-lg flex items-center gap-2">
                    <span>{isUnlocked ? '💖' : '🔒'}</span>
                    {idx + 1}. {reason.title}
                  </span>
                  <span className="text-xs text-rose-500 font-semibold uppercase">
                    {isUnlocked ? 'Abierto' : 'Tocar'}
                  </span>
                </div>
                {isUnlocked && (
                  <p className="text-gray-700 mt-3 text-sm md:text-base font-quicksand animate-slide-up pl-7 border-l-2 border-rose-400">
                    {reason.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Generador de Pensamientos Románticos Diarios */}
      <div className="glass-card p-8 text-center">
        <span className="text-4xl mb-3 inline-block">✨</span>
        <h4 className="text-xl md:text-2xl font-bold text-rose-900 font-quicksand mb-4">
          Un pensamiento para tu corazón
        </h4>
        
        <div className="min-h-[90px] flex items-center justify-center p-4 bg-white/60 rounded-2xl border border-rose-200/80 mb-6">
          <p className="text-lg md:text-xl text-rose-800 font-dancing font-bold italic transition-all duration-500">
            "{loveQuotes[activeQuoteIndex]}"
          </p>
        </div>

        <button
          onClick={handleNextQuote}
          className="btn-primary text-base shadow-md"
        >
          ✨ Revelar Otro Mensaje
        </button>
      </div>

    </div>
  );
}
