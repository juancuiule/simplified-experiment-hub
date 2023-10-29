import SignupForm from "@/ui/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Experiment Hub",
};

export default function Page() {
  return <SignupForm />;
}
