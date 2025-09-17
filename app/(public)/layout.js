import Navbar from "@/components/Navbar/Navbar";

import Footer from "@/components/Navbar/Footer";

export default function PublicLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
