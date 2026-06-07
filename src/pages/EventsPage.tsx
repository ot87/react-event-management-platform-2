import { useState } from "react";
import { useSearchParams } from "react-router";

import { useFetchEvents } from "../hooks";
import { EventList } from "../components/EventList";
import { SearchInput } from "../components/SearchInput";
import { CategoryFilter } from "../components/CategoryFilter";

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const handleOnCategoryChange = (value: string) => {
    setSearchParams(value === "All" ? {} : { category: value });
  };

  const { events, loading, error } = useFetchEvents(category);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredEvents = events.filter(({ title }) =>
    title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
      <CategoryFilter
        value={category ?? "All"}
        onChange={handleOnCategoryChange}
      />
      {content}
    </>
  );
}
