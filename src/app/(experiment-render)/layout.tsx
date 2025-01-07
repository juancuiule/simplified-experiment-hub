import { LayoutProps } from "@/types";

export default function Layout({ children }: LayoutProps) {
  return <main className="flex flex-1">{children}</main>;
}
