import type { Metadata } from "next"
import { BOOKING_URL } from "@/lib/booking"

export const SITE_URL = "https://www.innostudio.sk"
export const SITE_NAME = "INNOSTUDIO"
export const SITE_LOCATION = "Bratislava - Ružinov"
export const TITLE_SUFFIX = `${SITE_NAME} ${SITE_LOCATION}`

export const HOME_TITLE = `${SITE_NAME} | Barbershop ${SITE_LOCATION}`
export const HOME_DESCRIPTION =
  "Barbershop INNOSTUDIO v Bratislave - Ružinov na Ivanskej ceste 15. Pánsky strih, úprava brady a combo. Po–Pi 8:00–20:00. Rezervácia online."

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=INNOSTUDIO&query_place_id=ChIJQXxXAKGPbEcR09JtjriYpRw"
const OG_IMAGE = "/photos/image2.jpeg"

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Ivanská cesta 16733/15",
  postalCode: "821 04",
  addressLocality: "Bratislava",
  addressRegion: "Bratislavský kraj",
  addressCountry: "SK",
}

function offer(name: string, description: string, minPrice: string, maxPrice: string) {
  return {
    "@type": "Offer",
    name,
    description,
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice,
      maxPrice,
      priceCurrency: "EUR",
    },
    availability: "https://schema.org/InStock",
    url: BOOKING_URL,
  }
}

export const barbershopJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BarberShop",
      "@id": `${SITE_URL}/#barbershop`,
      name: SITE_NAME,
      alternateName: ["INNO Studio", "Inno Men Studio"],
      description: HOME_DESCRIPTION,
      url: SITE_URL,
      image: [`${SITE_URL}${OG_IMAGE}`, `${SITE_URL}/pics/new.png`],
      logo: `${SITE_URL}/pics/new.png`,
      email: "innomenstudio@gmail.com",
      priceRange: "€€",
      currenciesAccepted: "EUR",
      address: postalAddress,
      geo: {
        "@type": "GeoCoordinates",
        latitude: 48.1666113,
        longitude: 17.1732734,
      },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Ružinov",
        containedInPlace: {
          "@type": "City",
          name: "Bratislava",
          containedInPlace: {
            "@type": "Country",
            name: "Slovensko",
          },
        },
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Ružinov" },
        { "@type": "City", name: "Bratislava" },
      ],
      hasMap: MAPS_URL,
      sameAs: ["https://www.instagram.com/innomenstudio/", MAPS_URL],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "20:00",
        },
      ],
      potentialAction: {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: BOOKING_URL,
          inLanguage: "sk",
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
        name: "Rezervovať termín",
      },
      makesOffer: [
        offer("Pánsky strih", "Pánsky strih v INNOSTUDIO, Bratislava - Ružinov.", "29", "35"),
        offer("Combo strih a brada", "Pánsky strih a úprava brady.", "45", "51"),
        offer("Úprava brady", "Úprava brady a kontúr.", "19", "23"),
      ],
      employee: [
        {
          "@type": "Person",
          name: 'Samuel "Ďamo" Brinza',
          jobTitle: "Barber",
          sameAs: "https://www.instagram.com/br_.samo/",
        },
        {
          "@type": "Person",
          name: 'Lukáš "Lucas" Kocian',
          jobTitle: "Barber",
          sameAs: "https://www.instagram.com/lukaskocian_/",
        },
        {
          "@type": "Person",
          name: 'Dominik "Rynik" Rybár',
          jobTitle: "Barber",
          sameAs: "https://www.instagram.com/ry.nik_/",
        },
      ],
      parentOrganization: {
        "@type": "Organization",
        name: "RYCAS ACADEMY s. r. o.",
        identifier: [
          { "@type": "PropertyValue", name: "IČO", value: "57019151" },
          { "@type": "PropertyValue", name: "DIČ", value: "2122542092" },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Doležalova 3424/15C",
          postalCode: "821 04",
          addressLocality: "Bratislava",
          addressCountry: "SK",
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "sk",
      description: HOME_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#barbershop` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
      inLanguage: "sk",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#barbershop` },
      primaryImageOfPage: `${SITE_URL}${OG_IMAGE}`,
    },
  ],
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function pageMetadata({
  title,
  description,
  path,
  absolute = false,
}: {
  title: string
  description: string
  path: string
  absolute?: boolean
}): Metadata {
  const fullTitle = absolute ? title : `${title} | ${TITLE_SUFFIX}`

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: fullTitle,
      description,
      locale: "sk_SK",
      siteName: SITE_NAME,
      images: [
        {
          url: OG_IMAGE,
          alt: `INNOSTUDIO, barbershop v lokalite ${SITE_LOCATION}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  }
}
