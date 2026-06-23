import { useFavoritesMutation, useUserQuery } from "../queries";
import type { Event } from "../types";
import { useUser } from "./useUser";

export function useFavorites() {
  const { userId } = useUser();
  const { user } = useUserQuery(userId);
  const favorites = user?.favoriteEvents ?? [];
  const { mutate } = useFavoritesMutation(userId);

  const toggleFavorite = (eventId: Event["id"]) => {
    const next = favorites.includes(eventId)
      ? favorites.filter((favoriteId) => favoriteId !== eventId)
      : [...favorites, eventId];

    mutate(next);
  };

  return { favorites, toggleFavorite };
}
