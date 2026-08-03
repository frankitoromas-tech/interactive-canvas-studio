// Módulo de Seguridad Estricta y Sanitización (XSS, Input Validation, Safe Storage)

/**
 * Sanitiza entradas de texto para prevenir ataques XSS e inyecciones en el DOM.
 * @param {string} input - Cadena a sanitizar
 * @param {number} maxLength - Longitud máxima permitida
 * @param {string} fallback - Valor de respaldo en caso de entrada inválida
 * @returns {string} Cadena sanitizada y segura
 */
export function sanitizeInput(input, maxLength = 50, fallback = '') {
  if (typeof input !== 'string') {
    return fallback;
  }

  // 1. Limitar longitud estricta
  let clean = input.slice(0, maxLength);

  // 2. Escapar caracteres HTML peligrosos
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  clean = clean.replace(/[&<>"'`=\/]/g, (char) => escapeMap[char] || char);

  // 3. Eliminar caracteres de control y secuencias sospechosas
  clean = clean.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

  return clean.trim() || fallback;
}

/**
 * Valida de forma estricta un archivo de imagen antes de procesarlo.
 * Previene la carga de ejecutables, scripts o archivos con tamaño malicioso.
 * @param {File} file - Archivo subido
 * @param {number} maxSizeBytes - Tamaño máximo permitido (por defecto 5MB)
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageFile(file, maxSizeBytes = 5 * 1024 * 1024) {
  if (!file) {
    return { valid: false, error: 'No se ha seleccionado ningún archivo.' };
  }

  // Validar tamaño máximo
  if (file.size > maxSizeBytes) {
    return { valid: false, error: 'El archivo excede el tamaño máximo permitido (5MB).' };
  }

  // Validar tipos MIME seguros permitidos
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedMimeTypes.includes(file.type.toLowerCase())) {
    return { valid: false, error: 'Formato de imagen no permitido. Solo JPG, PNG, WebP o GIF.' };
  }

  // Validar extensiones de archivo seguras
  const fileName = file.name.toLowerCase();
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const hasValidExt = validExtensions.some(ext => fileName.endsWith(ext));
  if (!hasValidExt) {
    return { valid: false, error: 'Extensión de archivo no válida.' };
  }

  return { valid: true };
}

/**
 * Almacenamiento seguro en LocalStorage con protección contra Prototype Pollution.
 */
export const SafeStorage = {
  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      const parsed = JSON.parse(item);
      // Prevenir Prototype Pollution
      if (parsed && typeof parsed === 'object') {
        delete parsed.__proto__;
        delete parsed.constructor;
        delete parsed.prototype;
      }
      return parsed;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      // Limitar tamaño de almacenamiento
      const serialized = JSON.stringify(value);
      if (serialized.length > 500000) { // Max 500KB por clave
        console.warn('Payload demasiado grande para almacenamiento seguro.');
        return false;
      }
      localStorage.setItem(key, serialized);
      return true;
    } catch (e) {
      console.error('Error en SafeStorage.set:', e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {}
  }
};
