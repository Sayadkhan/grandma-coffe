"use client";

import { Provider } from "react-redux";
import { getStore } from "@/redux/store/store";

export function Providers({ children }) {
  const store = getStore();

  return <Provider store={store}>{children}</Provider>;
}
