import { useRouteLoaderData } from "react-router";
import type { User } from "../types";

export function ProfilePage() {
  const user = useRouteLoaderData("root") as User;

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Profile</h1>

      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
        <p className="mb-3 font-medium">{user.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
        <p className="mb-3 font-medium">{user.id}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Favorites</p>
        <p className="font-medium">{user.favoriteEvents.length} saved</p>
      </div>
    </>
  );
}
