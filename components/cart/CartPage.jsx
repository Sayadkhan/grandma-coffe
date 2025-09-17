"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "@/redux/slice/cartSlice";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CartPage = ({ setCartOpen }) => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const user = useSelector((state) => state.customer.customer);



const filterIteambyUser = items.filter(item => item.userId === user?._id);


  

  const router = useRouter();
  const [checkoutOpen, setCheckoutOpen] = useState(false);


  const openCheckout = () => {
    setCartOpen(false); // close sidebar
    router.push("/checkout");
  };

  return (
    <>
      {/* ================= Cart Sidebar ================= */}
      <AnimatePresence>
        {!checkoutOpen && (
          <>
        <div>
          {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed top-0 right-0 h-screen w-[90%] max-w-sm bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-amber-900">
                  Your Cart
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-amber-900 hover:text-amber-700 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {filterIteambyUser.length === 0  ? (
                  <p className="text-center text-gray-500">
                    🛒 No items in your cart yet.
                  </p>
                ) : (
                  filterIteambyUser.map((item) => (
                    <motion.div
                      key={item.productId + (item.variant?._id || "base")}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-amber-900">
                          {item.name}
                        </h3>
                        {item.variant?.packetSize && (
                          <p className="text-xs text-gray-500">
                            Variant: {item.variant.packetSize}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-amber-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              productId: item.productId,
                              variantId: item.variant?._id || null,
                            })
                          )
                        }
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {filterIteambyUser.length > 0 && (
                <div className="border-t px-6 py-4 bg-gray-50">
                  <div className="flex justify-between text-amber-900 font-medium">
                    <span>Total ({totalQuantity} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => dispatch(clearCart())}
                      className="flex-1 border border-red-600 text-red-600 rounded-lg py-2 hover:bg-red-50 transition"
                    >
                      Clear Cart
                    </button>
                    <Button
                      onClick={openCheckout}
                      className="flex-1 bg-amber-700 text-white rounded-lg py-2 hover:bg-amber-800 transition"
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              )}
            </motion.aside>
        </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartPage;
