"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Coffee } from "lucide-react";
import { setCustomer } from "@/redux/slice/customerSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

      try {
        const res = await axios.post("/api/auth/sign-in", formData, {
          withCredentials: true, 
        });
      
        router.push("/user/dashboard");
        dispatch(setCustomer(res.data.customer));
  
      } catch (err) {
        console.error("Login error:", err);
        setError(
          err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left side */}
        <div className="relative hidden md:flex flex-col items-center justify-center bg-amber-800 text-white p-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <Coffee className="mx-auto w-16 h-16 mb-4 text-amber-200" />
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="mt-4 text-amber-100 text-sm leading-relaxed">
              Sign in to manage your coffee brand ☕ <br />
              Access your dashboard, products & more.
            </p>
          </motion.div>
        </div>

        {/* Right side - Login Form */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="p-10 flex flex-col justify-center">

          <div className="flex flex-col items-center mb-6">
            <Image src={"/logo-2.png"} width={70} height={70} alt="Logo" />
            <p className="text-lg md:text-xl text-amber-800 mt-3 font-semibold">Grandma’s Essence</p>
          </div>

          <h2 className="text-2xl font-bold text-amber-800 text-center mb-6">Sign In to Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="user@coffee.com"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
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

            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm">{error}</motion.p>}

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-amber-700 hover:underline">Forgot password?</Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-700 text-white font-semibold shadow-md hover:bg-amber-800 transition disabled:opacity-50"
            >
              {loading ? "☕ Brewing your login..." : "Login"}
            </motion.button>

            <p className="text-center text-sm text-gray-700 mt-4">
              No account? <Link href="/sign-up" className="text-amber-700 font-medium hover:underline">Sign up</Link>
            </p>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            © {new Date().getFullYear()} Coffee Brand. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
