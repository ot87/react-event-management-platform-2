import { useState } from "react";

import type { Event } from "../types";
import { Modal } from "./Modal";
import { BookingFlow } from "./BookingFlow";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <div>
        <span>{event.date}</span>
        <span>{event.time}</span>
      </div>
      <div>{event.location}</div>
      <div>Hosted by {event.organizerName}</div>
      <div>
        <div>Ticket Types</div>
        {event.ticketTypes.map(({ id, name, price, available }) => (
          <div key={id}>
            <div>{name}</div>
            <div>
              <span>{price}</span>
              <span>{available}</span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleButtonClick}>Book Tickets</button>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <BookingFlow event={event} />
      </Modal>
    </div>
  );
}
