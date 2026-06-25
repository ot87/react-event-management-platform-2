import { createBrowserRouter } from "react-router";

import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";

import { EventsPage } from "./pages/EventsPage";
import { BookingPage } from "./pages/BookingPage";
import { BookingsPage } from "./pages/BookingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CreateEventPage } from "./pages/CreateEventPage";
import { EventDetailPage } from "./pages/EventDetailPage";

import {
  bookingLoader,
  eventLoader,
  eventsLoader,
  rootLoader,
} from "./queries";
import { createEventAction } from "./store/create-event.action";

export const router = createBrowserRouter([
  {
    id: "root",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <EventsPage />,
        loader: eventsLoader,
      },
      {
        path: "events/:id",
        element: <EventDetailPage />,
        loader: eventLoader,
      },
      {
        path: "create-event",
        element: <CreateEventPage />,
        action: createEventAction,
      },
      {
        path: "book/:eventId",
        element: <BookingPage />,
        loader: bookingLoader,
      },
      {
        path: "my-bookings",
        element: <BookingsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
