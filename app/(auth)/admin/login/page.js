"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCredentials, setUser } from "@/redux/slice/authSlice";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/auth/login", formData);

      const userRes = await axios.get("/api/auth/me", {
        withCredentials: true,
      });

      // Store user in Redux
      dispatch(setUser(userRes.data));

      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      console.error("Login error:", err.response?.data?.message || err.message);
      setError(
        err.response?.data?.message || err.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg')] bg-cover bg-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8"
      >
        {/* Logo */}
        <div className="flex flex-col gap-3 items-center justify-center mb-6">
          <div>
            <Image src={"/logo-2.png"} width={80} height={80} alt="Logo" />
          </div>
          <p className="text-lg md:text-xl text-amber-800 mb-8 font-semibold">
            Grandma’s Essence
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@coffee.com"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-700 text-white font-semibold shadow-md hover:bg-amber-800 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © {new Date().getFullYear()} Coffee Brand. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
