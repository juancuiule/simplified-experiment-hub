import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { Entity, User } from "./api";

export function useUser() {
  const accessToken = cookies().get("accessToken");

  if (accessToken === undefined) {
    return undefined;
  } else {
    const decoded: { user: Entity<User> } = jwtDecode(accessToken.value);
    return decoded.user;
  }
}
