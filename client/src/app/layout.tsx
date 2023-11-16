import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ReduxProvider } from "@/redux/provider";
import { store } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "P-to-P Video Chat",
  description: "A peer-to-peer video chat app built with Next.js and WebRTC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
