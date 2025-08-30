import { AcademyPage } from "@/components/academy-page"
import { Suspense } from "react"

export default function Academy() {
  return <Suspense fallback={null}>
  <AcademyPage />
</Suspense>
}
