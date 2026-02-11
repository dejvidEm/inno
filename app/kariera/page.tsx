import { CareerPage } from "@/components/career-page"
import { Suspense } from "react"

export default function Kariera() {
  return <Suspense fallback={null}>
  <CareerPage />
</Suspense>
}
