"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, ShoppingBag, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", icon: <Coffee className="w-5 h-5" /> },
  { title: "My Orders", icon: <ShoppingBag className="w-5 h-5" /> },
  { title: "Profile", icon: <User className="w-5 h-5" /> },
  { title: "Settings", icon: <Settings className="w-5 h-5" /> },
];

const Page = () => {
  return (
    <div className="flex min-h-screen">
   
      {/* Main Dashboard */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <h2 className="text-4xl font-bold">Welcome back, Coffee Lover 👋</h2>
          <p className="text-gray-300 mt-2">Here’s your personalized dashboard.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Total Orders", value: "15" },
            { title: "Loyalty Points", value: "320" },
            { title: "Membership", value: "Gold" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <h3 className="text-lg ">{stat.title}</h3>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Orders Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {[
              { item: "Cappuccino", date: "Sep 8, 2025", status: "Delivered" },
              { item: "Latte", date: "Sep 4, 2025", status: "Pending" },
              { item: "Espresso", date: "Sep 1, 2025", status: "Delivered" },
            ].map((order, i) => (
              <div
                key={i}
                className="flex justify-between items-center  p-4 rounded-xl"
              >
                <span>{order.item}</span>
                <span className="text-gray-400">{order.date}</span>
                <span
                  className={`px-3 py-1 rounded-lg text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-600/30 text-green-400"
                      : "bg-yellow-600/30 text-yellow-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Page;
