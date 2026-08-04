import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/soundEffects';
import { confettiEngine } from '../../utils/confettiEngine';
import { rateLimiter, sanitizeInput } from '../../utils/security';

// =========================================================
// BANCO DE CONOCIMIENTO & MOTOR DE NLP ROMÁNTICO LOCAL
// =========================================================

const ORACLE_ANSWERS = [
  "El universo calculó su destino y el resultado fue: 'Inseparables por la eternidad' ✨💍",
  "Cada latido de tu corazón resuena en sincronía perfecta con el suyo. No hay dudas: es amor real 💖",
  "Las estrellas me dicen que les espera un viaje inolvidable lleno de risas, besos y atardeceres dorados 🌅",
  "¿Su secreto? Que incluso en los días más simples, estar juntos convierte todo en pura magia ✨",
  "El amor entre ustedes es como una balada de Rata Blanca o Lady Gaga: apasionado, eterno y capaz de encender el universo 🔥🎸",
  "El oráculo revela que hoy es el día perfecto para darle un abrazo muy fuerte y decirle cuánto te importa 💕",
  "No existen coincidencias: encontrarse en este planeta inmenso fue la mejor jugada del destino 🪐"
];

const POEM_TEMPLATES = {
  apasionado: [
    (to, from) => `Entre millones de miradas en este mundo sin fin,\nla tuya fue la única que supo desarmar mi alma.\nEres mi fuego en el invierno y mi mayor bendición,\npara ti, mi querida ${to}, de parte de ${from} con todo el corazón. 🔥`,
    (to, from) => `Como un solo de guitarra en 'Mujer Amante' en la noche serena,\ntu presencia calma y enciende toda mi sangre en las venas.\nEres mi presente y mi único destino soñado,\n${to} y ${from}, un amor inmortal y consagrado. 🎸🌹`
  ],
  tierno: [
    (to, from) => `Como un gatito buscando el sol en la mañana,\nasí busca mi corazón tu dulce sonrisa en la ventana.\nGracias por existir y por ser mi calma,\n${to}, llenas de alegría cada rincón de mi alma. 🐱✨`,
    (to, from) => `Un paquetito de besos y un millón de abrazos,\npara recordarte que nunca soltaré tus lazos.\nEres mi pedacito de cielo favorito,\n${from} te ama de aquí al infinito. 🍬`
  ],
  divertido: [
    (to, from) => `Te quiero más que a dormir 5 minutos más por la mañana,\nmás que a una pizza caliente o a un fin de semana.\nPrometo darte el último bocado de mi postre consentido,\n¡porque contigo, ${to}, todo tiene sentido! 🍕🎉`,
    (to, from) => `Alerta de Cupido: Se ha detectado una sobredosis de ternura.\nCulpable: ${to}. Condena: Recibir mimos y besos sin mesura.\nFirma: ${from}, tu cómplice de locura. 😜💖`
  ],
  cosmico: [
    (to, from) => `En la inmensidad del cosmos, entre galaxias y cometas,\nla gravedad más fuerte me atrajo directo a tu órbita secreta.\nEres mi estrella guía en la noche más oscura,\n${to}, amarte es mi más hermosa aventura. 🌌✨`
  ]
};

const DATE_IDEAS = [
  {
    title: '🎸 Noche de Rock Baladas & Pizza Casera',
    plan: 'Poner a todo volumen "Mujer Amante" de Rata Blanca, cocinar una pizza con forma de corazón y cantar los solos abrazados.',
    song: 'Mujer Amante'
  },
  {
    title: '🍷 Noche a la Luz de las Velas & Carta Secreta',
    plan: 'Cenar algo rico con iluminación tenue, escuchar baladas suaves y leerse en voz alta una dedicatoria especial.',
    song: 'Die With A Smile'
  },
  {
    title: '🍿 Maratón de Pelis, Cobijita & Mimos',
    plan: 'Preparar palomitas con chocolate, apagar las luces y consentir a la princesa de la casa hasta que se quede dormida.',
    song: 'Golden Hour'
  },
  {
    title: '✨ Paseo Nocturno & Mirar las Estrellas',
    plan: 'Salir a tomar un café caliente, caminar tomados de la mano y buscar constelaciones en el cielo.',
    song: 'Until I Found You'
  }
];

