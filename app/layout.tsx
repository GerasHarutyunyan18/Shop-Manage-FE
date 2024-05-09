"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { RoutesWithoutSidebar } from "@/constants";
import SideBar from "@/components/shared/sidebar";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {RoutesWithoutSidebar.includes(pathname) ? (
            <div>{children}</div>
          ) : (
            <div className="bigContainer">
              <div className="sidebar">
                <SideBar />
              </div>
              <div>
                <NextThemesProvider defaultTheme="light">{children}</NextThemesProvider>
              </div>
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
