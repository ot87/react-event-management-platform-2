import { getEvents, getUser } from "../api";
import type { User } from "../types";

export function eventsQuery() {
  return {
    queryKey: ["events"],
    queryFn: () => getEvents(),
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
