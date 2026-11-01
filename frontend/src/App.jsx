import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import CropForm from "./components/CropForm";
import { getRecommendation } from "./api/client";

export default function App() {
  const { t } = useTranslation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(payload) {
    setLoading(true);
    setError("");
    try {
      setResult(await getRecommendation(payload));
    } catch {
      setError(t("form.errors.network"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-xl px-4 pt-6">
        {result ? (
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-bold">{t("results.title")}</h2>
            {result.recommendations.map((rec) => (
              <p key={rec.crop} className="py-1">
                {rec.crop}: {t("results.confidence")} {Math.round(rec.confidence * 100)}%
              </p>
            ))}
            <button onClick={() => setResult(null)} className="mt-4 font-medium text-green-700 underline">
              {t("results.back")}
            </button>
          </section>
        ) : (
          <>
            <h2 className="mb-4 text-xl font-bold text-gray-800">{t("form.title")}</h2>
            {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <CropForm onSubmit={handleSubmit} loading={loading} />
          </>
        )}
      </main>
    </div>
  );
}