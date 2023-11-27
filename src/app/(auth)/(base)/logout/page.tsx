import { API } from "@/api";
import { redirect } from "next/navigation";

export default async function Page() {
  await API.auth.logout({});
  redirect("/login");
}
