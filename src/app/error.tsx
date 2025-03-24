"use client";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  error: string;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  // const errorMessage =
  //   error instanceof Error ? (error.message as string) : error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Invalid Credentials
        </h1>
        <p className="text-gray-600 mb-4">
          Kindly check your email or password
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login Again
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { error } = query;

  const errorMessage =
    error instanceof Error ? error.message : error || "Unknown error occurred";

  return {
    props: {
      error: errorMessage,
    },
  };
};

export default ErrorPage;
