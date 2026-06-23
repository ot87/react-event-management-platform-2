import { getEvent, getEvents, getUser } from "../api";
import type { Event, User } from "../types";

export function eventsQuery() {
  return {
    queryKey: ["events"],
    queryFn: () => getEvents(),
    staleTime: 1000 * 60 * 5,
  };
}

export function eventQuery(id: Event["id"]) {
  return {
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    staleTime: 1000 * 60 * 5,
  };
}

export function userQuery(id: User["id"]) {
  return {
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    staleTime: 1000 * 60 * 5,
  };
}
