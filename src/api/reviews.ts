import type { Event, Review } from "../types";
import { fetchData } from "./client";

export async function getReviews(eventId: Event["id"]): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // json-server 1.0.0-beta coerces numeric-looking query values to numbers
  const reviews: Review[] = await fetchData("GET", "/reviews");
  return reviews.filter((review) => review.eventId === eventId);
}
