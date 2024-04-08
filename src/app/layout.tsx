import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "../lib/utils";
import { Toaster } from "sonner";
import LayoutWithQuery from "@/components/layout-with-query";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ClickPesa Playground",
  description:
    "A Playground for developers to play with the ClickPesa API in real time with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <LayoutWithQuery>{children}</LayoutWithQuery>
        <Toaster />
      </body>
    </html>
  );
}
