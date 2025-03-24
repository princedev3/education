"use client";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CustomErrorPage() {
  const { query } = useRouter();
  const error = query.error as string | undefined;

  const errorMessages: Record<string, string> = {
    Configuration: "Authentication configuration error.",
    AccessDenied: "Access was denied. You may not have permission.",
    Verification: "Verification failed. Please try again.",
    default: "An unexpected error occurred. Please try again.",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-500">Authentication Error</h1>
      <p className="text-gray-700 mt-2">{errorMessages[error || "default"]}</p>
      <Link href="/" className="mt-4 text-blue-500">
        Go back to homepage
      </Link>
    </div>
  );
}
