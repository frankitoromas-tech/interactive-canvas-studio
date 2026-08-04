// Sistema de Audio Avanzado: Streaming de Éxitos Románticos, Carga de MP3, Analizador de Espectro & Síntesis Procedural
// Compatible con todos los navegadores móviles y desktop.

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
    this.analyser = null;
    this.dataArray = null;

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

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.8;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
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

  vibrate(ms = 30) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(ms);
      } catch (e) {}
    }
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
  // SINTETIZADOR PROCEDURAL ROMÁNTICO (OFFLINE)
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

  // ==========================================
  // EFECTOS DE SONIDO MICRO-INTERACTIVOS
  // ==========================================
  playPop() {
    this.vibrate(15);
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {}
  }

  playDodge() {
    this.vibrate(20);
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(200, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  playChime() {
    this.vibrate(25);
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const noteTime = now + idx * 0.07;
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.12, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.8);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(noteTime);
        osc.stop(noteTime + 0.85);
      });
    } catch (e) {}
  }

  playFanfare() {
    this.vibrate([40, 60, 50, 70, 80]);
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [
        { f: 523.25, t: 0, d: 0.12 },
        { f: 659.25, t: 0.12, d: 0.12 },
        { f: 783.99, t: 0.24, d: 0.12 },
        { f: 1046.50, t: 0.36, d: 0.45 }
      ];

      notes.forEach(n => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const start = now + n.t;
        osc.frequency.setValueAtTime(n.f, start);

        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + n.d);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(start);
        osc.stop(start + n.d + 0.05);
      });
    } catch (e) {}
  }

  playLockClick() {
    this.vibrate(60);
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.12);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  playMatchSuccess() {
    this.vibrate([25, 40, 30]);
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [659.25, 880, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const t = now + i * 0.08;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.35);
      });
    } catch (e) {}
  }
}

export const sound = new SoundManager();

// Desbloqueo universal de AudioContext para navegadores móviles y desktop
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    sound.init();
    ['touchstart', 'touchend', 'mousedown', 'keydown'].forEach(evt => {
      window.removeEventListener(evt, unlockAudio);
    });
  };
  ['touchstart', 'touchend', 'mousedown', 'keydown'].forEach(evt => {
    window.addEventListener(evt, unlockAudio, { once: true, passive: true });
  });
}
