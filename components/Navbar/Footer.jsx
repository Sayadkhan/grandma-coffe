"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Music } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/grandmasessence?igsh=eDd2Y201aWNncG0y&utm_source=qr" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Spotify", icon: Music, href: "#" },
  ];

  return (
    <footer className="relative bg-[#2c1e1b] text-[#f9f7f4] overflow-hidden">
 
      {/* Background image with overlay */}
      <motion.div
        className="absolute inset-0 bg-[url('https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg')] bg-cover bg-center opacity-30"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1e1b] via-[#2c1e1b]/90 to-transparent" />

      {/* Floating coffee bean animation */}
      <motion.div
        className="absolute left-[10%] bottom-10 text-6xl opacity-20"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ☕
      </motion.div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pb-10 pt-8 z-10">
        <div className="grid md:grid-cols-4 gap-12 text-center md:text-left">
    
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="mb-4">
                <Image
                  src={"/logo-2.png"}
                  width={150}
                  height={150}
                  alt="Logo"
                  className="mx-auto md:mx-0"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
                Grandma’s Essence
              </h2>
              <p className="text-sm text-[#e0d9d5] leading-relaxed text-center md:text-left">
                Brewing soulful music with every note, just like coffee warms your heart. 
                Join our journey of rhythm, love, and beans.
              </p>
            </motion.div>
          <div>

          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-[#c19a6b] transition">About Us</Link></li>
              <li><Link href="/menu" className="hover:text-[#c19a6b] transition">Menu</Link></li>
              <li><Link href="/band" className="hover:text-[#c19a6b] transition">Our Band</Link></li>
              <li><Link href="/contact" className="hover:text-[#c19a6b] transition">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="mb-5">
           {/* Input + Button */}
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative w-full max-w-md "
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 pr-28 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-700 outline-none shadow-sm "
              />
              <button
                className="absolute right-1 top-1 bottom-1 px-5 bg-yellow-800 text-white font-semibold rounded-full hover:bg-yellow-700 transition-all shadow-md"
              >
                SIGN UP
              </button>
            </motion.div>
            </div>
                <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social, idx) => { 
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    target="_blank"
                    href={social.href}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="p-3 rounded-full bg-[#3a2824] hover:bg-[#c19a6b] transition shadow-lg"
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 text-center text-xs text-[#d1c7c3]"
        >
          © {new Date().getFullYear()} Grandma’s Essence Coffee Band. All Rights Reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
