import type { LoaderFunctionArgs } from "react-router";

import { queryClient } from "../lib/queryClient";
import { eventQuery, eventsQuery, userQuery } from "./queries";
import { getReviews } from "../api";

export const CURRENT_USER_ID = "user1";

export const rootLoader = () =>
  queryClient.ensureQueryData(userQuery(CURRENT_USER_ID));

export const eventsLoader = () => queryClient.ensureQueryData(eventsQuery());

export const eventLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Response("Not Found", { status: 404 });
  }

  await queryClient.ensureQueryData(eventQuery(params.id));

  return { reviews: getReviews(params.id) };
};

export const bookingLoader = ({ params }: LoaderFunctionArgs) => {
  if (!params.eventId) {
    throw new Response("Not Found", { status: 404 });
  }

  return queryClient.ensureQueryData(eventQuery(params.eventId));
};
