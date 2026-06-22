import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { useFavorites, useFiltersReducer } from "../hooks";

import { EventFilters } from "../components/EventFilters";
import { EventList } from "../components/EventList";
import { LabeledSelect } from "../components/LabeledSelect";
import { SearchInput } from "../components/SearchInput";
import { AsyncBoundary } from "../components/AsyncBoundary";

import { matchesDate } from "../utils/date";
import { matchesPrice } from "../utils/price";
import { getComparator } from "../utils/sort";

import { useEventsQuery } from "../queries";

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

  const { events, isPending, error } = useEventsQuery( );

  const [searchTerm, setSearchTerm] = useState("");
  const { filters, updateFilter } = useFiltersReducer();
  const [sort, setSort] = useState("");

  const filteredEvents = useMemo(() => {
    const result = events
      .filter(({ title }) =>
        title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter(({ date }) => matchesDate(date, filters.date))
      .filter((event) => matchesPrice(event, filters.price))
      .filter((event) => !category || event.category === category);

    return sort ? [...result].sort(getComparator(sort)) : result;
  }, [events, searchTerm, filters.date, filters.price, sort, category]);

  const { favorites, toggleFavorite } = useFavorites();

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Events</h1>

      <div className="mb-6 flex flex-wrap items-end gap-3">
        <div className="min-w-50 flex-1">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </div>
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
      </div>

      <AsyncBoundary
        loading={isPending}
        error={error?.message ?? null}
        isEmpty={filteredEvents.length === 0}
        emptyMessage="No events found"
      >
        <EventList
          events={filteredEvents}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </AsyncBoundary>
    </>
  );
}
