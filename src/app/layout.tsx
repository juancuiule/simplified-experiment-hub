import { fira_code, montserrat } from "@/fonts";
import "./globals.css";
import { LayoutProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini experiencias digitales",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${montserrat.variable} ${fira_code.variable}`}>
      <body className={`flex flex-col min-h-screen`}>{children}</body>
    </html>
  );
}
