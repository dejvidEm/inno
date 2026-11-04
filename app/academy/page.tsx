import { AcademyPage } from "@/components/academy-page"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { Suspense } from "react"

const description =
  "Barber akadémia INNOSTUDIO v Bratislave - Ružinov. Osobné školenie remesla od barberov z praxe."

export const metadata = pageMetadata({
  title: "Barber akadémia",
  description,
  path: "/academy",
})

export default function Academy() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "INNOSTUDIO", path: "/" },
          { name: "Barber akadémia", path: "/academy" },
        ])}
      />
      <Suspense fallback={null}>
        <AcademyPage />
      </Suspense>
    </>
  )
}
