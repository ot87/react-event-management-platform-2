import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { User } from "../types";
import { updateFavorites } from "../api";
import { userQuery } from "./queries";

export function useFavoritesMutation(userId: User["id"]) {
  const queryClient = useQueryClient();
  const key = userQuery(userId).queryKey;

  const mutation = useMutation({
    mutationFn: (favoriteEvents: User["favoriteEvents"]) =>
      updateFavorites(userId, favoriteEvents),
    onMutate: async (favoriteEvents: User["favoriteEvents"]) => {
      await queryClient.cancelQueries({ queryKey: key });

      const previousUser = queryClient.getQueryData<User>(key);
      queryClient.setQueryData<User>(key, (user) =>
        user ? { ...user, favoriteEvents } : user,
      );

      return { previousUser };
    },
    onError: (_error, _favoriteEvents, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(key, context.previousUser);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });

  return mutation;
}
