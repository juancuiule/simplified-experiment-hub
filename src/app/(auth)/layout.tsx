import { LayoutProps } from "@/types";
import Image from "next/image";

export const metadata = {
  title: "Experiment Hub",
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <main className={`flex flex-1 p-6`}>
      <div className="flex-1 max-w-xl mx-auto">
        <Image
          height={107}
          width={300}
          src="/experiment-hub-large.png"
          className="mx-auto mt-6 mb-12"
          alt="Experiment Hub logo with text"
        />
        {children}
      </div>
    </main>
  );
}
