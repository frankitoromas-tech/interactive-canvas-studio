import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import EnvelopeModal from './components/EnvelopeModal';
import ValentineQuestion from './components/ValentineQuestion';
import CelebrationHero from './components/CelebrationHero';
import LoveLetter from './components/LoveLetter';
import LoveTimer from './components/LoveTimer';
import DateRoulette from './components/DateRoulette';
import LoveCoupons from './components/LoveCoupons';
import PolaroidGallery from './components/PolaroidGallery';
import LoveCertificate from './components/LoveCertificate';
import AudioPlayer from './components/AudioPlayer';
import SettingsModal from './components/SettingsModal';
import { sound } from './utils/soundEffects';
import { sanitizeInput } from './utils/security';

export default function App() {
  // Configuración de URL sanitizada de forma estricta
  const [recipientName, setRecipientName] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('name') || 'Luyuromo';
    return sanitizeInput(raw, 40, 'Luyuromo');
  });

  const [senderName, setSenderName] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('sender') || 'Tu Amor Eterno';
    return sanitizeInput(raw, 40, 'Tu Amor Eterno');
  });

  const [theme, setTheme] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const validThemes = ['romantic-pink', 'midnight', 'golden', 'enchanted'];
    const rawTheme = params.get('theme');
    return validThemes.includes(rawTheme) ? rawTheme : 'romantic-pink';
  });

  // Estados de flujo y modales
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState('letter'); // 'letter' | 'timer' | 'roulette' | 'coupons' | 'gallery'
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Sincronizar tema en el DOM para CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSaveSettings = ({ name, sender, theme: newTheme }) => {
    setRecipientName(name);
    setSenderName(sender);
    setTheme(newTheme);
  };

  const handleAcceptQuestion = () => {
    setHasAccepted(true);
    // Iniciar serenata romántica de fondo automáticamente tras la primera interacción
    setTimeout(() => {
      sound.startBGM();
    }, 1200);
  };

  const tabs = [
    { id: 'letter', label: '💌 Nuestra Carta', icon: '💌' },
    { id: 'timer', label: '⏳ Tiempo Juntos', icon: '⏳' },
    { id: 'roulette', label: '🎡 Ruleta de Citas', icon: '🎡' },
    { id: 'coupons', label: '🎟️ Cupones de Amor', icon: '🎟️' },
    { id: 'gallery', label: '📸 Polaroids', icon: '📸' }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-700">
      
      {/* Fondo de Partículas Interactivo */}
      <ParticleBackground theme={theme} />

      {/* Botones de Control Superiores Flotantes */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            sound.playPop();
            setShowSettingsModal(true);
          }}
          className="glass-pill px-4 py-2 text-xs font-bold text-rose-800 hover:bg-white/90 transition-all flex items-center gap-1.5 shadow-lg border border-rose-200"
          title="Personalizar carta y tema"
        >
          <span>⚙️</span> Personalizar
        </button>

        {hasAccepted && (
          <button
            onClick={() => {
              sound.playPop();
              setShowCertificateModal(true);
            }}
            className="glass-pill px-4 py-2 text-xs font-bold text-amber-800 bg-amber-100/70 hover:bg-amber-100 transition-all flex items-center gap-1.5 shadow-lg border border-amber-300"
            title="Ver certificado oficial"
          >
            <span>📜</span> Certificado
          </button>
        )}
      </div>

      {/* 1. Modal del Sobre Inicial con Sello de Cera */}
      {showEnvelope && (
        <EnvelopeModal
          recipientName={recipientName}
          onOpen={() => setShowEnvelope(false)}
        />
      )}

      {/* 2. Pregunta Interactiva "¿Quieres ser mi San Valentín?" */}
      {!hasAccepted ? (
        <ValentineQuestion
          recipientName={recipientName}
          onAccept={handleAcceptQuestion}
        />
      ) : (
        /* 3. Hub Principal Romántico Post-"SÍ" */
        <div className="container-custom pt-16 pb-28 relative z-10 animate-fade-in">
          
          {/* Banner de Celebración */}
          <CelebrationHero
            recipientName={recipientName}
            onOpenCertificate={() => setShowCertificateModal(true)}
          />

          {/* Barra de Navegación por Pestañas */}
          <div className="glass-pill p-2 max-w-2xl mx-auto mb-10 shadow-xl flex items-center justify-start sm:justify-center gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  setActiveTab(tab.id);
                }}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Contenido de la Pestaña Activa */}
          <main className="max-w-4xl mx-auto">
            {activeTab === 'letter' && (
              <LoveLetter
                recipientName={recipientName}
                senderName={senderName}
              />
            )}

            {activeTab === 'timer' && (
              <LoveTimer startDate="2024-02-14" />
            )}

            {activeTab === 'roulette' && (
              <DateRoulette />
            )}

            {activeTab === 'coupons' && (
              <LoveCoupons />
            )}

            {activeTab === 'gallery' && (
              <PolaroidGallery />
            )}
          </main>

          {/* Pie de Página Tierno */}
          <footer className="text-center mt-16 pt-8 border-t border-rose-200/50">
            <p className="text-rose-700 font-dancing text-2xl font-bold">
              Hecho con todo mi amor para {recipientName} 💕
            </p>
            <p className="text-xs text-rose-500 font-quicksand mt-1">
              San Valentín • Por siempre juntos ✨
            </p>
          </footer>

        </div>
      )}

      {/* Reproductor de Audio Flotante */}
      <AudioPlayer />

      {/* Modal de Certificado */}
      {showCertificateModal && (
        <LoveCertificate
          recipientName={recipientName}
          senderName={senderName}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {/* Modal de Ajustes */}
      {showSettingsModal && (
        <SettingsModal
          currentName={recipientName}
          currentSender={senderName}
          currentTheme={theme}
          onSave={handleSaveSettings}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

    </div>
  );
}