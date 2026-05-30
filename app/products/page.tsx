"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string | null;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        console.log("API Response:", data);

        const productsArray = Array.isArray(data)
          ? data
          : data.products || [];

        setProducts(productsArray);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const getValidImage = (image: string | null) => {
    if (
      image &&
      image.startsWith("http") &&
      image !== "https://..."
    ) {
      return image;
    }

    return "/placeholder.png";
  };

  if (loading) {
    return (
      <div className="p-6 pt-24">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-24">
      <h1 className="text-3xl font-bold mb-8">
        Products
      </h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            console.log("IMAGE URL:", product.image);

            return (
              <div
                key={product.id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={getValidImage(product.image)}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold text-lg line-clamp-1">
                      {product.name}
                    </h2>

                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-black">
                      KES {product.price}
                    </p>

                    <button className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}