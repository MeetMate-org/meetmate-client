"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./ui/components/Sidebar";
import { Providers } from "./providers"; 

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <Sidebar isOpen={true}>{children}</Sidebar>
        </Providers>
      </body>
    </html>
  );
}
