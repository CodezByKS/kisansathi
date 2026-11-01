export default function NumberStepper({ label, value, onChange, unit, min = 0.5, max = 100, step = 0.5 }) {
  const clamp = (n) => Math.min(max, Math.max(min, Math.round(n * 10) / 10));

  const buttonClass =
    "h-12 w-12 rounded-full border-2 border-green-600 text-2xl font-bold text-green-700 transition hover:bg-green-50 active:scale-95";

  return (
    <div>
      <p className="mb-3 text-base font-semibold text-gray-800">{label}</p>
      <div className="flex items-center gap-3">
        <button type="button" className={buttonClass} aria-label="-" onClick={() => onChange(clamp(value - step))}>
          −
        </button>
        <div className="min-w-28 rounded-xl border-2 border-gray-200 bg-white px-4 py-2 text-center text-xl font-bold">
          {value}
          <span className="ml-1 text-sm font-medium text-gray-500">{unit}</span>
        </div>
        <button type="button" className={buttonClass} aria-label="+" onClick={() => onChange(clamp(value + step))}>
          +
        </button>
      </div>
    </div>
  );
}