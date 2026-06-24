import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Booking, User } from "../types";
import { createBooking } from "../api";

export function useCreateBookingMutation(userId: User["id"]) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (booking: Omit<Booking, "id">) => createBooking(booking),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", userId] });
    },
  });

  return mutation;
}
