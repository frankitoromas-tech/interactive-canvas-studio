// Sistema de Audio Procedural con Web Audio API
// No requiere archivos externos, funciona 100% offline y en cualquier navegador.

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.bgmGain = null;
    this.masterGain = null;
    this.volume = 0.6;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Pop tierno y burbujeante
  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      // Ignorar errores de audio
    }
  }

  // Sonido de evasión gracioso (whoosh/boing)
  playDodge() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.15);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {}
  }

  // Campanada mágica / Chime de amor
  playChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        const now = this.ctx.currentTime + idx * 0.05;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.85);
      });
    } catch (e) {}
  }

  // Fanfarria celestial para el ¡SÍ!
  playFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Arpegio romántico mayor con brillo
      const notes = [
        { f: 392.00, t: 0.0, d: 0.2 }, // G4
        { f: 523.25, t: 0.12, d: 0.2 }, // C5
        { f: 659.25, t: 0.24, d: 0.2 }, // E5
        { f: 783.99, t: 0.36, d: 0.3 }, // G5
        { f: 1046.50, t: 0.48, d: 0.7 }, // C6
        { f: 1318.51, t: 0.60, d: 1.0 }  // E6
      ];

      notes.forEach(n => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        const now = this.ctx.currentTime + n.t;
        osc.frequency.setValueAtTime(n.f, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.d);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + n.d + 0.05);
      });
    } catch (e) {}
  }

  // Sonido de latido cardíaco (lub-dub)
  playHeartbeat() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const playThump = (timeOffset, freq, vol) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const now = this.ctx.currentTime + timeOffset;
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.13);
      };

      playThump(0, 85, 0.3);
      playThump(0.18, 70, 0.2);
    } catch (e) {}
  }

  // Sonido de ruleta haciendo tic
  playRouletteTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  // Sonido de sello de cupón (stamp impact)
  playStamp() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.11);
    } catch (e) {}
  }

  // ==========================================
  // REPRODUCTOR DE MÚSICA ROMÁNTICA PROCEDURAL
  // Melodía suave en escala pentatónica de Amor (Piano / Caja de Música)
  // ==========================================
  startBGM() {
    if (this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;

    const chords = [
      // F mayor 7 -> C mayor -> D menor 7 -> G mayor sus4 / G
      [349.23, 440.00, 523.25, 659.25], // F4, A4, C5, E5
      [261.63, 329.63, 392.00, 523.25], // C4, E4, G4, C5
      [293.66, 349.23, 440.00, 523.25], // D4, F4, A4, C5
      [392.00, 493.88, 587.33, 659.25], // G4, B4, D5, E5
      [329.63, 392.00, 493.88, 587.33], // E4, G4, B4, D5 (Em7)
      [440.00, 523.25, 659.25, 783.99], // A4, C5, E5, G5 (Am7)
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [392.00, 493.88, 587.33, 783.99]  // G7
    ];

    let chordIndex = 0;
    let step = 0;

    const playNote = (freq, duration, velocity = 0.08) => {
      if (!this.ctx || !this.bgmPlaying || this.isMuted) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        // Forma de onda cálida y dulce estilo caja de música / piano suave
        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(freq, now);

        // Envolvente de piano suave
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(velocity, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      } catch (e) {}
    };

    const tick = () => {
      if (!this.bgmPlaying) return;

      const currentChord = chords[chordIndex];
      // Tocar arpegio suave
      const noteFreq = currentChord[step % currentChord.length];
      
      // Ocasionalmente agregar octava superior para brillo
      const octaveMultiplier = (step === 3 || step === 7) ? 2 : 1;
      playNote(noteFreq * octaveMultiplier, 1.4, 0.07);

      // Bajo suave en el primer paso de cada acorde
      if (step === 0) {
        playNote(currentChord[0] / 2, 2.2, 0.09);
      }

      step++;
      if (step >= 8) {
        step = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }

      this.bgmTimer = setTimeout(tick, 380); // tempo relajante ~80bpm en corcheas
    };

    tick();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleBGM() {
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }
}

export const sound = new SoundManager();
