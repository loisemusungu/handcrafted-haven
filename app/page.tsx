import Image from "next/image";

export default function Home() {
  return (
    <main>

      <header className="flex items-center justify-between p-4 bg-amber-700 text-white">

        <div className="flex items-center gap-2">

          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
          />

          <h1 className="text-2xl font-bold">
            Handcrafted Haven
          </h1>

        </div>

        <nav className="flex gap-6">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

      </header>

      <section className="flex flex-col items-center justify-center text-center py-32 px-6 bg-amber-100">

        <h1 className="text-5xl font-bold text-amber-900 mb-6">
          Beautiful Handmade Creations
        </h1>

        <p className="text-lg text-amber-800 max-w-2xl mb-8">
          Discover unique handcrafted items made with love, care, and creativity.
        </p>

        <button className="bg-amber-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-amber-800">
          Shop Now
        </button>

      </section>
      <footer>

        <p>
          © 2026 Handcrafted Haven. All rights reserved.
        </p>
      </footer>

    </main>
  );
}