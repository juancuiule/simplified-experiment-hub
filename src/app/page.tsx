import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center gap-4">
        <Image
          src="/experiment-hub-148.png"
          width={96}
          height={96}
          alt="Experiment Hub Logo"
        />
        <h1 className="text-3xl font-bold">
          Experiment <br />
          Hub
        </h1>
      </div>
    </main>
  );
}
