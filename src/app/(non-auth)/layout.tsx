import Nav from "@/components/Nav";
import { LayoutProps } from "@/types";
import { Toaster } from "sonner";

export default function NonAuthLayout({ children }: LayoutProps) {
  return (
    <>
      <Nav />
      <Toaster richColors />
      <main className="flex flex-1 p-6">{children}</main>
    </>
  );
}
