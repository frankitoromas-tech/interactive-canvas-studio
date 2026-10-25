/**
 * haptics.js — Módulo Universal de Respuesta Háptica Táctil
 * 
 * Diseñado con estrategia defensiva para navegadores móviles modernos y WebView.
 * Verifica disponibilidad de la API ('vibrate' in navigator) y captura excepciones
 * para garantizar compatibilidad con iOS Safari, Chrome Android y entornos restringidos.
 */

export const HAPTIC_PATTERNS = Object.freeze({
  LIGHT: [10],           // Toques de botón, switch y tabs
  MEDIUM: [25],          // Aperturas de sobres y giros de ruleta
  SUCCESS: [15, 50, 20], // Resolución de juegos, match o aceptación de cartas
  ERROR: [50, 100, 50],  // Intentos erróneos, evasión o fallos
});

class HapticFeedbackManager {
  constructor() {
    this._enabled = true;
    this._hasUserGesture = false;

    // Detectar si el usuario prefiere movimiento/efectos reducidos
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
          this._enabled = false;
        }
        motionQuery.addEventListener?.('change', (e) => {
          if (e.matches) this._enabled = false;
        });
      } catch (_) {}
    }
  }

  /**
   * Comprueba si la API de vibración está disponible en el entorno actual.
   * @returns {boolean}
   */
  isSupported() {
    return (
      typeof window !== 'undefined' &&
      typeof navigator !== 'undefined' &&
      'vibrate' in navigator &&
      typeof navigator.vibrate === 'function'
    );
  }

  /**
   * Retorna si la respuesta háptica está habilitada.
   * @returns {boolean}
   */
  isEnabled() {
    return this._enabled && this.isSupported();
  }

  /**
   * Habilita o deshabilita la respuesta háptica globalmente.
   * @param {boolean} flag
   */
  setEnabled(flag) {
    this._enabled = Boolean(flag);
    if (!this._enabled) {
      this.cancel();
    }
  }

  /**
   * Ejecuta un patrón de vibración de forma defensiva.
   * @param {number|number[]} pattern
   * @returns {boolean} true si se envió con éxito
   */
  vibrate(pattern) {
    if (!this.isEnabled()) return false;

    try {
      return navigator.vibrate(pattern);
    } catch (err) {
      // Absorber excepciones de seguridad, políticas de iframe o navegadores no compatibles
      return false;
    }
  }

  /**
   * Cancela cualquier vibración activa en curso.
   */
  cancel() {
    if (!this.isSupported()) return;
    try {
      navigator.vibrate(0);
    } catch (_) {}
  }

  /**
   * Háptico Suave ([10] ms): toques de botón, tabs y micro-interacciones.
   */
  light() {
    return this.vibrate(HAPTIC_PATTERNS.LIGHT);
  }

  /**
   * Háptico Medio ([25] ms): aperturas de sobres, giros de ruleta y activación de cerrojos.
   */
  medium() {
    return this.vibrate(HAPTIC_PATTERNS.MEDIUM);
  }

  /**
   * Háptico de Éxito ([15, 50, 20] ms): resolución de juegos, match o aceptación de cartas.
   */
  success() {
    return this.vibrate(HAPTIC_PATTERNS.SUCCESS);
  }

  /**
   * Háptico de Error ([50, 100, 50] ms): intentos erróneos, evasión o selecciones equivocadas.
   */
  error() {
    return this.vibrate(HAPTIC_PATTERNS.ERROR);
  }
}

// Singleton universal
export const haptic = new HapticFeedbackManager();
export default haptic;
