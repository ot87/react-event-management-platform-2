import type { Attendee } from "../types";

type NextActionType = "NEXT";
type BackActionType = "BACK";
type SelectTicketActionType = "SELECT_TICKET";
type SetQuantityActionType = "SET_QUANTITY";
type SetAttendeesActionType = "SET_ATTENDEES";

export const NEXT_ACTION_TYPE: NextActionType = "NEXT";
export const BACK_ACTION_TYPE: BackActionType = "BACK";
export const SELECT_TICKET_ACTION_TYPE: SelectTicketActionType =
  "SELECT_TICKET";
export const SET_QUANTITY_ACTION_TYPE: SetQuantityActionType = "SET_QUANTITY";
export const SET_ATTENDEES_ACTION_TYPE: SetAttendeesActionType =
  "SET_ATTENDEES";

interface BookingState {
  step: number;
  ticketTypeId: string;
  quantity: number;
  attendees: Attendee[];
}

interface NextAction {
  type: NextActionType;
}
interface BackAction {
  type: BackActionType;
}
interface SelectTicketAction {
  type: SelectTicketActionType;
  payload: { id: string };
}
interface SetQuantityAction {
  type: SetQuantityActionType;
  payload: { quantity: number };
}
interface SetAttendeesAction {
  type: SetAttendeesActionType;
  payload: Attendee[];
}
type BookingAction =
  | NextAction
  | BackAction
  | SelectTicketAction
  | SetQuantityAction
  | SetAttendeesAction;

export const initState: BookingState = {
  step: 1,
  ticketTypeId: "",
  quantity: 1,
  attendees: [{ name: "", email: "", phone: "" }],
};

export const bookingReducer = (state: BookingState, action: BookingAction) => {
  switch (action.type) {
    case NEXT_ACTION_TYPE:
      return { ...state, step: Math.min(state.step + 1, 3) };
    case BACK_ACTION_TYPE:
      return { ...state, step: Math.max(state.step - 1, 1) };
    case SELECT_TICKET_ACTION_TYPE:
      return { ...state, ticketTypeId: action.payload.id };
    case SET_QUANTITY_ACTION_TYPE: {
      const { quantity } = action.payload;
      const attendees = Array.from(
        { length: quantity },
        (_, i) => state.attendees[i] ?? { name: "", email: "", phone: "" },
      );

      return { ...state, quantity, attendees };
    }
    case SET_ATTENDEES_ACTION_TYPE: {
      return { ...state, attendees: action.payload };
    }
    default:
      return state;
  }
};
