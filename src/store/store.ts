import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import filterReducer from "./filterSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;