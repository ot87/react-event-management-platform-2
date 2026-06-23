import { useParams } from "react-router";

import { AsyncBoundary } from "../components/AsyncBoundary";
import { EventDetails } from "../components/EventDetails";
import { useEventQuery } from "../queries";

export function EventDetailPage() {
  const { id } = useParams();
  const { event, isPending, error } = useEventQuery(id!);

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Event Details</h1>
      <AsyncBoundary
        loading={isPending}
        error={error?.message ?? null}
        isEmpty={!event}
        emptyMessage="Event is not available"
      >
        {event && <EventDetails event={event} />}
      </AsyncBoundary>
    </>
  );
}
