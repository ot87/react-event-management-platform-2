import { Link } from "react-router";
import type { Event } from "../types";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-2xl font-bold">{event.title}</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {event.description}
      </p>

      <div className="mt-4 space-y-1 text-sm text-gray-500 dark:text-gray-400">
        <p>
          {event.date} at {event.time}
        </p>
        <p>
          {event.location} · {event.venue}
        </p>
        <p>Hosted by {event.organizerName}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Ticket Types</h3>
        <ul className="mt-2 space-y-2">
          {event.ticketTypes.map(({ id, name, price, available }) => (
            <li
              key={id}
              className="flex items-center justify-between rounded border border-gray-200 px-3 py-2 dark:border-gray-700"
            >
              <span className="font-medium">{name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {price === 0 ? "Free" : `$${price}`} · {available} available
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={`/book/${event.id}`}
        className="inline-block mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Book Tickets
      </Link>
    </div>
  );
}
