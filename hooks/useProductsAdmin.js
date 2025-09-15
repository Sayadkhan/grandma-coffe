"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchProduct } from "@/utils/api";

export function useProductAdmin({
  suspense = true,
  initialPage = 1,
  limit = 10,
} = {}) {
  const [page, setPage] = useState(initialPage);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProduct(page, limit),
    keepPreviousData: true,
    staleTime: 60 * 1000,
    suspense,
  });

  // Prefetch next page safely
  useEffect(() => {
    if (query.data?.total && page < Math.ceil(query.data.total / limit)) {
      queryClient.prefetchQuery({
        queryKey: ["products", page + 1],
        queryFn: () => fetchProduct(page + 1, limit),
      });
    }
  }, [query.data, page, limit, queryClient]);

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(["products", page]);
      const previousData = queryClient.getQueryData(["products", page]);
      queryClient.setQueryData(["products", page], (old) => ({
        ...old,
        products: old.products.filter((p) => p._id !== id),
      }));
      return { previousData };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["products", page], context.previousData);
    },
  });

  return {
    ...query,
    products: query.data?.products || [],
    total: query.data?.total || 0,
    page,
    setPage,
    limit,
    deleteProduct: deleteMutation.mutate,
    deleting: deleteMutation.isLoading,
  };
}
