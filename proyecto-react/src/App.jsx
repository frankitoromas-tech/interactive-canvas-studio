import React, { useState } from 'react';

export default function CartaLuyuromo() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState('');
  const [showRoses, setShowRoses] = useState(false);

  const messages = [
    "¿No estás segura?",
    "Piénsalo mejor...",
    "¿De verdad?",
    "Dale una oportunidad 💕",
    "Vamos, di que sí...",
    "No seas así 🥺",
    "Última oportunidad...",
    "Ya, no insistas más 💔"
  ];

  const loveMessages = [
    "Estar contigo me inspira a ser mejor cada día",
    "Tu sonrisa ilumina hasta mis días más oscuros",
    "Contigo, cada momento se vuelve especial",
    "Eres la razón de mi felicidad",
    "Tu amor es el regalo más valioso que he recibido",
    "Me haces sentir completo",
    "Cada día a tu lado es una aventura maravillosa",
    "Eres mi persona favorita en todo el mundo",
    "Tu presencia hace que todo tenga sentido",
    "Gracias por existir y estar en mi vida"
  ];

  const yesButtonSize = 80 + noCount * 20;
  const noButtonSize = Math.max(40, 60 - noCount * 5);

  const handleNoHover = () => {
    const newX = Math.random() * 300 - 150;
    const newY = Math.random() * 200 - 100;
    setNoPosition({ x: newX, y: newY });
    setNoCount(prev => Math.min(prev + 1, messages.length - 1));
  };

  const handleYesClick = () => {
    setYesPressed(true);
    setCurrentMessage(loveMessages[0]);
  };

  const getNewMessage = () => {
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    setCurrentMessage(randomMessage);
  };

  const toggleRoses = () => {
    setShowRoses(!showRoses);
  };

  if (yesPressed) {
    return (
      <div className="min-h-screen relative overflow-hidden"
           style={{
             background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
           }}>
        {/* Decoraciones de fondo flotantes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-float-1">💕</div>
          <div className="absolute top-20 right-20 text-6xl animate-float-2">💝</div>
          <div className="absolute bottom-20 left-20 text-7xl animate-float-3">💖</div>
          <div className="absolute bottom-10 right-10 text-5xl animate-float-1">💗</div>
          <div className="absolute top-1/2 left-1/4 text-6xl animate-float-2">✨</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float-3">🌟</div>
        </div>

        {/* Rosas flotantes cuando se activan */}
        {showRoses && (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-5xl animate-rose-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                🌹
              </div>
            ))}
          </>
        )}

        <div className="max-w-4xl mx-auto p-8 relative z-10">
          {/* Encabezado */}
          <div className="text-center mb-12 pt-8 animate-fade-in-down">
            <div className="text-8xl mb-6 animate-heartbeat">💝</div>
            <h1 className="text-7xl font-bold text-rose-900 mb-4"
                style={{ 
                  fontFamily: "'Pacifico', cursive",
                  textShadow: '3px 3px 0px rgba(244, 63, 94, 0.2)'
                }}>
              Luyuromo
            </h1>
            <p className="text-2xl text-rose-700 italic"
               style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 500 }}>
              Carta de San Valentín
            </p>
          </div>

          {/* Tarjeta principal */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-8 animate-scale-in"
               style={{ border: '3px solid rgba(244, 63, 94, 0.2)' }}>
            <p className="text-2xl text-gray-700 text-center leading-relaxed mb-8"
               style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 500 }}>
              {currentMessage || "Estar contigo me inspira: cambia sus palabras para recordarte lo valiosa que eres para mí."}
            </p>

            {/* Botones de acción */}
            <div className="flex gap-6 justify-center flex-wrap">
              <button
                onClick={getNewMessage}
                className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center gap-3 text-xl"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Nuevo mensaje ✨
              </button>
              
              <button
                onClick={toggleRoses}
                className={`${showRoses ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-rose-500 to-red-600'} hover:opacity-90 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center gap-3 text-xl`}
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {showRoses ? 'Detener rosas 🌹' : 'Revivir rosas 🌹'}
              </button>
            </div>
          </div>

          {/* Mensaje final */}
          <div className="text-center animate-fade-in-up">
            <p className="text-3xl text-rose-800 mb-4"
               style={{ fontFamily: "'Pacifico', cursive" }}>
              ¡Sabía que dirías que sí! 💕
            </p>
            <p className="text-xl text-rose-600"
               style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Este San Valentín será inolvidable
            </p>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;500;600;700&display=swap');
          
          @keyframes float-1 {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(10deg); }
          }
          
          @keyframes float-2 {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(-10deg); }
          }
          
          @keyframes float-3 {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(5deg); }
          }
          
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            10% { transform: scale(1.1); }
            20% { transform: scale(1); }
            30% { transform: scale(1.1); }
            40% { transform: scale(1); }
          }
          
          @keyframes scale-in {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes fade-in-down {
            0% {
              opacity: 0;
              transform: translateY(-30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes rose-fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(360deg);
              opacity: 0;
            }
          }
          
          .animate-float-1 {
            animation: float-1 6s ease-in-out infinite;
          }
          
          .animate-float-2 {
            animation: float-2 7s ease-in-out infinite;
          }
          
          .animate-float-3 {
            animation: float-3 8s ease-in-out infinite;
          }
          
          .animate-heartbeat {
            animation: heartbeat 2s ease-in-out infinite;
          }
          
          .animate-scale-in {
            animation: scale-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .animate-fade-in-down {
            animation: fade-in-down 1s ease-out;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out 0.5s backwards;
          }
          
          .animate-rose-fall {
            animation: rose-fall linear forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
         }}>
      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl animate-float-1">💕</div>
        <div className="absolute top-20 right-20 text-7xl animate-float-2">💝</div>
        <div className="absolute bottom-20 left-20 text-8xl animate-float-3">💖</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-float-1">💗</div>
      </div>

      {/* Contenido principal */}
      <div className="text-center z-10 p-8">
        <div className="mb-12 animate-bounce-in">
          <div className="text-9xl mb-6 animate-heartbeat">
            💝
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-rose-900 mb-4 drop-shadow-lg px-4"
              style={{ fontFamily: "'Pacifico', cursive" }}>
            Luyuromo,
          </h1>
          <h1 className="text-7xl md:text-8xl font-bold text-rose-700 mb-8 px-4"
              style={{ 
                fontFamily: "'Pacifico', cursive",
                textShadow: '4px 4px 0px rgba(244, 63, 94, 0.3)'
              }}>
            ¿Quieres ser mi San Valentín?
          </h1>
        </div>

        {noCount > 0 && (
          <p className="text-2xl md:text-3xl text-rose-800 mb-8 animate-shake px-4"
             style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>
            {messages[noCount]}
          </p>
        )}

        <div className="flex gap-8 justify-center items-center flex-wrap px-4">
          <button
            onClick={handleYesClick}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
            style={{
              width: `${yesButtonSize}px`,
              height: `${yesButtonSize}px`,
              fontSize: `${yesButtonSize / 4}px`,
              fontFamily: "'Quicksand', sans-serif"
            }}
          >
            ¡SÍ! 💕
          </button>

          <button
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-full shadow-lg transition-all duration-200"
            style={{
              width: `${noButtonSize}px`,
              height: `${noButtonSize}px`,
              fontSize: `${noButtonSize / 4}px`,
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
              fontFamily: "'Quicksand', sans-serif",
              opacity: noCount >= 7 ? 0.3 : 1
            }}
          >
            No
          </button>
        </div>

        {noCount >= 3 && (
          <p className="mt-12 text-xl md:text-2xl text-rose-600 animate-fade-in px-4"
             style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Pista: El botón "SÍ" está creciendo... 👀
          </p>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;600;700&display=swap');
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-10deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10% { transform: scale(1.1); }
          20% { transform: scale(1); }
          30% { transform: scale(1.1); }
          40% { transform: scale(1); }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 7s ease-in-out infinite;
        }
        
        .animate-float-3 {
          animation: float-3 8s ease-in-out infinite;
        }
        
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}