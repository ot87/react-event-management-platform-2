import { getEvents } from "../api";

export function eventsQuery() {
  return {
    queryKey: ["events"],
    queryFn: () => getEvents(),
    staleTime: 1000 * 60 * 5,
  };
}
