// src/hooks/useSeats.ts
import { useState } from "react";
import { generateSeats } from "../utils/generateSeats";
import type { Seat } from "../types/seat";

export function useSeats(rows = 10, cols = 6) {
  const [seats, setSeats] = useState<Seat[]>(() => generateSeats(rows, cols));

  const occupySeat = (id: string) => {
    setSeats((prev) =>
      prev.map((s) => (s.id === id ? { ...s, occupied: true } : s))
    );
  };

  return { seats, occupySeat };
}
