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
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Delete, Edit2, Eye } from "lucide-react";
import OrderModal from "./OrderModal";
import ViewModal from "./ViewModal";



const OrderTable = ({ orders: initialOrders = [], pageSize = 5 }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [page, setPage] = useState(1);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);

  const totalPages = Math.ceil(orders.length / pageSize);
  const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize);

  // ✅ SINGLE PATCH METHOD FOR ANY UPDATE
  const patchOrder = async (orderId, updates) => {
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Failed to update order");

      const updatedOrder = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    }
  };


  const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this order?")) return;

  try {
    const res = await fetch(`/api/orders/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete order");

    // Remove order from local state
    setOrders((prev) => prev.filter((order) => order._id !== id));
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete order");
  }
};


  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  return (
    <Card className="shadow-md rounded-2xl p-4">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Orders</h2>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold">Serial</TableHead>
                <TableHead className="font-semibold">Order ID</TableHead>
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Total</TableHead>
                <TableHead className="font-semibold">Payment Method</TableHead>
                <TableHead className="font-semibold">Delivery Status</TableHead>
                <TableHead className="font-semibold">Payment Status</TableHead>
                <TableHead className="font-semibold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, index) => (
                  <TableRow key={order._id} className="hover:bg-gray-50">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order._id.slice(-6).toUpperCase()}</TableCell>
                    <TableCell>{order.user?.name || "Guest"}</TableCell>
                    <TableCell>{order.user?.email || "N/A"}</TableCell>
                    <TableCell>${order.totalPrice?.toFixed(2)}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>

                    {/* ✅ Delivery Status Dropdown */}
                    <TableCell>
                      <select
                        value={order.deliveryStatus}
                        onChange={(e) =>
                          patchOrder(order._id, {
                            deliveryStatus: e.target.value,
                          })
                        }
                        className="border rounded-md p-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </TableCell>

                    {/* ✅ Payment Status Dropdown */}
                    <TableCell>
                      <select
                        value={order.PaymentStatus}
                        onChange={(e) =>
                          patchOrder(order._id, {
                            PaymentStatus: e.target.value,
                          })
                        }
                        className="border rounded-md p-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="pending_payment">Pending Payment</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingOrder(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>


                        {/* ✅ Edit Button Opens Modal */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingOrder(order)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>

                         <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(order._id)}
                          >
                            <Delete className="w-4 h-4" />
                          </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={page === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </Button>

            <p className="text-sm">
              Page <span className="font-bold">{page}</span> of{" "}
              <span className="font-bold">{totalPages}</span>
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={page === totalPages}
              className="flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>

      {/* ✅ Edit Modal */}
      {editingOrder && (
        <OrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={(updatedData) => patchOrder(editingOrder._id, updatedData)}
        />
      )}

      {viewingOrder && (
      <ViewModal
        order={viewingOrder}
        onClose={() => setViewingOrder(null)}
      />
    )}  
    </Card>
  );
};

export default OrderTable;
