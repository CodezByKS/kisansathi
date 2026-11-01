import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-10 border-b border-green-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-xl"
            aria-hidden="true"
          >
            🌾
          </span>
          <div className="leading-tight">
            <h1 className="text-lg font-bold text-green-800">{t("app.name")}</h1>
            <p className="text-xs text-gray-500">{t("app.tagline")}</p>
          </div>
        </div>
        <LanguageToggle />
      </div>
    </header>
  );
}