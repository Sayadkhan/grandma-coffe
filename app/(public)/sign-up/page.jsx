"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Coffee, X } from "lucide-react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";


const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, profileImage: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("mobile", formData.mobile);
      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      }

      const res = await axios.post("/api/auth/sign-up", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Signup response:", res.data);
      router.push("/sign-in");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 flex items-center justify-center px-4 py-10 mt-24 mb-10">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left side - Coffee vibes */}
        <div className="relative hidden md:flex flex-col items-center justify-center bg-amber-800 text-white p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <Coffee className="mx-auto w-16 h-16 mb-4 text-amber-200" />
            <h1 className="text-3xl font-bold">Welcome to Coffee Band</h1>
            <p className="mt-4 text-amber-100 text-sm leading-relaxed">
              Join our community of coffee lovers ☕ <br />
              Enjoy fresh brews, exclusive deals & a cozy experience.
            </p>
          </motion.div>
        </div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="p-10"
        >
          <h2 className="text-2xl font-bold text-amber-800 text-center mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
        {["name", "email", "password", "mobile"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field === "mobile" ? "Mobile Number" : field}
              </label>

              {field === "mobile" ? (
                <PhoneInput
                country={"us"}
                value={formData.mobile}
                onChange={(value) => setFormData({ ...formData, mobile: value })}
                inputClass="!w-full !py-3 !pl-12 !pr-4 !rounded-xl !border !border-gray-300 focus:!border-amber-600 focus:!ring-2 focus:!ring-amber-600 outline-none shadow-sm text-base"
                buttonClass="!bg-white !border-none !absolute !left-2 !top-1/2 !-translate-y-1/2 !rounded-lg hover:!bg-gray-50"
                dropdownClass="!rounded-lg !shadow-lg !border !border-gray-200"
                containerClass="relative w-full"
              />
              ) : (
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "name"
                      ? "John Doe"
                      : field === "email"
                      ? "user@coffee.com"
                      : field === "password"
                      ? "••••••••"
                      : ""
                  }
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                            focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition-all"
                />
              )}
            </div>
          ))}

            {/* Profile Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>

              <div className="relative flex items-center justify-center w-full">
                <label
                  htmlFor="profileImage"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-amber-400 rounded-xl cursor-pointer bg-amber-50/40 hover:bg-amber-100 transition"
                >
                  {formData.profileImage ? (
                    <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md">
                      <Image
                        src={URL.createObjectURL(formData.profileImage)}
                        alt="Profile Preview"
                        fill
                        className="object-cover"
                      />
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-50"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-amber-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 mb-2 text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16V4m0 12l-4-4m4 4l4-4m6 4h2a2 2 0 002-2V8a2 2 0 00-2-2h-2m-4 0V4a2 2 0 00-2-2H7a2 2 0 00-2 2v4"
                        />
                      </svg>
                      <p className="text-sm">Click or drag & drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
                  )}
                  <input
                    id="profileImage"
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm"
              >
                {error}
              </motion.p>
            )}

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-700 text-white font-semibold shadow-md hover:bg-amber-800 transition disabled:opacity-50"
            >
              {loading ? "☕ Brewing your account..." : "Sign Up"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-700 mt-6">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-amber-700 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
