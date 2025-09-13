"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  customer: null,
};

// Load from sessionStorage (if available)
if (typeof window !== "undefined") {
  const savedCustomer = sessionStorage.getItem("customerAuth");
  if (savedCustomer) {
    const parsed = JSON.parse(savedCustomer);
    initialState.accessToken = parsed.accessToken;
    initialState.customer = parsed.customer;
  }
}

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.customer) {
        state.customer = action.payload.customer;
      }
      // Save to sessionStorage
      sessionStorage.setItem("customerAuth", JSON.stringify(state));
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
      sessionStorage.setItem("customerAuth", JSON.stringify(state));
    },
    logout: (state) => {
      state.accessToken = null;
      state.customer = null;
      sessionStorage.removeItem("customerAuth");
    },
  },
});

export const { setCredentials, setCustomer, logout } = customerSlice.actions;
export default customerSlice.reducer;
