import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      signup: 'Регистрация',
      name: 'Имя',
      city: 'Город проживания',
      language: 'Родной язык',
      foreign: 'Знание одного  иностранного языка',
      another_foreign: 'Знание второго иностранного языка',
    },
  },
  en: {
    translation: {
      signup: 'Sign up',
      name: 'First name',
      city: 'City of residence',
      language: 'Native language',
      foreign: 'Knowledge of one foreign language',
      another_foreign: 'Knowledge of a second foreign language',
    },
  },
  es: {
    translation: {
      signup: 'Inscribirse',
      name: 'Nombre de pila',
      city: 'Ciudad de residencia',
      language: 'Lengua materna',
      foreign: 'Conocimiento de una lengua extranjera',
      another_foreign: 'Conocimiento de una segunda lengua extranjera',
    },
  },
  de: {
    translation: {
      signup: 'Melden Sie sich an',
      name: 'Vorname',
      city: 'Wohnort',
      language: 'Muttersprache',
      foreign: 'Kenntnisse einer Fremdsprache',
      another_foreign: 'Kenntnisse einer zweiten Fremdsprache',
    },
  },
  fr: {
    translation: {
      signup: `S'inscrire`,
      name: 'Prénom',
      city: 'Ville de résidence',
      language: 'Langue maternelle',
      foreign: `Connaissance d'une langue étrangère`,
      another_foreign: `Connaissance d'une deuxième langue étrangère`,
    },
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      debug: true,
      detection: {
        order: ['queryString', 'cookie'],
        caches: ['cookie'],
      },
      interpolation: {
        escapeValue: false,
      },
    },
    (err, t) => {
      // callback function
    },
  );

export default i18n;
