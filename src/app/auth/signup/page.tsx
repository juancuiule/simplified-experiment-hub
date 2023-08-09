import Image from "next/image";
import Link from "next/link";
import { AtSign, GitHub } from "react-feather";

export default function Page() {
  return (
    <div className="grid grid-cols-12 flex-1">
      <div className="col-span-12 lg:col-span-5 xl:col-span-4 h-full flex flex-col justify-center gap-10 md:pl-6 md:pr-12">
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
            <label className="text-md font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="border rounded-md h-10 px-2 outline-info flex"
              type="text"
              name="name"
              id="name"
              placeholder="Juan Ignacio Cuiule"
            />
          </div>

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
            <label className="text-md font-medium" htmlFor="name">
              Organization
            </label>
            <input
              className="border rounded-md h-10 px-2 outline-info flex"
              type="text"
              name="name"
              id="name"
              placeholder="Universidad Tecnológica Nacional"
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
            Sign up
          </button>

          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-info hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 xl:col-span-8 bg-info h-full rounded-3xl flex flex-col p-6">
        <h3 className="text-2xl font-semibold text-white w-3/4 mx-auto">
          The simplest way to create and manage complex surveys and run online
          experiments
        </h3>
      </div>
    </div>
  );
}
