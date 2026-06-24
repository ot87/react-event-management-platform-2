import { useActionState, useId } from "react";
import { validateAttendee, type AttendeeErrors } from "../utils/validation";
import type { Attendee } from "../types";

type ActionState = { errors: AttendeeErrors[] };

interface AttendeeDetailStepProps {
  attendees: Attendee[];
  onValid: (attendees: Attendee[]) => void;
}

const inputClass =
  "mt-1 block w-full rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800";
const errorClass = "text-sm text-red-600 dark:text-red-400";

export function AttendeeDetailStep({
  attendees,
  onValid,
}: AttendeeDetailStepProps) {
  const formId = useId();

  const action = (_prev: ActionState, formData: FormData) => {
    const parsed: Attendee[] = attendees.map((_, index) => ({
      name: String(formData.get(`name${index}`) ?? ""),
      email: String(formData.get(`email${index}`) ?? ""),
      phone: String(formData.get(`phone${index}`) ?? ""),
    }));

    const errors = parsed.map((attendee) => validateAttendee(attendee));

    if (errors.some((e) => Object.keys(e).length > 0)) {
      return { errors };
    }

    onValid(parsed);

    return { errors: [] };
  };
  const [state, formAction] = useActionState(action, { errors: [] });

  return (
    <div>
      <h3 className="text-lg font-semibold">Step 2: Attendee Details</h3>

      <form id="attendee-form" action={formAction} className="mt-3 space-y-4">
        {attendees.map((attendee, index) => {
          const errors = state.errors[index] ?? {};

          return (
            <div
              key={index}
              className="space-y-2 rounded border border-gray-200 p-3 dark:border-gray-700"
            >
              <p className="font-medium">Attendee {index + 1}</p>

              <label
                htmlFor={`${formId}-name-${index}`}
                className="block text-sm"
              >
                Name
              </label>
              <input
                id={`${formId}-name-${index}`}
                name={`name${index}`}
                defaultValue={attendee.name}
                className={inputClass}
              />
              {errors.name && (
                <span role="alert" className={errorClass}>
                  {errors.name}
                </span>
              )}

              <label
                htmlFor={`${formId}-email-${index}`}
                className="block text-sm"
              >
                Email
              </label>
              <input
                id={`${formId}-email-${index}`}
                name={`email${index}`}
                defaultValue={attendee.email}
                className={inputClass}
              />
              {errors.email && (
                <span role="alert" className={errorClass}>
                  {errors.email}
                </span>
              )}

              <label
                htmlFor={`${formId}-phone-${index}`}
                className="block text-sm"
              >
                Phone
              </label>
              <input
                id={`${formId}-phone-${index}`}
                name={`phone${index}`}
                defaultValue={attendee.phone}
                className={inputClass}
              />
              {errors.phone && (
                <span role="alert" className={errorClass}>
                  {errors.phone}
                </span>
              )}
            </div>
          );
        })}
      </form>
    </div>
  );
}