const MOOD_RESPONSES = {
  consentida: {
    emoji: '👑',
    title: 'Modo Princesa Consentida',
    msg: '¡Hoy te mereces todos los mimos del mundo! Ve a la sección de Cupones y canjea uno de comida favorita o abrazos infinitos.',
    song: 'Mujer Amante'
  },
  romantica: {
    emoji: '💖',
    title: 'Corazón Enamorado',
    msg: 'La vibra romántica está en su punto máximo. Abre la carta de amor o escucha una balada suave.',
    song: 'Die With A Smile'
  },
  nostalgica: {
    emoji: '🌙',
    title: 'Recuerdos Bonitos',
    msg: 'Pensar en todo lo que han vivido llena el alma. Pasa por la galería de gatitos y recuerdos.',
    song: 'Until I Found You'
  },
  juguetona: {
    emoji: '🧩',
    title: 'Ánimo Travieso & Alegre',
    msg: '¡Momento de retar al destino! Juega una partida de memoria o pon a prueba sus anécdotas en el Quiz.',
    song: 'Lofi Sunset'
  },
  cansada: {
    emoji: '☕',
    title: 'Descanso & Relax',
    msg: 'Respira profundo, ponte cómoda y deja que la música suave y las estrellas fugaces te relajen.',
    song: 'Caja de Música'
  }
};

