import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { Flight } from "../types/flight";
import type { RootState } from "../store/store";
import { toggleFavorite } from "../store/favoritesSlice";
import { calculateTicketPercentage, getTicketAvailabilityStatus } from "../utils/ticketUtils";
import "../styles/styles.scss";

export default function FlightCard({ flight }: { flight: Flight }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const isFavorite = favoriteIds.includes(flight.id);
  const ticketPercentage = calculateTicketPercentage(flight.tickets);
  const ticketStatus = getTicketAvailabilityStatus(ticketPercentage);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite(flight.id));
  };

  return (
    <div className="flight-card">
      <Link to={`/flights/${flight.id}`} style={{ textDecoration: 'none' }}>
        <div className="flight-card__content">
          <div className="flight-card__header">
            <div className="flight-card__airline">
              {flight.airline}
            </div>
            <div className="flight-card__actions">
              <div className="flight-card__price">
                {flight.price} $
              </div>
              <button 
                className={`flight-card__favorite-btn ${isFavorite ? 'flight-card__favorite-btn--active' : ''}`}
                onClick={handleToggleFavorite}
              >
                <Heart fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div className="flight-card__route">
            <div className="flight-card__route-cities">
              {flight.from}
            </div>
            <div className="flight-card__route-arrow">→</div>
            <div className="flight-card__route-cities">
              {flight.to}
            </div>
            <div className="flight-card__route-time">
              {flight.departureTime} – {flight.arrivalTime}
            </div>
          </div>

          <div className="flight-card__info">
            <div className="flight-card__chip">
              Термінал {flight.terminal}
            </div>
            <div className="flight-card__chip">
              Gate {flight.gate}
            </div>
            <div className={`flight-card__chip flight-card__chip--${ticketStatus}`}>
              Квитки: {flight.tickets.remaining}/{flight.tickets.total}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
