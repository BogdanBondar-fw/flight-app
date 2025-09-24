import type { Flight } from "./flight";

export interface CartItem {
  flightId: Flight["id"];
  seat: string;
  price: number;
}
