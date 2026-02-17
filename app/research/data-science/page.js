import Link from "next/link";

export default function DataScience() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Link
        href="/"
        className="text-black text-lg border px-6 py-2 rounded hover:bg-black hover:text-white transition"
      >
        Home
      </Link>
    </div>
  );
}