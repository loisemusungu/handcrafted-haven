export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-between p-4 bg-brown-500 text-white">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          LOGO
        </div>

        <nav className="flex gap-6">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

      </header>
    </main>
  );
}