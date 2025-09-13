"use client";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../authApi";

import authSlice from "../slice/authSlice";
import customerSlice from "../slice/customerSlice";
import cartSlice from "../slice/cartSlice";

let store;

export function makeStore() {
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authSlice,
      customer: customerSlice,
      cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const getStore = () => {
  if (!store) {
    store = makeStore();
  }
  return store;
};
