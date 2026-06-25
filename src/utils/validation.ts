import type { CreateEventState } from "../store/create-event.slice";
import type { Attendee } from "../types";

export interface AttendeeErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 7;
}

export function validateAttendee(attendee: Attendee): AttendeeErrors {
  const errors: AttendeeErrors = {};

  if (!attendee.name.trim()) {
    errors.name = "Name is required";
  }
  if (!isValidEmail(attendee.email)) {
    errors.email = "Enter a valid email";
  }
  if (!isValidPhone(attendee.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  return errors;
}

export function isStepValid(
  step: CreateEventState["step"],
  draft: CreateEventState["draft"],
): boolean {
  if (step === 1) {
    return draft.title.trim() !== "" && draft.category !== "";
  }
  if (step === 2) {
    return (
      draft.date !== "" &&
      draft.time !== "" &&
      draft.location.trim() !== "" &&
      draft.ticketTypes.length > 0 &&
      draft.ticketTypes.every(
        (t) => t.name.trim() !== "" && t.price >= 0 && t.available > 0,
      )
    );
  }

  return true;
}
