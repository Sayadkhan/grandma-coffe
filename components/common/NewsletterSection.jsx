"use client";

import { motion } from "framer-motion";

export default function NewsletterSection() {
  return (
    <section className="relative bg-gray-50 py-20 px-6 flex flex-col items-center text-center">

      {/* Content */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-2xl md:text-3xl font-serif text-gray-800 relative z-10"
      >
        Never miss out
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-gray-600 mt-3 max-w-md relative z-10"
      >
        Join our mailing list and stay up-to-date on new products, promotions and
        all things coffee.
      </motion.p>

      {/* Input + Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-8 flex relative z-10"
      >
        <input
          type="email"
          placeholder="Enter email"
          className="px-4 py-3 w-72 border border-gray-300 focus:ring-2 focus:ring-yellow-700 rounded-l-md outline-none"
        />
        <button className="px-6 bg-yellow-800 text-white font-semibold rounded-r-md hover:bg-yellow-700 transition">
          SIGN UP
        </button>
      </motion.div>
    </section>
  );
}
