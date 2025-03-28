import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout-wrapper";
import { Toaster } from "react-hot-toast";
import { auth } from "../lib/auth";
import AuthProvider from "@/providers/auth-provider";
import SessionProvider from "@/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <div
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full max-w-7xl mx-auto px-2 overflow-x-hidden`}
        >
          <AuthProvider>
            <SessionProvider session={session}>
              <LayoutWrapper>
                {children}
                <Toaster />
              </LayoutWrapper>
            </SessionProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
