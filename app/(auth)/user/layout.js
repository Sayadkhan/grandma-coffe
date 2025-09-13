import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Lora } from "next/font/google";
import "../../globals.css";
import { AppProvider } from "@/app/Providers";
import UserLayout from "./UserWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Coffee Brand",
  description: "Delicious coffee for every mood",
};

export default function Layout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lora.variable} antialiased`}
      >
        <AppProvider>
          <ProtectedRoute>
            <UserLayout>{children}</UserLayout>
          </ProtectedRoute>
        </AppProvider>
      </body>
    </html>
  );
}
