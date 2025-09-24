import type { Seat } from "../types/seat";

export function generateSeats(rows = 10, cols = 6): Seat[] {
  const seats: Seat[] = [];
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      seats.push({
        id: `${r}${String.fromCharCode(64 + c)}`, // напр. "1A"
        occupied: Math.random() < 0.3,
      });
    }
  }
  return seats;
}
