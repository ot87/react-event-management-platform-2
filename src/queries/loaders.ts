import type { LoaderFunctionArgs } from "react-router";

import { queryClient } from "../lib/queryClient";
import { eventQuery, eventsQuery } from "./queries";
import { getReviews } from "../api";

export const eventsLoader = () => queryClient.ensureQueryData(eventsQuery());

export const eventLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Response("Not Found", { status: 404 });
  }

  await queryClient.ensureQueryData(eventQuery(params.id));

  return { reviews: getReviews(params.id) };
};
