import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import { ReduxProvider } from "@/redux/provider";

import "react-toastify/dist/ReactToastify.css";

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

        <ToastContainer
          position="bottom-left"
          autoClose={500}
          limit={2}
          hideProgressBar
          newestOnTop
          closeOnClick
          closeButton={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
