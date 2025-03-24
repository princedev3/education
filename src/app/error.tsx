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
    <div>
      <h1>invalid credentials</h1>
      <p onClick={() => window.location.reload()}>login again</p>
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
