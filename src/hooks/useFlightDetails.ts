import { useEffect, useState } from "react";
import { getFlightById } from "../api/flightsApi";
import type { Flight } from "../types/flight";

export function useFlightDetails(id?: string) {
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getFlightById(id)
      .then(setFlight)
      .catch(() => setError("Не вдалося завантажити деталі рейсу"))
      .finally(() => setLoading(false));
  }, [id]);

  return { flight, loading, error };
}