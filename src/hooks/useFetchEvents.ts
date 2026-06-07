import { getEvents } from "../api";
import { useFetch } from "./useFetch";

export function useFetchEvents(category?: string) {
  const { data, loading, error } = useFetch(
    () => getEvents(category),
    [category],
  );

  return { events: data ?? [], loading, error };
}
