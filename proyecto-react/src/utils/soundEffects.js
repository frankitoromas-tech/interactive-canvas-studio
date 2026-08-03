// Sistema de Audio Procedural con Web Audio API & Multi-Melodías Románticas
// 100% autónomo, funciona offline y en cualquier dispositivo/navegador.

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.masterGain = null;
    this.volume = 0.6;
    this.currentTrack = 'music-box'; // 'music-box' | 'lofi-piano' | 'waltz'
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
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Pop tierno
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
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  // Sonido de evasión de botón
  playDodge() {
    this.vibrate(40);
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

  // Chime de campana de amor
  playChime() {
    this.vibrate([20, 50, 20]);
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const frequencies = [523.25, 659.25, 783.99, 1046.50];
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

  // Fanfarria para el SÍ
  playFanfare() {
    this.vibrate([30, 80, 50, 100, 70]);
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [
        { f: 392.00, t: 0.0, d: 0.2 },
        { f: 523.25, t: 0.12, d: 0.2 },
        { f: 659.25, t: 0.24, d: 0.2 },
        { f: 783.99, t: 0.36, d: 0.3 },
        { f: 1046.50, t: 0.48, d: 0.7 },
        { f: 1318.51, t: 0.60, d: 1.0 }
      ];

      notes.forEach(n => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const now = this.ctx.currentTime + n.t;
        osc.frequency.setValueAtTime(n.f, now);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.d);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + n.d + 0.05);
      });
    } catch (e) {}
  }

  // Sonido de candado cerrándose
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

  // Sonido de acierto en juego
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

  // ==========================================
  // REPRODUCTOR DE MÚSICA ROMÁNTICA PROCEDURAL
  // ==========================================
  setTrack(trackId) {
    this.currentTrack = trackId;
    if (this.bgmPlaying) {
      this.stopBGM();
      this.startBGM();
    }
  }

  startBGM() {
    if (this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;

    // 1. Music Box (Piano suave / Caja de música)
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

    // 2. Lofi Romance (Cálido y relajante)
    const chordsLofi = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    // 3. Waltz (Vals 3/4)
    const chordsWaltz = [
      [261.63, 329.63, 392.00],
      [293.66, 349.23, 440.00],
      [329.63, 392.00, 493.88],
      [349.23, 440.00, 523.25]
    ];

    let chordIndex = 0;
    let step = 0;

    const playNote = (freq, duration, velocity = 0.08, type = 'sine') => {
      if (!this.ctx || !this.bgmPlaying || this.isMuted) return;
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
        osc.stop(now + duration + 0.1);
      } catch (e) {}
    };

    const tick = () => {
      if (!this.bgmPlaying) return;

      const chords = this.currentTrack === 'lofi-piano' 
        ? chordsLofi 
        : this.currentTrack === 'waltz' 
        ? chordsWaltz 
        : chordsMusicBox;

      const currentChord = chords[chordIndex % chords.length];
      const noteFreq = currentChord[step % currentChord.length];

      if (this.currentTrack === 'waltz') {
        if (step === 0) {
          playNote(currentChord[0] / 2, 1.8, 0.12, 'triangle'); // Beat 1
        } else {
          playNote(noteFreq, 1.0, 0.06, 'sine'); // Beat 2 & 3
        }
        step = (step + 1) % 3;
        if (step === 0) chordIndex = (chordIndex + 1) % chords.length;
        this.bgmTimer = setTimeout(tick, 450);
      } else {
        const octaveMultiplier = (step === 3 || step === 7) ? 2 : 1;
        playNote(noteFreq * octaveMultiplier, 1.4, 0.07, 'sine');

        if (step === 0) {
          playNote(currentChord[0] / 2, 2.2, 0.09, 'triangle');
        }

        step++;
        if (step >= 8) {
          step = 0;
          chordIndex = (chordIndex + 1) % chords.length;
        }
        this.bgmTimer = setTimeout(tick, 380);
      }
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
