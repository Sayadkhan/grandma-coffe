// hooks/useBlog.js
"use client";

import { useQuery } from "@tanstack/react-query";

export function useBlogs(options = {}) {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/blog", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      } catch (err) {
        console.error("useBlogs error:", err.message);
        return []; // ✅ always return array instead of throwing
      }
    },
    initialData: [],
    ...options,
  });
}
