import { Fira_Code, Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const fira_code = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});
