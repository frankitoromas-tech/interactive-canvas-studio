import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/soundEffects';
import { confettiEngine } from '../../utils/confettiEngine';
import { safeStorage, sanitizeInput } from '../../utils/security';

const STORAGE_KEY = 'sv_time_capsule_data';

export default function TimeCapsule({ recipientName = 'Luyuromo', senderName = 'Tu Amor' }) {
  const [capsuleData, setCapsuleData] = useState(() => {
    return safeStorage.getJSON(STORAGE_KEY, null);
  });

  // Form states
  const [message, setMessage] = useState('');
  const [unlockDate, setUnlockDate] = useState(() => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    nextYear.setMonth(1); // Febrero
    nextYear.setDate(14);
    return nextYear.toISOString().split('T')[0];
  });
  const [passcode, setPasscode] = useState('');
  const [promiseTitle, setPromiseTitle] = useState('Nuestra Promesa Eterna');

  // Countdown & Unlock states
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isUnlocked: false });
  const [showOverrideInput, setShowOverrideInput] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Live countdown timer calculation
  useEffect(() => {
    if (!capsuleData || !capsuleData.unlockDate) return;

    const calculateTime = () => {
      const target = new Date(capsuleData.unlockDate).getTime();
      const now = Date.now();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isUnlocked: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isUnlocked: false });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [capsuleData]);

  const handleSealCapsule = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    sound.playLockClick();
    confettiEngine.fireGentle();

    const newCapsule = {
      id: Date.now(),
      title: sanitizeInput(promiseTitle, 50, 'Nuestra Promesa Eterna'),
      message: sanitizeInput(message, 1500, ''),
      sender: senderName,
      recipient: recipientName,
      createdAt: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      unlockDate: new Date(unlockDate).toISOString(),
      passcode: passcode.trim() || null,
      isSealed: true
    };

    setCapsuleData(newCapsule);
    safeStorage.setJSON(STORAGE_KEY, newCapsule);
  };

  const handleResetCapsule = () => {
    if (window.confirm('¿Estás seguro de que quieres abrir y reiniciar la cápsula del tiempo?')) {
      sound.playPop();
      setCapsuleData(null);
      safeStorage.removeItem(STORAGE_KEY);
      setMessage('');
      setPasscode('');
    }
  };

  const handlePasscodeUnlock = (e) => {
    e.preventDefault();
    if (enteredPasscode.trim() === (capsuleData.passcode || 'amor')) {
      sound.playFanfare();
      confettiEngine.cannonCelebration();
      setTimeLeft(prev => ({ ...prev, isUnlocked: true }));
      setShowOverrideInput(false);
      setPasscodeError(false);
    } else {
      sound.playDodge();
      setPasscodeError(true);
      setTimeout(() => setPasscodeError(false), 2000);
    }
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-10 text-center animate-slide-up mx-auto max-w-4xl flex flex-col items-center">
      
      {/* Distintivo Superior */}
      <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-400/20 py-1 px-3.5 rounded-full mb-3">
        <span className="text-xs font-semibold text-rose-800 uppercase tracking-widest font-outfit">
          ⏳ Cápsula del Tiempo & Promesas
        </span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-bold text-rose-950 font-pacifico mb-1">
        Cápsula Secreta del Futuro
      </h2>
      <p className="text-xs sm:text-base text-rose-700/90 font-quicksand mb-8 max-w-lg">
        Escribe un mensaje, deseo o promesa de amor que quedará sellada bajo llave cósmica hasta que llegue la fecha elegida.
      </p>

      {/* VISTA 1: CREAR NUEVA CÁPSULA */}
      {!capsuleData ? (
        <form onSubmit={handleSealCapsule} className="w-full max-w-2xl bg-white/80 p-6 sm:p-8 rounded-3xl shadow-lg border border-rose-200 text-left flex flex-col gap-4">
          
          <div>
            <label className="text-xs font-bold text-rose-900 block mb-1">Título o Tema de la Cápsula:</label>
            <input
              type="text"
              value={promiseTitle}
              maxLength={50}
              onChange={(e) => setPromiseTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 text-sm bg-white focus:outline-rose-500 font-quicksand"
              placeholder="Ej: Lo que soñamos para nuestro próximo aniversario ✨"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-rose-900 block mb-1">Mensaje o Carta Secreta:</label>
            <textarea
              rows={5}
              value={message}
              maxLength={1500}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 text-sm bg-white focus:outline-rose-500 font-quicksand"
              placeholder={`Escribe aquí lo que quieres que ${recipientName} lea en el futuro... Nuestras metas, una promesa o cuánto le amarás mañana 💕`}
              required
            />
            <span className="text-[10px] text-gray-400 text-right block mt-0.5">
              {message.length} / 1500 caracteres
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-rose-900 block mb-1">📅 Fecha de Desbloqueo:</label>
              <input
                type="date"
                value={unlockDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setUnlockDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 text-sm bg-white focus:outline-rose-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-rose-900 block mb-1">🔑 Clave Secreta Opcional (PIN):</label>
              <input
                type="text"
                value={passcode}
                maxLength={20}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 text-sm bg-white focus:outline-rose-500 font-quicksand"
                placeholder="Ej: 1402 o fecha de aniversario"
              />
            </div>
          </div>

          <div className="mt-4 pt-2">
            <button
              type="submit"
              className="btn-primary w-full py-3 text-base shadow-xl flex items-center justify-center gap-2"
            >
              <span>🔒</span> Sellar Cápsula en el Espacio-Tiempo
            </button>
          </div>
        </form>
      ) : (
        /* VISTA 2: CÁPSULA SELLADA O DESBLOQUEADA */
        <div className="w-full max-w-2xl flex flex-col items-center">
          
          {/* CÁPSULA BLOQUEADA CON CUENTA REGRESIVA */}
          {!timeLeft.isUnlocked ? (
            <div className="w-full bg-gradient-to-b from-rose-950 via-purple-950 to-slate-950 text-white p-8 rounded-3xl shadow-2xl border-2 border-rose-400/40 relative overflow-hidden flex flex-col items-center">
              
              {/* Resplandor Holográfico */}
              <div className="absolute inset-0 bg-radial from-rose-500/15 via-transparent to-transparent pointer-events-none" />
              
              <span className="text-5xl mb-3 animate-pulse">⏳</span>
              <span className="inline-block py-1 px-3 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-widest border border-rose-400/30 mb-2 font-outfit">
                Cápsula Blindada & Cifrada
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold font-pacifico text-rose-100 mb-1">
                {capsuleData.title}
              </h3>
              <p className="text-xs sm:text-sm text-rose-300 font-quicksand mb-6">
                Sellada por <strong>{capsuleData.sender}</strong> el {capsuleData.createdAt}
              </p>

              {/* Contadores de Tiempo */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-md mb-8">
                <div className="bg-white/10 backdrop-blur p-3 rounded-2xl border border-white/10 flex flex-col items-center">
                  <span className="text-2xl sm:text-4xl font-bold font-outfit text-white">{timeLeft.days}</span>
                  <span className="text-[10px] sm:text-xs text-rose-300 uppercase font-semibold">Días</span>
                </div>
                <div className="bg-white/10 backdrop-blur p-3 rounded-2xl border border-white/10 flex flex-col items-center">
                  <span className="text-2xl sm:text-4xl font-bold font-outfit text-white">{timeLeft.hours}</span>
                  <span className="text-[10px] sm:text-xs text-rose-300 uppercase font-semibold">Horas</span>
                </div>
                <div className="bg-white/10 backdrop-blur p-3 rounded-2xl border border-white/10 flex flex-col items-center">
                  <span className="text-2xl sm:text-4xl font-bold font-outfit text-white">{timeLeft.minutes}</span>
                  <span className="text-[10px] sm:text-xs text-rose-300 uppercase font-semibold">Min</span>
                </div>
                <div className="bg-white/10 backdrop-blur p-3 rounded-2xl border border-white/10 flex flex-col items-center">
                  <span className="text-2xl sm:text-4xl font-bold font-outfit text-rose-400 animate-pulse">{timeLeft.seconds}</span>
                  <span className="text-[10px] sm:text-xs text-rose-300 uppercase font-semibold">Seg</span>
                </div>
              </div>

              {/* Botón para ingresar PIN o desbloqueo anticipado */}
              <div className="flex flex-col gap-3 items-center w-full">
                {showOverrideInput ? (
                  <form onSubmit={handlePasscodeUnlock} className="flex flex-col gap-2 items-center w-full max-w-xs animate-fade-in">
                    <input
                      type="password"
                      value={enteredPasscode}
                      onChange={(e) => setEnteredPasscode(e.target.value)}
                      placeholder="Introduce el PIN secreto..."
                      className={`w-full px-3 py-2 text-center text-sm rounded-xl text-gray-900 bg-white focus:outline-rose-500 ${
                        passcodeError ? 'border-2 border-red-500 animate-shake' : ''
                      }`}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="btn-primary text-xs py-1.5 px-4">
                        Desbloquear
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowOverrideInput(false)}
                        className="btn-secondary text-xs py-1.5 px-4 text-white border-white/30 hover:bg-white/10"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      sound.playPop();
                      setShowOverrideInput(true);
                    }}
                    className="text-xs text-rose-300 hover:text-white underline font-quicksand cursor-pointer"
                  >
                    🔑 ¿Tienes la clave secreta para abrirla antes?
                  </button>
                )}

                <button
                  onClick={handleResetCapsule}
                  className="text-[11px] text-gray-400 hover:text-red-400 mt-4 cursor-pointer"
                >
                  Reiniciar o Crear Nueva Cápsula
                </button>
              </div>

            </div>
          ) : (
            /* CÁPSULA DESBLOQUEADA & MENSAJE REVELADO */
            <div className="w-full bg-[#fdfbf7] p-8 sm:p-12 rounded-3xl shadow-2xl border-4 border-amber-300 relative text-left animate-pop-in">
              
              <div className="text-center mb-6">
                <span className="text-4xl mb-2 block animate-bounce">✨💌✨</span>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-widest font-outfit">
                  ¡Cápsula del Tiempo Desbloqueada!
                </span>
                <h3 className="text-3xl font-bold font-pacifico text-rose-950 mt-1">
                  {capsuleData.title}
                </h3>
                <span className="text-xs text-gray-500 font-quicksand block">
                  Sellado con amor el {capsuleData.createdAt}
                </span>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-amber-200/80 shadow-inner mb-6">
                <p className="text-lg sm:text-xl font-dancing text-gray-800 font-bold leading-relaxed whitespace-pre-line">
                  {capsuleData.message}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                <div>
                  <span className="text-xs text-gray-400 block font-semibold">Para:</span>
                  <span className="text-xl font-bold text-rose-700 font-pacifico">{capsuleData.recipient}</span>
                </div>
                
                <div className="wax-seal scale-90">
                  <span>💖</span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-semibold">De parte de:</span>
                  <span className="text-xl font-bold text-rose-700 font-great-vibes">{capsuleData.sender}</span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleResetCapsule}
                  className="btn-secondary text-xs py-2 px-5"
                >
                  📝 Crear Otra Cápsula del Tiempo
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
