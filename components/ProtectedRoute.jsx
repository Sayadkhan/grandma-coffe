"use client";

import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.customer.customer);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && pathname.startsWith("/user")) {
      router.push("/");
    }

    // ✅ If logged in and trying to access /login or /signup
    if (user && (pathname === "/sign-in" || pathname === "/sign-up")) {
      router.push("/user/dashboard");
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
