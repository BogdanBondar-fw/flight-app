import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Alert,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTicket } from "../store/cartSlice";
import { useFlightDetails } from "../hooks/useFlightDetails";
import { useSeats } from "../hooks/useSeats";
import type { Seat } from "../types/seat";

export default function FlightDetailsPage() {
  const { id } = useParams();
  const { flight, loading, error } = useFlightDetails(id);
  const { seats, occupySeat } = useSeats();
  const dispatch = useDispatch();

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!flight) return null;

  const handleSelect = (seat: Seat) => {
    if (seat.occupied) return;
    dispatch(
      addTicket({ flightId: flight.id, seat: seat.id, price: flight.price })
    );
    occupySeat(seat.id);
  };

  return (
    <div className="flight-details">
      <div className="flight-details__header">
        <Typography variant="h4" className="flight-details__title">
          {flight.airline}
        </Typography>
        <Typography variant="h3" className="flight-details__price">
          {flight.price} $
        </Typography>
      </div>

      <div className="flight-details__route">
        <div className="flight-details__route-info">
          <Typography variant="h5">{flight.from}</Typography>
          <div className="flight-details__route-arrow">→</div>
          <Typography variant="h5">{flight.to}</Typography>
        </div>
        <Typography variant="h6" className="flight-details__time">
          {flight.departureTime} – {flight.arrivalTime}
        </Typography>
      </div>

      <div className="flight-details__info">
        <div className="flight-details__info-item">
          <Typography variant="subtitle1">Термінал</Typography>
          <Typography variant="h6">{flight.terminal}</Typography>
        </div>
        <div className="flight-details__info-item">
          <Typography variant="subtitle1">Gate</Typography>
          <Typography variant="h6">{flight.gate}</Typography>
        </div>
        <div className="flight-details__info-item">
          <Typography variant="subtitle1">Доступні місця</Typography>
          <Typography variant="h6">{flight.tickets.remaining}/{flight.tickets.total}</Typography>
        </div>
      </div>

      <div className="flight-details__seats">
        <Typography variant="h5" className="flight-details__seats-title">
          Виберіть місце
        </Typography>
        <div className="flight-details__seats-legend">
          <div className="seats-legend__item">
            <div className="seats-legend__color seats-legend__color--available"></div>
            <Typography>Доступне</Typography>
          </div>
          <div className="seats-legend__item">
            <div className="seats-legend__color seats-legend__color--occupied"></div>
            <Typography>Зайняте</Typography>
          </div>
        </div>

        <div className="flight-details__seats-grid">
          {seats.map((seat) => (
            <Button
              key={seat.id}
              className={`seat-button ${seat.occupied ? 'seat-button--occupied' : ''}`}
              variant="contained"
              onClick={() => handleSelect(seat)}
              disabled={seat.occupied}
            >
              {seat.id}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
