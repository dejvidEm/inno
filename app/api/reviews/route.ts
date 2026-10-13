import { NextResponse } from "next/server"
import { getGoogleReviews } from "@/lib/google-reviews"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get("lang") === "en" ? "en" : "sk"

  try {
    const payload = await getGoogleReviews(language)
    return NextResponse.json(payload)
  } catch (error) {
    console.error("Failed to load Google reviews", error)
    return NextResponse.json({ reviews: [], rating: null, total: null, mapsUrl: null })
  }
}
