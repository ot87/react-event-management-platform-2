import type { User } from "../types";
import { fetchData } from "./client";

export async function getUser(id: User["id"]): Promise<User> {
  return fetchData("GET", `/users/${id}`);
}

export async function updateFavorites(
  userId: User["id"],
  favoriteEvents: User["favoriteEvents"],
) {
  return fetchData("PATCH", `/users/${userId}`, { favoriteEvents });
}
