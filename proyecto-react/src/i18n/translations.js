/**
 * translations.js — Diccionario de Localización Multilingüe
 * Sello de Autor: Frankosyni (Φρανκοσύνη/Francus. @frankitoromas-tech)
 * 
 * Idiomas:
 *  - 'es': Español (Nativo / Base)
 *  - 'en': English (Global)
 *  - 'el': Ἑλληνική (Griego Clásico / Modo Filosófico: Ἀγάπη · Φιλία · Τέχνη)
 */

export const GREEK_TRINITY = {
  agape: {
    term: 'Ἀγάπη',
    transcription: 'Ágape',
    meaningEs: 'Amor trascendental, puro, incondicional y eterno.',
    meaningEn: 'Transcendent, unconditional, selfless and eternal love.',
    meaningEl: 'Ἡ ἀνυπόκριτος καὶ θεία ἀγάπη ἡ πάντα στέγουσα.'
  },
  philia: {
    term: 'Φιλία',
    transcription: 'Filía',
    meaningEs: 'Conexión del alma, lealtad íntima, profunda complicidad.',
    meaningEn: 'Soul connection, intimate loyalty, deep kindred spirit.',
    meaningEl: 'Ἡ βαθεῖα ψυχικὴ σύμπνοια καὶ ἀκλόνητος πίστις.'
  },
  techne: {
    term: 'Τέχνη',
    transcription: 'Téchne',
    meaningEs: 'Artesanía digital, maestría técnica y devoción creadora (Frankosyni).',
    meaningEn: 'Digital craft, technical mastery, and creative devotion (Frankosyni).',
    meaningEl: 'Ἡ τοῦ νοῦ καὶ χειρὸς δημιουργικὴ δεξιότης.'
  }
};

