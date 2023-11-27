import Link from "next/link";
import { LogOut } from "react-feather";

export function LogoutButton() {
  return (
    <Link
      href="/logout"
      prefetch={false}
      className="w-10 h-10 flex justify-center items-center rounded-full group hover:bg-[#f4f4f4] cursor-pointer transition-colors"
    >
      <LogOut
        className="text-white group-hover:text-black transition-colors"
        size={20}
      />
    </Link>
  );
}
