import { useState } from "react";
import { useNavigate } from "react-router";

import type { Event } from "../types";
import { createBooking } from "../api";
import { useBookingReducer } from "../hooks/useBookingReducer";

import { SelectTicketStep } from "./SelectTicketStep";
import { AttendeeDetailStep } from "./AttendeeDetailStep";
import { Toast } from "./Toast";

import { areAttendeesValid } from "../utils/validation";
import { generateReferenceNumber } from "../utils/booking";
import { toISO } from "../utils/date";
import { useUser } from "../hooks";

interface BookingFlowProps {
  event: Event;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const primaryButton =
  "rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50";
const secondaryButton =
  "rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700";

export function BookingFlow({ event }: BookingFlowProps) {
  const { userId } = useUser();
  const { booking, next, back, selectTicket, setQuantity, updateAttendee } =
    useBookingReducer(event.ticketTypes[0].id);

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const selectedTicket =
    event.ticketTypes.find((ticket) => ticket.id === booking.ticketTypeId) ??
    event.ticketTypes[0];
  const total = selectedTicket.price * booking.quantity;

  const isNextStepDisabled =
    booking.step === 2 && !areAttendeesValid(booking.attendees);

  const handleConfirm = async () => {
    setStatus("submitting");
    const reference = generateReferenceNumber();

    try {
      await createBooking({
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

      setReferenceNumber(reference);
      setStatus("success");
      setShowToast(true);
    } catch {
      setStatus("error");
    }
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
          updateAttendee={updateAttendee}
        />
      )}

      {booking.step === 3 &&
        (status === "success" ? (
          <div className="space-y-3 text-center">
            <h3 className="text-lg font-semibold">Booking Confirmed!</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your booking reference is{" "}
              <span className="font-mono font-semibold">{referenceNumber}</span>
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
            {status === "error" && (
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
              disabled={status === "submitting"}
              className={primaryButton}
            >
              {status === "submitting" ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        ))}

      {status !== "success" && (
        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={back}
            disabled={booking.step === 1}
            className={secondaryButton}
          >
            Back
          </button>
          {booking.step !== 3 ? (
            <button
              type="button"
              onClick={next}
              disabled={isNextStepDisabled}
              className={primaryButton}
            >
              Next
            </button>
          ) : null}
        </div>
      )}

      {showToast && (
        <Toast
          message={`Booking confirmed: ${referenceNumber}`}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
