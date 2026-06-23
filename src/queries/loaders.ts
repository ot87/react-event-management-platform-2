import type { LoaderFunctionArgs } from "react-router";
import { queryClient } from "../lib/queryClient";
import { eventQuery, eventsQuery } from "./queries";

export const eventsLoader = () => queryClient.ensureQueryData(eventsQuery());

export const eventLoader = ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Response("Not Found", { status: 404 });
  }

  return queryClient.ensureQueryData(eventQuery(params.id));
};
