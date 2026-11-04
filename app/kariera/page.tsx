import { CareerPage } from "@/components/career-page"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { Suspense } from "react"

const description =
  "Kariéra v barbershope INNOSTUDIO, Bratislava - Ružinov. Pridaj sa k tímu a pošli nám správu."

export const metadata = pageMetadata({
  title: "Kariéra",
  description,
  path: "/kariera",
})

export default function Kariera() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "INNOSTUDIO", path: "/" },
          { name: "Kariéra", path: "/kariera" },
        ])}
      />
      <Suspense fallback={null}>
        <CareerPage />
      </Suspense>
    </>
  )
}
