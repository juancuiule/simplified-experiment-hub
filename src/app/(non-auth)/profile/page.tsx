import { Entity, User } from "@/api";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  const accessToken = cookies().get("accessToken");

  if (!accessToken) {
    return redirect("/login");
  }

  const decoded: { user: Entity<User> } = jwtDecode(accessToken.value);

  redirect(`/users/${decoded.user.username}`);
}
