import { useReducer } from "react";
import {
  bookingReducer,
  initState,
  NEXT_ACTION_TYPE,
  BACK_ACTION_TYPE,
  SELECT_TICKET_ACTION_TYPE,
  SET_QUANTITY_ACTION_TYPE,
  UPDATE_ATTENDEE_ACTION_TYPE,
} from "../reducers/booking.reducer";

export function useBookingReducer(initTicketTypeId: string) {
  const [booking, dispatch] = useReducer(bookingReducer, initState, () => ({
    ...initState,
    ticketTypeId: initTicketTypeId,
  }));

  const next = () => {
    dispatch({ type: NEXT_ACTION_TYPE });
  };
  const back = () => {
    dispatch({ type: BACK_ACTION_TYPE });
  };
  const selectTicket = (id: string) => {
    dispatch({ type: SELECT_TICKET_ACTION_TYPE, payload: { id } });
  };
  const setQuantity = (quantity: number) => {
    dispatch({ type: SET_QUANTITY_ACTION_TYPE, payload: { quantity } });
  };
  const updateAttendee = (
    index: number,
    field: "name" | "email" | "phone",
    value: string,
  ) => {
    dispatch({
      type: UPDATE_ATTENDEE_ACTION_TYPE,
      payload: { index, field, value },
    });
  };

  return { booking, next, back, selectTicket, setQuantity, updateAttendee };
}
