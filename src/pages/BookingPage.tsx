import { useParams } from "react-router";

import { useEventQuery } from "../queries";
import { BookingFlow } from "../components/BookingFlow";

export function BookingPage() {
  const { eventId } = useParams();
  const { event } = useEventQuery(eventId!);

  return event ? <BookingFlow event={event} /> : null;
}
