import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TicketType } from "../types";

interface CreateEventState {
  step: number;
  draft: {
    title: string;
    description: string;
    category: string;
    image: string;
    date: string;
    time: string;
    location: string;
    ticketTypes: TicketType[];
  };
}

const initialState: CreateEventState = {
  step: 1,
  draft: {
    title: "",
    description: "",
    category: "",
    image: "",
    date: "",
    time: "",
    location: "",
    ticketTypes: [],
  },
};

const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{
        field:
          | "title"
          | "description"
          | "category"
          | "image"
          | "date"
          | "time"
          | "location";
        value: string;
      }>,
    ) => {
      state.draft[action.payload.field] = action.payload.value;
    },
    addTicketType: {
      prepare: () => ({
        payload: { id: nanoid(), name: "", price: 0, available: 0 },
      }),
      reducer: (state, action: PayloadAction<TicketType>) => {
        state.draft.ticketTypes.push(action.payload);
      },
    },
    removeTicketType: (state, action: PayloadAction<string>) => {
      state.draft.ticketTypes = state.draft.ticketTypes.filter(
        (ticket) => ticket.id !== action.payload,
      );
    },
    updateTicketType: (
      state,
      action: PayloadAction<{
        id: string;
        field: "name" | "price" | "available";
        value: string | number;
      }>,
    ) => {
      const ticket = state.draft.ticketTypes.find(
        (ticketType) => ticketType.id === action.payload.id,
      );

      if (!ticket) {
        return;
      }

      if (action.payload.field === "name") {
        ticket.name = String(action.payload.value);
      } else {
        ticket[action.payload.field] = Number(action.payload.value);
      }
    },
    nextStep: (state) => {
      state.step = Math.min(state.step + 1, 3);
    },
    prevStep: (state) => {
      state.step = Math.max(state.step - 1, 1);
    },
    reset: () => initialState,
  },
});

export const {
  setField,
  addTicketType,
  removeTicketType,
  updateTicketType,
  nextStep,
  prevStep,
  reset,
} = createEventSlice.actions;
export default createEventSlice.reducer;
