import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { removeTicket, clearCart } from "../store/cartSlice";
import { Button, Typography, List, ListItem, IconButton, Paper, Box } from "@mui/material";
import { Trash2, ShoppingBasket } from "lucide-react";

export default function CartPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  if (!items.length) {
    return (
      <Paper className="empty-cart">
        <ShoppingBasket size={64} />
        <Typography variant="h5">Корзина порожня</Typography>
        <Typography color="text.secondary">Додайте квитки до корзини, щоб продовжити</Typography>
      </Paper>
    );
  }

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="cart-page">
      <Typography variant="h4" className="cart-page__title">
        Ваша Корзина
      </Typography>

      <Paper className="cart-page__content">
        <List className="cart-list">
          {items.map((item) => (
            <ListItem
              key={item.seat}
              className="cart-item"
              secondaryAction={
                <IconButton 
                  onClick={() => dispatch(removeTicket(item.seat))}
                  className="cart-item__delete"
                >
                  <Trash2 />
                </IconButton>
              }
            >
              <div className="cart-item__details">
                <Typography variant="h6">Рейс {item.flightId}</Typography>
                <Typography>Місце {item.seat}</Typography>
                <Typography variant="subtitle1" className="cart-item__price">
                  {item.price} $
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
        
        <Box className="cart-footer">
          <div className="cart-footer__total">
            <Typography variant="h5">Разом:</Typography>
            <Typography variant="h4">{total} $</Typography>
          </div>
          <div className="cart-footer__actions">
            <Button 
              variant="outlined" 
              color="error" 
              onClick={() => dispatch(clearCart())}
              className="cart-footer__clear-btn"
            >
              Очистити корзину
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              className="cart-footer__checkout-btn"
            >
              Оформити замовлення
            </Button>
          </div>
        </Box>
      </Paper>
    </div>
  );
}
