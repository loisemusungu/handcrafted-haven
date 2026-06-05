import prisma from "../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}