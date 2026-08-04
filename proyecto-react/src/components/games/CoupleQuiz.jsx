import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { confetti } from '../../utils/confettiEngine';

const QUESTIONS = [
  {
    question: '¿Qué es lo que más amo de ti?',
    options: [
      { text: 'Tu hermosa sonrisa y mirada ✨', isCorrect: true },
      { text: 'Tu sentido del humor único 😹', isCorrect: true },
      { text: 'Tu manera tan tierna de cuidarme 💖', isCorrect: true },
      { text: '¡Absolutamente TODO de ti! 🥰', isCorrect: true }
    ],
    hint: 'Cualquier opción es perfecta porque te amo entera.'
  },
  {
    question: '¿Cuál es el plan perfecto para nosotros?',
    options: [
      { text: 'Películas, manta y abrazos 🎬🍿', isCorrect: true },
      { text: 'Cena romántica a la luz de las velas 🍷✨', isCorrect: true },
      { text: 'Caminar juntos bajo las estrellas 🌙', isCorrect: true },
      { text: 'Cualquier lugar mientras sea contigo 💑', isCorrect: true }
    ],
    hint: 'El lugar no importa cuando el corazón está lleno.'
  },
  {
    question: 'Si fuéramos un dúo famoso, ¿cuál seríamos?',
    options: [
      { text: 'Dos gatitos tiernos inseparables 🐱🐾', isCorrect: true },
      { text: 'La Luna y las Estrellas 🌌', isCorrect: true },
      { text: 'El café y la mañana perfecta ☕☀️', isCorrect: true },
      { text: 'El amor de nuestras vidas 💕', isCorrect: true }
    ],
    hint: '¡Nacidos para complementarnos!'
  },
  {
    question: '¿Cuánto tiempo dura este amor?',
    options: [
      { text: 'Hasta el infinito y más allá 🚀', isCorrect: true },
      { text: 'Toda esta vida y las siguientes ♾️', isCorrect: true },
      { text: 'Por los siglos de los siglos ✨', isCorrect: true },
      { text: 'Por siempre jamás 💖', isCorrect: true }
    ],
    hint: 'El amor verdadero no tiene fecha de caducidad.'
  }
];

export default function CoupleQuiz({ recipientName = 'Luyuromo' }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (option) => {
    setSelectedOption(option.text);
    sound.playMatchSuccess();
    setScore(s => s + 25);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentStep + 1 < QUESTIONS.length) {
        setCurrentStep(s => s + 1);
      } else {
        setShowResult(true);
        sound.playFanfare();
        confetti.cannonCelebration();
      }
    }, 600);
  };

  const restartQuiz = () => {
    sound.playPop();
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="w-full glass-card-strong p-6 md:p-10 text-center animate-slide-up mx-auto max-w-2xl flex flex-col items-center">
      
      {/* Encabezado */}
      <div className="inline-flex items-center gap-2 bg-pink-100/80 px-4 py-1.5 rounded-full mb-3 border border-pink-300">
        <span>🧠</span>
        <span className="text-xs md:text-sm font-bold text-pink-900 font-outfit uppercase tracking-wider">
          Quiz de Conexión & Amor
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-rose-900 font-pacifico mb-2">
        ¿Cuánto Nos Amamos?
      </h2>

      {!showResult ? (
        <div className="w-full mt-4 flex flex-col items-center">
          {/* Barra de progreso */}
          <div className="w-full bg-rose-200/60 rounded-full h-2.5 mb-6 overflow-hidden max-w-md">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <span className="text-xs font-bold text-rose-600 font-outfit uppercase mb-2">
            Pregunta {currentStep + 1} de {QUESTIONS.length}
          </span>

          <h3 className="text-xl md:text-2xl font-bold text-rose-900 font-dancing mb-6">
            {currentQ.question}
          </h3>

          {/* Opciones */}
          <div className="grid grid-cols-1 gap-3 w-full max-w-md">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className={`w-full p-3.5 rounded-2xl text-sm md:text-base font-semibold transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                  selectedOption === opt.text
                    ? 'bg-rose-500 text-white border-rose-600 shadow-lg scale-102'
                    : 'bg-white/80 text-rose-900 border-rose-200 hover:bg-white hover:border-rose-400 hover:shadow-md'
                }`}
              >
                <span>{opt.text}</span>
                <span>✨</span>
              </button>
            ))}
          </div>

          <p className="text-xs text-rose-500 font-quicksand italic mt-6">
            💡 {currentQ.hint}
          </p>
        </div>
      ) : (
        /* Pantalla de Victoria */
        <div className="mt-4 animate-pop-in flex flex-col items-center w-full">
          <div className="text-6xl mb-3 animate-heartbeat-glow">🏆</div>
          <h3 className="text-3xl font-bold text-rose-900 font-dancing mb-2">
            ¡Puntuación Perfecta: {score}% de Amor!
          </h3>
          <p className="text-sm md:text-base text-rose-700 font-quicksand max-w-md mb-6">
            Has demostrado que nuestro amor está en sincronía cósmica. ¡Eres el amor de mi vida, {recipientName}! 💕
          </p>

          <div className="glass-pill p-4 max-w-sm w-full mb-6 border border-rose-300 bg-rose-50/90">
            <span className="text-xs uppercase font-bold text-rose-800 tracking-wider">Medalla Obtenida</span>
            <p className="text-lg font-bold text-rose-900 font-pacifico mt-1">🥇 Pareja Más Tierna del Universo</p>
          </div>

          <button onClick={restartQuiz} className="btn-primary text-sm">
            Repetir Quiz 🎉
          </button>
        </div>
      )}

    </div>
  );
}
