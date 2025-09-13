import { useQuery } from "@tanstack/react-query";

export function useCategories({ suspense = true } = {}) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      // Use absolute URL on the server
      const baseUrl =
        typeof window === "undefined"
          ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
          : "";

      const res = await fetch(`${baseUrl}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    suspense,
  });
}
