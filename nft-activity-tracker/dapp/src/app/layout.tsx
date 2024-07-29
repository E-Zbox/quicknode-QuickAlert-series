import type { Metadata } from "next";
import React from "react";
// components
import Layout from "./components/Layout";

export const metadata: Metadata = {
  title: "TokenScope",
  description:
    "ERC-20 Token In a Nutshell. Unmask key metrics, top holders, and insightful data - all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
