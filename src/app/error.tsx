"use client"; // Error components must be Client Components
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <Toaster position="bottom-center" richColors />
      <Image
        width={656}
        height={363}
        alt="Experiment Hub Logo"
        className="w-6/12 h-auto max-w-md"
        src="https://cdn.experiment-hub.com/team/logo-error.png"
      />
      <p className="w-full max-w-md text-center">
        Al parecer hubo un error por favor contactate con nosotros a{" "}
        <a href="mailto:soporte@experiment-hub.com" className="text-blue-400">
          soporte@experiment-hub.com
        </a>
      </p>
      <pre className="w-full max-w-md p-2 bg-gray-200 rounded-none font-mono">
        <code
          className="break-words"
          style={{
            // @ts-ignore
            textWrap: "wrap",
          }}
        >
          {JSON.stringify(
            {
              name: error.name,
              message: error.message,
              stack: error.stack,
            },
            null,
            2
          )}
        </code>
      </pre>
      <Link href="/" className="p-3 py-1 border border-black rounded">
        Volver
      </Link>
    </div>
  );
}
