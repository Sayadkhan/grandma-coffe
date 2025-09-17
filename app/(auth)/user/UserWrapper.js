"use client";

import { Providers } from "../admin/Providers";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Navbar/Footer";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { User, LogOut } from "lucide-react"; // optional icons
import Image from "next/image";
import { logout } from "@/redux/slice/customerSlice";

const menuItems = [
  { title: "Dashboard", href: "/user/dashboard", icon: <User size={18} /> },
  { title: "Orders", href: "/user/orders", icon: <User size={18} /> },
  { title: "Settings", href: "/user/settings", icon: <User size={18} /> },
];

export default function UserLayout({ children }) {
  const pathname = usePathname();

  const route = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.customer.customer);

  const handleLogout = () => {
    dispatch(logout());
    route.push("/");
  };

  return (
    <Providers>
      <div className="flex flex-col ">
        {/* Top Navbar */}
        <Navbar />

        <main className="min-h-screen">
          <div className="flex-1 w-full container mx-auto px-4 md:px-8 py-6 mt-24 mb-10 grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Sidebar */}
            <aside className="xl:col-span-3 lg:col-span-4 md:col-span-4 bg-white shadow-md rounded-xl p-5 h-fit min-h-screen md:sticky top-24">
              {/* Profile Section */}
              <div className="flex flex-col items-center gap-2 mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-amber-600 overflow-hidden">
                  <Image
                    src={user?.profileImage || ""}
                    alt={user?.name || "User"}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="capitalize text-gray-700 text-lg font-medium">
                  {user?.name || "Guest User"}
                </p>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition shadow-sm ${
                        isActive
                          ? "bg-amber-600 text-white font-semibold"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 mt-4 w-full px-3 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </aside>

            {/* Content Area */}
            <div className="xl:col-span-9 lg:col-span-8 md:col-span-8 bg-white shadow-md rounded-xl p-6">
              {children}
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Providers>
  );
}
