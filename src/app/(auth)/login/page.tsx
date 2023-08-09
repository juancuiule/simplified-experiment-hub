import Image from "next/image";
import { AtSign, GitHub } from "react-feather";
import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <div className="flex-1 max-w-xl mx-auto">
      <Image
        height={40}
        width={300}
        src="/experiment-hub-large.png"
        className="mx-auto mt-6 mb-12"
        alt="Experiment Hub logo with text"
      />
      <div className="flex flex-col justify-start gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Get Started Now</h1>
          <h2 className="text-sm text-gray-500">
            Enter your credentials to access your account
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <button className="text-sm flex justify-center flex-1 px-6 py-2 rounded-lg border border-gray-300 text-gray-500 items-center gap-2  hover:text-black hover:border-info hover:bg-info/50 transition-colors outline-info">
              <AtSign size={18} />
              Log in with Google
            </button>
            <button className="text-sm flex justify-center flex-1 px-6 py-2 rounded-lg border border-gray-300 text-gray-500 items-center gap-2  hover:text-black hover:border-info hover:bg-info/50 transition-colors outline-info">
              <GitHub size={18} />
              Log in with Github
            </button>
          </div>
          <div className="flex gap-6 justify-center items-center">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="mx-auto text-sm font-semibold text-gray-200">
              or
            </span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
