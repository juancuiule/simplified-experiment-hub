import Nav from "@/components/Nav";
import { LayoutProps } from "../../types";

export default function NonAuthLayout({ children }: LayoutProps) {
  return (
    <>
      <Nav />
      <main className="flex flex-1 p-6">{children}</main>
    </>
  );
}