// Generador Inteligente de Respuestas de Chat (NLP Romántico)
function generateCupidChatResponse(userMsg, recipientName, senderName) {
  const query = userMsg.toLowerCase().trim();

  // 1. Detección y comandos musicales
  if (query.includes('mujer amante') || query.includes('rata blanca')) {
    sound.setTrack('mujer-amante');
    return `¡Uff! 'Siento el calor de toda tu piel en mi cuerpo otra vez...' 🔥🎸 ¡Acabo de poner 'Mujer Amante' de Rata Blanca para ti, ${recipientName}! Es una obra de arte absoluta del rock romántico.`;
  }
  if (query.includes('die with a smile') || query.includes('lady gaga') || query.includes('bruno mars')) {
    sound.setTrack('die-with-a-smile');
    return `¡Temazo supremo! Puse 'Die With A Smile' de Lady Gaga & Bruno Mars. Un amor tan grande que ni el fin del mundo podría apagarlo 💖✨`;
  }
  if (query.includes('golden hour') || query.includes('jvke')) {
    sound.setTrack('golden-hour');
    return `¡Listo! Sonando 'Golden Hour' 🌅 Cada segundo contigo brilla como un atardecer dorado.`;
  }
  if (query.includes('until i found you') || query.includes('stephen sanchez')) {
    sound.setTrack('until-i-found-you');
    return `¡Pista en marcha! 'Until I Found You' 🌹 Esa vibra clásica que describe perfecto lo que ${senderName} sintió al encontrarte.`;
  }
  if (query.includes('perfect') || query.includes('ed sheeran')) {
    sound.setTrack('perfect');
    return `Poniendo 'Perfect' de Ed Sheeran 💍✨ Eres perfecta ante sus ojos en cada detalle.`;
  }
  if (query.includes('musica') || query.includes('cancion') || query.includes('temazo') || query.includes('playlist')) {
    return `¡Tenemos una playlist legendaria en el reproductor! Incluye 'Mujer Amante' de Rata Blanca 🎸, 'Die With A Smile' 💖, 'Golden Hour', 'Perfect', y además puedes subir tu propio archivo MP3 con el botón 📂.`;
  }

  // 2. Dudas sobre el amor / sentimientos
  if (query.includes('me ama') || query.includes('me quiere') || query.includes('cuanto')) {
    return `${senderName} no solo te ama: ¡está completamente loco/a por ti! Mi radar de Cupido marca 999.9% de amor puro e indestructible hacia ti, ${recipientName} 💘.`;
  }
  if (query.includes('por que') || query.includes('porque')) {
    return `Porque en un mundo con miles de millones de personas, tú eres la única que tiene esa sonrisa mágica y esa luz que ilumina la vida de ${senderName} ✨.`;
  }
  if (query.includes('cita') || query.includes('plan') || query.includes('hacer hoy')) {
    return `¿Qué tal una cena sorpresa con música suave de fondo, comer algo rico y llenarse de besos? Pasa por la pestaña de 'Citas' aquí en mi menú para darte itinerarios completos 🕯️🍕.`;
  }
  if (query.includes('triste') || query.includes('cansada') || query.includes('estres')) {
    return `Oh no... ¡Abrazo cósmico de emergencia! 🤗 Respira hondo, recuerda lo maravillosa y fuerte que eres, y recuerda que ${senderName} siempre está a tu lado para cuidarte y consentirte 🌸.`;
  }
  if (query.includes('chiste') || query.includes('broma') || query.includes('gracioso')) {
    const jokes = [
      `¿Sabes qué le dijo un latido a otro? — "¡Apúrate, que ahí viene ${recipientName} y nos vamos a acelerar!" 😂💖`,
      `¿Tienes un mapa? Es que me perdí en tus ojos... ¡Cliche pero 100% real de parte de ${senderName}! 🗺️✨`,
      `¿Eres café? Porque me quitas el sueño y me aceleras el corazón ☕🔥`
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  if (query.includes('poema') || query.includes('verso') || query.includes('rima')) {
    return `Dedicado a ${recipientName}:\n"Ni el brillo de mil constelaciones en la noche más clara,\nse compara con la ternura con la que ${senderName} te mira la cara." 🌌💖`;
  }
  if (query.includes('hola') || query.includes('hey') || query.includes('buenas')) {
    return `¡Hola, ${recipientName}! Soy tu Cupido Guardián 👼. Estoy aquí para aconsejarte, poner tus canciones favoritas como 'Mujer Amante' o escribirte versos hermosos. ¿De qué te gustaría hablar? ✨`;
  }

  // Respuesta inteligente por defecto
  const genericSmartAnswers = [
    `¡Qué hermosa pregunta! Mis alas me dicen que con ${senderName} estás destinada/o a vivir momentos mágicos llenos de complicidad y risas 💕.`,
    `El universo siempre tiene un plan para las almas gemelas, y el de ustedes es escribir una historia de amor legendaria 📜✨.`,
    `Tus palabras tienen luz propia, ${recipientName}. ¿Sabías que cada vez que sonríes, el mundo de ${senderName} se vuelve mil veces más bonito? 🌸`,
    `¡Recibido y procesado con 100% de amor! Si necesitas que cambie la música o te dé una predicción del destino, solo pídemelo 🎶🔮.`
  ];
  return genericSmartAnswers[Math.floor(Math.random() * genericSmartAnswers.length)];
}

export default function CupidOracle({ recipientName, senderName, activeTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('chat'); // 'chat' | 'oraculo' | 'citas' | 'poemas' | 'animo'
  
  // Burbuja proactiva
  const [speechBubble, setSpeechBubble] = useState(null);

  // Estados del Chat Inteligente
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'cupid',
      text: `¡Hola ${recipientName}! 👼 Soy tu Guardián del Amor. Pregúntame lo que quieras, pídeme una canción (como 'Mujer Amante' de Rata Blanca o 'Die With A Smile') o pídemes una predicción de amor ✨.`
    }
  ]);
  const [inputChat, setInputChat] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Estados del Oráculo
  const [customQuestion, setCustomQuestion] = useState('');
  const [oracleAnswer, setOracleAnswer] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Estados del Generador de Poemas
  const [poemStyle, setPoemStyle] = useState('apasionado');
  const [generatedPoem, setGeneratedPoem] = useState('');
  const [copied, setCopied] = useState(false);

  // Estado del Ánimo
  const [selectedMood, setSelectedMood] = useState(null);

  const bubbleTimeoutRef = useRef(null);

  // Scroll automático en el chat
  useEffect(() => {
    if (activeModule === 'chat' && isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, activeModule, isOpen]);

  // Función para mostrar diálogo proactivo
  const triggerSpeech = (text, duration = 6500) => {
    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    setSpeechBubble(text);
    bubbleTimeoutRef.current = setTimeout(() => {
      setSpeechBubble(null);
    }, duration);
  };

  // Reacción proactiva a la pista musical actual
  useEffect(() => {
    const handleAudioChange = (state) => {
      if (state.isPlaying && state.currentTrack) {
        if (state.currentTrack.id === 'mujer-amante') {
          triggerSpeech(`¡Uff! Sonando 'Mujer Amante' de Rata Blanca 🎸🔥 ¡Pura pasión del rock en español!`, 6000);
        } else if (state.currentTrack.id === 'die-with-a-smile') {
          triggerSpeech(`'Die With A Smile' de Lady Gaga & Bruno Mars... ¡Una serenata inolvidable! 💖`, 6000);
        }
      }
    };
    const unsub = sound.subscribe(handleAudioChange);
    return () => unsub();
  }, []);

  // Reacción proactiva al cambiar de pestaña
  useEffect(() => {
    const tabMessages = {
      inicio: `¡Bienvenida ${recipientName}! Hoy es un día mágico para celebrar nuestro amor ✨`,
      carta: `Prepara tus ojos y tu corazón... esta carta fue escrita con toda el alma 📜💖`,
      gatitos: `¡Miau! ¿Sabías que estos gatitos representan cada caricia y momento tierno juntos? 🐱`,
      piano: `¡Toca una serenata en el piano! Cada nota vibra con amor 🎹🎶`,
      constelacion: `Traza estrellas en el cielo y descubre lo que el universo escribió para ustedes 🌌`,
      juego: `¡A ver qué tan ágil tienes la memoria para encontrar los pares del amor! 🧩`,
      candado: `Un candado sellado bajo el cielo... ¡Amor blindado e inquebrantable! 🔐`,
      quiz: `¿Quién conoce mejor a quién? ¡Descubrámoslo en el Quiz de Pareja! 🧠`,
      ruleta: `¿Sin plan para hoy? Deja que la ruleta elija la cita perfecta 🎡`,
      cupones: `¡Cupones válidos por besos, masajes y consentimientos ilimitados! 🎟️`,
      tiempo: `Cada segundo a tu lado cuenta como el tesoro más grande de la vida ⏳`
    };

    if (tabMessages[activeTab]) {
      triggerSpeech(tabMessages[activeTab], 5500);
    }
  }, [activeTab, recipientName]);

  // Manejador del Chat con Cupido
  const handleSendChat = (e) => {
    e?.preventDefault();
    if (!inputChat.trim() || isTyping) return;

    const userText = sanitizeInput(inputChat, 150, '');
    if (!userText) return;

    setInputChat('');
    sound.playPop();

    // Agregar mensaje del usuario
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    // Protección anti-flood en el chat
    if (!rateLimiter.check('cupid_chat', 4, 3000)) {
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'cupid',
            text: `¡Despacio, mi amor! 👼 Mis alitas van a mil por hora. Dame un segundito para respirar y responderte con toda la magia que te mereces ✨💕`
          }
        ]);
        setIsTyping(false);
        sound.playPop();
      }, 700);
      return;
    }

    // Simular procesamiento inteligente y tipeo en vivo
    setTimeout(() => {
      const response = generateCupidChatResponse(userText, recipientName, senderName);
      setChatMessages(prev => [...prev, { sender: 'cupid', text: response }]);
      setIsTyping(false);
      sound.playChime();
    }, 900);
  };

  // Consultar Oráculo
  const handleConsultOracle = (questionText = customQuestion) => {
    sound.playPop();
    setIsThinking(true);
    setOracleAnswer('');

    setTimeout(() => {
      setIsThinking(false);
      const randomIndex = Math.floor(Math.random() * ORACLE_ANSWERS.length);
      setOracleAnswer(ORACLE_ANSWERS[randomIndex]);
      sound.playChime();
      confettiEngine.fireHeartRain();
    }, 1100);
  };

  // Generar Poema
  const handleGeneratePoem = (style = poemStyle) => {
    sound.playPop();
    setPoemStyle(style);
    const templates = POEM_TEMPLATES[style] || POEM_TEMPLATES.apasionado;
    const template = templates[Math.floor(Math.random() * templates.length)];
    const poem = template(recipientName, senderName);
    setGeneratedPoem(poem);
    setCopied(false);
    sound.playChime();
  };

  // Copiar Poema
  const handleCopyPoem = () => {
    if (!generatedPoem) return;
    navigator.clipboard?.writeText(generatedPoem);
    setCopied(true);
    sound.playPop();
    setTimeout(() => setCopied(false), 2500);
  };

  // Seleccionar Ánimo
  const handleSelectMood = (moodKey) => {
    sound.playPop();
    setSelectedMood(moodKey);
    const mood = MOOD_RESPONSES[moodKey];
    if (mood) {
      triggerSpeech(`¡Ánimo ${mood.title}! ${mood.msg}`, 7000);
      confettiEngine.fireGentle();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end font-outfit select-none pointer-events-auto">
      
      {/* BURBUJA DE DIÁLOGO PROACTIVA FLOTANTE */}
      {speechBubble && !isOpen && (
        <div
          onClick={() => {
            sound.playPop();
            setIsOpen(true);
          }}
          className="glass-card-strong max-w-[230px] sm:max-w-xs p-3 rounded-2xl shadow-xl mb-2 text-xs text-rose-950 font-medium border border-rose-300 animate-pop-in cursor-pointer relative bg-white/95 backdrop-blur-md hover:scale-105 transition-transform"
        >
          <div className="flex items-start gap-2">
            <span className="text-base">💬</span>
            <p className="leading-relaxed font-quicksand">{speechBubble}</p>
          </div>
          <div className="text-[9px] text-rose-500 font-bold mt-1 text-right">
            Toca a Cupido para conversar ✨
          </div>
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white/95 rotate-45 border-r border-b border-rose-300" />
        </div>
      )}

      {/* PANEL COMPLETO DE LA ENTIDAD / ORÁCULO INTELIGENTE */}
      {isOpen && (
        <div className="glass-card-strong p-4 rounded-3xl shadow-2xl mb-2 w-80 sm:w-96 animate-pop-in border border-rose-300/90 bg-white/95 backdrop-blur-xl max-h-[85vh] flex flex-col">
          
          {/* Cabecera del Oráculo */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-rose-200 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-400 via-pink-500 to-amber-400 flex items-center justify-center text-white text-base shadow-md animate-pulse">
                👼
              </div>
              <div>
                <h3 className="text-xs font-bold text-rose-950 font-cinzel tracking-wider flex items-center gap-1">
                  Cupido Inteligente
                  <span className="text-[8px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-sans font-bold">AI v2</span>
                </h3>
                <span className="text-[10px] text-rose-600 font-semibold">
                  Guardián de {recipientName} & {senderName} ✨
                </span>
              </div>
            </div>
            
            <button
              onClick={() => {
                sound.playPop();
                setIsOpen(false);
              }}
              className="text-xs text-rose-400 hover:text-rose-700 font-bold p-1 rounded-full hover:bg-rose-100 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Selector de Pestañas del Oráculo con Scroll */}
          <div className="flex gap-1 bg-rose-100/70 p-1 rounded-2xl mb-2.5 text-[10px] font-bold text-rose-800 flex-shrink-0 overflow-x-auto custom-scrollbar">
            {[
              { id: 'chat', label: '💬 Chat IA' },
              { id: 'oraculo', label: '🔮 Oráculo' },
              { id: 'citas', label: '🕯️ Citas' },
              { id: 'poemas', label: '📜 Poemas' },
              { id: 'animo', label: '💖 Ánimo' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  setActiveModule(tab.id);
                  if (tab.id === 'poemas' && !generatedPoem) handleGeneratePoem('apasionado');
                }}
                className={`py-1 px-2 rounded-xl whitespace-nowrap transition-all ${
                  activeModule === tab.id ? 'bg-rose-500 text-white shadow-xs' : 'hover:bg-rose-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* MÓDULO 1: CHAT LIBRE CON INTELIGENCIA ARTIFICIAL */}
          {activeModule === 'chat' && (
            <div className="flex flex-col flex-1 min-h-0">
              
              {/* Contenedor de Mensajes con Scroll */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-56 mb-2">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-end gap-1.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'cupid' && (
                      <span className="text-xs mb-1">👼</span>
                    )}
                    <div
                      className={`max-w-[82%] p-2.5 rounded-2xl text-[11px] leading-relaxed font-quicksand ${
                        msg.sender === 'user'
                          ? 'bg-rose-500 text-white font-medium rounded-br-none shadow-sm'
                          : 'bg-rose-50 text-rose-950 font-medium rounded-bl-none border border-rose-200/80 shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                    <span>👼</span>
                    <span className="bg-rose-100 px-2.5 py-1 rounded-full text-[10px] animate-pulse">
                      Cupido está escribiendo... ✨
                    </span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Botones de Preguntas Rápidas */}
              <div className="flex gap-1 overflow-x-auto pb-1 mb-1.5 custom-scrollbar flex-shrink-0">
                {[
                  'Pon Mujer Amante 🎸',
                  'Pon Die With A Smile 💖',
                  '¿Cuánto me ama? 💘',
                  'Cuéntame un chiste tierno 😂'
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputChat(prompt);
                    }}
                    className="text-[9px] px-2 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-lg border border-rose-200 whitespace-nowrap font-medium transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input de Chat */}
              <form onSubmit={handleSendChat} className="flex gap-1.5 flex-shrink-0">
                <input
                  type="text"
                  placeholder="Pregúntale a Cupido lo que sea..."
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:border-rose-400 bg-white text-rose-900 placeholder:text-rose-300"
                  maxLength={120}
                />
                <button
                  type="submit"
                  disabled={!inputChat.trim() || isTyping}
                  className="px-3 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl text-xs font-bold shadow hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 cursor-pointer"
                >
                  ➤
                </button>
              </form>
            </div>
          )}

          {/* MÓDULO 2: ORÁCULO DE PREGUNTAS AL DESTINO */}
          {activeModule === 'oraculo' && (
            <div className="flex flex-col gap-2.5 overflow-y-auto custom-scrollbar flex-1 pr-1">
              <p className="text-[11px] text-rose-800/90 leading-relaxed font-quicksand font-medium">
                Hazle una pregunta al corazón o elige una consulta rápida para que el universo revele su mensaje:
              </p>

              {/* Preguntas Rápidas */}
              <div className="flex flex-wrap gap-1">
                {[
                  '¿Qué tan grande es nuestro amor? ✨',
                  '¿Qué aventura nos espera? 🌍',
                  '¿Por qué eres tan especial? 💖',
                  '¿Qué dice el destino hoy? 🔮'
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleConsultOracle(q)}
                    className="text-[10px] bg-rose-50 hover:bg-rose-100 text-rose-900 px-2 py-1 rounded-xl border border-rose-200 font-semibold transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Campo Personalizado */}
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="O escribe tu propia duda romántica..."
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleConsultOracle()}
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:border-rose-400 bg-white/90"
                  maxLength={70}
                />
                <button
                  onClick={() => handleConsultOracle()}
                  disabled={isThinking}
                  className="px-3 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
                >
                  {isThinking ? '✨' : 'Consultar'}
                </button>
              </div>

              {/* Revelación del Oráculo */}
              {isThinking && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col items-center justify-center gap-2 animate-pulse">
                  <span className="text-xl animate-spin">🔮</span>
                  <span className="text-xs text-rose-700 font-semibold">
                    Consultando las estrellas del amor...
                  </span>
                </div>
              )}

              {oracleAnswer && !isThinking && (
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-pink-50 to-rose-50 border border-rose-300 shadow-sm animate-pop-in">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 mb-1">
                    <span>✨</span>
                    <span>Mensaje Revelado:</span>
                  </div>
                  <p className="text-xs text-rose-950 font-dancing text-base leading-snug">
                    "{oracleAnswer}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* MÓDULO 3: PLANIFICADOR DE CITAS ROMÁNTICAS */}
          {activeModule === 'citas' && (
            <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
              <p className="text-[11px] text-rose-800/90 leading-relaxed font-quicksand font-medium">
                Ideas e itinerarios de citas mágicas diseñadas especialmente para <strong>{recipientName}</strong> y <strong>{senderName}</strong>:
              </p>

              <div className="space-y-2">
                {DATE_IDEAS.map((idea, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-2xl bg-rose-50/80 border border-rose-200 hover:border-rose-300 transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-rose-950">{idea.title}</h4>
                      <span className="text-[9px] bg-rose-200/80 text-rose-800 px-1.5 py-0.5 rounded-full font-semibold">
                        {idea.song}
                      </span>
                    </div>
                    <p className="text-[11px] text-rose-800/90 font-quicksand leading-relaxed">
                      {idea.plan}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÓDULO 4: GENERADOR DE POEMAS Y DEDICATORIAS */}
          {activeModule === 'poemas' && (
            <div className="flex flex-col gap-2.5 overflow-y-auto custom-scrollbar flex-1 pr-1">
              <p className="text-[11px] text-rose-800/90 leading-relaxed font-quicksand font-medium">
                Genera estrofas y versos únicos personalizados para <strong>{recipientName}</strong> de parte de <strong>{senderName}</strong>:
              </p>

              {/* Botones de Estilo */}
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'apasionado', label: '🔥 Apasionado', desc: 'Rock balada & ardor' },
                  { id: 'tierno', label: '🐱 Tierno & Dulce', desc: 'Mimos y ternura' },
                  { id: 'divertido', label: '😜 Alegre & Pícaro', desc: 'Risas y complicidad' },
                  { id: 'cosmico', label: '🌌 Amor Cósmico', desc: 'Estrellas e infinito' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => handleGeneratePoem(s.id)}
                    className={`p-2 rounded-xl text-left border text-[10px] transition-all ${
                      poemStyle === s.id
                        ? 'bg-rose-500 text-white font-bold border-rose-600 shadow-sm'
                        : 'bg-rose-50/70 text-rose-900 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <div className="font-bold">{s.label}</div>
                    <div className={`text-[8px] ${poemStyle === s.id ? 'text-rose-100' : 'text-gray-500'}`}>
                      {s.desc}
                    </div>
                  </button>
                ))}
              </div>

              {/* Poema Generado */}
              {generatedPoem && (
                <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/70 to-rose-50/80 border border-amber-200/80 shadow-inner">
                  <div className="text-center font-dancing text-base sm:text-lg text-rose-950 whitespace-pre-line leading-relaxed mb-2.5">
                    {generatedPoem}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-rose-200/60">
                    <button
                      onClick={() => handleGeneratePoem(poemStyle)}
                      className="text-[10px] text-rose-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>🔄</span>
                      <span>Otro verso</span>
                    </button>

                    <button
                      onClick={handleCopyPoem}
                      className="px-3 py-1 bg-rose-500 text-white rounded-lg text-[10px] font-bold shadow hover:bg-rose-600 transition-colors flex items-center gap-1"
                    >
                      <span>{copied ? '✅' : '📋'}</span>
                      <span>{copied ? '¡Copiado!' : 'Copiar Verso'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MÓDULO 5: SELECTOR DE ESTADOS DE ÁNIMO */}
          {activeModule === 'animo' && (
            <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
              <p className="text-[11px] text-rose-800/90 leading-relaxed font-quicksand font-medium">
                ¿Cómo te sientes hoy, <strong>{recipientName}</strong>? Elige tu estado de ánimo para adaptar la experiencia:
              </p>

              <div className="grid grid-cols-1 gap-1.5">
                {Object.entries(MOOD_RESPONSES).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => handleSelectMood(key)}
                    className={`p-2 rounded-xl text-left border flex items-center gap-2.5 transition-all ${
                      selectedMood === key
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold border-rose-600 shadow-md'
                        : 'bg-rose-50/80 text-rose-950 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <span className="text-xl">{data.emoji}</span>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold">{data.title}</div>
                      <div className={`text-[9px] ${selectedMood === key ? 'text-rose-100' : 'text-rose-700/80'}`}>
                        Recomendado: {data.song}
                      </div>
                    </div>
                    {selectedMood === key && <span className="text-sm">✨</span>}
                  </button>
                ))}
              </div>

              {selectedMood && MOOD_RESPONSES[selectedMood] && (
                <div className="p-2.5 rounded-2xl bg-rose-100/60 border border-rose-300 text-center animate-pop-in">
                  <p className="text-xs text-rose-900 font-medium font-quicksand">
                    "{MOOD_RESPONSES[selectedMood].msg}"
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* AVATAR FLOTANTE DE CUPIDO */}
      <button
        onClick={() => {
          sound.playPop();
          setIsOpen(e => !e);
        }}
        className="w-13 h-13 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-2 border-white cursor-pointer group"
        title="Cupido & Asistente Inteligente de Amor"
      >
        <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center relative overflow-hidden">
          <span className="text-2xl group-hover:scale-125 transition-transform animate-wiggle">
            👼
          </span>
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-bold animate-ping">
            ✨
          </div>
        </div>
      </button>

    </div>
  );
}
