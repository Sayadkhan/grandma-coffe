"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  const formRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    e.target.reset(); // quick reset
  };

  return (
    <div className="mb-20 container mx-auto min-h-screen mt-32 px-6">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center text-brown-900"
      >
        Contact <span className="text-amber-700">Us</span>
      </motion.h2>
      <p className="text-center text-gray-600 mt-3 max-w-xl mx-auto">
        We’d love to hear from you! Whether you have questions, feedback, or
        just want to say hi—drop us a message below.
      </p>

      {/* Wrapper */}
      <div className="flex mt-12">
        <div className="flex flex-col lg:flex-row w-full gap-10">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            ref={formRef}
            onSubmit={sendEmail}
            className="flex-[1] bg-white p-8 shadow-md rounded-2xl space-y-6 border border-gray-100"
          >
            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Phone No
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Your Message
              </label>
              <textarea
                placeholder="Enter your message"
                rows="5"
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 resize-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-[#4a1f14]  text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Submit
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex-[1] bg-amber-50 p-8 shadow-md rounded-2xl flex flex-col gap-8"
          >
            <div className="flex items-start gap-4">
              <MapPin className="text-amber-700 mt-1" />
              <div>
                <p className="font-semibold text-lg text-gray-900">
                  Return Address for Online Orders:
                </p>
                <p className="text-gray-700">
                  1600 Pennsylvania Ave NW, Washington, DC 20500
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-amber-700 mt-1" />
              <div>
                <p className="font-semibold text-lg text-gray-900">
                  Phone Number:
                </p>
                <p className="text-amber-700 font-medium">012-345-6789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-amber-700 mt-1" />
              <div>
                <p className="font-semibold text-lg text-gray-900">
                  Email Address:
                </p>
                <p className="text-amber-700 font-medium">
                  contact@euphoria.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-amber-700 mt-1" />
              <div>
                <p className="font-semibold text-lg text-gray-900">
                  Opening Hours:
                </p>
                <p className="text-gray-700">Mon-Sat: 10:00am - 8:00pm</p>
                <p className="text-gray-700">Sun: 11:00am - 9:00pm</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
