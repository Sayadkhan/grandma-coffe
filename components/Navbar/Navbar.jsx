"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import CartPage from "../cart/CartPage";
import { logout } from "@/redux/slice/customerSlice";


const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dispatch = useDispatch()


   const handleLogout = () => {
      dispatch(logout());
      route.push("/");
    };
  // Redux state
  const { items } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.customer.customer);

  // Wait for hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter cart items only if mounted
  const filterIteambyUser =
    mounted && user ? items.filter((item) => item.userId === user?._id) : [];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    {
      name: "Our Story",
      href: "/about",
      subMenu: [
        {
          name: "Our Story",
          href: "/about/story",
          image:
            "https://images.pexels.com/photos/2074120/pexels-photo-2074120.jpeg",
        },
        {
          name: "Our Process",
          href: "/about/process",
          image:
            "https://images.pexels.com/photos/4350055/pexels-photo-4350055.jpeg",
        },
        {
          name: "Our People",
          href: "/about/people",
          image:
            "https://images.pexels.com/photos/5926957/pexels-photo-5926957.jpeg",
        },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  const activeLink = navLinks.find((link) => link.name === hoveredLink);

  const handleSubmenuToggle = (name) => {
    setOpenSubmenu((prev) => (prev === name ? null : name));
  };

  // Lock body scroll when drawer or cart is open
  useEffect(() => {
    if (mobileOpen || cartOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileOpen, cartOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link prefetch={false} href="/" className="flex items-center gap-2">
            <Image
              src="/logo-removebg-preview.png"
              width={80}
              height={80}
              alt="logo"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="relative flex-1 flex justify-center">
            <nav className="hidden md:flex items-center gap-8 relative z-20">
              {navLinks.map((link, idx) => (
                <Link
                  prefetch={false}
                  key={idx}
                  href={link.href}
                  onMouseEnter={() =>
                    setHoveredLink(link.subMenu ? link.name : null)
                  }
                  onClick={() => setHoveredLink(null)}
                  className={`relative font-medium transition-colors duration-300 ease-in-out ${
                    hoveredLink === link.name
                      ? "text-amber-700"
                      : "text-amber-900"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-amber-700 transition-all duration-500 ease-in-out ${
                      hoveredLink === link.name ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section - Desktop */}
          <div className="flex items-center gap-4 relative">
            {mounted && user ? (
              <div className="relative">
                {/* Profile Image */}
                <button
                  onClick={() =>
                    setOpenSubmenu(openSubmenu === "user" ? null : "user")
                  }
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-700"
                >
                  <Image
                    src={user.profileImage || "/default-profile.png"}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {openSubmenu === "user" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50 flex flex-col"
                    >
                      <Link
                        href="/user/dashboard"
                        onClick={() => setOpenSubmenu(null)}
                        className="px-4 py-2 text-amber-900 hover:bg-amber-50"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-amber-900 hover:bg-amber-50 text-left w-full"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/sign-in"
                  prefetch={false}
                  className="text-amber-900 font-medium hover:text-amber-700 transition hover:underline"
                >
                  Sign In
                </Link>
                <span>/</span>
                <Link
                  href="/sign-up"
                  prefetch={false}
                  className="text-amber-900 font-medium hover:text-amber-700 transition hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Shopping Cart */}
            <button onClick={() => setCartOpen(true)} aria-label="Cart">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-amber-900 hover:text-amber-700 transition duration-300 ease-in-out" />
                <span className="absolute -top-3 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-amber-700 rounded-full">
                  {mounted ? filterIteambyUser.length : 0}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Dropdown for Nav Links */}
        {activeLink?.subMenu && (
          <div
            onMouseLeave={() => setHoveredLink(null)}
            className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] overflow-hidden transition-[height,opacity] duration-500 ease-in-out py-4 rounded-b-xl shadow-lg z-10 bg-amber-700"
          >
            <div className="w-full h-full bg-amber-700 text-white flex items-center justify-center py-4">
              <div className="flex gap-10 text-lg font-medium">
                {activeLink.subMenu.map((item, idx) => (
                  <Link
                    prefetch={false}
                    key={idx}
                    onClick={() => setHoveredLink(null)}
                    href={item.href}
                    className="flex flex-col items-center text-center hover:underline transition duration-500"
                  >
                    {item.image && (
                      <div className="w-full h-full overflow-hidden rounded-md mb-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <button
            aria-label="Open menu"
            className="text-amber-900"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>
          <Link prefetch={false} href="/" className="flex items-center">
            <Image
              src="/logo-removebg-preview.png"
              width={64}
              height={64}
              alt="logo"
              priority
            />
          </Link>
          <button onClick={() => setCartOpen(true)} aria-label="Cart">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-amber-900 hover:text-amber-700 transition duration-300 ease-in-out" />
              <span className="absolute -top-3 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-amber-700 rounded-full">
                {mounted ? filterIteambyUser.length : 0}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 h-screen w-[80%] max-w-xs bg-white z-50 shadow-xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <span className="font-semibold text-amber-900">Menu</span>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="text-amber-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="px-5 py-4 space-y-2 overflow-y-auto flex-1">
                {navLinks.map((link, idx) => (
                  <div key={idx} className="border-b last:border-b-0">
                    {link.subMenu ? (
                      <>
                        <button
                          onClick={() => handleSubmenuToggle(link.name)}
                          className="w-full flex items-center justify-between py-3 font-medium text-amber-900"
                        >
                          {link.name}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openSubmenu === link.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {openSubmenu === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="pl-3 pb-2 space-y-2"
                            >
                              {link.subMenu.map((item, i) => (
                                <Link
                                  prefetch={false}
                                  key={i}
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-2 text-amber-700"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        prefetch={false}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 font-medium text-amber-900"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* User Section for Mobile */}
                {mounted && user ? (
                  <div className="mt-4 relative">
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === "user" ? null : "user")
                      }
                      className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-700"
                    >
                      <Image
                        src={user.profileImage || "/default-profile.png"}
                        alt={user.name || "User"}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </button>
                    <AnimatePresence>
                      {openSubmenu === "user" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-full bg-white shadow-md rounded-md py-2 z-50 flex flex-col"
                        >
                          <Link
                            href="/user/profile"
                            onClick={() => setMobileOpen(false)}
                            className="px-4 py-2 text-amber-900 hover:bg-amber-50"
                          >
                            Profile
                          </Link>
                          <button
                            onClick={() => {
                              // TODO: Add logout logic
                              setMobileOpen(false);
                            }}
                            className="px-4 py-2 text-amber-900 hover:bg-amber-50 text-left w-full"
                          >
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-4">
                    <Link
                      href="/sign-in"
                      prefetch={false}
                      onClick={() => setMobileOpen(false)}
                      className="w-full px-4 py-2 border border-amber-700 text-amber-700 rounded-full text-center hover:bg-amber-50 transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      prefetch={false}
                      onClick={() => setMobileOpen(false)}
                      className="w-full px-4 py-2 bg-amber-700 text-white rounded-full text-center hover:bg-amber-800 transition"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && <CartPage setCartOpen={setCartOpen} />}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
