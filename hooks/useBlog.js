import { useQuery } from "@tanstack/react-query";

export function useBlogs(options = {}) {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const baseUrl =
        typeof window === "undefined"
          ? process.env.NEXT_PUBLIC_SITE_URL ||
            `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ||
            "http://localhost:3000"
          : "";

      const res = await fetch(`${baseUrl}/api/blog`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
    suspense: true,
    ...options,
  });
}
