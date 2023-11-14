import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { RemoteStreamsProvider } from "@/contexts/RemoteStreamsContext";
import { LocalStreamsProvider } from "@/contexts/LocalStreamContext";

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
        <LocalStreamsProvider>
          <RemoteStreamsProvider>{children}</RemoteStreamsProvider>
        </LocalStreamsProvider>
      </body>
    </html>
  );
}
