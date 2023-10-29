import { LayoutProps } from "@/types";

export const metadata = {
  title: "Experiment Hub",
};

export default function AuthLayout({ children }: LayoutProps) {
  return <main className={`flex flex-1 p-6`}>{children}</main>;
}
