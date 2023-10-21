import Image from "next/image";
import Link from "next/link";
import { LogOut, User } from "react-feather";

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
      <div className="flex flex-row gap-2">
        <Link
          href="/profile"
          className="w-10 h-10 flex justify-center items-center rounded-full group hover:bg-[#f4f4f4] cursor-pointer"
        >
          <User className="text-white group-hover:text-black" size={20} />
        </Link>
        <Link
          href="/login"
          className="w-10 h-10 flex justify-center items-center rounded-full group hover:bg-[#f4f4f4] cursor-pointer"
        >
          <LogOut className="text-white group-hover:text-black" size={20} />
        </Link>
      </div>
    </nav>
  );
}
