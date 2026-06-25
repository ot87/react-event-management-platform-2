import { configureStore } from "@reduxjs/toolkit";
import createEventSlice from "./create-event.slice";

export const store = configureStore({
  reducer: {
    createEvent: createEventSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
