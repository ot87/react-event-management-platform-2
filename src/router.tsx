import { createBrowserRouter } from "react-router";

import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";

import { EventsPage } from "./pages/EventsPage";
import { BookingsPage } from "./pages/BookingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { EventDetailPage } from "./pages/EventDetailPage";

import { queryClient } from "./lib/queryClient";
import { eventsQuery } from "./queries";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <EventsPage />,
        loader: () => queryClient.ensureQueryData(eventsQuery()),
      },
      {
        path: "events/:id",
        element: <EventDetailPage />,
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
