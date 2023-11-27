import { Entity, User } from "@/api";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export function ProfilePicture() {
  const accessToken = cookies().get("accessToken");
  try {
    const decoded: { user: Entity<User> } = jwtDecode(accessToken?.value!);
    const { user } = decoded;

    return (
      <Link
        href={`/users/${user.username}`}
        className="w-10 h-10 flex justify-center items-center rounded-full group hover:bg-[#f4f4f4] cursor-pointer transition-colors"
      >
        <div className="w-4/5 aspect-square flex justify-center items-center rounded-full overflow-hidden">
          <Image
            src={user.avatar}
            alt={"Profile picture"}
            width={200}
            height={200}
          />
        </div>
      </Link>
    );
  } catch (err) {
    return <></>;
  }
}
