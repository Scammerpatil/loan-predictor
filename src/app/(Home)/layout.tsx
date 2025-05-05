"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/AuthProvider";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
        {children}
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
