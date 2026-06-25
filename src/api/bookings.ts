import type { Booking, BookingStatus } from "../types";
import { fetchData } from "./client";

export async function getBookings(
  userId: Booking["userId"],
  status?: BookingStatus,
): Promise<Booking[]> {
  return fetchData(
    "GET",
    `/bookings?userId=${userId}${status ? `&status=${status}` : ""}`,
  );
}

export async function createBooking(
  data: Omit<Booking, "id">,
): Promise<Booking> {
  return fetchData("POST", "/bookings", data);
}

export async function cancelBooking(id: Booking["id"]): Promise<Booking> {
  return fetchData("PATCH", `/bookings/${id}`, { status: "cancelled" });
}
