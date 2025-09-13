"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WholesaleHero() {
  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center text-center overflow-hidden ">
      {/* Background Image */}
      <Image
        src="https://images.pexels.com/photos/1627933/pexels-photo-1627933.jpeg" // replace with your image path
        alt="Coffee Beans"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 max-w-3xl text-white mx-2 my-2 md:mx-0 md:my-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }} // animate every scroll
      >
        <p className="uppercase text-sm mb-2 tracking-wider">We're more than a café</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Explore Wholesale
        </h1>
        <p className="text-lg md:text-xl mb-6">
          From bulk coffee orders to café consultation and equipment servicing and beyond, we’ve got you covered.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-[#c9a36b] text-white font-semibold uppercase tracking-wide rounded hover:bg-[#b8925e] transition"
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
}
