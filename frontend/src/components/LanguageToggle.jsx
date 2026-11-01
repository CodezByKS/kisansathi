import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  return (
    <button
      onClick={() => i18n.changeLanguage(isHindi ? "en" : "hi")}
      className="rounded-full border border-green-700 px-4 py-1 text-sm font-medium text-green-800 hover:bg-green-50"
    >
      {isHindi ? "English" : "हिंदी"}
    </button>
  );
}