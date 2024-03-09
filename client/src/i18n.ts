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
      foreign: '1 иностранный язык',
      another_foreign: '2 иностранный язык',
      cities: 'Все города',
      date: 'Дата',
      birthday: 'День рождения',
      email: 'Ваш email',
    },
  },
  en: {
    translation: {
      signup: 'Sign up',
      name: 'First name',
      city: 'City of residence',
      language: 'Native language',
      foreign: '1 foreign language',
      another_foreign: '2 foreign language',
      cities: 'All cities',
      date: 'Date',
      birthday: 'Date of birthday',
      email: 'Your email',
    },
  },
  es: {
    translation: {
      signup: 'Inscribirse',
      name: 'Nombre de pila',
      city: 'Ciudad de residencia',
      language: 'Lengua materna',
      foreign: '1 idioma extranjero',
      another_foreign: '2 idioma extranjero',
      cities: 'Todas las ciudades',
      date: 'Fecha',
      birthday: 'Fecha de cumpleaños',
      email: 'Tu correo electrónico',
    },
  },
  de: {
    translation: {
      signup: 'Melden Sie sich an',
      name: 'Vorname',
      city: 'Wohnort',
      language: 'Muttersprache',
      foreign: '1 Fremdsprache',
      another_foreign: '2 Fremdsprachen',
      cities: 'Alle Städte',
      date: 'Datum',
      birthday: 'Geburtstag',
      email: 'deine E-Mail',
    },
  },
  fr: {
    translation: {
      signup: `S'inscrire`,
      name: 'Prénom',
      city: 'Ville de résidence',
      language: 'Langue maternelle',
      foreign: `1 langue étrangère`,
      another_foreign: `2 langues étrangères`,
      cities: 'Toutes les villes',
      date: 'Date',
      birthday: `Date d'anniversaire`,
      email: 'Votre email',
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
