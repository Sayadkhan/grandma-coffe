"use client";
import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Edit2, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useProductAdmin } from "@/hooks/useProductsAdmin";

// Utility for sorting
const sortData = (data, sortKey, direction) => {
  if (!sortKey) return data;
  return [...data].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (typeof valA === "string") return direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    if (typeof valA === "number") return direction === "asc" ? valA - valB : valB - valA;
    if (valA instanceof Date) return direction === "asc" ? valA - valB : valB - valA;
    return 0;
  });
};

const ProductTable = () => {
  const initialPage = 1;
  const limit = 10;

  const { products, page, setPage, total, isLoading, deleting, deleteProduct } =
    useProductAdmin({ initialPage, limit });

  const totalPages = Math.ceil(total / limit);

  // Sorting state
  const [sortKey, setSortKey] = useState("");
  const [sortDir, setSortDir] = useState("asc"); // or "desc"

  const sortedProducts = sortData(products, sortKey, sortDir);

  const handleDelete = (id) => deleteProduct(id);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Columns definition for sortable
  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "createdAt", label: "Created At", sortable: true },
  ];

  // Skeleton rows while loading
  if (isLoading) {
    return (
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: limit }).map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                <TableCell className="h-6 bg-gray-200 rounded"></TableCell>
                {columns.map((col) => (
                  <TableCell key={col.key} className="h-6 bg-gray-200 rounded"></TableCell>
                ))}
                <TableCell className="h-6 bg-gray-200 rounded"></TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="cursor-pointer select-none"
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key &&
                      (sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </TableHead>
              ))}
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {sortedProducts.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TableCell colSpan={columns.length + 2} className="text-center text-gray-500 py-6">
                    No products found.
                  </TableCell>
                </motion.tr>
              ) : (
                sortedProducts.map((product, idx) => (
                  <ProductRow
                    key={product._id}
                    product={product}
                    idx={idx}
                    page={page}
                    limit={limit}
                    onDelete={handleDelete}
                    deleting={deleting}
                  />
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button key={p} variant={p === page ? "default" : "outline"} size="sm" onClick={() => setPage(p)}>
              {p}
            </Button>
          ))}
        </div>

        <Button variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </>
  );
};

export default ProductTable;

const ProductRow = memo(({ product, idx, page, limit, onDelete, deleting }) => (
  <motion.tr
    key={product._id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="border-b last:border-0 hover:bg-gray-50"
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
      <div className="flex justify-end gap-2">
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
          disabled={deleting}
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
    </TableCell>
  </motion.tr>
));
ProductRow.displayName = "ProductRow";
