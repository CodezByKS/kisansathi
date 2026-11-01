import VoiceButton from "./VoiceButton";
import { parseVoice } from "../utils/parseVoice";  
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { STATES } from "../data/states";
import OptionGroup from "./OptionGroup";
import NumberStepper from "./NumberStepper";

const SOILS = [
  { value: "alluvial", swatch: "#b08d6a" },
  { value: "black", swatch: "#2d2a28" },
  { value: "red", swatch: "#b4503a" },
  { value: "laterite", swatch: "#c4693f" },
  { value: "sandy", swatch: "#e3cc9a" },
  { value: "clay", swatch: "#9c7a5b" },
  { value: "loamy", swatch: "#6e5238" },
];
const SEASONS = [
  { value: "kharif", icon: "🌧️" },
  { value: "rabi", icon: "❄️" },
  { value: "zaid", icon: "☀️" },
];
const WATER = [
  { value: "rainfed", icon: "☁️" },
  { value: "canal", icon: "🌊" },
  { value: "borewell", icon: "💧" },
  { value: "pond", icon: "🏞️" },
];

const EMPTY = { state: "", district: "", soil_type: "", season: "", water_source: "", land_acres: 2 };
const REQUIRED = ["state", "district", "soil_type", "season", "water_source"];

const fieldClass = (hasError) =>
  `h-12 w-full rounded-xl border-2 bg-white px-4 text-base outline-none focus:border-green-600 ${
    hasError ? "border-red-400" : "border-gray-200"
  }`;

const card = "space-y-4 rounded-2xl bg-white p-4 shadow-sm";

export default function CropForm({ onSubmit, loading }) {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const found = {};
    REQUIRED.forEach((key) => {
      if (!String(form[key]).trim()) found[key] = t("form.errors.required");
    });
    setErrors(found);
    return Object.keys(found).length === 0;
  }
    function applyVoice(text) {
    const found = parseVoice(text);
    const keys = Object.keys(found);
    if (keys.length === 0) return 0;
    setForm((f) => ({ ...f, ...found }));
    setErrors((e) => {
      const next = { ...e };
      keys.forEach((k) => delete next[k]);
      return next;
    });
    return keys.length;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) {
      requestAnimationFrame(() =>
        document.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
      return;
    }
    onSubmit({ ...form, district: form.district.trim(), language: i18n.language });
  }

  const label = (prefix) => (o) => ({ ...o, label: t(`${prefix}.${o.value}`) });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className={card}>
        <div>
          <label htmlFor="state" className="mb-2 block text-base font-semibold text-gray-800">
            {t("form.state")}
          </label>
          <select
            id="state"
            value={form.state}
            onChange={(e) => set("state", e.target.value)}
            className={fieldClass(errors.state)}
          >
            <option value="">{t("form.choose")}</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.state && (
            <p data-error className="mt-2 text-sm text-red-600">
              {errors.state}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="district" className="mb-2 block text-base font-semibold text-gray-800">
            {t("form.district")}
          </label>
          <input
            id="district"
            type="text"
            value={form.district}
            placeholder={t("form.districtPlaceholder")}
            onChange={(e) => set("district", e.target.value)}
            className={fieldClass(errors.district)}
          />
          {errors.district && (
            <p data-error className="mt-2 text-sm text-red-600">
              {errors.district}
            </p>
          )}
        </div>
      </div>

      <div className={card}>
        <OptionGroup
          label={t("form.soilType")}
          options={SOILS.map(label("soil"))}
          value={form.soil_type}
          onChange={(v) => set("soil_type", v)}
          error={errors.soil_type}
          columns="grid-cols-3 sm:grid-cols-4"
        />
      </div>

      <div className={card}>
        <OptionGroup
          label={t("form.season")}
          options={SEASONS.map(label("season"))}
          value={form.season}
          onChange={(v) => set("season", v)}
          error={errors.season}
          columns="grid-cols-3"
        />
        <OptionGroup
          label={t("form.waterSource")}
          options={WATER.map(label("water"))}
          value={form.water_source}
          onChange={(v) => set("water_source", v)}
          error={errors.water_source}
          columns="grid-cols-2 sm:grid-cols-4"
        />
      </div>

      <div className={card}>
        <NumberStepper
          label={t("form.landAcres")}
          value={form.land_acres}
          onChange={(v) => set("land_acres", v)}
        />
      </div>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <VoiceButton onResult={applyVoice} />

      <div className={card}></div>

      <div className="sticky bottom-0 -mx-4 border-t border-gray-200 bg-white/90 p-4 backdrop-blur-sm">
        <button
          type="submit"
          disabled={loading}
          className="h-14 w-full rounded-2xl bg-green-700 text-lg font-bold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? t("form.loading") : t("form.submit")}
        </button>
      </div>
    </form>
  );
}