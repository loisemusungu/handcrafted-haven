import { NextResponse } from "next/server";
import prisma from "../../lib/db";

// ✅ GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ✅ POST new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, description, category, image, sellerId } = body;

    // Validation
    if (!name || !description || price === undefined || !sellerId) {
      return NextResponse.json(
        { error: "Name, price, description and sellerId are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        category,
        image,
        sellerId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
