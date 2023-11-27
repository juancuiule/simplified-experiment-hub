import { LayoutProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex flex-1">
      {children}

      <div className="hidden lg:flex gap-2 items-center text-xs text-gray-400 fixed right-2 bottom-2">
        Powered by{" "}
        <Link href="/">
          <Image
            height={43 / 1.2}
            width={126 / 1.2}
            src="/experiment-hub-large.png"
            alt="Experiment Hub logo with text"
          />
        </Link>
      </div>
    </main>
  );
}
