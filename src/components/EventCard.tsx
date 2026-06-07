import { Link } from "react-router";

import type { Event } from "../types";
import { minPrice } from "../utils/price";

type EventCardProps = {
  event: Event;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function EventCard({
  event,
  isFavorite,
  onToggleFavorite,
}: EventCardProps) {
  const priceFrom = minPrice(event);

  return (
    <div className="relative">
      <button
        onClick={onToggleFavorite}
        className="absolute top-2 right-2"
        aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
      <Link
        to={`/events/${event.id}`}
        className="block rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
      >
        <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {event.category}
        </span>
        <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {event.date} · {event.location}
        </p>
        <p className="mt-2 text-sm font-medium">
          {priceFrom === 0 ? "Free" : `Starts from $${priceFrom}`}
        </p>
      </Link>
    </div>
  );
}
