import { useNavigate } from "react-router";

import type { Event } from "../types";
import { useBookingReducer } from "../hooks/useBookingReducer";

import { SelectTicketStep } from "./SelectTicketStep";
import { AttendeeDetailStep } from "./AttendeeDetailStep";

import { generateReferenceNumber } from "../utils/booking";
import { toISO } from "../utils/date";
import { useUser } from "../hooks";
import { useCreateBookingMutation } from "../queries";
import { startTransition, useOptimistic } from "react";

interface BookingFlowProps {
  event: Event;
}

const primaryButton =
  "rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50";
const secondaryButton =
  "rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700";

export function BookingFlow({ event }: BookingFlowProps) {
  const { userId } = useUser();
  const { booking, next, back, selectTicket, setQuantity, setAttendees } =
    useBookingReducer(event.ticketTypes[0].id);

  const { mutateAsync, data, isError, isPending } =
    useCreateBookingMutation(userId);
  const navigate = useNavigate();
  const [optimisticRef, addOptimistic] = useOptimistic(
    data?.referenceNumber ?? null,
    (_, ref) => ref as string,
  );

  const selectedTicket =
    event.ticketTypes.find((ticket) => ticket.id === booking.ticketTypeId) ??
    event.ticketTypes[0];
  const total = selectedTicket.price * booking.quantity;

  const handleConfirm = () => {
    startTransition(async () => {
      const reference = generateReferenceNumber();
      addOptimistic(reference);

      try {
        await mutateAsync({
          userId,
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.date,
          tickets: [
            {
              type: selectedTicket.name,
              quantity: booking.quantity,
              price: selectedTicket.price,
            },
          ],
          attendees: booking.attendees,
          totalAmount: total,
          status: "confirmed",
          bookingDate: toISO(new Date()),
          referenceNumber: reference,
        });
      } catch {
        /* error surfaced via isError */
      }
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Step {booking.step} of 3
      </p>

      {booking.step === 1 && (
        <SelectTicketStep
          ticketTypes={event.ticketTypes}
          ticketTypeId={booking.ticketTypeId}
          selectedTicket={selectedTicket}
          quantity={booking.quantity}
          total={total}
          selectTicket={selectTicket}
          setQuantity={setQuantity}
        />
      )}

      {booking.step === 2 && (
        <AttendeeDetailStep
          attendees={booking.attendees}
          onValid={(attendees) => {
            setAttendees(attendees);
            next();
          }}
        />
      )}

      {booking.step === 3 &&
        (optimisticRef ? (
          <div className="space-y-3 text-center">
            <h3 className="text-lg font-semibold">Booking Confirmed!</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your booking reference is{" "}
              <span className="font-mono font-semibold">{optimisticRef}</span>
            </p>
            <button
              type="button"
              onClick={() => navigate("/my-bookings")}
              className={primaryButton}
            >
              View My Bookings
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Step 3: Confirmation</h3>
            <div className="space-y-1 rounded border border-gray-200 p-3 dark:border-gray-700">
              <h4 className="font-semibold">{event.title}</h4>
              <p className="text-sm">
                {selectedTicket.name} - ${selectedTicket.price}
              </p>
              <p className="text-sm">Quantity: {booking.quantity}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {booking.attendees.map(({ name }) => name).join(", ")}
              </p>
              <p className="font-semibold">Total: ${total}</p>
            </div>
            {isError && (
              <p
                role="alert"
                className="text-sm text-red-600 dark:text-red-400"
              >
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isPending}
              className={primaryButton}
            >
              {isPending ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        ))}

      {!optimisticRef && (
        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={back}
            disabled={booking.step === 1}
            className={secondaryButton}
          >
            Back
          </button>
          {booking.step === 1 && (
            <button type="button" onClick={next} className={primaryButton}>
              Next
            </button>
          )}
          {booking.step === 2 && (
            <button
              type="submit"
              form="attendee-form"
              className={primaryButton}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
