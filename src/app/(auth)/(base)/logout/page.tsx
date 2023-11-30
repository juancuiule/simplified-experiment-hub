"use client";
import { API } from "@/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "react-feather";

export const dynamic = "force-dynamic";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    API.auth.logout({}).then(() => {
      router.push("/login");
    });
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader className="animate-spin" size={32} />
    </div>
  );
}
