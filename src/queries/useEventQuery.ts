import { useQuery } from "@tanstack/react-query";
import { eventQuery } from "./queries";
import type { Event } from "../types";

export const useEventQuery = (id: Event["id"]) => {
  const { data, isPending, error } = useQuery(eventQuery(id));

  return { event: data, isPending, error };
};
