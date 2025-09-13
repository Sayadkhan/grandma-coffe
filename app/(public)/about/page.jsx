"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NewsletterSection from "@/components/common/NewsletterSection";

const sections = [
  {
    title: "Our Story",
    desc: "From small farms to your cup, discover how our passion for coffee began.",
    img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80", 
    link: "/about/story",
  },
  {
    title: "Our Process",
    desc: "Crafted with precision – from bean selection to artisanal roasting.",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    link: "/about/process",
  },
  {
    title: "Our People",
    desc: "Meet the farmers, roasters, and baristas who bring coffee to life.",
    img: "https://images.pexels.com/photos/33492608/pexels-photo-33492608.jpeg", 
    link: "/about/people",
  },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
  }),
};

export default function AboutPage() {
  return (
    <div className="bg-[#f9f5f2]">
      {/* Hero Section */}
<div className="relative w-full h-[60vh] flex items-center justify-center bg-[url('https://images.pexels.com/photos/796614/pexels-photo-796614.jpeg')] bg-cover bg-center">
  <div className="absolute inset-0 bg-black/50" />
  <motion.h1
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="relative z-10 text-white text-5xl md:text-6xl font-bold tracking-wide text-center"
  >
    Our Band of Coffee
  </motion.h1>
  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.3 }}
    className="absolute mt-32 text-white text-lg md:text-xl max-w-2xl text-center px-4"
  >
    More than coffee — a journey of story, process, and people.
  </motion.p>
</div>


      {/* Headline Section */}
<div className="text-center max-w-3xl mx-auto px-6 mt-20">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
    More Than Just Coffee – A Journey of <span className="text-amber-600">Story</span>, <span className="text-amber-600">Process</span>, and <span className="text-amber-600">People</span>
  </h2>
  <p className="mt-4 text-lg text-gray-600">
    We don’t believe in a single way of doing things. Every cup we serve is shaped by many steps – our unique story, our careful process, and the people behind it all.
  </p>
</div>


      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition"
          >
            <div className="relative w-full h-60">
              <Image
                src={sec.img}
                alt={sec.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-6 flex flex-col items-start">
              <h2 className="text-xl font-bold text-gray-800">{sec.title}</h2>
              <p className="text-gray-600 mt-3 mb-5">{sec.desc}</p>
              <Link
                href={sec.link}
                className="mt-auto inline-block bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full shadow-md transition"
              >
                Explore →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <NewsletterSection/>
    </div>
  );
}
