"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider, useUser } from "@/context/AuthProvider";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { setUser } = useUser();
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const res = await axios.get("/api/auth/verifytoken");
    if (res.data) {
      setUser(res.data.user);
    }
  };
  return (
    <html lang="en" data-theme="nord">
      <head>
        <title>
          Loan Predictor | Har sapne ke liye ek loan – Asaan, Tez, Vishwas ke
          saath.
        </title>
        <meta
          name="description"
          content="A modern loan management platform that helps users check their loan eligibility, apply online, and track their application status — all in one place. With smart predictions, EMI calculators, and expert tips, getting a loan has never been easier."
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <Navbar />
        <div className="overflow-y-auto h-[calc(100vh-5.5rem)] bg-base-100 p-10 text-base-content">
          {children}
        </div>
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <Component>{children}</Component>
    </UserProvider>
  );
}
