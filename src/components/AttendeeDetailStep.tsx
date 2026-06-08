import { validateAttendee } from "../utils/validation";
import type { Attendee } from "../types";

interface AttendeeDetailStepProps {
  attendees: Attendee[];
  updateAttendee: (
    index: number,
    field: "name" | "email" | "phone",
    value: string,
  ) => void;
}

export function AttendeeDetailStep({
  attendees,
  updateAttendee,
}: AttendeeDetailStepProps) {
  return (
    <div>
      <h3>Step 2: Attendee Details</h3>
      <div>
        {attendees.map((attendee, index) => {
          const errors = validateAttendee(attendee);

          return (
            <div key={index}>
              <p>Attendee {index + 1}</p>
              <label>
                Name
                <input
                  name={`name${index}`}
                  value={attendee.name}
                  onChange={(e) =>
                    updateAttendee(index, "name", e.target.value)
                  }
                />
              </label>
              {errors.name && <span role="alert">{errors.name}</span>}

              <label>
                Email
                <input
                  name={`email${index}`}
                  value={attendee.email}
                  onChange={(e) =>
                    updateAttendee(index, "email", e.target.value)
                  }
                />
              </label>
              {errors.email && <span role="alert">{errors.email}</span>}

              <label>
                Phone
                <input
                  name={`phone${index}`}
                  value={attendee.phone}
                  onChange={(e) =>
                    updateAttendee(index, "phone", e.target.value)
                  }
                />
              </label>
              {errors.phone && <span role="alert">{errors.phone}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
