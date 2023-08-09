import Image from "next/image";
import Link from "next/link";
import { AtSign, GitHub } from "react-feather";

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
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="border rounded-md h-10 px-2 outline-info flex"
              type="email"
              name="email"
              id="email"
              placeholder="juancuiule@frba.utn.edu.ar"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="border rounded-md h-10 px-2 outline-info flex"
              type="password"
              name="password"
              id="password"
              placeholder="********"
            />
          </div>

          <button className="flex font-semibold justify-center flex-1 px-6 py-2 rounded-lg border text-black items-center gap-2  border-info bg-info transition-colors hover:bg-info/40 outline-info/40">
            Login
          </button>

          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-info hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
