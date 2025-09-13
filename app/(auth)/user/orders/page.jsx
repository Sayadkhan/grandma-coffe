"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const ordersData = [
  { id: 1, customer: "John Doe", product: "Espresso", status: "Delivered", date: "2025-09-10" },
  { id: 2, customer: "Jane Smith", product: "Latte", status: "Pending", date: "2025-09-09" },
  { id: 3, customer: "Michael Brown", product: "Cappuccino", status: "Shipped", date: "2025-09-08" },
  { id: 4, customer: "Emily Davis", product: "Mocha", status: "Delivered", date: "2025-09-07" },
  { id: 5, customer: "Chris Lee", product: "Flat White", status: "Pending", date: "2025-09-06" },
  { id: 6, customer: "Sophia Wilson", product: "Americano", status: "Shipped", date: "2025-09-05" },
  { id: 7, customer: "Daniel Johnson", product: "Cold Brew", status: "Delivered", date: "2025-09-04" },
  { id: 8, customer: "Daniel Johnson", product: "Cold Brew", status: "Delivered", date: "2025-09-04" },
  { id: 9, customer: "Daniel Johnson", product: "Cold Brew", status: "Delivered", date: "2025-09-04" },
  { id: 10, customer: "Daniel Johnson", product: "Cold Brew", status: "Delivered", date: "2025-09-04" },
];

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(ordersData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentOrders = ordersData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-8 bg-gradient-to-b from-[#fdfcfb] to-[#f8f6f3] min-h-screen">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center text-[#4b2e2e]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ☕ All Orders
      </motion.h1>

      {/* Orders Table */}
      <motion.div
        className="rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f3ede7]">
              <TableHead className="text-[#4b2e2e] font-semibold">Order ID</TableHead>
              <TableHead className="text-[#4b2e2e] font-semibold">Product</TableHead>
              <TableHead className="text-[#4b2e2e] font-semibold">Quantity</TableHead>
              <TableHead className="text-[#4b2e2e] font-semibold">Status</TableHead>

              <TableHead className="text-[#4b2e2e] font-semibold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {currentOrders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:bg-[#faf6f3] transition cursor-pointer"
                >
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>

      {/* Pagination */}
      <motion.div
        className="flex justify-between items-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="rounded-full px-6 py-2 shadow-md"
        >
          ← Previous
        </Button>

        <p className="text-sm text-gray-700">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </p>

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="rounded-full px-6 py-2 shadow-md"
        >
          Next →
        </Button>
      </motion.div>
    </div>
  );
};

export default Page;
