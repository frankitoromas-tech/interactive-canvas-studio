import React, { useState, useEffect } from 'react';
// Sistema de Experiencia Principal
import EnvelopeModal from './components/experience/EnvelopeModal';
import ValentineQuestion from './components/experience/ValentineQuestion';
import CelebrationHero from './components/experience/CelebrationHero';

// Módulos de Carta y Certificado
import LoveLetter from './components/letter/LoveLetter';
import LoveCertificate from './components/letter/LoveCertificate';

// Módulos de Juegos e Interactividad
import MemoryGame from './components/games/MemoryGame';
import LoveLock from './components/games/LoveLock';
import CoupleQuiz from './components/games/CoupleQuiz';
import DateRoulette from './components/games/DateRoulette';
import LoveCoupons from './components/games/LoveCoupons';

// Galería de Gatitos y Recuerdos
import PolaroidGallery from './components/gallery/PolaroidGallery';

// Contador de Tiempo Juntos
import LoveTimer from './components/timer/LoveTimer';

// Controles y UI
import AudioPlayer from './components/ui/AudioPlayer';
import ParticleBackground from './components/ui/ParticleBackground';
import SettingsModal from './components/ui/SettingsModal';
import ShareModal from './components/ui/ShareModal';

// Utilidades & Seguridad
import { getUrlParams, safeStorage } from './utils/security';
import { sound } from './utils/soundEffects';

