import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        description: "This is an example of language switching.",
      },
    },
    fr: {
      translation: {
        welcome: "Bienvenue",
        description: "Ceci est un exemple de changement de langue.",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
