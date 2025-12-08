import type { Metadata } from "next";
import { DashboardContent } from "@/components/admin/DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard | Admin | Nyumba Zetu",
  description: "Admin dashboard overview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardPage() {
  return (
    <div>
      <DashboardContent />
    </div>
  );
}


