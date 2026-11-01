import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import hi from "./hi.json";

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, hi: { translation: hi } },
  lng: localStorage.getItem("lang") || "hi", // Hindi by default
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lang) => localStorage.setItem("lang", lang));

export default i18n;