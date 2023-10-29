import Image from "next/image";
import { AtSign } from "react-feather";

import SignupForm from "@/ui/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Experiment Hub",
};

export default function Page() {
  return (
    <div className="grid grid-cols-12 flex-1">
      <div
        className={`
      max-w-xl mx-auto w-full col-span-12
      h-full flex flex-col justify-center gap-10
      `}
      >
        <Image
          height={40}
          width={300}
          src="/experiment-hub-large.png"
          className="mx-auto"
          alt="Experiment Hub logo with text"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Get Started Now</h1>
          <h2 className="text-sm text-gray-500">
            Enter your credentials to access your account
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            {/* TODO: implement login with google  */}
            <button disabled className="auth-button">
              <AtSign size={18} />
              Log in with Google
            </button>
          </div>
          <div className="flex gap-6 justify-center items-center">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="mx-auto text-sm font-semibold text-gray-400">
              or
            </span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
