import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Lora } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Navbar/Footer";
import { AppProvider } from "../Providers";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lora.variable} antialiased`}
      >
        <AppProvider>
          <Navbar />
          <ProtectedRoute>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </ProtectedRoute>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
