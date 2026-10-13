const PLACE_QUERY = "INNOSTUDIO Ivanská cesta 16733/15 Bratislava"
const REVIEWS_REVALIDATE_SECONDS = 60 * 60

export type PublicReview = {
  id: string
  authorName: string
  authorUrl: string | null
  authorPhoto: string | null
  rating: number
  text: string
  relativeTime: string
}

export type GoogleReviewsPayload = {
  reviews: PublicReview[]
  rating: number | null
  total: number | null
  mapsUrl: string | null
}

type PlacesReview = {
  author_name?: string
  author_url?: string
  profile_photo_url?: string
  rating?: number
  relative_time_description?: string
  text?: string
  time?: number
}

type PlaceDetailsResponse = {
  status?: string
  result?: {
    rating?: number
    user_ratings_total?: number
    url?: string
    reviews?: PlacesReview[]
  }
}

type FindPlaceResponse = {
  status?: string
  candidates?: { place_id?: string }[]
}

const emptyPayload = (): GoogleReviewsPayload => ({
  reviews: [],
  rating: null,
  total: null,
  mapsUrl: null,
})

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const configured = process.env.GOOGLE_PLACE_ID?.trim()
  if (configured) return configured

  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json")
  url.searchParams.set("input", PLACE_QUERY)
  url.searchParams.set("inputtype", "textquery")
  url.searchParams.set("fields", "place_id")
  url.searchParams.set("language", "sk")
  url.searchParams.set("key", apiKey)

  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } })
  if (!response.ok) return null

  const data = (await response.json()) as FindPlaceResponse
  if (data.status !== "OK") return null
  return data.candidates?.[0]?.place_id ?? null
}

export async function getGoogleReviews(language: "sk" | "en"): Promise<GoogleReviewsPayload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim()
  if (!apiKey) return emptyPayload()

  const placeId = await resolvePlaceId(apiKey)
  if (!placeId) return emptyPayload()

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json")
  url.searchParams.set("place_id", placeId)
  url.searchParams.set("fields", "rating,user_ratings_total,reviews,url")
  url.searchParams.set("reviews_sort", "newest")
  url.searchParams.set("language", language)
  url.searchParams.set("key", apiKey)

  const response = await fetch(url, { next: { revalidate: REVIEWS_REVALIDATE_SECONDS } })
  if (!response.ok) return emptyPayload()

  const data = (await response.json()) as PlaceDetailsResponse
  if (data.status !== "OK" || !data.result) return emptyPayload()

  const reviews = [...(data.result.reviews ?? [])]
    .sort((a, b) => (b.time ?? 0) - (a.time ?? 0))
    .filter((review) => review.author_name)
    .map((review) => ({
      id: `${review.time ?? "review"}-${review.author_name}`,
      authorName: review.author_name as string,
      authorUrl: review.author_url ?? null,
      authorPhoto: review.profile_photo_url ?? null,
      rating: Math.round(review.rating ?? 0),
      text: review.text?.trim() ?? "",
      relativeTime: review.relative_time_description ?? "",
    }))

  return {
    reviews,
    rating: typeof data.result.rating === "number" ? data.result.rating : null,
    total: typeof data.result.user_ratings_total === "number" ? data.result.user_ratings_total : null,
    mapsUrl: `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`,
  }
}
