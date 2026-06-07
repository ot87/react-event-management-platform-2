import { LabeledSelect } from "./LabeledSelect";
import type { FiltersState, FilterType } from "../reducers/filters.reducer";

const CATEGORY_OPTIONS = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Technology",
    label: "Technology",
  },
  {
    value: "Music",
    label: "Music",
  },
  {
    value: "Sports",
    label: "Sports",
  },
  {
    value: "Arts",
    label: "Arts",
  },
  {
    value: "Business",
    label: "Business",
  },
];
const DATE_OPTIONS = [
  { value: "", label: "Any" },
  { value: "upcoming", label: "Upcoming" },
  { value: "thisWeek", label: "This Week" },
  { value: "thisMonth", label: "This Month" },
];
const PRICE_OPTIONS = [
  { value: "", label: "Any" },
  { value: "free", label: "Free" },
  { value: "under50", label: "Under $50" },
  { value: "over50", label: "$50+" },
];

interface EventFiltersProps {
  category?: string;
  filters: FiltersState;
  onCategoryChange: (value: string) => void;
  updateFilter: (field: FilterType, value: string) => void;
}

export function EventFilters({
  category,
  filters,
  onCategoryChange,
  updateFilter,
}: EventFiltersProps) {
  const handleOnDateChange = (value: string) => {
    updateFilter("date", value);
  };
  const handleOnPriceChange = (value: string) => {
    updateFilter("price", value);
  };

  return (
    <div>
      <LabeledSelect
        label="Category"
        options={CATEGORY_OPTIONS}
        value={category ?? "All"}
        onChange={onCategoryChange}
      />
      <LabeledSelect
        label="Date"
        options={DATE_OPTIONS}
        value={filters.date}
        onChange={handleOnDateChange}
      />
      <LabeledSelect
        label="Price"
        options={PRICE_OPTIONS}
        value={filters.price}
        onChange={handleOnPriceChange}
      />
    </div>
  );
}
