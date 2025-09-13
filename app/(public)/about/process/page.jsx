"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import AboutHero from "@/components/About/AboutHero";
import Image from "next/image";
import NewsletterSection from "@/components/common/NewsletterSection";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Sourcing",
    content: [
      "Our strategy is simple: Buy the best quality coffee. Carry a wide variety of flavor profiles. Find something unique to offer our customers.",
      "We only carry specialty coffee, which means it was graded at least 80 points — usually higher — on the Specialty Coffee Association’s 100-point scale.",
      "That’s why we take such great care when sourcing. We work closely with importers to find coffees that are the best quality, but also interesting and unique.",
    ],
    image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg",
    facts: ["80+ point graded", "Farmer-direct sourcing", "Unique flavors"],
  },
  {
    title: "Roasting",
    subtitle: "What Is A Coffee Bean?",
    content: [
      "The coffee “bean” is actually the seed of a berry. Dense, green and hard as a rock, they’re not something you’d normally associate with your aromatic cup of joe.",
      "The magic of turning green, stone-like seeds into coffee happens during roasting — a process that unlocks aroma, flavor, and balance.",
    ],
    image: "/Raw_green_coffee_image_540x (1).webp",
    facts: ["Custom roast profiles", "Expert roasters", "Hand-crafted flavors"],
  },
  {
    title: "Single-Origin",
    content: [
      "For each type of single-origin coffee, we develop a unique roast profile.",
      "It takes trial and error to balance inherent character with flavors that develop throughout roasting.",
      "Each cup is a journey back to its origin — rich, authentic, and memorable.",
    ],
    images: [
      "https://images.pexels.com/photos/302901/pexels-photo-302901.jpeg",
      "https://images.pexels.com/photos/302902/pexels-photo-302902.jpeg",
    ],
    facts: ["Origin-specific taste", "Farm-to-cup story", "Seasonal availability"],
  },
  {
    title: "Blending Philosophy",
    content: [
      "Blending coffee is both a science and an art. At Grandma’s Essence, we carefully combine beans from different origins to create harmonious flavor experiences.",
      "This process requires expertise in balancing acidity, body, and aroma while respecting the unique character of each bean.",
      "The result? Complex, layered flavors that can’t be achieved with single origins alone.",
    ],
    facts: ["Balanced flavors", "Signature blends", "Expert craftsmanship"],
  },
  {
    title: "Sustainability & Ethics",
    content: [
      "We believe coffee should not only taste good but also do good. That’s why we prioritize sustainability across our sourcing, roasting, and packaging practices.",
      "From working with farmers who use eco-friendly practices to using biodegradable packaging, every step reflects our responsibility toward the planet.",
    ],
    facts: ["Eco-friendly packaging", "Fair trade focus", "Sustainable sourcing"],
  },
];

const faqs = [
  {
    q: "What makes Grandma’s Essence coffee special?",
    a: "We source only specialty-grade beans (80+ points) and carefully roast them to bring out their unique character and flavor.",
  },
  {
    q: "Do you offer both single-origin and blends?",
    a: "Yes! We specialize in both. Our single-origin coffees highlight unique regional flavors, while our blends create balanced, complex profiles.",
  },
  {
    q: "Is your coffee ethically sourced?",
    a: "Absolutely. We partner with importers and farmers who ensure sustainable practices and fair compensation for growers.",
  },
  {
    q: "Do you roast to order?",
    a: "Yes, our coffee is roasted in small batches to guarantee freshness and consistency in every bag.",
  },
];

const Page = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 80 },
          {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%", // earlier trigger
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <AboutHero
        title="Our Process"
        subtitle="Serving up the facts."
        tagline="For the curious kid in all of us, here’s everything you need to know — from beans to brewing — about Grandma’s Essence specialty coffee."
        bgImage="https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg"
      />

      {/* Intro */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6 font-serif">
          Our Coffee Journey
        </h2>
        <p className="text-lg md:text-xl text-amber-800 mb-8 max-w-3xl mx-auto">
          At Grandma’s Essence, every cup of coffee tells a story — from the
          rich soil where our beans are nurtured to the skilled hands that brew
          your perfect cup. Here’s a glimpse into our meticulous process that
          ensures every sip is a celebration of quality and flavor.
        </p>
      </div>

      {/* Process Sections */}
      <main className="bg-gradient-to-b from-amber-50 via-white to-amber-50">
        {sections.map((section, idx) => (
          <section
            key={idx}
            ref={(el) => (sectionRefs.current[idx] = el)}
            className={`max-w-7xl mx-auto py-20 px-6 md:px-12 lg:px-20 border-b border-gray-100 flex flex-col ${
              section.image || section.images
                ? "md:flex-row items-center gap-12 " +
                  (idx % 2 === 1 ? "md:flex-row-reverse" : "")
                : "text-left"
            }`}
          >
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: idx % 2 === 1 ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
                {section.title}
              </h2>
              {section.subtitle && (
                <h3 className="text-lg md:text-xl font-semibold text-amber-700 mb-4">
                  {section.subtitle}
                </h3>
              )}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {section.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Quick Facts */}
              {section.facts && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {section.facts.map((fact, i) => (
                    <span
                      key={i}
                      className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                    >
                      ☕ {fact}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Image(s) */}
            {(section.image || section.images) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex-1"
              >
                {section.image && (
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={800}
                      height={500}
                      className="rounded-2xl object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}
                {section.images && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative group overflow-hidden rounded-2xl shadow-lg"
                      >
                        <Image
                          src={img}
                          alt={`${section.title} ${i}`}
                          width={600}
                          height={400}
                          className="rounded-2xl object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </section>
        ))}

        {/* FAQ Section */}
        <section className="max-w-5xl mx-auto py-20 px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 font-serif text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border border-amber-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-700">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
    </>
  );
};

export default Page;
