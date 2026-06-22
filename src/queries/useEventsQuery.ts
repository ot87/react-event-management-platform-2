import { useQuery } from "@tanstack/react-query";
import { eventsQuery } from "./queries";

export const useEventsQuery = () => {
  const { data, isPending, error } = useQuery(eventsQuery());

  return { events: data ?? [], isPending, error };
};
