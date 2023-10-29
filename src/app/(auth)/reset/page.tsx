import ResetPasswordForm from "@/ui/auth/reset-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password | Experiment Hub",
};

export default function Page() {
  return (
    <div className="flex flex-col justify-start gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Restore your password</h1>
        <h2 className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eum
          libero eos delectus
        </h2>
      </div>
      <ResetPasswordForm />
    </div>
  );
}
