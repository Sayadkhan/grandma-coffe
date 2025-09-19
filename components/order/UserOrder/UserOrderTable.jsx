"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

const steps = ["pending", "processing", "shipped", "delivered"];

const UserOrderGrid = ({ ordersData }) => {
  const user = useSelector((state) => state.customer.customer);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const rowsPerPage = 6;

  // Filter Orders
  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const idMatch = order._id.includes(search);
      const dateMatch = new Date(order.createdAt)
        .toLocaleDateString()
        .includes(search);
      const statusMatch = order.deliveryStatus
        .toLowerCase()
        .includes(search.toLowerCase());

      return idMatch || dateMatch || statusMatch;
    });
  }, [ordersData, search]);

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="p-8 bg-gradient-to-b from-[#fdfcfb] to-[#f8f6f3] min-h-screen">
      {/* Title */}
      <motion.h1
        className="text-3xl font-extrabold mb-6 text-center text-[#3c2a21]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ☕ All Orders of {user?.name || "Customer"}
      </motion.h1>

      {/* Search / Filter */}
      <div className="max-w-md mx-auto mb-8">
        <Input
          placeholder="Search by Order ID, Date, or Status..."
          value={search}
          onChange={(e) => {
            setCurrentPage(1);
            setSearch(e.target.value);
          }}
          className="rounded-full shadow-md"
        />
      </div>

      {/* Orders Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence>
          {currentOrders.map((order, i) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl shadow-lg border border-gray-200 bg-white flex flex-col justify-between"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  #{order.orderId}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.deliveryStatus === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.deliveryStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.deliveryStatus}
                </span>
              </div>

              {/* Product Preview */}
          {/* Product Preview - show all items */}
              <div className="flex flex-wrap gap-3 mb-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg shadow-sm w-full"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">
                        {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price & Date */}
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <p>
                  <span className="font-semibold">Total:</span> $
                  {order.totalPrice}
                </p>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Actions */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full rounded-full shadow-md">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                      Order #{order._id.slice(-6)}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Customer Info */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Customer Info
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {order.address?.label} - {order.address?.state},{" "}
                        {order.address?.city}, {order.address?.country}
                      </p>
                    </div>

                    {/* Items */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between border-b pb-2"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-800">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  ${item.price} × {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-gray-700">
                              ${item.price * item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tracking */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Order Tracking
                      </h3>
                      <div className="flex items-center justify-between">
                        {steps.map((step, idx) => {
                          const currentIndex = steps.indexOf(
                            order.deliveryStatus
                          );
                          const isActive = idx <= currentIndex;

                          return (
                            <div
                              key={step}
                              className="flex flex-col items-center flex-1"
                            >
                              <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-xs font-bold ${
                                  isActive
                                    ? "bg-green-500 text-white border-green-500"
                                    : "bg-gray-200 text-gray-500 border-gray-300"
                                }`}
                              >
                                {idx + 1}
                              </div>
                              <p
                                className={`mt-2 text-sm ${
                                  isActive
                                    ? "text-green-600 font-medium"
                                    : "text-gray-500"
                                }`}
                              >
                                {step}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </AnimatePresence>
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

export default UserOrderGrid;
