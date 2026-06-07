import { useEffect, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? new Set<string>(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return { favorites, toggleFavorite };
}
