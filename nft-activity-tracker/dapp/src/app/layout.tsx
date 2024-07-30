import type { Metadata } from "next";
import React from "react";
// components
import Layout from "./components/Layout";

export const metadata: Metadata = {
  title: "ERC-X QuickAlert",
  description:
    "Get transaction alerts of any Ethereum wallet address, smart contract, ERC-20, 721, e.t.c. Get notified at the nick of time!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
