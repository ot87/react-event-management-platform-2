import { Suspense } from "react";
import { Await, useLoaderData, useParams } from "react-router";

import { AsyncBoundary } from "../components/AsyncBoundary";
import { EventDetails } from "../components/EventDetails";
import { ReviewList } from "../components/ReviewList";
import { Loader } from "../components/Loader";

import { useEventQuery } from "../queries";
import type { Review } from "../types";

export function EventDetailPage() {
  const { id } = useParams();
  const { event, isPending, error } = useEventQuery(id!);
  const { reviews } = useLoaderData() as { reviews: Promise<Review[]> };

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
        <Suspense fallback={<Loader />}>
          <Await resolve={reviews}>
            {(resolved) => <ReviewList reviews={resolved} />}
          </Await>
        </Suspense>
      </AsyncBoundary>
    </>
  );
}
