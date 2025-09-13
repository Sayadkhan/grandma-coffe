"use client";

import React from "react";
import Image from "next/image"; 
import { ImageAbout } from "./Story/ImageAbout";
import { motion } from "framer-motion";
import Link from "next/link";

// Container stagger
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

// Fade-up for text
const textVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Scale + fade for images
const imageVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
};

// Buttons bounce-in
const buttonVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "backOut" },
  },
};

const AboutStory = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Section Content */}
        <motion.div
          className="my-16 md:my-20 text-center max-w-4xl mx-auto px-4 sm:px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Title */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
            variants={textVariant}
          >
            Our Story
          </motion.h2>

          {/* Paragraphs */}
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 text-gray-700"
            variants={textVariant}
          >
            My love for coffee began as a child growing up in Haiti, where some
            of my fondest memories were walking through coffee farms and
            breathing in the rich aroma of freshly roasted beans. I saw
            firsthand how coffee sustained families and brought people together,
            and that passion has stayed with me ever since.
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 text-gray-700"
            variants={textVariant}
          >
            Today, that same love drives me to share not only the flavors of
            Haiti but also the unique coffees of Sumatra, Ethiopia, and Costa
            Rica. For me, coffee is more than a drink—it’s culture, connection,
            and a story that I’m proud to carry forward.
          </motion.p>

          {/* Bold Statement */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-6"
            variants={textVariant}
          >
            That’s when my coffee journey truly began.
          </motion.p>
        </motion.div>

        {/* Images */}
        <motion.div
          className="px-4 sm:px-6 md:px-8"
          variants={imageVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ImageAbout />
        </motion.div>

        {/* Legend Behind the Name Section */}
        <motion.section
          className="flex flex-col items-center text-center py-16 px-6 bg-white"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Top Image */}
          <motion.div
            className="w-full max-w-2xl mb-8"
            variants={imageVariant}
          >
            <Image
              src="https://images.pexels.com/photos/134577/pexels-photo-134577.jpeg"
              alt="Coffee Legend"
              width={700}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-gray-700 leading-relaxed max-w-2xl mb-10 text-lg md:text-xl"
            variants={textVariant}
          >
            This isn’t just about coffee. It’s about honoring traditions,
            celebrating culture, and creating moments of connection. Every cup
            tells a story, and I’m honored to share mine with you.
            <br />
            <br />
            — <strong>Jenny Myrthelay Noel</strong>
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
          >
            <motion.button
              className="bg-yellow-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-700 transition"
              variants={buttonVariant}
            >
              <Link className="text-white" href="/shop">
                BUY COFFEE ONLINE
              </Link>
            </motion.button>
            <motion.button
              className="bg-yellow-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-700 transition"
              variants={buttonVariant}
            >
              <Link className="text-white" href="/contact">
                CONTACT US
              </Link>
            </motion.button>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutStory;
