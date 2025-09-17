import { AppProvider } from "@/app/Providers";
import UserLayout from "./UserWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Coffee Brand",
  description: "Delicious coffee for every mood",
};

export default function Layout({ children }) {
  return (
    <AppProvider>
      <ProtectedRoute>
        <UserLayout>{children}</UserLayout>
      </ProtectedRoute>
    </AppProvider>
  );
}
