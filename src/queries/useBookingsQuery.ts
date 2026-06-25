import { useQuery } from "@tanstack/react-query";

import { bookingsQuery } from "./queries";
import { useUser } from "../hooks";
import type { BookingStatus } from "../types";

export const useBookingsQuery = (
  status: BookingStatus,
  enabled: boolean = true,
) => {
  const { userId } = useUser();
  return useQuery({
    ...bookingsQuery(userId, status),
    enabled,
  });
};
