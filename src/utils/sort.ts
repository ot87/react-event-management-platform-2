import type { Event } from "../types";
import { minPrice } from "./price";

export function getComparator(sort: string) {
  switch (sort) {
    case "dateAsc":
      return (a: Event, b: Event) => a.date.localeCompare(b.date);
    case "priceAsc":
      return (a: Event, b: Event) => minPrice(a) - minPrice(b);
    default:
      return () => 0;
  }
}
