"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Users, Package, BarChart } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", sales: 20 },
  { name: "Tue", sales: 35 },
  { name: "Wed", sales: 25 },
  { name: "Thu", sales: 45 },
  { name: "Fri", sales: 60 },
  { name: "Sat", sales: 30 },
  { name: "Sun", sales: 50 },
];

const stats = [
  { title: "Orders", value: "1,245", icon: <Package />, delay: 0.1 },
  { title: "Customers", value: "578", icon: <Users />, delay: 0.2 },
  { title: "Revenue", value: "$12,450", icon: <Coffee />, delay: 0.3 },
  { title: "Growth", value: "23%", icon: <BarChart />, delay: 0.4 },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold tracking-tight text-coffee-900"
      >
        ☕ Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: stat.delay }}
          >
            <Card className="shadow-lg rounded-2xl border border-coffee-200 hover:shadow-xl transition">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-xl font-semibold">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-coffee-100 text-coffee-700">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sales Chart */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Card className="shadow-xl rounded-2xl border border-coffee-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Weekly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#6B4F4F" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#6B4F4F" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
