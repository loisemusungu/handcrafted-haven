import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center text-center py-32 px-6 bg-amber-100">

        <h1 className="text-5xl font-bold text-amber-900 mb-6">
          Beautiful Handmade Creations
        </h1>

        <p className="text-lg text-amber-800 max-w-2xl mb-8">
          Discover unique handcrafted items made with love, care, and creativity.
        </p>

        {/* FIXED BUTTON */}
        <Link href="/products">
          <button className="bg-amber-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-amber-800">
            Shop Now
          </button>
        </Link>

      </section>
    </main>
  );
}