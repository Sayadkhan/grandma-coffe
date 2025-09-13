import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(price) {
  return price?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
