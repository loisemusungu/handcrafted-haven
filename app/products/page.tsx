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
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        console.log("API Response:", data);

        // Ensure products is always an array
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 pt-24">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-6">
        Products
      </h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-32 w-full object-cover"
              />

              <div className="p-3">
                <h2 className="font-semibold text-sm">
                  {product.name}
                </h2>

                <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm font-bold">
                    KES {product.price}
                  </p>

                  <span className="text-[10px] bg-gray-200 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}