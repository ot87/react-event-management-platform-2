interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = ["All", "Technology", "Music", "Sports", "Arts", "Business"];

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleOnChange}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
