import { LayoutProps } from "@/types";
import { AtSign } from "react-feather";

export const metadata = {
  title: "Experiment Hub",
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col justify-start gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Get Started Now</h1>
        <h2 className="text-sm text-gray-500">
          Enter your credentials to access your account
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <button disabled className="auth-button">
            <AtSign size={18} />
            Log in with Google
          </button>
        </div>
        <div className="flex gap-6 justify-center items-center">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="mx-auto text-sm font-semibold text-gray-200">
            or
          </span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
        {/* Auth form */}
        {children}
      </div>
    </div>
  );
}
