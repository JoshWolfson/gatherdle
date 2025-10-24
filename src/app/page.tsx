import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center flex-col justify-center">
      <h1 className="text-4xl font-bold mb-20">Gatherdle</h1>

      <Link
        href={"/daily"}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Play Daily!
      </Link>
    </main>
  );
}
