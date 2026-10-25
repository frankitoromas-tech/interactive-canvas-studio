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
import LoveConstellation from './components/games/LoveConstellation';
import LovePiano from './components/games/LovePiano';
import TimeCapsule from './components/games/TimeCapsule';

// Galería de Gatitos y Recuerdos
import PolaroidGallery from './components/gallery/PolaroidGallery';

// Contador de Tiempo Juntos
import LoveTimer from './components/timer/LoveTimer';

// Controles y UI
import AudioPlayer from './components/ui/AudioPlayer';
import CupidOracle from './components/ui/CupidOracle';
import ParticleBackground from './components/ui/ParticleBackground';
import MagicTrail from './components/ui/MagicTrail';
import SettingsModal from './components/ui/SettingsModal';
import ShareModal from './components/ui/ShareModal';
import SystemDiagnosticModal from './components/ui/SystemDiagnosticModal';
import LanguageSelector from './components/ui/LanguageSelector';

// Localización e i18n
import { I18nProvider, useI18n } from './i18n/I18nContext';

// Utilidades & Seguridad
import { getUrlParams, safeStorage, initSecurityShield } from './utils/security';
import { sound } from './utils/soundEffects';
import { haptic } from './utils/haptics';

function AppContent() {
  const { t } = useI18n();
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

  // Pestaña Activa
  const [activeTab, setActiveTab] = useState('inicio');

  // Modales
  const [showSettings, setShowSettings] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Aplicar tema dinámicamente al DOM e inicializar escudo de seguridad
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    initSecurityShield();
  }, [theme]);

  // Handlers del Flujo
  const handleOpenEnvelope = () => {
    setHasOpenedEnvelope(true);
    safeStorage.setItem('sv_has_opened_envelope', 'true');
  };

  const handleAcceptValentine = () => {
    setHasAccepted(true);
    safeStorage.setItem('sv_has_accepted', 'true');
    sound.startBGM();
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
    { id: 'inicio', label: t('tabs.inicio.label', {}, 'Inicio'), sub: t('tabs.inicio.sub', {}, 'Ἀγάπη'), icon: '💖' },
    { id: 'carta', label: t('tabs.carta.label', {}, 'Carta'), sub: t('tabs.carta.sub', {}, 'Φιλία'), icon: '📜' },
    { id: 'gatitos', label: t('tabs.gatitos.label', {}, 'Gatitos'), sub: t('tabs.gatitos.sub', {}, 'Μνήμη'), icon: '🐱' },
    { id: 'piano', label: t('tabs.piano.label', {}, 'Piano'), sub: t('tabs.piano.sub', {}, 'Τέχνη'), icon: '🎹' },
    { id: 'capsula', label: t('tabs.capsula.label', {}, 'Cápsula'), sub: t('tabs.capsula.sub', {}, 'Χρόνος'), icon: '⏳' },
    { id: 'constelacion', label: t('tabs.constelacion.label', {}, 'Estrellas'), sub: t('tabs.constelacion.sub', {}, 'Οὐρανός'), icon: '✨' },
    { id: 'juego', label: t('tabs.juego.label', {}, 'Memoria'), sub: t('tabs.juego.sub', {}, 'Παιγνίδιον'), icon: '🧩' },
    { id: 'candado', label: t('tabs.candado.label', {}, 'Candado'), sub: t('tabs.candado.sub', {}, 'Δεσμός'), icon: '🔐' },
    { id: 'quiz', label: t('tabs.quiz.label', {}, 'Quiz'), sub: t('tabs.quiz.sub', {}, 'Νοῦς'), icon: '🧠' },
    { id: 'ruleta', label: t('tabs.ruleta.label', {}, 'Ruleta'), sub: t('tabs.ruleta.sub', {}, 'Τύχη'), icon: '🎡' },
    { id: 'cupones', label: t('tabs.cupones.label', {}, 'Cupones'), sub: t('tabs.cupones.sub', {}, 'Χάριτες'), icon: '🎟️' },
    { id: 'tiempo', label: t('tabs.tiempo.label', {}, 'Reloj'), sub: t('tabs.tiempo.sub', {}, 'Αἰών'), icon: '⏰' }
  ];

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-start transition-colors duration-700">
      
      {/* Fondo de Partículas Cósmicas */}
      <ParticleBackground theme={theme} />

      {/* Estela Mágica en Cursor y Toques Táctiles */}
      <MagicTrail />

      {/* Selector de Idioma Flotante Accesible Siempre (Incluso en Sobre y Pregunta) */}
      {(!hasOpenedEnvelope || !hasAccepted) && (
        <aside aria-label="Selector de idioma" className="fixed top-3 right-3 z-50 animate-pop-in">
          <LanguageSelector />
        </aside>
      )}

      {/* Controles Flotantes Superiores con Alta Neuroestética y Fluidez */}
      {hasOpenedEnvelope && hasAccepted && (
        <header className="quick-nav-bar" aria-label="Acciones rápidas">
          {/* Selector de Idioma con Tríada Clásica */}
          <LanguageSelector />

          <button
            type="button"
            onClick={() => {
              try { haptic.light(); sound.playPop(); } catch (e) {}
              setShowShare(true);
            }}
            className="quick-action-btn border-rose-300/50 text-rose-950"
            title={t('nav.share', {}, 'Compartir enlace o código QR')}
          >
            <span>📲</span>
            <span className="hidden sm:inline">{t('nav.share', {}, 'Compartir')}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              try { haptic.light(); sound.playPop(); } catch (e) {}
              setShowCertificate(true);
            }}
            className="quick-action-btn border-amber-300/80 text-amber-950 bg-amber-50/95 hover:bg-amber-100 shadow-md"
            title={t('nav.certificate', {}, 'Ver Certificado de San Valentín')}
          >
            <span className="text-amber-500">🏆</span>
            <span className="hidden sm:inline font-bold">{t('nav.certificate', {}, 'Certificado')}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              try { haptic.light(); sound.playPop(); } catch (e) {}
              setShowSettings(true);
            }}
            className="quick-action-btn p-2 text-rose-950"
            title={t('nav.settings', {}, 'Ajustes y Personalización')}
          >
            <span>⚙️</span>
          </button>
        </header>
      )}

      {/* Reproductor de Música Flotante con Éxitos Románticos */}
      <AudioPlayer />

      {/* Entidad Inteligente / Oráculo de Amor & Cupido Proactivo */}
      {hasOpenedEnvelope && hasAccepted && (
        <CupidOracle
          recipientName={recipientName}
          senderName={senderName}
          activeTab={activeTab}
        />
      )}

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
        <div className="w-full relative z-10 flex flex-col items-center pt-14 pb-20 px-3 sm:px-6">
          
          <div className="container-custom">
            
            {/* Barra de Navegación Minimalista con Scroll Táctil */}
            <header className="w-full mb-6 flex justify-center sticky top-2 z-30">
              <nav aria-label="Secciones románticas" className="glass-pill p-1.5 shadow-xl flex items-center gap-1.5 overflow-x-auto max-w-full border border-white/80">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      try { haptic.light(); sound.playPop(); } catch (e) {}
                      setActiveTab(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`nav-tab text-xs py-1.5 px-3.5 ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </header>

            {/* Contenido de la Pestaña Activa */}
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

              {activeTab === 'piano' && (
                <LovePiano />
              )}

              {activeTab === 'capsula' && (
                <TimeCapsule
                  recipientName={recipientName}
                  senderName={senderName}
                />
              )}

              {activeTab === 'constelacion' && (
                <LoveConstellation />
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

            {/* Pie de Página Minimalista con Enlace a Diagnóstico y Sello Frankosyni */}
            <footer className="mt-14 text-center text-xs text-rose-800/70 font-quicksand font-medium flex flex-col items-center gap-1.5">
              <div>
                {t('footer.madeWithLove', { name: recipientName }, `Hecho con amor infinito para ${recipientName} ✨`)}
              </div>
              <div className="text-[11px] font-serif text-rose-600/90 tracking-wide">
                {t('footer.signature', {}, 'Arquitectura & Τέχνη por Frankosyni (Φρανκοσύνη/Francus.)')}
              </div>
              <button
                onClick={() => {
                  sound.playPop();
                  setShowDiagnostics(true);
                }}
                className="text-[11px] text-rose-500/70 hover:text-rose-700 hover:underline cursor-pointer"
              >
                {t('footer.securityLink', {}, '🛡️ Ver Estado de Seguridad & Auditoría')}
              </button>
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
          onOpenDiagnostics={() => setShowDiagnostics(true)}
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

      {showDiagnostics && (
        <SystemDiagnosticModal
          onClose={() => setShowDiagnostics(false)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}