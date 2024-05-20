import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Provider from "../provider";

const inter = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Obs Challenge Widgets",
  description: "Its used to create Live interactive Widget for OBS and StreamLabs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
