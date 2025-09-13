import { useQuery } from "@tanstack/react-query";

export function useProducts({ suspense = true } = {}) {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // Determine base URL depending on environment
      const baseUrl =
        typeof window === "undefined"
          ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
          : "";

      const res = await fetch(`${baseUrl}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    suspense, // enables Suspense integration
  });
}
