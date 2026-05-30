import HeroSection from "@/components/herosection";
import ProductsPage from "./products/page";
export default function Home() {
  return (
    <main>
      <HeroSection />
    <div className="container mx-auto ">
      <ProductsPage />

    </div>

    </main>
  );
}