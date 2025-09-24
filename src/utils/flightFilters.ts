import type { Flight } from "../types/flight";
import type { FilterCriteria } from "../store/filterSlice";

export const filterFlights = (
  flights: Flight[],
  searchQuery: string,
  showOnlyFavorites: boolean,
  favoriteIds: string[]
): Flight[] => {
  return flights.filter((flight) => {
    if (showOnlyFavorites && !favoriteIds.includes(flight.id)) {
      return false;
    }
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase().trim();
    const from = flight.from.toLowerCase();
    const to = flight.to.toLowerCase();
    const airline = flight.airline.toLowerCase();
    
    return from.includes(query) || to.includes(query) || airline.includes(query);
  });
};

export const sortFlights = (flights: Flight[], criteria: FilterCriteria): Flight[] => {
  return [...flights].sort((a, b) => {
    switch (criteria) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'departure':
        return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
      case 'duration': {
        const getDuration = (flight: Flight) => {
          const departure = new Date(flight.departureTime).getTime();
          const arrival = new Date(flight.arrivalTime).getTime();
          return arrival - departure;
        };
        return getDuration(a) - getDuration(b);
      }
      default:
        return 0;
    }
  });
};