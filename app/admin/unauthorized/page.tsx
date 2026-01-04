import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 bg-[#F5F3F1]">
      <div className="bg-white border border-gray-300 p-8 max-w-md w-full text-center">
        <h1 className="text-3xl mb-4 text-red-600">Access Denied</h1>
        <p className="text-gray-700 font-mont mb-6">
          You do not have admin privileges to access this page.
        </p>
        <div className="space-y-2">
          <Link
            href="/admin/login"
            className="block border border-black bg-white text-gray-700 py-2 px-4 font-mont hover:bg-gray-50 transition-colors"
          >
            Try Different Account
          </Link>
          <Link
            href="/"
            className="block text-gray-600 font-mont text-sm hover:underline"
          >
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
