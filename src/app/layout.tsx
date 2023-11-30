import { fira_code, montserrat } from "@/fonts";
import "./globals.css";
import { BASE_URL } from "@/constants";
import { LayoutProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiment Hub",
  description:
    "Un laboratorio virtual para diseñar encuestas complejas, compartir conocimiento y analizar descubrimientos. Descubrí el futuro de la investigación científica sin límites.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Experiment Hub",
    images: {
      url: "https://cdn.experiment-hub.com/team/experiment-hub-opengraph.png",
    },
  },
  twitter: {
    title: "Experiment Hub",
    images: {
      url: "https://cdn.experiment-hub.com/team/experiment-hub-opengraph.png",
    },
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${montserrat.variable} ${fira_code.variable}`}>
      <body className={`flex flex-col min-h-screen`}>{children}</body>
    </html>
  );
}
