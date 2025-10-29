import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container flex flex-col items-center p-8 space-y-1 w-fit mx-auto rounded-lg">
        <h1 className="text-4xl font-bold mb-5">Gatherdle</h1>

        <Link
          href={"/daily"}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Play Daily!
        </Link>
      </div>
    </main>
  );
}
