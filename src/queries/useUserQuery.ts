import { useQuery } from "@tanstack/react-query";

import { userQuery } from "./queries";
import type { User } from "../types";

export const useUserQuery = (id: User["id"]) => {
  const { data, isPending, error } = useQuery(userQuery(id));

  return { user: data, isPending, error };
};
