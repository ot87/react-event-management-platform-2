import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { useFetchEvents, useFiltersReducer } from "../hooks";

import { EventFilters } from "../components/EventFilters";
import { EventList } from "../components/EventList";
import { LabeledSelect } from "../components/LabeledSelect";
import { SearchInput } from "../components/SearchInput";

import { matchesDate } from "../utils/date";
import { matchesPrice } from "../utils/price";
import { getComparator } from "../utils/sort";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "dateAsc", label: "Date" },
  { value: "priceAsc", label: "Price" },
];

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const handleOnCategoryChange = (value: string) => {
    setSearchParams(value === "All" ? {} : { category: value });
  };

  const { events, loading, error } = useFetchEvents(category);

  const [searchTerm, setSearchTerm] = useState("");
  const { filters, updateFilter } = useFiltersReducer();
  const [sort, setSort] = useState("");

  const filteredEvents = useMemo(() => {
    const result = events
      .filter(({ title }) =>
        title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter(({ date }) => matchesDate(date, filters.date))
      .filter((event) => matchesPrice(event, filters.price));

    return sort ? [...result].sort(getComparator(sort)) : result;
  }, [events, searchTerm, filters.date, filters.price, sort]);

  let content;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (filteredEvents.length === 0) {
    content = <p>No events found</p>;
  } else {
    content = <EventList events={filteredEvents} />;
  }

  return (
    <>
      <h1>EventsPage</h1>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <EventFilters
        category={category}
        filters={filters}
        onCategoryChange={handleOnCategoryChange}
        updateFilter={updateFilter}
      />
      <LabeledSelect
        label="Sort"
        options={SORT_OPTIONS}
        value={sort}
        onChange={setSort}
      />
      {content}
    </>
  );
}
