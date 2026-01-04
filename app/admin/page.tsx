import { Suspense } from "react";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/app/lib/actions/auth";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  return (
    <Suspense fallback={<AdminLoginLoading />}>
      <AdminPageContent />
    </Suspense>
  );
}

async function AdminPageContent() {
  try {
    await requireAdmin();
    return <AdminDashboard />;
  } catch {
    // Redirect is handled in requireAdmin, but just in case
    redirect("/admin/login");
  }
}

function AdminLoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 bg-[#F5F3F1]">
      <div className="bg-white border border-gray-300 p-8 max-w-md w-full">
        <p className="text-gray-600 font-mont">Loading...</p>
      </div>
    </div>
  );
}
