"use client";

import { usePathname } from "next/navigation";
import { Providers } from "./Providers";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    title: "Category",
    submenu: [
      { title: "Add Category", href: "/admin/category/add" },
      { title: "All Categories", href: "/admin/category/all" },
    ],
  },
  {
    title: "Products",
    submenu: [
      { title: "Add Product", href: "/admin/product/add" },
      { title: "All Products", href: "/admin/product/all" },
    ],
  },
  {
    title: "Blog",
    submenu: [
      { title: "Add Blog", href: "/admin/blog/add" },
      { title: "All Blogs", href: "/admin/blog/all" },
    ],
  },
  {
    title: "Orders",
    submenu: [
      // { title: "Add Order", href: "/admin/blog/add" },
      { title: "All Orders", href: "/admin/order/all" },
    ],
  },
  {
    title: "Settings",
    href: "/admin/settings",
  },
];

export default function NavbarWrapper({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const hideNavbarPaths = ["/admin/login", "/admin/signup"];
  const showSidebar = !hideNavbarPaths.includes(pathname);

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <Providers>
      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <aside
            className={`${
              open ? "w-72" : "w-16"
            } fixed top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col z-50`}
          >
            {/* Toggle Button */}
            <button
              className="p-4 hover:bg-gray-800"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>

            {/* Menu Loop */}
            <nav className="flex-1 flex flex-col gap-2 p-4 text-sm overflow-y-auto">
              {menuItems.map((item) =>
                item.submenu ? (
                  <div key={item.title}>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className="flex items-center justify-between w-full p-2 hover:bg-gray-800 rounded"
                    >
                      <span>{item.title}</span>
                      {openSubmenu === item.title ? (
                        <ChevronDown />
                      ) : (
                        <ChevronRight />
                      )}
                    </button>

                    {/* Animated Submenu */}
                    <div
                      className={`ml-4 overflow-hidden transition-all duration-300 ${
                        openSubmenu === item.title
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          prefetch
                          className="block p-2 hover:bg-gray-700 rounded"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    className="p-2 hover:bg-gray-800 rounded block"
                  >
                    {item.title}
                  </Link>
                )
              )}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 min-h-screen transition-all duration-300 ${
            showSidebar ? (open ? "ml-72" : "ml-16") : "ml-0"
          }`}
        >
          {children}
        </main>
      </div>
    </Providers>
  );
}
