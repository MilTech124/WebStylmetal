import { NextResponse } from "next/server";
import { fetchProductCategories } from "@/lib/woocommerce";

export async function GET() {
  try {
    const categories = await fetchProductCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Failed to load product categories:", error);
    return NextResponse.json({ categories: [], error: "Unable to load categories" }, { status: 500 });
  }
}
