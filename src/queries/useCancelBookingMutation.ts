import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Booking, User } from "../types";
import { cancelBooking } from "../api";
import { bookingsQuery } from "./queries";

export function useCancelBookingMutation(userId: User["id"]) {
  const queryClient = useQueryClient();
  const confirmedKey = bookingsQuery(userId, "confirmed").queryKey;

  const mutation = useMutation({
    mutationFn: (id: Booking["id"]) => cancelBooking(id),
    onMutate: async (id: Booking["id"]) => {
      await queryClient.cancelQueries({ queryKey: ["bookings", userId] });

      const previous = queryClient.getQueryData<Booking[]>(confirmedKey);
      queryClient.setQueryData<Booking[]>(confirmedKey, (old) =>
        old?.filter((b) => b.id !== id),
      );

      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(confirmedKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", userId] });
    },
  });

  return mutation;
}
