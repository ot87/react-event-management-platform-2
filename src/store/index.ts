import { configureStore } from "@reduxjs/toolkit";
import createEventSlice, { type CreateEventState } from "./create-event.slice";

const DRAFT_KEY = "createEventDraft";

function loadDraft(): CreateEventState | undefined {
  const raw = localStorage.getItem(DRAFT_KEY);
  return raw ? (JSON.parse(raw) as CreateEventState) : undefined;
}

function saveDraft(state: CreateEventState) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
}

const persisted = loadDraft();

export const store = configureStore({
  reducer: {
    createEvent: createEventSlice,
  },
  preloadedState: persisted ? { createEvent: persisted } : undefined,
});

store.subscribe(() => saveDraft(store.getState().createEvent));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
