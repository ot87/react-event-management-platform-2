export type TicketType = {
  id: string;
  name: string;
  price: number;
  available: number;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  organizerName: string;
  ticketTypes: TicketType[];
};

export type Review = {
  id: string;
  eventId: string;
  author: string;
  rating: number;
  comment: string;
};

export type Ticket = {
  type: string;
  quantity: number;
  price: number;
};

export type Attendee = {
  name: string;
  email: string;
  phone: string;
};

export type BookingStatus = "confirmed" | "cancelled";

export type Booking = {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  tickets: Ticket[];
  attendees: Attendee[];
  totalAmount: number;
  status: BookingStatus;
  bookingDate: string;
  referenceNumber: string;
};

export type User = {
  id: string;
  name: string;
  favoriteEvents: string[];
};