export const TRANSLATIONS = {
  es: {
    meta: {
      name: 'Español',
      code: 'es',
      flag: '🇪🇸',
      badge: 'Nativo',
      motto: 'Ἀγάπη · Amor Puro'
    },
    nav: {
      share: 'Compartir',
      certificate: 'Certificado',
      settings: 'Ajustes',
      language: 'Idioma',
      securityStatus: 'Seguridad'
    },
    tabs: {
      inicio: { label: 'Inicio', sub: 'Ἀγάπη' },
      carta: { label: 'Carta', sub: 'Φιλία' },
      gatitos: { label: 'Gatitos', sub: 'Μνήμη' },
      piano: { label: 'Piano', sub: 'Τέχνη' },
      capsula: { label: 'Cápsula', sub: 'Χρόνος' },
      constelacion: { label: 'Estrellas', sub: 'Οὐρανός' },
      juego: { label: 'Memoria', sub: 'Παιγνίδιον' },
      candado: { label: 'Candado', sub: 'Δεσμός' },
      quiz: { label: 'Quiz', sub: 'Νοῦς' },
      ruleta: { label: 'Ruleta', sub: 'Τύχη' },
      cupones: { label: 'Cupones', sub: 'Χάριτες' },
      tiempo: { label: 'Reloj', sub: 'Αἰών' }
    },
    envelope: {
      badge: '✦ Correspondencia Secreta ✦',
      title: 'Una carta especial para ti',
      subtitle: 'Toca el sello de cera para abrir tu sorpresa de San Valentín',
      stampTooltip: 'Toca para romper el sello y abrir',
      recipientPrefix: 'Para:'
    },
    question: {
      eyebrow: '✦ Pregunta Trascendental ✦',
      questionText: '¿Quieres ser mi San Valentín?',
      subtitle: 'Cada universo y estrella conspiran para estar juntos.',
      yesBtn: '¡Sí, con todo mi corazón! 💖',
      noBtn: 'No (¿segura?) 😉',
      noPlayfulTexts: [
        '¿Segura? Piénsalo otra vez...',
        '¡El botón del "Sí" es más bonito!',
        'No acepto un no por respuesta ✨',
        '¡Vamos, di que sí! 🥺',
        'El destino insiste en un Sí 💫'
      ]
    },
    hero: {
      badgeTitle: 'San Valentín Oficial & Conectado',
      title: '¡Dijo que sí, {name}!',
      quote: '"Cada latido de mi corazón lleva grabado tu nombre para siempre."',
      btnConfetti: '¡Más Confeti!',
      btnRosesRain: 'Lluvia de Rosas',
      btnRosesStop: 'Detener Rosas',
      btnCertificate: 'Ver Certificado Oficial',
      btnShare: 'Compartir en WhatsApp',
      stats: {
        compatibility: 'Compatibilidad',
        smiles: 'Sonrisas Juntos',
        date: 'Cita Soñada',
        love: 'Mi Amor Eterno'
      },
      trinityHeader: 'Tríada Filosófica de Frankosyni'
    },
    settings: {
      title: 'Ajustes & Personalización',
      subtitle: 'Personaliza los nombres, el tema visual y el idioma a tu gusto.',
      recipientLabel: 'Nombre de tu Pareja:',
      senderLabel: 'Tu Nombre o Apodo:',
      themeLabel: 'Tema Visual & Atmósfera:',
      themes: {
        'romantic-pink': { name: '🌸 Rosa Romántico', desc: 'Clásico y dulce' },
        'midnight': { name: '🌌 Noche Estrellada', desc: 'Místico y profundo' },
        'golden': { name: '✨ Oro y Atardecer', desc: 'Cálido y brillante' },
        'enchanted': { name: '🌿 Bosque Encantado', desc: 'Fresco y primaveral' }
      },
      languageLabel: 'Idioma & Dialéctica:',
      resetBtn: '🔄 Reiniciar Experiencia',
      diagnosticsBtn: '🛡️ Diagnóstico de Seguridad',
      saveBtn: 'Guardar Ajustes ✨',
      cancelBtn: 'Cancelar'
    },
    footer: {
      madeWithLove: 'Hecho con amor infinito para {name} ✨',
      signature: 'Arquitectura & Τέχνη por Frankosyni (Φρανκοσύνη/Francus.)',
      securityLink: '🛡️ Ver Estado de Seguridad & Auditoría'
    },
    selectorModal: {
      title: 'Seleccionar Idioma',
      subtitle: 'Cambio fluido e instantáneo sin recargar la página',
      greekTribute: 'Homenaje clásico con las virtudes: Ἀγάπη (Amor), Φιλία (Conexión) y Τέχνη (Artesanía)'
    }
  },

  en: {
    meta: {
      name: 'English',
      code: 'en',
      flag: '🇬🇧',
      badge: 'Global',
      motto: 'Φιλία · Pure Devotion'
    },
    nav: {
      share: 'Share',
      certificate: 'Certificate',
      settings: 'Settings',
      language: 'Language',
      securityStatus: 'Security'
    },
    tabs: {
      inicio: { label: 'Home', sub: 'Ἀγάπη' },
      carta: { label: 'Letter', sub: 'Φιλία' },
      gatitos: { label: 'Kittens', sub: 'Μνήμη' },
      piano: { label: 'Piano', sub: 'Τέχνη' },
      capsula: { label: 'Capsule', sub: 'Χρόνος' },
      constelacion: { label: 'Stars', sub: 'Οὐρανός' },
      juego: { label: 'Memory', sub: 'Παιγνίδιον' },
      candado: { label: 'Lock', sub: 'Δεσμός' },
      quiz: { label: 'Quiz', sub: 'Νοῦς' },
      ruleta: { label: 'Roulette', sub: 'Τύχη' },
      cupones: { label: 'Coupons', sub: 'Χάριτες' },
      tiempo: { label: 'Clock', sub: 'Αἰών' }
    },
    envelope: {
      badge: '✦ Secret Correspondence ✦',
      title: 'A special letter for you',
      subtitle: 'Touch the wax seal to unveil your Valentine surprise',
      stampTooltip: 'Touch to break the seal and open',
      recipientPrefix: 'For:'
    },
    question: {
      eyebrow: '✦ Transcendent Question ✦',
      questionText: 'Will you be my Valentine?',
      subtitle: 'Every universe and star conspire for us to be together.',
      yesBtn: 'Yes, with all my heart! 💖',
      noBtn: 'No (are you sure?) 😉',
      noPlayfulTexts: [
        'Are you sure? Think again...',
        'The "Yes" button looks much prettier!',
        'I won’t take no for an answer ✨',
        'Come on, say yes! 🥺',
        'Destiny insists on a Yes 💫'
      ]
    },
    hero: {
      badgeTitle: 'Official & Connected Valentine',
      title: 'She said yes, {name}!',
      quote: '"Every beat of my heart carries your name forever engraved."',
      btnConfetti: 'More Confetti!',
      btnRosesRain: 'Rose Rain',
      btnRosesStop: 'Stop Roses',
      btnCertificate: 'View Official Certificate',
      btnShare: 'Share on WhatsApp',
      stats: {
        compatibility: 'Compatibility',
        smiles: 'Smiles Together',
        date: 'Dream Date',
        love: 'My Eternal Love'
      },
      trinityHeader: 'Frankosyni’s Philosophical Triad'
    },
    settings: {
      title: 'Settings & Customization',
      subtitle: 'Customize partner names, visual theme, and language effortlessly.',
      recipientLabel: 'Partner’s Name:',
      senderLabel: 'Your Name or Nickname:',
      themeLabel: 'Visual Theme & Atmosphere:',
      themes: {
        'romantic-pink': { name: '🌸 Romantic Pink', desc: 'Classic & sweet' },
        'midnight': { name: '🌌 Starry Midnight', desc: 'Mystical & deep' },
        'golden': { name: '✨ Golden Sunset', desc: 'Warm & bright' },
        'enchanted': { name: '🌿 Enchanted Forest', desc: 'Fresh & spring-like' }
      },
      languageLabel: 'Language & Dialectics:',
      resetBtn: '🔄 Reset Experience',
      diagnosticsBtn: '🛡️ Security Diagnostics',
      saveBtn: 'Save Settings ✨',
      cancelBtn: 'Cancel'
    },
    footer: {
      madeWithLove: 'Crafted with infinite love for {name} ✨',
      signature: 'Architecture & Τέχνη by Frankosyni (Φρανκοσύνη/Francus.)',
      securityLink: '🛡️ View Security & Audit Status'
    },
    selectorModal: {
      title: 'Select Language',
      subtitle: 'Seamless, instant switch without reloading the page',
      greekTribute: 'Classical tribute with virtues: Ἀγάπη (Love), Φιλία (Bond), and Τέχνη (Craft)'
    }
  },

  el: {
    meta: {
      name: 'Ἑλληνική',
      code: 'el',
      flag: '🏛️',
      badge: 'Φιλοσοφία',
      motto: 'Τέχνη · Αἰωνία Σφραγίς'
    },
    nav: {
      share: 'Κοινοποίησις',
      certificate: 'Πιστοποιητικόν',
      settings: 'Ρυθμίσεις',
      language: 'Γλῶσσα',
      securityStatus: 'Ἀσφάλεια'
    },
    tabs: {
      inicio: { label: 'Ἀρχή', sub: 'Ἀγάπη' },
      carta: { label: 'Ἐπιστολή', sub: 'Φιλία' },
      gatitos: { label: 'Αἴλουροι', sub: 'Μνήμη' },
      piano: { label: 'Ἁρμονία', sub: 'Τέχνη' },
      capsula: { label: 'Κάψουλα', sub: 'Χρόνος' },
      constelacion: { label: 'Ἄστρα', sub: 'Οὐρανός' },
      juego: { label: 'Μνημοσύνη', sub: 'Παιγνίδιον' },
      candado: { label: 'Κλεῖθρον', sub: 'Δεσμός' },
      quiz: { label: 'Διάλογος', sub: 'Νοῦς' },
      ruleta: { label: 'Τροχός', sub: 'Τύχη' },
      cupones: { label: 'Χάριτες', sub: 'Δῶρα' },
      tiempo: { label: 'Ὡρολόγιον', sub: 'Αἰών' }
    },
    envelope: {
      badge: '✦ Μυστικὴ Ἐπιστολή ✦',
      title: 'Ἐπιστολὴ ἐξαιρέτως σοί',
      subtitle: 'Ἄψαι τῆς κηροβουλῆς πρὸς ἀποκάλυψιν τοῦ μυστηρίου',
      stampTooltip: 'Ἄψαι πρὸς λύσιν τῆς σφραγῖδος',
      recipientPrefix: 'Πρός:'
    },
    question: {
      eyebrow: '✦ Ὑπερτάτη Ἐρώτησις ✦',
      questionText: 'Βούλει εἶναι ὁ ἐμὸς Βαλεντῖνος;',
      subtitle: 'Σύμπαντα τὰ ἄστρα καὶ οἱ αἰῶνες συνωμότησαν ὑπὲρ ἡμῶν.',
      yesBtn: 'Ναί, ἐξ ὅλης τῆς ἐμῆς καρδίας! 💖',
      noBtn: 'Οὔ (ἆρα βέβαια εἶ;) 😉',
      noPlayfulTexts: [
        'Ἆρα βέβαια εἶ; Σκέψαι πάλιν...',
        'Τὸ «Ναί» καλλίων καὶ λαμπρότερον ἐστίν!',
        'Οὐ δέχομαι ἄρνησιν ✨',
        'Ἴθι, φθέγξαι ναί! 🥺',
        'Ἡ εἱμαρμένη ἐπιτάττει τὸ Ναί 💫'
      ]
    },
    hero: {
      badgeTitle: 'Ἐπίσημος καὶ Συνδεδεμένος Βαλεντῖνος',
      title: 'Εἶπεν ναί, {name}!',
      quote: '"Πᾶς σφυγμὸς τῆς ἐμῆς καρδίας τὸ σὸν ὄνομα αἰεὶ κεχαραγμένον φέρει."',
      btnConfetti: 'Πλείων Κόνφετι!',
      btnRosesRain: 'Ὑετὸς Ῥόδων',
      btnRosesStop: 'Παῦσις Ῥόδων',
      btnCertificate: 'Ἐπίσημον Πιστοποιητικόν',
      btnShare: 'Κοινοποίησις WhatsApp',
      stats: {
        compatibility: 'Συμφωνία',
        smiles: 'Μειδιάματα',
        date: 'Ἱερὰ Συνάντησις',
        love: 'Ἀγάπη Αἰωνία'
      },
      trinityHeader: 'Ἡ Φιλοσοφικὴ Τριάς τοῦ Frankosyni'
    },
    settings: {
      title: 'Ρυθμίσεις & Προσωποποίησις',
      subtitle: 'Προσαρμόσατε τὰ ὀνόματα, τὴν μορφὴν καὶ τὴν γλῶσσαν εὐκόλως.',
      recipientLabel: 'Ὄνομα τοῦ/τῆς Ἐρωμένου/ης:',
      senderLabel: 'Τὸ σὸν Ὄνομα ἢ Προσωνύμιον:',
      themeLabel: 'Ὀπτικὴ Ἀτμόσφαιρα:',
      themes: {
        'romantic-pink': { name: '🌸 Ῥόδον Ἐρωτικόν', desc: 'Κλασικὸν καὶ γλυκύ' },
        'midnight': { name: '🌌 Νὺξ Ἀστερόεσσα', desc: 'Μυστικὸν καὶ βαθύ' },
        'golden': { name: '✨ Χρυσοῦς Ἡλιοβασίλεμα', desc: 'Θερμὸν καὶ λαμπρόν' },
        'enchanted': { name: '🌿 Ἄλσος Μαγικόν', desc: 'Δροσερὸν καὶ ἐαρινόν' }
      },
      languageLabel: 'Γλῶσσα & Διαλεκτική:',
      resetBtn: '🔄 Ἀνανέωσις Ἐμπειρίας',
      diagnosticsBtn: '🛡️ Ἀσφάλεια & Διάγνωσις',
      saveBtn: 'Ἀποθήκευσις ✨',
      cancelBtn: 'Ἀκύρωσις'
    },
    footer: {
      madeWithLove: 'Μετ\' ἀπείρου ἀγάπης πεποιημένον διὰ {name} ✨',
      signature: 'Τέχνη & Σφραγίς: Frankosyni (Φρανκοσύνη/Francus.)',
      securityLink: '🛡️ Ἐπισκόπησις Ἀσφαλείας & Ἐλέγχου'
    },
    selectorModal: {
      title: 'Ἐπιλογὴ Γλώσσης',
      subtitle: 'Ἀκαριαία καὶ ῥέουσα μεταβολὴ ἄνευ ἐπαναφορτίσεως',
      greekTribute: 'Κλασικὸν ἀφιέρωμα ταῖς ἀρεταῖς: Ἀγάπη, Φιλία καὶ Τέχνη'
    }
  }
};
