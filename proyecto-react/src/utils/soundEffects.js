import { haptic } from './haptics';
// Sistema de Audio Avanzado: Streaming de Éxitos Románticos, Carga de MP3, Analizador de Espectro & Síntesis Procedural
// Compatible con todos los navegadores móviles y desktop. Cero dependencias externas.
// Notas cristalinas, acordes armónicos y frecuencias suaves tipo marimba/campanas celestiales (440Hz - 880Hz).

export const ROMANTIC_PLAYLIST = [
  {
    id: 'clair-de-lune',
    title: 'Clair de Lune (Luz de Luna)',
    artist: 'Claude Debussy',
    category: 'piano',
    cover: 'https://images.unsplash.com/photo-1520523839898-5071282543e1?auto=format&fit=crop&w=300&q=80',
    tag: 'Piano de Ensueño 🎹',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Clair_de_lune_%28Debussy%29_Suite_bergamasque.ogg',
    backupProcedural: true
  },
  {
    id: 'nocturne-op9-2',
    title: 'Nocturne Op. 9 No. 2',
    artist: 'Frédéric Chopin',
    category: 'piano',
    cover: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80',
    tag: 'Amor Clásico Eterno 🌹',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Chopin_-_Nocturne_in_E-flat_major%2C_Op._9%2C_No._2.ogg',
    backupProcedural: true
  },
  {
    id: 'liebestraum',
    title: 'Sueño de Amor (Liebestraum No. 3)',
    artist: 'Franz Liszt',
    category: 'piano',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
    tag: 'Pasión Romántica 💖',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Liszt_Liebestraum_3.ogg',
    backupProcedural: true
  },
  {
    id: 'moonlight-sonata',
    title: 'Sonata Claro de Luna (Adagio)',
    artist: 'Ludwig van Beethoven',
    category: 'piano',
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80',
    tag: 'Noche Estrellada 🌙',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Beethoven_Moonlight_1st_movement.ogg',
    backupProcedural: true
  },
  {
    id: 'pachelbel-canon',
    title: 'Canon en Re Mayor',
    artist: 'Johann Pachelbel',
    category: 'acustico',
    cover: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=300&q=80',
    tag: 'Promesa Incondicional 💍',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Pachelbel%27s_Canon.ogg',
    backupProcedural: true
  },
  {
    id: 'gymnopedie',
    title: 'Gymnopédie No. 1',
    artist: 'Erik Satie',
    category: 'acustico',
    cover: 'https://images.unsplash.com/photo-1485278537298-ff524e74883b?auto=format&fit=crop&w=300&q=80',
    tag: 'Dulzura & Paz 🕊️',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Erik_Satie_-_Gymnop%C3%A9die_No.1.ogg',
    backupProcedural: true
  },
  {
    id: 'fur-elise',
    title: 'Para Elisa (Für Elise)',
    artist: 'Ludwig van Beethoven',
    category: 'piano',
    cover: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=300&q=80',
    tag: 'Melodía de Cariño 💌',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Ludwig_van_Beethoven_-_F%C3%BCr_Elise.ogg',
    backupProcedural: true
  },
  {
    id: 'music-box',
    title: 'Caja de Música de San Valentín',
    artist: 'Melodía Procedural de Amor',
    category: 'procedural',
    cover: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=300&q=80',
    tag: 'Campanitas Mágicas ✨',
    audioUrl: null,
    backupProcedural: true
  },
  {
    id: 'lofi-romance',
    title: 'Lofi Sunset Romance',
    artist: 'Sintetizador Procedural Íntimo',
    category: 'procedural',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    tag: 'Atmósfera Cálida ☕',
    audioUrl: null,
    backupProcedural: true
  }
];

class SoundManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.compressor = null;
    this.analyser = null;
    this.dataArray = null;
    this.delayBus = null;
    this.delayGain = null;

    // Estado del Reproductor
    this.volume = 0.7;
    this.isMuted = false;
    this.isPlaying = false;
    this.isLooping = false;
    this.isShuffle = false;
    this.currentTrackId = 'clair-de-lune';
    this.customTracks = [];

    // Elemento de audio HTML5 para streaming
    this.htmlAudio = null;
    this.currentTime = 0;
    this.duration = 0;

    // Motor procedural de respaldo
    this.bgmTimer = null;
    this.listeners = new Set();
  }

  /* ── Inicialización Segura y Desbloqueo del AudioContext ── */
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        
        // Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

        // Compresor de dinámica para calidez y protección de picos
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.18, this.ctx.currentTime);

        // Analizador de frecuencia para visualizadores
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.8;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

        // Bus de retardo estéreo / shimmer celestial
        this.delayBus = this.ctx.createDelay(1.0);
        this.delayBus.delayTime.setValueAtTime(0.22, this.ctx.currentTime);
        this.delayGain = this.ctx.createGain();
        this.delayGain.gain.setValueAtTime(0.28, this.ctx.currentTime);

        const delayFilter = this.ctx.createBiquadFilter();
        delayFilter.type = 'lowpass';
        delayFilter.frequency.setValueAtTime(2400, this.ctx.currentTime);

        this.delayBus.connect(delayFilter);
        delayFilter.connect(this.delayGain);
        this.delayGain.connect(this.delayBus);
        this.delayBus.connect(this.masterGain);

        this.masterGain.connect(this.compressor);
        this.compressor.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /* ── Helpers Acústicos y Envolventes ADSR Suaves ── */
  applyEnvelope(param, t0, attack, decay, peak = 1, sustain = 0.0001, release = 0.05) {
    param.cancelScheduledValues(t0);
    param.setValueAtTime(0.0001, t0);
    param.linearRampToValueAtTime(Math.max(peak, 0.0001), t0 + Math.max(attack, 0.001));
    param.exponentialRampToValueAtTime(Math.max(sustain, 0.0001), t0 + attack + Math.max(decay, 0.001));
    if (release > 0) {
      param.exponentialRampToValueAtTime(0.0001, t0 + attack + decay + release);
    }
  }

  createNoiseBuffer(duration = 0.22) {
    if (!this.ctx) return null;
    const len = Math.floor(this.ctx.sampleRate * duration);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.8);
    }
    return buf;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
      volume: this.volume,
      isMuted: this.isMuted,
      isLooping: this.isLooping,
      isShuffle: this.isShuffle,
      currentTime: this.currentTime,
      duration: this.duration,
      currentTrack: this.getCurrentTrackInfo(),
      customTracks: this.customTracks
    }));
  }

  getAllTracks() {
    return [...this.customTracks, ...ROMANTIC_PLAYLIST];
  }

  getCurrentTrackInfo() {
    const all = this.getAllTracks();
    return all.find(t => t.id === this.currentTrackId) || ROMANTIC_PLAYLIST[0];
  }

  toggleLoop() {
    this.isLooping = !this.isLooping;
    if (this.htmlAudio) {
      this.htmlAudio.loop = this.isLooping;
    }
    this.notify();
    return this.isLooping;
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    this.notify();
    return this.isShuffle;
  }

  // Medidor de energía / beat reactivo para animaciones
  getAudioEnergy() {
    if (!this.isPlaying || this.isMuted) return 0;
    if (this.analyser && this.dataArray) {
      this.analyser.getByteFrequencyData(this.dataArray);
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        sum += this.dataArray[i];
      }
      return (sum / (8 * 255));
    }
    return 0.18;
  }

  vibrate(pattern = 10) {
    if (pattern === 'light') return haptic.light();
    if (pattern === 'medium') return haptic.medium();
    if (pattern === 'success') return haptic.success();
    if (pattern === 'error') return haptic.error();
    return haptic.vibrate(pattern);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    if (this.htmlAudio) {
      this.htmlAudio.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }

  // ==========================================
  // CARGA DE MP3 PERSONALIZADO POR EL USUARIO
  // ==========================================
  loadCustomAudioFile(file) {
    try {
      const url = URL.createObjectURL(file);
      const newTrack = {
        id: `custom_${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: 'Tu Canción Original MP3 💖',
        category: 'custom',
        cover: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80',
        tag: 'Original Subido 🎵',
        audioUrl: url,
        isCustom: true
      };
      
      this.customTracks = [newTrack, ...this.customTracks];
      this.setTrack(newTrack.id);
      return true;
    } catch (e) {
      console.error('Error loading custom audio:', e);
      return false;
    }
  }

  removeCustomTrack(trackId) {
    this.customTracks = this.customTracks.filter(t => t.id !== trackId);
    if (this.currentTrackId === trackId) {
      this.setTrack(ROMANTIC_PLAYLIST[0].id);
    } else {
      this.notify();
    }
  }

  // ==========================================
  // REPRODUCCIÓN / CAMBIO DE PISTA
  // ==========================================
  setTrack(trackId) {
    this.currentTrackId = trackId;
    this.stopAudio();
    this.startAudio();
  }

  nextTrack() {
    const all = this.getAllTracks();
    if (this.isShuffle) {
      const otherTracks = all.filter(t => t.id !== this.currentTrackId);
      const randomTrack = otherTracks[Math.floor(Math.random() * (otherTracks.length || 1))];
      this.setTrack(randomTrack ? randomTrack.id : all[0].id);
      return;
    }
    const currentIndex = all.findIndex(t => t.id === this.currentTrackId);
    const nextIndex = (currentIndex + 1) % all.length;
    this.setTrack(all[nextIndex].id);
  }

  prevTrack() {
    const all = this.getAllTracks();
    const currentIndex = all.findIndex(t => t.id === this.currentTrackId);
    const prevIndex = (currentIndex - 1 + all.length) % all.length;
    this.setTrack(all[prevIndex].id);
  }

  seekTo(timeInSeconds) {
    if (this.htmlAudio && isFinite(timeInSeconds)) {
      this.htmlAudio.currentTime = Math.max(0, Math.min(this.duration || 1000, timeInSeconds));
      this.currentTime = this.htmlAudio.currentTime;
      this.notify();
    }
  }

  startAudio() {
    this.init();
    this.isPlaying = true;
    const track = this.getCurrentTrackInfo();

    this.stopProceduralBGM();

    if (track && track.audioUrl) {
      if (!this.htmlAudio) {
        this.htmlAudio = new Audio();

        this.htmlAudio.addEventListener('timeupdate', () => {
          this.currentTime = this.htmlAudio.currentTime;
          this.duration = this.htmlAudio.duration || 0;
          this.notify();
        });

        this.htmlAudio.addEventListener('ended', () => {
          if (this.isLooping) {
            this.htmlAudio.currentTime = 0;
            this.htmlAudio.play().catch(() => {});
          } else {
            this.nextTrack();
          }
        });

        this.htmlAudio.addEventListener('loadedmetadata', () => {
          this.duration = this.htmlAudio.duration || 0;
          this.notify();
        });

        this.htmlAudio.addEventListener('error', (e) => {
          console.warn('Audio streaming notice, switching to procedural melody:', e);
          this.startProceduralBGM();
        });
      }

      this.htmlAudio.src = track.audioUrl;
      this.htmlAudio.volume = this.isMuted ? 0 : this.volume;
      this.htmlAudio.loop = this.isLooping;
      
      const playPromise = this.htmlAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy or deferred
        });
      }
    } else {
      if (this.htmlAudio) {
        try { this.htmlAudio.pause(); } catch (e) {}
      }
      this.startProceduralBGM();
    }

    this.notify();
  }

  getAudioDiagnostics() {
    return {
      status: this.ctx ? this.ctx.state : 'uninitialized',
      sampleRate: this.ctx ? `${this.ctx.sampleRate} Hz` : 'N/A',
      currentTrack: this.getCurrentTrackInfo().title,
      artist: this.getCurrentTrackInfo().artist,
      isPlaying: this.isPlaying,
      volume: Math.round(this.volume * 100) + '%',
      isMuted: this.isMuted,
      isLooping: this.isLooping,
      isShuffle: this.isShuffle,
      analyserActive: !!(this.analyser && this.isPlaying),
      latency: this.ctx ? `${((this.ctx.baseLatency || 0.01) * 1000).toFixed(1)} ms` : 'N/A'
    };
  }

  stopAudio() {
    this.isPlaying = false;
    if (this.htmlAudio) {
      try {
        this.htmlAudio.pause();
      } catch (e) {}
    }
    this.stopProceduralBGM();
    this.notify();
  }

  toggleBGM() {
    if (this.isPlaying) {
      this.stopAudio();
      return false;
    } else {
      this.startAudio();
      return true;
    }
  }

  startBGM() {
    this.startAudio();
  }

  stopBGM() {
    this.stopAudio();
  }

  // ==========================================
  // SINTETIZADOR PROCEDURAL ROMÁNTICO (BGM OFFLINE)
  // ==========================================
  startProceduralBGM() {
    if (this.bgmTimer) return;
    this.init();

    const chordsMusicBox = [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [261.63, 329.63, 392.00, 523.25], // C
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [392.00, 493.88, 587.33, 659.25], // G
      [329.63, 392.00, 493.88, 587.33], // Em7
      [440.00, 523.25, 659.25, 783.99], // Am7
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [392.00, 493.88, 587.33, 783.99]  // G7
    ];

    let chordIndex = 0;
    let step = 0;

    const playNote = (freq, duration, velocity = 0.08, type = 'sine') => {
      if (!this.ctx || !this.isPlaying || this.isMuted) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(velocity, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + duration + 0.05);
      } catch (e) {}
    };

    const tick = () => {
      if (!this.isPlaying) return;
      const currentChord = chordsMusicBox[chordIndex];
      const noteFreq = currentChord[step % currentChord.length];

      playNote(noteFreq, 1.4, 0.07, 'sine');

      if (step === 0 || step === 4) {
        playNote(currentChord[0] / 2, 2.2, 0.05, 'triangle');
      }

      step++;
      if (step >= 8) {
        step = 0;
        chordIndex = (chordIndex + 1) % chordsMusicBox.length;
      }
    };

    this.bgmTimer = setInterval(tick, 450);
  }

  stopProceduralBGM() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // =========================================================
  // SÍNTESIS FÍSICA PROCEDIMENTAL: MARIMBA & CAMPANAS (440-880Hz)
  // =========================================================

  // Placa de marimba suave (fundamental cálida + armónico 3.98x percusivo)
  playMarimbaNote(freq = 523.25, duration = 0.55, velocity = 0.22, sendToDelay = true) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;

      // Oscilador fundamental
      const oscMain = this.ctx.createOscillator();
      const gainMain = this.ctx.createGain();
      oscMain.type = 'triangle';
      oscMain.frequency.setValueAtTime(freq, t);

      // Oscilador de sobretono de madera
      const oscOvertone = this.ctx.createOscillator();
      const gainOvertone = this.ctx.createGain();
      oscOvertone.type = 'sine';
      oscOvertone.frequency.setValueAtTime(freq * 3.98, t);

      // Filtro de cuerpo cálido
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, t);
      filter.Q.setValueAtTime(1.1, t);

      // Envolvente ADSR aterciopelada
      this.applyEnvelope(gainMain.gain, t, 0.004, 0.14, velocity, 0.015, Math.max(0.1, duration - 0.15));
      this.applyEnvelope(gainOvertone.gain, t, 0.002, 0.035, velocity * 0.45, 0.0001, 0.03);

      oscMain.connect(gainMain);
      oscOvertone.connect(gainOvertone);
      gainMain.connect(filter);
      gainOvertone.connect(filter);
      filter.connect(this.masterGain);

      if (sendToDelay && this.delayBus) {
        const sendGain = this.ctx.createGain();
        sendGain.gain.setValueAtTime(0.18, t);
        filter.connect(sendGain);
        sendGain.connect(this.delayBus);
      }

      oscMain.start(t);
      oscOvertone.start(t);
      const stopTime = t + duration + 0.1;
      oscMain.stop(stopTime);
      oscOvertone.stop(stopTime);
    } catch (e) {}
  }

  // Campanas celestiales cristalinas con micro-detuning y cola reverberante
  playCelestialBell(freq = 659.25, duration = 1.1, velocity = 0.20, shimmer = true) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(freq, t);
      osc2.frequency.setValueAtTime(freq * 1.0025, t); // Micro-detuning armónico

      this.applyEnvelope(bellGain.gain, t, 0.006, 0.35, velocity, 0.02, duration);

      osc1.connect(bellGain);
      osc2.connect(bellGain);
      bellGain.connect(this.masterGain);

      if (shimmer && this.delayBus) {
        const sendGain = this.ctx.createGain();
        sendGain.gain.setValueAtTime(0.32, t);
        bellGain.connect(sendGain);
        sendGain.connect(this.delayBus);
      }

      osc1.start(t);
      osc2.start(t);
      const stopTime = t + duration + 0.3;
      osc1.stop(stopTime);
      osc2.stop(stopTime);
    } catch (e) {}
  }

  // =========================================================
  // PRESETS DE INTERACCIÓN: SOBRES, JUEGOS Y BOTONES
  // =========================================================

  // 1. ABRIR SOBRE / CARTA / REGALO (Papel de seda + arpegio de campanas celestiales)
  playEnvelopeOpen() {
    haptic.medium();
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;

      // Despliegue de papel
      const n = this.ctx.createBufferSource();
      n.buffer = this.createNoiseBuffer(0.18);
      if (n.buffer) {
        const nf = this.ctx.createBiquadFilter();
        nf.type = 'bandpass';
        nf.frequency.setValueAtTime(1400, t);
        nf.Q.setValueAtTime(1.5, t);
        const ng = this.ctx.createGain();
        this.applyEnvelope(ng.gain, t, 0.005, 0.12, 0.18, 0.0001, 0.05);
        n.connect(nf);
        nf.connect(ng);
        ng.connect(this.masterGain);
        n.start(t);
        n.stop(t + 0.2);
      }

      // Arpegio ascendente cristalino (440Hz -> 880Hz)
      const chordNotes = [440.00, 554.37, 659.25, 880.00];
      chordNotes.forEach((freq, idx) => {
        const delayMs = idx * 75;
        setTimeout(() => {
          this.playCelestialBell(freq, 1.2, 0.18 - idx * 0.02, true);
          this.playMarimbaNote(freq, 0.45, 0.12, false);
        }, delayMs);
      });
    } catch (e) {}
  }

  playEnvelope() {
    this.playEnvelopeOpen();
  }

  // 2. COMPLETAR JUEGO / PROPUESTA ACEPTADA (Acorde celestial mayor triunfal + marimba)
  playGameComplete() {
    haptic.success();
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const fanfareNotes = [
        { f: 523.25, delay: 0, dur: 0.8 },  // C5
        { f: 659.25, delay: 90, dur: 0.9 }, // E5
        { f: 783.99, delay: 180, dur: 1.0 },// G5
        { f: 987.77, delay: 290, dur: 1.2 },// B5
        { f: 1046.50, delay: 410, dur: 1.8 } // C6
      ];

      fanfareNotes.forEach(({ f, delay, dur }) => {
        setTimeout(() => {
          this.playCelestialBell(f, dur, 0.22, true);
          this.playMarimbaNote(f, 0.5, 0.15, false);
        }, delay);
      });

      // Calidez en el bajo
      setTimeout(() => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(261.63, t); // C4
        this.applyEnvelope(subGain.gain, t, 0.02, 0.8, 0.22, 0.01, 0.6);
        subOsc.connect(subGain);
        subGain.connect(this.masterGain);
        subOsc.start(t);
        subOsc.stop(t + 1.5);
      }, 420);
    } catch (e) {}
  }

  playVictory() {
    this.playGameComplete();
  }

  // 3. PRESIONAR BOTÓN (Gota de marimba acústica limpia y aterciopelada)
  playButtonClick() {
    haptic.light();
    if (this.isMuted) return;
    this.playMarimbaNote(587.33, 0.22, 0.24, false); // D5 suave
  }

  playButton() {
    this.playButtonClick();
  }

  // 4. PASO DE ESTRELLA O AVANCE DE NIVEL (Pentatónica suave)
  playStarStep(stepIndex = 0) {
    haptic.light();
    if (this.isMuted) return;
    const scale = [440.00, 493.88, 554.37, 659.25, 739.99, 880.00, 987.77, 1108.73];
    const idx = Math.abs(stepIndex) % scale.length;
    const freq = scale[idx];
    this.playCelestialBell(freq, 0.7, 0.20, true);
    this.playMarimbaNote(freq, 0.35, 0.16, false);
  }

  // 5. ACORDE ARMÓNICO COMPLETO
  playHarmonicChord(rootFreq = 440, type = 'maj9') {
    if (this.isMuted) return;
    let intervals = [1, 1.25, 1.5, 1.875];
    if (type === 'maj9') intervals = [1, 1.25, 1.5, 1.875, 2.25];
    if (type === 'sus2') intervals = [1, 1.125, 1.5, 2.0];

    intervals.forEach((ratio, i) => {
      const f = rootFreq * ratio;
      setTimeout(() => {
        this.playCelestialBell(f, 1.2, 0.16 - i * 0.02, true);
      }, i * 35);
    });
  }

  // ==========================================
  // EFECTOS MEJORADOS (COMPATIBILIDAD RETROACTIVA)
  // ==========================================
  playPop() {
    this.playButtonClick();
  }

  playDodge() {
    haptic.error();
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.12);

      this.applyEnvelope(gain.gain, now, 0.005, 0.10, 0.16, 0.0001, 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {}
  }

  playChime() {
    haptic.medium();
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playCelestialBell(freq, 0.9, 0.18, true);
      }, idx * 60);
    });
  }

  playFanfare() {
    this.playGameComplete();
  }

  playLockClick() {
    haptic.medium();
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.08);

      this.applyEnvelope(gain.gain, t, 0.003, 0.07, 0.22, 0.0001, 0.02);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.10);
    } catch (e) {}
  }

  playMatchSuccess() {
    haptic.success();
    if (this.isMuted) return;
    const notes = [659.25, 880.00, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playCelestialBell(freq, 0.7, 0.20, true);
        this.playMarimbaNote(freq, 0.35, 0.15, false);
      }, i * 70);
    });
  }
}

export const sound = new SoundManager();

// Desbloqueo universal de AudioContext para navegadores móviles y desktop
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    sound.init();
    ['touchstart', 'touchend', 'mousedown', 'keydown', 'pointerdown'].forEach(evt => {
      window.removeEventListener(evt, unlockAudio);
    });
  };
  ['touchstart', 'touchend', 'mousedown', 'keydown', 'pointerdown'].forEach(evt => {
    window.addEventListener(evt, unlockAudio, { once: true, passive: true });
  });
}

export { haptic } from './haptics';
