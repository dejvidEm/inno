import { ClientPage } from "@/components/client-page"
import { JsonLd } from "@/components/json-ld"
import { barbershopJsonLd, HOME_DESCRIPTION, HOME_TITLE, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absolute: true,
})

export default function Home() {
  return (
    <>
      <JsonLd data={barbershopJsonLd} />
      <ClientPage />
    </>
  )
}
