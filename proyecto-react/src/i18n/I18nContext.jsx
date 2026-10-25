/**
 * I18nContext.jsx — Proveedor React Context para Localización Dinámica
 * Permite cambio reactivo en tiempo real con cero recarga de página.
 * Frankosyni Sello & Virtudes Clásicas (Ἀγάπη · Φιλία · Τέχνη)
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TRANSLATIONS, GREEK_TRINITY } from './translations';
import { safeStorage } from '../utils/security';

const I18nContext = createContext(null);

export const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Español', label: 'Español (Nativo)', flag: '🇪🇸', greekBadge: 'Ἀγάπη' },
  { code: 'en', name: 'English', label: 'English (Global)', flag: '🇬🇧', greekBadge: 'Φιλία' },
  { code: 'el', name: 'Ἑλληνική', label: 'Ἑλληνική (Κλασική)', flag: '🏛️', greekBadge: 'Τέχνη' }
];

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = safeStorage.getItem('sv_language');
    if (saved && TRANSLATIONS[saved]) return saved;
    return 'es';
  });

  // Sincronizar atributo lang en el DOM HTML
  useEffect(() => {
    try {
      document.documentElement.setAttribute('lang', language);
    } catch (_) {}
  }, [language]);

  const setLanguage = useCallback((langCode) => {
    if (!TRANSLATIONS[langCode]) return;
    setLanguageState(langCode);
    safeStorage.setItem('sv_language', langCode);
  }, []);

  /**
   * Helper t(key, params, fallback)
   * Ejemplo: t('hero.title', { name: 'Luna' })
   */
  const t = useCallback((path, params = {}, fallback = '') => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.es;
    const parts = path.split('.');
    let current = langDict;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback a español si la clave no existe en el idioma activo
        let fbCurrent = TRANSLATIONS.es;
        for (const fbPart of parts) {
          if (fbCurrent && typeof fbCurrent === 'object' && fbPart in fbCurrent) {
            fbCurrent = fbCurrent[fbPart];
          } else {
            return fallback || path;
          }
        }
        current = fbCurrent;
        break;
      }
    }

    if (typeof current === 'string') {
      let res = current;
      if (params && typeof params === 'object') {
        Object.entries(params).forEach(([k, v]) => {
          res = res.replaceAll(`{${k}}`, String(v ?? ''));
        });
      }
      return res;
    }

    return current || fallback || path;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
    languages: SUPPORTED_LANGUAGES,
    currentMeta: TRANSLATIONS[language]?.meta || TRANSLATIONS.es.meta,
    greekTrinity: GREEK_TRINITY
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n debe ser utilizado dentro de un I18nProvider');
  }
  return context;
}
