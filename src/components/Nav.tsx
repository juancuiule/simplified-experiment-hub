import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex flex-row h-16 py-2 px-6 bg-black justify-between items-center">
      <Link href="/" className="h-10">
        <Image
          height={40}
          width={126}
          src="/experiment-hub-large-dark.png"
          className="max-h-full"
          alt="Experiment Hub logo with text"
        />
      </Link>
    </nav>
  );
}
