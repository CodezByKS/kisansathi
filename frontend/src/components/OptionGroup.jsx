import OptionCard from "./OptionCard";

export default function OptionGroup({ label, options, value, onChange, error, columns }) {
  return (
    <fieldset>
      <legend className="mb-3 text-base font-semibold text-gray-800">{label}</legend>
      <div className={`grid gap-3 ${columns}`}>
        {options.map((option) => (
          <OptionCard
            key={option.value}
            icon={option.icon}
            swatch={option.swatch}
            label={option.label}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
      {error && (
        <p data-error className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </fieldset>
  );
}