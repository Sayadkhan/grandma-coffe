import NavbarWrapper from "./NavbarWrapper";
import { AppProvider } from "@/app/Providers";

export const metadata = {
  title: "Coffee Brand",
  description: "Delicious coffee for every mood",
};

export default function AdminLayout({ children }) {
  return (
    <AppProvider>
      <NavbarWrapper>{children}</NavbarWrapper>
    </AppProvider>
  );
}
