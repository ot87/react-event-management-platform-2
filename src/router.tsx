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

import { bookingLoader, eventLoader, eventsLoader } from "./queries";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
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
