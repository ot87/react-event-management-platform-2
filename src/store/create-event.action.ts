import { redirect } from "react-router";

import { store } from "./index";
import { publishEvent, reset } from "./create-event.slice";
import { queryClient } from "../lib/queryClient";
import { isStepValid } from "../utils/validation";

export async function createEventAction() {
  const { draft } = store.getState().createEvent;

  if (!isStepValid(1, draft) || !isStepValid(2, draft)) {
    return null;
  }

  const event = { ...draft, organizerName: "Demo User", venue: draft.location };
  try {
    await store.dispatch(publishEvent(event)).unwrap();
  } catch {
    return null;
  }

  queryClient.invalidateQueries({ queryKey: ["events"] });
  localStorage.removeItem("createEventDraft");
  store.dispatch(reset());

  return redirect("/");
}
