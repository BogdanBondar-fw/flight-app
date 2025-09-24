import axios from "axios";
import type { Flight } from "../types/flight";

const api = axios.create({
  baseURL: "https://679d13f487618946e6544ccc.mockapi.io/testove/v1",
});

export const getFlights = async (): Promise<Flight[]> => {
  const response = await api.get<Flight[]>("/flights");
  return response.data;
};

export const getFlightById = async (id: string): Promise<Flight> => {
  const response = await api.get<Flight>(`/flights/${id}`);
  return response.data;
};
