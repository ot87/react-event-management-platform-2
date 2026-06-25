import type { Event } from "../types";
import { fetchData } from "./client";

export async function getEvents(
  category?: Event["category"],
): Promise<Event[]> {
  return fetchData("GET", `/events${category ? `?category=${category}` : ""}`);
}

export async function getEvent(id: Event["id"]): Promise<Event> {
  return fetchData("GET", `/events/${id}`);
}

export async function createEvent(event: Omit<Event, "id">): Promise<Event> {
  return fetchData("POST", "/events", event);
}
