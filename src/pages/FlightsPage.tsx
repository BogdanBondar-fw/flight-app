import { CircularProgress, Alert, Container } from "@mui/material";
import FlightCard from "../components/FlightCard";
import FlightFilters from "../components/FlightFilters";
import { useFlights } from "../hooks/useFlights";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { filterFlights, sortFlights } from "../utils/flightFilters";
import "../styles/styles.scss";

export default function FlightsPage() {
  const { flights, loading, error } = useFlights();
  const { searchQuery, filterCriteria, showOnlyFavorites } = useSelector((state: RootState) => state.filter);
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);

  if (loading) {
    return (
      <div className="flights-page__loader">
        <CircularProgress size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flights-page__error">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  const filteredFlights = sortFlights(
    filterFlights(flights, searchQuery, showOnlyFavorites, favoriteIds),
    filterCriteria
  );

  return (
    <div className="flights-page">
      <Container>
        <FlightFilters />
        <div className="flights-page__grid">
          {filteredFlights.map((f) => (
            <FlightCard key={f.id} flight={f} />
          ))}
        </div>
      </Container>
    </div>
  );
}
