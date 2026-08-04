// Sistema de Audio Avanzado: Streaming de Éxitos Románticos, Carga de MP3, Analizador de Espectro & Síntesis Procedural
// Compatible con todos los navegadores móviles y desktop.

export const ROMANTIC_PLAYLIST = [
  {
    id: 'mujer-amante',
    title: 'Mujer Amante',
    artist: 'Rata Blanca',
    category: 'rock',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
    tag: 'Rock Balada Legendaria 🎸',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/11/17/audio_82c237303e.mp3?filename=rock-ballad-guitar-127265.mp3',
    backupProcedural: true
  },
  {
    id: 'die-with-a-smile',
    title: 'Die With A Smile',
    artist: 'Lady Gaga & Bruno Mars',
    category: 'pop',
    cover: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80',
    tag: 'Éxito Mundial 💖',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=romantic-piano-124977.mp3',
    backupProcedural: true
  },
  {
    id: 'leyenda-hada-mago',
    title: 'La Leyenda del Hada y el Mago',
    artist: 'Rata Blanca (Acoustic Version)',
    category: 'rock',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
    tag: 'Fantasía Épica ⚔️',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b8275308.mp3?filename=epic-emotional-guitar-11004.mp3',
    backupProcedural: true
  },
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    artist: 'JVKE (Romantic Piano)',
    category: 'pop',
    cover: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=300&q=80',
    tag: 'Atardecer Mágico ✨',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sweet-love-111664.mp3',
    backupProcedural: true
  },
  {
    id: 'until-i-found-you',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez (Love Acoustic)',
    category: 'pop',
    cover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=300&q=80',
    tag: 'Amor Retro 🌹',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=love-story-piano-10884.mp3',
    backupProcedural: true
  },
  {
    id: 'perfect',
    title: 'Perfect',
    artist: 'Ed Sheeran (Orchestral Strings)',
    category: 'pop',
    cover: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=300&q=80',
    tag: 'Balada Eterna 💍',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_0155a02805.mp3?filename=in-love-126243.mp3',
    backupProcedural: true
  },
  {
    id: 'solamente-tu',
    title: 'Solamente Tú',
    artist: 'Pablo Alborán (Acoustic Guitar)',
    category: 'acustico',
    cover: 'https://images.unsplash.com/photo-1485278537298-ff524e74883b?auto=format&fit=crop&w=300&q=80',
    tag: 'Pasión Acústica 🕊️',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=acoustic-guitar-love-116199.mp3',
    backupProcedural: true
  },
  {
    id: 'entra-en-mi-vida',
    title: 'Entra En Mi Vida',
    artist: 'Sin Bandera (Love Piano)',
    category: 'pop',
    cover: 'https://images.unsplash.com/photo-1520523839898-5071282543e1?auto=format&fit=crop&w=300&q=80',
    tag: 'Balada Inolvidable 💌',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2023/02/28/audio_554868971f.mp3?filename=romantic-piano-ballad-141258.mp3',
    backupProcedural: true
  },
  {
    id: 'hasta-la-raiz',
    title: 'Hasta la Raíz',
    artist: 'Natalia Lafourcade',
    category: 'acustico',
    cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=80',
    tag: 'Amor de Raíz 🌸',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/10/audio_fc847669d0.mp3?filename=warm-acoustic-10499.mp3',
    backupProcedural: true
  },
  {
    id: 'all-of-me',
    title: 'All of Me',
    artist: 'John Legend (Romantic Piano)',
    category: 'piano',
    cover: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=300&q=80',
    tag: 'Piano Inmortal 🎹',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2023/01/01/audio_145167099f.mp3?filename=touching-piano-131758.mp3',
    backupProcedural: true
  },
  {
    id: 'yellow',
    title: 'Yellow',
    artist: 'Coldplay (Romantic Acoustic)',
    category: 'acustico',
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80',
    tag: 'Noche Estrellada 🌌',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_2911bca05b.mp3?filename=acoustic-ambient-124376.mp3',
    backupProcedural: true
  },
  {
    id: 'music-box',
    title: 'Caja de Música de San Valentín',
    artist: 'Antigravity Procedural Synthesizer',
    category: 'piano',
    cover: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=300&q=80',
    tag: 'Dulce Melodía 🎀',
    audioUrl: null, // Sintetizador puro
    backupProcedural: true
  },
  {
    id: 'lofi-romance',
    title: 'Lofi Sunset Romance',
    artist: 'Chill Beats For Two',
    category: 'piano',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    tag: 'Relajante ☕',
    audioUrl: null, // Sintetizador lofi puro
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
    this.volume = 0.65;
    this.isMuted = false;
    this.isPlaying = false;
    this.isLooping = false;
    this.isShuffle = false;
    this.currentTrackId = 'mujer-amante';
    this.customTrack = null;

    // Elemento de audio HTML5 para streaming
    this.htmlAudio = null;
    this.audioSourceNode = null;
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
      currentTrack: this.getCurrentTrackInfo()
    }));
  }

  getCurrentTrackInfo() {
    if (this.customTrack && this.currentTrackId === 'custom') {
      return this.customTrack;
    }
    return ROMANTIC_PLAYLIST.find(t => t.id === this.currentTrackId) || ROMANTIC_PLAYLIST[0];
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
      for (let i = 0; i < 8; i++) { // Frecuencias graves / ritmo
        sum += this.dataArray[i];
      }
      return (sum / (8 * 255));
    }
    return 0.15; // Estimación suave
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
      this.customTrack = {
        id: 'custom',
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: 'Tu Canción Subida 💖',
        category: 'custom',
        cover: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80',
        tag: 'Personalizada 🎵',
        audioUrl: url,
        isCustom: true
      };
      this.setTrack('custom');
      return true;
    } catch (e) {
      return false;
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
    if (this.isShuffle) {
      const otherTracks = ROMANTIC_PLAYLIST.filter(t => t.id !== this.currentTrackId);
      const randomTrack = otherTracks[Math.floor(Math.random() * otherTracks.length)];
      this.setTrack(randomTrack ? randomTrack.id : ROMANTIC_PLAYLIST[0].id);
      return;
    }
    const currentIndex = ROMANTIC_PLAYLIST.findIndex(t => t.id === this.currentTrackId);
    const nextIndex = (currentIndex + 1) % ROMANTIC_PLAYLIST.length;
    this.setTrack(ROMANTIC_PLAYLIST[nextIndex].id);
  }

  prevTrack() {
    const currentIndex = ROMANTIC_PLAYLIST.findIndex(t => t.id === this.currentTrackId);
    const prevIndex = (currentIndex - 1 + ROMANTIC_PLAYLIST.length) % ROMANTIC_PLAYLIST.length;
    this.setTrack(ROMANTIC_PLAYLIST[prevIndex].id);
  }

  seekTo(timeInSeconds) {
    if (this.htmlAudio && isFinite(timeInSeconds)) {
      this.htmlAudio.currentTime = Math.max(0, Math.min(this.duration, timeInSeconds));
      this.currentTime = this.htmlAudio.currentTime;
      this.notify();
    }
  }

  startAudio() {
    this.init();
    this.isPlaying = true;
    const track = this.getCurrentTrackInfo();

    if (track && track.audioUrl) {
      // Reproducir mediante HTML5 Audio + Web Audio API
      if (!this.htmlAudio) {
        this.htmlAudio = new Audio();
        this.htmlAudio.crossOrigin = 'anonymous';

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

        this.htmlAudio.addEventListener('error', () => {
          // Si falla el streaming, pasar a sintetizador de respaldo sin interrupción
          console.warn('Streaming audio fallback to procedural synth');
          this.startProceduralBGM();
        });
      }

      this.htmlAudio.src = track.audioUrl;
      this.htmlAudio.volume = this.isMuted ? 0 : this.volume;
      
      this.htmlAudio.play().catch(e => {
        this.startProceduralBGM();
      });

      if (this.ctx && !this.audioSourceNode) {
        try {
          this.audioSourceNode = this.ctx.createMediaElementSource(this.htmlAudio);
          this.audioSourceNode.connect(this.masterGain);
        } catch (e) {
          console.warn('Web Audio MediaElementSource bypassed (direct audio output active):', e);
        }
      }
    } else {
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
