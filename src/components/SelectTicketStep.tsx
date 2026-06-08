import type { TicketType } from "../types";

interface SelectTicketStepProps {
  ticketTypes: TicketType[];
  ticketTypeId: string;
  selectedTicket: TicketType;
  quantity: number;
  total: number;
  selectTicket: (id: string) => void;
  setQuantity: (quantity: number) => void;
}

export function SelectTicketStep({
  ticketTypes,
  ticketTypeId,
  selectedTicket,
  quantity,
  total,
  selectTicket,
  setQuantity,
}: SelectTicketStepProps) {
  return (
    <div>
      <h3>Step 1: Select Tickets</h3>

      <fieldset>
        <legend>Ticket type</legend>
        {ticketTypes.map((ticket) => (
          <label key={ticket.id}>
            <input
              type="radio"
              name="ticketType"
              value={ticket.id}
              checked={ticket.id === ticketTypeId}
              onChange={() => selectTicket(ticket.id)}
            />
            {ticket.name} - ${ticket.price} ({ticket.available} available)
          </label>
        ))}
      </fieldset>

      <label>
        Quantity
        <input
          type="number"
          min={1}
          max={selectedTicket.available}
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Math.max(
                1,
                Math.min(Number(e.target.value), selectedTicket.available),
              ),
            )
          }
        />
      </label>

      <p>Total: ${total}</p>
    </div>
  );
}
