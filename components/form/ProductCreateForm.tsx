"use client";

import { useState, type FormEvent } from "react";
import { CreateProductButton } from "../button/CreateProduct";
import { createProduct, type CreateProductInput } from "../action/productActions";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string | null;
};

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export function ProductCreateForm({ setProducts }: Props) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("productName") ?? "").trim();
    const price = Number(formData.get("price"));
    const description = String(formData.get("description") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();

    if (!name) {
      setErrorMessage("Product name cannot be empty.");
      setIsSubmitting(false);
      return;
    }

    if (!description) {
      setErrorMessage("Description cannot be empty.");
      setIsSubmitting(false);
      return;
    }

    if (Number.isNaN(price) || price <= 0) {
      setErrorMessage("Price must be a valid number greater than 0.");
      setIsSubmitting(false);
      return;
    }

    const productInput: CreateProductInput = {
      name,
      price,
      description,
      category: category || "Uncategorized",
      image: image || null,
    };

    try {
      const createdProduct = await createProduct(productInput);
      setProducts((prev) => [...prev, createdProduct]);
      event.currentTarget.reset();
      setErrorMessage(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create product. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Product Name
        </label>
        <input
          name="productName"
          type="text"
          required
          placeholder="Enter product name"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Price
        </label>
        <input
          name="price"
          type="number"
          required
          placeholder="Enter price"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Enter description"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Category
        </label>
        <input
          name="category"
          type="text"
          placeholder="Enter category"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Image URL
        </label>
        <input
          name="image"
          type="text"
          placeholder="Enter image URL"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Error */}
      {errorMessage && (
        <p className="text-sm text-red-600 font-medium" role="alert">
          {errorMessage}
        </p>
      )}

      {/* Submit */}
      <CreateProductButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Product"}
      </CreateProductButton>
    </form>
  );
}