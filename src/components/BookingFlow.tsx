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

interface BookingFlowProps {
  event: Event;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function BookingFlow({ event }: BookingFlowProps) {
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
        userId: "user1",
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
    <div>
      <p>Step {booking.step} of 3</p>

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
          <div>
            <h3>Booking Confirmed!</h3>
            <p>Your booking reference is {referenceNumber}</p>
            <button onClick={() => navigate("/bookings")}>
              View My Bookings
            </button>
          </div>
        ) : (
          <div>
            <h3>Step 3: Confirmation</h3>
            <div>
              <h4>{event.title}</h4>
              <p>
                Ticket: {selectedTicket.name} for ${selectedTicket.price}
              </p>
              <p>Quantity: {booking.quantity}</p>
              <p>{booking.attendees.map(({ name }) => name).join(", ")}</p>
              <p>Total: ${total}</p>
            </div>
            {status === "error" && (
              <p role="alert">Something went wrong. Please try again.</p>
            )}
            <button onClick={handleConfirm} disabled={status === "submitting"}>
              {status === "submitting" ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        ))}

      {status !== "success" && (
        <div>
          <button onClick={back} disabled={booking.step === 1}>
            Back
          </button>
          {booking.step !== 3 ? (
            <button onClick={next} disabled={isNextStepDisabled}>
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
