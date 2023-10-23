import Image from "next/image";
import Link from "next/link";
import { LogOut } from "react-feather";

interface Props {
  showActions?: boolean;
}

export default function Nav(props: Props) {
  const { showActions = true } = props;
  return (
    <nav className="flex flex-row h-16 py-2 px-6 bg-black justify-between items-center">
      <Link href="/" className="h-10">
        <Image
          height={40}
          width={126}
          src="/experiment-hub-large-dark.png"
          className="max-h-full"
          alt="Experiment Hub logo with text"
        />
      </Link>
      {showActions && (
        <div className="flex flex-row gap-2">
          <Link
            href="/profile"
            className="w-10 h-10 flex justify-center items-center rounded-full group hover:bg-[#f4f4f4] cursor-pointer transition-colors"
          >
            <div className="w-4/5 aspect-square flex justify-center items-center rounded-full overflow-hidden">
              <Image
                src={"https://cdn.experiment-hub.com/team/juan-ignacio.png"}
                alt={"Profile picture"}
                width={200}
                height={200}
              />
            </div>
          </Link>
          <Link
            href="/login"
            className="w-10 h-10 flex justify-center items-center rounded-full group hover:bg-[#f4f4f4] cursor-pointer transition-colors"
          >
            <LogOut
              className="text-white group-hover:text-black transition-colors"
              size={20}
            />
          </Link>
        </div>
      )}
    </nav>
  );
}
