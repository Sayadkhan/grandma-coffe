"use client";

import React, { useState, memo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { fetchProduct } from "@/utils/api";

// ✅ Delete product API
async function deleteProduct(id) {
  const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

// ✅ Row Component
const ProductRow = memo(({ product, idx, page, limit, onDelete }) => (
  <motion.tr
    key={product._id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="border-b last:border-0"
  >
    <TableCell>{(page - 1) * limit + idx + 1}</TableCell>
    <TableCell className="font-medium">{product.name}</TableCell>
    <TableCell>${product.price.toFixed(2)}</TableCell>
    <TableCell>{product.stock}</TableCell>
    <TableCell>{product.category || "—"}</TableCell>
    <TableCell>
      {product.images?.[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-12 h-12 rounded-lg object-cover border"
        />
      ) : (
        "—"
      )}
    </TableCell>
    <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
    <TableCell>
      <div className="flex gap-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 hover:scale-105 hover:text-blue-600"
        >
          <Link href={`/admin/product/edit/${product._id}`}>
            <Edit2 size={16} />
            Edit
          </Link>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-1 hover:scale-105 hover:bg-red-700"
          onClick={() => onDelete(product._id)}
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
    </TableCell>
  </motion.tr>
));
ProductRow.displayName = "ProductRow";

// ✅ Data component (Suspense aware)
const ProductTable = ({ page, setPage, limit }) => {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProduct(page, limit),
    keepPreviousData: true,
    staleTime: 60 * 1000,
    suspense: true, 
  });

  const products = data?.products || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => {
      alert("❌ Error deleting product: " + err.message);
    },
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      mutation.mutate(id);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {products.map((product, idx) => (
                <ProductRow
                  key={product._id}
                  product={product}
                  idx={idx}
                  page={page}
                  limit={limit}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages} {isFetching && " (Updating...)"}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

const AllProductsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full mx-auto bg-white rounded-2xl shadow-xl p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Products
        </h1>

        <Suspense fallback={<p className="text-center text-gray-500">Loading products...</p>}>
          <ProductTable page={page} setPage={setPage} limit={limit} />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default AllProductsPage;
