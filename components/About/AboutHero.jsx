"use client";

import { Parallax } from "react-parallax";
import { motion } from "framer-motion";

const AboutHero = ({
  title = "Grandma’s Essence",
  subtitle = "Brewing Memories, One Cup at a Time",
  tagline = "Inspired by music, crafted with passion.",
  bgImage = "https://images.pexels.com/photos/27777798/pexels-photo-27777798.jpeg",
  strength = 225,
}) => {
  return (
    <div className="header relative">
      <Parallax
        bgImage={bgImage}
        bgImageStyle={{ objectFit: "cover" }}
        strength={strength}
      >
        {/* Dark Overlay with fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 z-10"
        ></motion.div>

        {/* Content */}
        <div className="relative z-20 h-[550px] md:h-[750px] flex flex-col items-center justify-center text-center px-6">
          {/* Title with zoom & fade */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="uppercase font-bold text-white 
              text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
              tracking-wide drop-shadow-xl"
          >
            {title}
          </motion.h1>

          {/* Subtitle with slide-up + delay */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="mt-6 bg-amber-600/80 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-xl"
            >
              <p
                className="text-white 
                  text-sm sm:text-lg md:text-xl lg:text-2xl 
                  font-light italic tracking-wider max-w-2xl"
              >
                {subtitle}
              </p>
            </motion.div>
          )}

          {/* Tagline with fade-in delay */}
          {tagline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
              className="mt-4 text-white text-xs sm:text-base md:text-lg lg:text-xl font-medium tracking-wide drop-shadow-lg w-full max-w-3xl"
            >
              {tagline}
            </motion.p>
          )}

          {/* Decorative underline with scale animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.3 }}
            className="mt-6 w-24 h-1 bg-amber-500 rounded-full origin-center"
          ></motion.div>
        </div>
      </Parallax>
    </div>
  );
};

export default AboutHero;
