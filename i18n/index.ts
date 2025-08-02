import i18next, { LanguageDetectorAsyncModule, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import vi from './vi.json';

// Detect ngôn ngữ dựa trên thiết bị
const languageDetector: LanguageDetectorAsyncModule = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        const locale = Localization.getLocales()[0]?.languageCode || 'en'; // 'vi', 'en', etc.
        callback(locale);
    },
    init: () => { },
    cacheUserLanguage: () => { },
};

const resources: Resource = {
    en: { translation: en },
    vi: { translation: vi },
};

i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        // debug: __DEV__, // bật debug khi dev
        resources,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
