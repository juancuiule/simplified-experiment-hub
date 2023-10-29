import LoginForm from "@/ui/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Experiment Hub",
};

export default function Page() {
  return <LoginForm />;
}
