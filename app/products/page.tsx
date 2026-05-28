"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  return (
  <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-32 w-full object-cover"
            />

            <div className="p-3">
              <h2 className="font-semibold text-sm">{p.name}</h2>

              <p className="text-xs text-gray-600 line-clamp-2">
                {p.description}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-sm font-bold">
                  KES {p.price}
                </p>

                <span className="text-[10px] bg-gray-200 px-2 py-1 rounded">
                  {p.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}