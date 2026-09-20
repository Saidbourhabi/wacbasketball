import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = ['en','fr','ar',];

export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language?.substring(0, 2) || 'en';

  const changeLanguage = useCallback(
    (langCode) => {
      if (SUPPORTED_LANGUAGES.includes(langCode)) {
        i18n.changeLanguage(langCode);
      }
    },
    [i18n]
  );

  return { currentLanguage, changeLanguage, supportedLanguages: SUPPORTED_LANGUAGES };
}