interface LabeledSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function LabeledSelect({
  label,
  options,
  value,
  onChange,
}: LabeledSelectProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={`id${label}`}>{label}</label>
      <select id={`id${label}`} value={value} onChange={handleOnChange}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
