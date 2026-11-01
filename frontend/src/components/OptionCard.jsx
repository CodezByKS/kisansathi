export default function OptionCard({ selected, onClick, icon, swatch, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 text-center transition ${
        selected
          ? "border-green-600 bg-green-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-green-300"
      }`}
    >
      {swatch ? (
        <span
          className="h-9 w-9 rounded-full border border-black/10"
          style={{ backgroundColor: swatch }}
        />
      ) : (
        <span className="text-3xl" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="text-sm font-medium text-gray-800">{label}</span>
      {selected && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
          ✓
        </span>
      )}
    </button>
  );
}