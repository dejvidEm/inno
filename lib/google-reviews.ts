// Twice a day per language stays far under the 1,000 free monthly review calls.
const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 12

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

type PlacesNewReview = {
  rating?: number
  publishTime?: string
  relativePublishTimeDescription?: string
  text?: { text?: string }
  authorAttribution?: {
    displayName?: string
    uri?: string
    photoUri?: string
  }
}

type PlacesNewResponse = {
  rating?: number
  userRatingCount?: number
  reviews?: PlacesNewReview[]
  error?: { message?: string }
}

const emptyPayload = (): GoogleReviewsPayload => ({
  reviews: [],
  rating: null,
  total: null,
  mapsUrl: null,
})

export async function getGoogleReviews(language: "sk" | "en"): Promise<GoogleReviewsPayload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim()
  const placeId = process.env.GOOGLE_PLACE_ID?.trim()
  if (!apiKey || !placeId) return emptyPayload()

  const url = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`)
  url.searchParams.set("languageCode", language)

  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    },
    next: { revalidate: REVIEWS_REVALIDATE_SECONDS },
  })
  if (!response.ok) return emptyPayload()

  const data = (await response.json()) as PlacesNewResponse
  if (data.error) return emptyPayload()

  const reviews = [...(data.reviews ?? [])]
    .sort((a, b) => {
      const aTime = a.publishTime ? Date.parse(a.publishTime) : 0
      const bTime = b.publishTime ? Date.parse(b.publishTime) : 0
      return bTime - aTime
    })
    .filter((review) => review.authorAttribution?.displayName && review.text?.text?.trim())
    .map((review) => {
      const author = review.authorAttribution as NonNullable<PlacesNewReview["authorAttribution"]>
      return {
        id: `${review.publishTime ?? "review"}-${author.displayName}`,
        authorName: author.displayName as string,
        authorUrl: author.uri ?? null,
        authorPhoto: author.photoUri ?? null,
        rating: Math.round(review.rating ?? 0),
        text: review.text?.text?.trim() ?? "",
        relativeTime: review.relativePublishTimeDescription ?? "",
      }
    })

  return {
    reviews,
    rating: typeof data.rating === "number" ? data.rating : null,
    total: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
    mapsUrl: `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`,
  }
}
