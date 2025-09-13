import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Lora } from "next/font/google";
import "../../globals.css";
import NavbarWrapper from "./NavbarWrapper";
import { AppProvider } from "@/app/Providers";

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

export default function AdminLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lora.variable} antialiased`}
      >
        <AppProvider>
          <NavbarWrapper>{children}</NavbarWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