export default function App() {
  const urlParams = getUrlParams();

  // Estados de Personalización
  const [recipientName, setRecipientName] = useState(() => {
    return urlParams.name || safeStorage.getItem('sv_recipient_name') || 'Luyuromo';
  });

  const [senderName, setSenderName] = useState(() => {
    return urlParams.sender || safeStorage.getItem('sv_sender_name') || 'Tu Amor';
  });

  const [theme, setTheme] = useState(() => {
    return urlParams.theme || safeStorage.getItem('sv_theme') || 'romantic-pink';
  });

  // Flujo de la Experiencia
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(() => {
    return safeStorage.getItem('sv_has_opened_envelope') === 'true';
  });

  const [hasAccepted, setHasAccepted] = useState(() => {
    return safeStorage.getItem('sv_has_accepted') === 'true';
  });

  // Pestaña Activa en la Celebración
  const [activeTab, setActiveTab] = useState('inicio'); // 'inicio' | 'carta' | 'gatitos' | 'juego' | 'candado' | 'quiz' | 'ruleta' | 'cupones' | 'tiempo'

  // Modales
  const [showSettings, setShowSettings] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Aplicar tema dinámicamente al DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handlers del Flujo
  const handleOpenEnvelope = () => {
    setHasOpenedEnvelope(true);
    safeStorage.setItem('sv_has_opened_envelope', 'true');
  };

  const handleAcceptValentine = () => {
    setHasAccepted(true);
    safeStorage.setItem('sv_has_accepted', 'true');
    sound.startBGM(); // Iniciar música romántica automáticamente al aceptar
  };

  const handleSaveSettings = (settings) => {
    setRecipientName(settings.name);
    setSenderName(settings.sender);
    setTheme(settings.theme);

    safeStorage.setItem('sv_recipient_name', settings.name);
    safeStorage.setItem('sv_sender_name', settings.sender);
    safeStorage.setItem('sv_theme', settings.theme);
  };

  const handleResetExperience = () => {
    sound.playPop();
    setHasOpenedEnvelope(false);
    setHasAccepted(false);
    setActiveTab('inicio');
    safeStorage.removeItem('sv_has_opened_envelope');
    safeStorage.removeItem('sv_has_accepted');
  };

  const tabs = [
    { id: 'inicio', label: '💖 Inicio', icon: '💖' },
    { id: 'carta', label: '📜 Carta', icon: '📜' },
    { id: 'gatitos', label: '🐱 Fotos & Gatitos', icon: '🐱' },
    { id: 'juego', label: '🧩 Minijuego', icon: '🧩' },
    { id: 'candado', label: '🔐 Candado 3D', icon: '🔐' },
    { id: 'quiz', label: '🧠 Quiz', icon: '🧠' },
    { id: 'ruleta', label: '🎡 Ruleta Citas', icon: '🎡' },
    { id: 'cupones', label: '🎟️ Cupones', icon: '🎟️' },
    { id: 'tiempo', label: '⏳ Tiempo', icon: '⏳' }
  ];

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-start transition-colors duration-700">
      
      {/* Fondo de Partículas Interactivas */}
      <ParticleBackground theme={theme} />

      {/* Controles Flotantes Superiores */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            sound.playPop();
            setShowShare(true);
          }}
          className="glass-pill px-3.5 py-2 text-xs font-bold text-rose-900 hover:bg-white shadow-lg flex items-center gap-1.5 border border-rose-300"
          title="Compartir enlace o código QR"
        >
          <span>📲</span>
          <span className="hidden sm:inline">Compartir</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setShowCertificate(true);
          }}
          className="glass-pill px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-50/90 hover:bg-amber-100 shadow-lg flex items-center gap-1.5 border border-amber-300"
          title="Ver Certificado de San Valentín"
        >
          <span>🏆</span>
          <span className="hidden sm:inline">Certificado</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setShowSettings(true);
          }}
          className="glass-pill p-2 text-xs font-bold text-gray-700 hover:bg-white shadow-lg flex items-center justify-center border border-gray-200"
          title="Ajustes y Personalización"
        >
          <span>⚙️</span>
        </button>
      </div>

      {/* Reproductor de Música Flotante */}
      <AudioPlayer />

      {/* ETAPA 1: Sobre Cerrado */}
      {!hasOpenedEnvelope && (
        <EnvelopeModal
          recipientName={recipientName}
          onOpen={handleOpenEnvelope}
        />
      )}

      {/* ETAPA 2: Pregunta de San Valentín */}
      {hasOpenedEnvelope && !hasAccepted && (
        <ValentineQuestion
          recipientName={recipientName}
          onAccept={handleAcceptValentine}
        />
      )}

      {/* ETAPA 3: Experiencia Completa de Celebración */}
      {hasOpenedEnvelope && hasAccepted && (
        <div className="w-full relative z-10 flex flex-col items-center pt-16 pb-24 px-3 sm:px-6">
          
          <div className="container-custom">
            
            {/* Barra de Navegación por Pestañas Responsiva */}
            <header className="w-full mb-8 flex justify-center sticky top-3 z-30">
              <nav aria-label="Secciones románticas" className="glass-pill p-1.5 shadow-xl flex items-center gap-1 overflow-x-auto max-w-full border border-rose-200/80">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playPop();
                      setActiveTab(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label.replace(/^[^\s]+\s/, '')}</span>
                  </button>
                ))}
              </nav>
            </header>

            {/* Contenido Dinámico de la Pestaña Seleccionada */}
            <main className="w-full flex flex-col items-center justify-center">
              {activeTab === 'inicio' && (
                <CelebrationHero
                  recipientName={recipientName}
                  onOpenCertificate={() => setShowCertificate(true)}
                  onOpenShare={() => setShowShare(true)}
                />
              )}

              {activeTab === 'carta' && (
                <LoveLetter
                  recipientName={recipientName}
                  senderName={senderName}
                />
              )}

              {activeTab === 'gatitos' && (
                <PolaroidGallery />
              )}

              {activeTab === 'juego' && (
                <MemoryGame />
              )}

              {activeTab === 'candado' && (
                <LoveLock
                  recipientName={recipientName}
                  senderName={senderName}
                />
              )}

              {activeTab === 'quiz' && (
                <CoupleQuiz
                  recipientName={recipientName}
                />
              )}

              {activeTab === 'ruleta' && (
                <DateRoulette />
              )}

              {activeTab === 'cupones' && (
                <LoveCoupons />
              )}

              {activeTab === 'tiempo' && (
                <LoveTimer
                  recipientName={recipientName}
                />
              )}
            </main>

            {/* Pie de Página Romántico */}
            <footer className="mt-16 text-center text-xs text-rose-800/80 font-quicksand font-semibold">
              Hecho con todo el amor del universo para <strong className="text-rose-900">{recipientName}</strong> 💕
            </footer>

          </div>

        </div>
      )}

      {/* MODALES GLOBALES */}
      {showSettings && (
        <SettingsModal
          currentName={recipientName}
          currentSender={senderName}
          currentTheme={theme}
          onSave={handleSaveSettings}
          onResetExperience={handleResetExperience}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showShare && (
        <ShareModal
          recipientName={recipientName}
          senderName={senderName}
          theme={theme}
          onClose={() => setShowShare(false)}
        />
      )}

      {showCertificate && (
        <LoveCertificate
          recipientName={recipientName}
          senderName={senderName}
          onClose={() => setShowCertificate(false)}
        />
      )}

    </div>
  );
}