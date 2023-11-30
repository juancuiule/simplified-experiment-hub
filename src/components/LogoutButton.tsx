import { cookies } from "next/headers";
import Link from "next/link";
import { LogOut, User } from "react-feather";

export function LogoutButton() {
  const accessToken = cookies().get("accessToken");

  if (!accessToken) {
    return (
      <Link
        href="/login"
        prefetch={false}
        className="w-10 h-10 flex justify-center items-center rounded-full group hover:bg-[#f4f4f4] cursor-pointer transition-colors"
      >
        <User
          className="text-white group-hover:text-black transition-colors"
          size={20}
        />
      </Link>
    );
  } else {
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
}
