import type { Tickets } from "../types/flight";

export const calculateTicketPercentage = (tickets: Tickets): number => {
  const { remaining, total } = tickets;
  return (remaining / total) * 100;
};

export const getTicketAvailabilityStatus = (percentage: number): "success" | "warning" | "danger" => {
  if (percentage > 50) return "success";
  if (percentage > 20) return "warning";
  return "danger";
};