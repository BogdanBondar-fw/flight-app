import { useEffect, useState } from "react";
import { getFlights } from "../api/flightsApi";
import type { Flight } from "../types/flight";

export function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFlights()
      .then(setFlights)
      .catch(() => setError("Не вдалося завантажити рейси"))
      .finally(() => setLoading(false));
  }, []);

  return { flights, loading, error };
}
