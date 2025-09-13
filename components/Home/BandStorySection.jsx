"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BandStory() {
  return (
    <section className="bg-[#f9f7f4] py-20 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        {/* Left Side (Title) */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }} // <-- animate every scroll
        >
        <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] leading-snug">
          Rooted in Haiti,{" "}
          <span className="border-b-4 border-[#c9a36b]">
            Shared with the World
          </span>
        </h2>

        </motion.div>

        {/* Right Side (Description) */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false }}
          >
            <p className="text-lg text-[#444] leading-relaxed">
              My love for coffee began as a child growing up in Haiti, where some of my
              fondest memories were walking through coffee farms and breathing in the
              rich aroma of freshly roasted beans. I saw firsthand how coffee sustained
              families and brought people together, and that passion has stayed with me
              ever since.
            </p>
            <p className="mt-4 text-lg text-[#444]">
              Today, that same love drives me to share not only the flavors of Haiti but
              also the unique coffees of Sumatra, Ethiopia, and Costa Rica. For me,
              coffee is more than a drink—it’s culture, connection, and a story that I’m
              proud to carry forward.
            </p>

            {/* Learn More Link */}
            <Link
              href="/about"
              className="mt-6 inline-block text-[#c9a36b] font-semibold underline underline-offset-4 hover:text-[#b8925e] transition"
            >
              Learn More About Our Story →
            </Link>
          </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-16 text-center mx-5 md:mx-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: false }} // <-- animate every scroll
      >
        <p className="text-gray-600 mb-2">There’s always more</p>
        <h3 className="text-2xl font-semibold mb-6">Stay Connected</h3>
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-[#c9a36b] text-white font-semibold uppercase tracking-wide rounded hover:bg-[#b8925e] transition"
          >
            Contact Us
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-[#2d2d2d] text-[#2d2d2d] font-semibold uppercase tracking-wide rounded hover:bg-[#2d2d2d] hover:text-white transition"
          >
            Buy Merchandise
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
