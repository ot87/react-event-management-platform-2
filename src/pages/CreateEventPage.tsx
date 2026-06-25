import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addTicketType,
  nextStep,
  prevStep,
  removeTicketType,
  setField,
  updateTicketType,
} from "../store/create-event.slice";
import { isStepValid } from "../utils/validation";

const CATEGORIES = [
  "Technology",
  "Music",
  "Business",
  "Arts",
  "Sports",
  "Other",
];

const inputClass =
  "mt-1 block w-full rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800";
const primaryButton =
  "rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50";
const secondaryButton =
  "rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700";

export function CreateEventPage() {
  const { step, draft } = useAppSelector((state) => state.createEvent);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create Event</h1>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Step {step} of 3
      </p>

      {step === 1 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Basic Info</h2>

          <label className="block text-sm">
            Title
            <input
              className={inputClass}
              value={draft.title}
              onChange={(e) =>
                dispatch(setField({ field: "title", value: e.target.value }))
              }
            />
          </label>

          <label className="block text-sm">
            Description
            <textarea
              className={inputClass}
              value={draft.description}
              onChange={(e) =>
                dispatch(
                  setField({ field: "description", value: e.target.value }),
                )
              }
            />
          </label>

          <label className="block text-sm">
            Category
            <select
              className={inputClass}
              value={draft.category}
              onChange={(e) =>
                dispatch(setField({ field: "category", value: e.target.value }))
              }
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            Image URL
            <input
              className={inputClass}
              value={draft.image}
              onChange={(e) =>
                dispatch(setField({ field: "image", value: e.target.value }))
              }
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Date, Location & Tickets</h2>

          <label className="block text-sm">
            Date
            <input
              type="date"
              className={inputClass}
              value={draft.date}
              onChange={(e) =>
                dispatch(setField({ field: "date", value: e.target.value }))
              }
            />
          </label>

          <label className="block text-sm">
            Time
            <input
              type="time"
              className={inputClass}
              value={draft.time}
              onChange={(e) =>
                dispatch(setField({ field: "time", value: e.target.value }))
              }
            />
          </label>

          <label className="block text-sm">
            Location
            <input
              className={inputClass}
              value={draft.location}
              onChange={(e) =>
                dispatch(setField({ field: "location", value: e.target.value }))
              }
            />
          </label>

          <div>
            <h3 className="text-sm font-semibold">Ticket Types</h3>
            <div className="mt-2 space-y-2">
              {draft.ticketTypes.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-wrap items-end gap-2 rounded border border-gray-200 p-2 dark:border-gray-700"
                >
                  <label className="flex-1 text-sm">
                    Name
                    <input
                      className={inputClass}
                      value={ticket.name}
                      onChange={(e) =>
                        dispatch(
                          updateTicketType({
                            id: ticket.id,
                            field: "name",
                            value: e.target.value,
                          }),
                        )
                      }
                    />
                  </label>
                  <label className="w-24 text-sm">
                    Price
                    <input
                      type="number"
                      className={inputClass}
                      value={ticket.price}
                      onChange={(e) =>
                        dispatch(
                          updateTicketType({
                            id: ticket.id,
                            field: "price",
                            value: Number(e.target.value),
                          }),
                        )
                      }
                    />
                  </label>
                  <label className="w-24 text-sm">
                    Available
                    <input
                      type="number"
                      className={inputClass}
                      value={ticket.available}
                      onChange={(e) =>
                        dispatch(
                          updateTicketType({
                            id: ticket.id,
                            field: "available",
                            value: Number(e.target.value),
                          }),
                        )
                      }
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => dispatch(removeTicketType(ticket.id))}
                    className={secondaryButton}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => dispatch(addTicketType())}
              className={`${secondaryButton} mt-2`}
            >
              Add ticket type
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div className="space-y-1 rounded border border-gray-200 p-3 dark:border-gray-700">
            <h3 className="font-semibold">{draft.title || "Untitled event"}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {draft.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {draft.category} · {draft.date} {draft.time} · {draft.location}
            </p>
            <ul className="mt-2 text-sm">
              {draft.ticketTypes.map((ticket) => (
                <li key={ticket.id}>
                  {ticket.name || "Unnamed"} — ${ticket.price} ·{" "}
                  {ticket.available} available
                </li>
              ))}
            </ul>
          </div>
          <button type="button" className={primaryButton}>
            Publish
          </button>
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={() => dispatch(prevStep())}
          disabled={step === 1}
          className={secondaryButton}
        >
          Back
        </button>
        {step < 3 && (
          <button
            type="button"
            onClick={() => dispatch(nextStep())}
            className={primaryButton}
            disabled={!isStepValid(step, draft)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
