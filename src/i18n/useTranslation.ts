import { useCallback } from 'react';
import { useUserStore } from '../stores';
import { en, TranslationKey } from './translations/en';
import { ja } from './translations/ja';

const translations: Record<string, Record<string, string>> = { en, ja };

export function useTranslation() {
  const language = useUserStore((s) => s.profile.language);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      let text = translations[language]?.[key] ?? en[key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [language]
  );

  return { t, language };
}
