"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./ui/components/Sidebar";
import { useSidebarStore } from "./store/use-sidebar-store";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Sidebar isOpen={true}>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}