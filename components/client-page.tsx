"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import GoogleMap from '@/components/Map';
import {
  Scissors,
  MapPin,
  Phone,
  Mail,
  Menu,
  DoorClosedIcon as CloseIcon,
  ArrowDown,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Instagram,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useMobile } from "@/hooks/use-mobile"
import type translations from "@/data/translations"

export type Barber = {
  name: string
  instagram: string
  imgSrc: string
  bio: string
}

type Theme = "light" | "dark"

// Updated barbersData with Instagram links
const barbersData: Barber[] = [
  {
    name: "Lukáš \"Lucas\" Kocian",
    instagram: "https://www.instagram.com/lukaskocian_/",
    imgSrc: "/photos/lukas.jpeg", // Updated image path
    bio: 'Ahojte, moje meno je Lukáš "Lucas" Kocian. Pochádzam zo Žiliny a barberingu sa venujem od roku 2020. Môžem o sebe povedať, že som veľmi kreatívny workoholik a mám veľký cit pre detail. Na barberingu ma zaujala práca s ľuďmi, kreativita a nekonečné zlepšovanie sa v tomto remesle. Barbering je pre mňa životný štýl. Neexistuje strih, ktorý strihám najradšej. Či je to strojčekový alebo nožnicový strih, každý jeden mám v obľube. Úspešne som absolvoval školenia od Alana Beaka a Hayden Cassidy a od tímu MENSPIRE.',
  },
  {
    name: "Dominik \"Rynik\" Rybár",
    instagram: "https://www.instagram.com/ry.nik_/",
    imgSrc: "/photos/rynik.jpeg", // Updated image path
    bio: 'Volám sa Dominik "Rynik" Rybar, som barber, ktorý miluje moderné účesy a precíznu prácu s nožnicami aj strojčekom. Barberingu sa venujem od strednej školy. Svoje zručnosti som zdokonaľoval na prestížnych školeniach pod vedením odborníkov ako Alan Beak, Hayden Cassidy a Menspire a mnoho ďalších. Vďaka týmto skúsenostiam prinášam klientom nielen štýlové a precízne strihy, ale aj individuálny prístup a servis na najvyššej úrovni. V INNOSTUDIO spájam minimalizmus s kvalitou, aby každý od nás odchádzal sebavedomý a spokojný.',
  },
]

type Review = {
  id: string
  textKey: keyof typeof translations.en
  nameKey: keyof typeof translations.en
  rating: number
}

const reviewsData: Review[] = [
  { id: "review1", textKey: "review1Text", nameKey: "review1Name", rating: 5 },
  { id: "review2", textKey: "review2Text", nameKey: "review2Name", rating: 5 },
  { id: "review3", textKey: "review3Text", nameKey: "review3Name", rating: 5 },
  { id: "review4", textKey: "review4Text", nameKey: "review4Name", rating: 5 },
]

const AnimatedSection = ({
  children,
  className = "",
  id,
  sideImageSrc,
  sideImageAlt = "Decorative image",
  sideImagePosition = "right",
  theme,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  sideImageSrc?: string
  sideImageAlt?: string
  sideImagePosition?: "left" | "right"
  theme?: "light" | "dark"
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageX = useTransform(scrollYProgress, [0.15, 0.5], sideImagePosition === "left" ? [-100, 0] : [100, 0])
  const imageOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1])
  const borderPathLength = useTransform(scrollYProgress, [0.25, 0.6], [0, 1])

  const hasSideImage = Boolean(sideImageSrc)
  const designElementAccentColor = theme === "light" ? "bg-beige-400" : "bg-beige-200"
  const imageBorderColor = theme === "light" ? "#000000" : "#000000"

  const scale = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 0.7])

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative w-full py-20 md:py-32 px-4 md:px-6 overflow-x-hidden ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className={`container mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${sideImagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"}`}
      >
        <div className={hasSideImage ? "w-full md:w-1/2" : "w-full"}>{children}</div>
        {hasSideImage && sideImageSrc && (
          <motion.div
            className="w-full md:w-1/2 flex items-center justify-center mt-12 md:mt-0"
            style={{ x: imageX, opacity: imageOpacity }}
          >
            <div className="relative w-[280px] h-[420px] sm:w-[300px] sm:h-[450px] lg:w-[400px] lg:h-[555px]">
              <Image
                src={sideImageSrc || "/placeholder.svg"}
                alt={sideImageAlt}
                fill
                className="object-cover rounded-sm shadow-xl"
              />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 150" preserveAspectRatio="none">
                <motion.rect
                  x="1"
                  y="1"
                  width="98"
                  height="148"
                  stroke={imageBorderColor}
                  strokeWidth="0.5"
                  fill="none"
                  rx="2"
                  initial={{ pathLength: 0 }}
                  style={{ pathLength: borderPathLength }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { language, setLanguage } = useLanguage()
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => setLanguage("en")}
        className={`text-sm font-medium transition-colors ${
          language === "en" ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <span className="text-gray-500">|</span>
      <button
        onClick={() => setLanguage("sk")}
        className={`text-sm font-medium transition-colors ${
          language === "sk" ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        SK
      </button>
    </div>
  )
}

const Header = () => {
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()
  const pathname = usePathname()

  // Detect if we are on a legal page (privacy policy or cookies)
  const isLegalPage = pathname.startsWith('/privacy-policy') || pathname.startsWith('/cookies')

  const navItems = isLegalPage
    ? [
        { href: '/', label: t.navAbout },
        { href: '/', label: t.navBarbers },
        { href: '/', label: t.navReviews },
        { href: '/', label: t.navContact },
      ]
    : [
        { href: '#about', label: t.navAbout },
        { href: '#barbers', label: t.navBarbers },
        { href: '#reviews', label: t.navReviews },
        { href: '#contact', label: t.navContact },
      ]

  const logoHref = isLegalPage ? '/' : '#hero'

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleRouteChange = () => closeMenu()
    window.addEventListener("hashchange", handleRouteChange, false)
    return () => window.removeEventListener("hashchange", handleRouteChange, false)
  }, [])

  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 10))

  return (
    <>
      <motion.header
        className={"fixed top-0 left-0 right-0 z-[60] px-4 py-3 md:px-6 bg-black/90 backdrop-blur-sm transition-colors duration-300"}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto flex items-center justify-between relative">
          {/* Logo left */}
          <div className="flex-1 flex items-center min-w-0">
            <Link href={logoHref} className="flex items-center gap-2 text-white z-[61]" onClick={closeMenu}>
              <img src="/pics/new.png" alt="" className="w-32 -mt-2"/>
            </Link>
          </div>
          {/* Center nav links (desktop only) */}
          {!isMobile && (
            <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8">
              {navItems.map((item, idx) => (
                <Link
                  key={item.label + idx}
                  href={item.href}
                  className="text-white hover:text-beige-200 transition-colors font-medium text-base uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          {/* Right side: language switcher and (mobile) burger */}
          <div className="flex-1 flex items-center justify-end gap-4 min-w-0">
            <LanguageSwitcher className="hidden sm:flex z-[61]" />
            {/* Mobile burger menu button */}
            {isMobile && (
              <motion.button
                onClick={toggleMenu}
                className="text-white z-[61] p-2"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <CloseIcon size={28} /> : <Menu size={28} />}
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            className="fixed top-20 left-0 right-0 bg-black/80 backdrop-blur-md z-50 p-4 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <nav className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-200 hover:text-white transition-colors text-lg py-2"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <LanguageSwitcher className="sm:hidden mt-2" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const HeroSection = () => {
  const { t } = useLanguage()
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const designElementSwipeOutRange = [0, 0.3]
  const xLeftLine = useTransform(scrollYProgress, designElementSwipeOutRange, ["0%", "-200%"])
  const xRightLine = useTransform(scrollYProgress, designElementSwipeOutRange, ["0%", "200%"])
  const yBottomLine = useTransform(scrollYProgress, designElementSwipeOutRange, ["0%", "300%"])
  const opacityElements = useTransform(scrollYProgress, designElementSwipeOutRange, [1, 0])

  return (
    <section id="hero" ref={targetRef} className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/old-cement-wall-texture.avif)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: parallaxY,
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <motion.div
        className="absolute top-1/2 left-8 md:left-12 w-0.5 h-1/4 bg-white"
        style={{ y: "-50%", x: xLeftLine, opacity: opacityElements }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/2 right-8 md:right-12 w-0.5 h-1/4 bg-white"
        style={{ y: "-50%", x: xRightLine, opacity: opacityElements }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-1/2 w-16 md:w-24 h-0.5 bg-white"
        style={{ x: "-50%", y: yBottomLine, opacity: opacityElements }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-16 md:bottom-20 left-1/2 text-white"
        style={{ x: "-50%", y: yBottomLine, opacity: 100 }}
        aria-hidden="true"
      >
        <ArrowDown className="h-10 w-10 animate-bounce text-white"/>
      </motion.div>
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {t.heroTitle}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl text-md md:text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          {t.heroSubtitle}
        </motion.p>
      </div>
    </section>
  )
}

const AboutSection = ({
  theme,
  sideImageSrc,
  sideImageAlt,
  sideImagePosition,
}: {
  theme: Theme
  sideImageSrc?: string
  sideImageAlt?: string
  sideImagePosition?: "left" | "right"
}) => {
  const { t } = useLanguage()
  const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
  const hrColor = theme === "light" ? "bg-beige-400" : "bg-white"
  const paragraphColor = theme === "light" ? "text-zinc-700" : "text-gray-400"

  // Split aboutText into 3 sections by sentence boundaries
  const aboutSentences = t.aboutText.split(/(?<=[.!?])\s+/)
  const section1 = aboutSentences.slice(0, 2).join(' ')
  const section2 = aboutSentences.slice(2, 4).join(' ')
  const section3 = aboutSentences.slice(4).join(' ')
  const aboutSections = [section1, section2, section3].filter(Boolean)

  return (
    <AnimatedSection
      id="about"
      theme={theme}
      sideImageSrc={"/priestory/about.jpeg"}
      sideImageAlt={sideImageAlt}
      sideImagePosition={sideImagePosition}
    >
      <div className="text-center md:text-left border-b-2 pb-2">
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${headingColor}`}>{t.aboutTitle}</h2>
        <div className={`mt-4 h-1 w-24 ${theme === "light" ? "mx-auto md:mx-0" : "mx-auto"} ${hrColor}`} />
        {aboutSections.map((section, idx) => (
          <p
            key={idx}
            className={`mt-8 max-w-3xl ${theme === "light" ? "mx-auto md:mx-0" : "mx-auto"} md:text-lg ${paragraphColor}${idx > 0 ? ' mt-8' : ''}`}
          >
            {section}
          </p>
        ))}
      </div>
    </AnimatedSection>
  )
}

const PricingSection = () => {
  const { t } = useLanguage()
  
  // Dynamic pricing data based on current language
  const pricingData = [
    { service: t.pricingHaircut, price: "30€", duration: "30 min" },
    { service: t.pricingCombo, price: "49€", duration: "50 min" },
    { service: t.pricingBeard, price: "19€", duration: "30 min" },
  ]

  return (
    <AnimatedSection id="pricing" className="bg-white">
      <div className="w-full max-w-2xl mx-auto text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase text-zinc-900">
          {t.pricingTitle}
        </h2>
        <div className="mt-1 mb-8 h-1 w-24 mx-auto md:mx-0 bg-beige-400" />
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="px-6 py-4 font-semibold text-zinc-700 uppercase tracking-wider">
                  {t.pricingService}
                </th>
                <th className="px-6 py-4 font-semibold text-zinc-700 uppercase tracking-wider text-right">
                  {t.pricingPrice}
                </th>
                <th className="px-6 py-4 font-semibold text-zinc-700 uppercase tracking-wider text-right hidden md:table-cell">
                  {t.pricingDuration}
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((item, idx) => (
                <tr key={item.service} className="border-t last:border-b-0 border-gray-100 hover:bg-beige-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-900 font-medium">{item.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-700 text-right">
                    <span className="md:hidden">{item.price} <span className="text-gray-400">·</span> <span>{item.duration}</span></span>
                    <span className="hidden md:inline">{item.price}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-700 text-right hidden md:table-cell">{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AnimatedSection>
  )
}

const ReviewsSection = ({ theme }: { theme: Theme }) => {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
  const hrColor = theme === "light" ? "bg-beige-400" : "bg-white"
  const cardBgColor = theme === "light" ? "bg-beige-50" : "bg-zinc-800"
  const cardTextColor = theme === "light" ? "text-zinc-700" : "text-gray-300"
  const cardNameColor = theme === "light" ? "text-zinc-900" : "text-white"
  const quoteIconColor = theme === "light" ? "text-beige-400" : "text-beige-300"
  const starColor = theme === "light" ? "text-beige-500" : "text-yellow-400"
  const navButtonColor = theme === "light" ? "text-zinc-700 hover:text-zinc-900" : "text-gray-400 hover:text-white"
  const navButtonBgHover = theme === "light" ? "hover:bg-beige-100" : "hover:bg-zinc-700"

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection
      if (nextIndex < 0) return reviewsData.length - 1
      if (nextIndex >= reviewsData.length) return 0
      return nextIndex
    })
  }

  const reviewVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
  }
  const currentReview = reviewsData[currentIndex]

  return (
    <AnimatedSection id="reviews" className={theme === "light" ? "bg-white" : "bg-black"}>
      <div className="w-full text-center">
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${headingColor}`}>{t.reviewsTitle}</h2>
        <div className={`mt-4 h-1 w-24 mx-auto ${hrColor}`} />
        <div className="mt-12 md:mt-16 relative w-full max-w-2xl mx-auto h-[320px] sm:h-[280px] md:h-[250px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={reviewVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className={`absolute inset-0 p-6 md:p-8 rounded-lg shadow-xl ${cardBgColor} flex flex-col items-start text-left`}
            >
              <Quote
                className={`absolute top-4 right-4 h-10 w-10 md:h-28 md:w-28 ${quoteIconColor} opacity-10`}
              />
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 md:h-5 md:w-5 ${starColor} ${i < currentReview.rating ? "fill-current" : ""}`}
                  />
                ))}
              </div>
              <p
                className={`text-sm md:text-base ${cardTextColor} mb-4 leading-relaxed italic line-clamp-5 sm:line-clamp-4 md:line-clamp-3`}
              >
                "{t[currentReview.textKey]}"
              </p>
              <p className={`font-semibold text-sm md:text-base ${cardNameColor} mt-auto`}>
                - {t[currentReview.nameKey]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => paginate(-1)}
            className={`p-2 rounded-full transition-colors duration-200 ${navButtonColor} ${navButtonBgHover}`}
            aria-label="Previous review"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="flex gap-2">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  currentIndex === index
                    ? theme === "light"
                      ? "bg-beige-500"
                      : "bg-yellow-400"
                    : theme === "light"
                      ? "bg-beige-200"
                      : "bg-zinc-600"
                } hover:${theme === "light" ? "bg-beige-400" : "bg-zinc-500"}`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => paginate(1)}
            className={`p-2 rounded-full transition-colors duration-200 ${navButtonColor} ${navButtonBgHover}`}
            aria-label="Next review"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </AnimatedSection>
  )
}

const BarbersSection = ({ theme }: { theme: Theme }) => {
  const { t } = useLanguage()
  const [expandedBarber, setExpandedBarber] = useState<string | null>(null)
  const handleToggle = (barberName: string) => setExpandedBarber((prev) => (prev === barberName ? null : barberName))
  const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
  const hrColor = theme === "light" ? "bg-zinc-900" : "bg-white" // Changed for light theme consistency
  const cardBorderColor = theme === "light" ? "border-gray-300" : "border-gray-700"
  const cardHoverBorderColor = theme === "light" ? "group-hover:border-zinc-900" : "group-hover:border-white"
  const barberNameColor = theme === "light" ? "text-zinc-900" : "text-white"
  const specialtyColor = theme === "light" ? "text-zinc-600" : "text-gray-400"

  return (
    <AnimatedSection>
      <div id="barbers" className="container mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${headingColor}`}>{t.barbersTitle}</h2>
        <div className={`mt-4 h-1 w-24 mx-auto ${hrColor}`} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto">
          {barbersData.slice(0, 2).map((barber, index) => (
            <motion.div
              key={barber.name}
              className="relative overflow-hidden flex flex-col items-center h-[40rem] pt-12 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              layout
            >
              <div
                className="flex flex-col items-center cursor-pointer w-full"
                onClick={() => handleToggle(barber.name)}
              >
                <div className={`relative h-96 w-64 rounded-none overflow-hidden border-4 ${cardBorderColor} group-hover:border-beige-400 transition-all duration-300 transform group-hover:scale-105 md:w-64 w-full max-w-xs sm:max-w-sm`}>
                  <Image
                    src={barber.imgSrc || "/placeholder.svg"}
                    alt={`Portrait of ${barber.name}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <p className="text-5xl text-black opacity-30 font-black drop-shadow-lg">Detail</p>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                </div>
                <h3 className={`mt-6 text-xl font-bold tracking-wide ${barberNameColor}`}>{barber.name}</h3>
                <a
                  href={barber.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors"
                  onClick={e => e.stopPropagation()}
                  aria-label={`Instagram ${barber.name}`}
                >
                  <Instagram size={24} />
                  <span className="sr-only">Instagram</span>
                </a>
                <div className="flex flex-row gap-3 pt-2 justify-center">
                          <p className="text-gray-400">SK</p>
                          <p className="text-gray-400">EN</p>
                        </div>
              </div>
              <AnimatePresence>
                {expandedBarber === barber.name && (
                  <motion.div
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 bg-zinc-900/95 p-6 text-white flex flex-col justify-between items-center text-center overflow-y-auto max-h-full md:rounded-lg w-full md:w-auto"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                  >
                    <>
                      <div className="flex flex-col items-center text-center w-full max-w-md">
                        <h3 className="text-3xl font-bold tracking-tight text-white mb-2">{barber.name}</h3>
                        <a
                          href={barber.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mb-4 flex items-center gap-2 pt-2 text-pink-500 hover:text-pink-600 transition-colors"
                          aria-label={`Instagram ${barber.name}`}
                          onClick={e => e.stopPropagation()}
                        >
                          <Instagram size={24} />
                          <span className="sr-only">Instagram</span>
                        </a>
                        <div className="flex flex-row gap-2 justify-center">
                          <p className="text-gray-400">SK</p>
                          <p className="text-gray-400">EN</p>
                        </div>
                        <div className="my-3 h-px w-20 bg-gray-500 mx-auto" />
                      </div>
                      <div className="w-full max-w-md text-center py-4 my-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-2">
                          {t.drawerBio}
                        </h4>
                        <p className="text-gray-200 text-base leading-relaxed">{barber.bio}</p>
                      </div>
                      <div className="w-full max-w-md mt-4">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => handleToggle(barber.name)}
                          className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-zinc-900 w-full"
                        >
                          {t.drawerClose || "Close"}
                        </Button>
                      </div>
                    </>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

const Word = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode
  progress: any
  range: [number, number]
}) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-20"}>{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  )
}

const ParallaxBanner = ({
  bgImage,
  title,
  text,
  buttonText,
  buttonLink,
}: {
  bgImage: string
  title: string
  text: string
  buttonText: string
  buttonLink: string
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress: trackScrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })
  const contentOpacity = useTransform(trackScrollYProgress, [0.25, 0.6], [0, 1])
  const bgParallaxY = useTransform(trackScrollYProgress, [0, 1], ["-15%", "15%"])
  const words = title.split(" ")

  return (
    <section ref={trackRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: bgParallaxY,
          }}
        />
        <motion.div
          className="absolute top-1/4 left-8 md:left-16 w-px h-1/2 bg-white"
          style={{
            opacity: useTransform(trackScrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
            scaleY: useTransform(trackScrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]),
            transformOrigin: "top",
          }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-1/4 right-8 md:right-16 w-px h-1/2 bg-white"
          style={{
            opacity: useTransform(trackScrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
            scaleY: useTransform(trackScrollYProgress, [0.15, 0.45, 0.65, 0.95], [0, 1, 1, 0]),
            transformOrigin: "bottom",
          }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute bottom-12 left-1/2 w-1/4 h-px bg-white"
          style={{
            x: "-50%",
            opacity: useTransform(trackScrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
            scaleX: useTransform(trackScrollYProgress, [0.2, 0.5, 0.7, 1], [0, 1, 1, 0]),
            transformOrigin: "center",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white flex flex-wrap justify-center leading-tight">
            {words.map((word, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              return (
                <Word key={i} progress={trackScrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              )
            })}
          </h2>
          <motion.p className="mt-4 max-w-xl text-lg text-gray-300" style={{ opacity: contentOpacity }}>
            {text}
          </motion.p>
          <motion.div style={{ opacity: contentOpacity }}>
            <Button asChild size="lg" className="mt-8 bg-white text-black hover:bg-gray-200 font-bold">
              <Link href={buttonLink} target="_blank">{buttonText}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const ContactSection = ({
  theme,
  sideImageSrc,
  sideImageAlt,
  sideImagePosition,
}: {
  theme: Theme
  sideImageSrc?: string
  sideImageAlt?: string
  sideImagePosition?: "left" | "right"
}) => {
  const { t } = useLanguage()
  const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
  const hrColor = theme === "light" ? "bg-beige-400" : "bg-white"
  const iconColor = theme === "light" ? "text-zinc-500" : "text-gray-400"
  const textColor = theme === "light" ? "text-zinc-700" : "text-gray-300"

  return (
    <AnimatedSection
      id="contact"
      theme={theme}
      sideImageSrc={"/priestory/image2.jpeg"}
      sideImageAlt={sideImageAlt}
      sideImagePosition={sideImagePosition}
    >
      <div className="text-center md:text-left border-b-2 pb-2">
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${headingColor}`}>{t.contactTitle}</h2>
        <div className={`mt-4 h-1 w-24 ${theme === "light" ? "mx-auto md:mx-0" : "mx-auto"} ${hrColor}`} />
        <div className={`mt-12 max-w-md ${theme === "light" ? "mx-auto md:mx-0" : "mx-auto"} space-y-6`}>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <MapPin className={`h-5 w-5 ${iconColor}`} />
            <span className={`${textColor}`}>{t.contactAddress}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Phone className={`h-5 w-5 ${iconColor}`} />
            <span className={`${textColor}`}>{t.contactPhone}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Mail className={`h-5 w-5 ${iconColor}`} />
            <span className={`${textColor}`}>{t.contactEmail}</span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

const BookNowButton = ({ isCtaVisible }: { isCtaVisible: boolean }) => {
  const { t } = useLanguage()
  return (
    <AnimatePresence>
      {!isCtaVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }} // Adjusted delay for initial appearance
          className="fixed bottom-6 right-6 z-[60]"
        >
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-gray-200 rounded-full shadow-lg font-bold uppercase tracking-wider"
          >
            <Link href="https://services.bookio.com/inno-studio/widget?lang=sk&fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExRXQ2cll4cUNzTmVaalFEdwEeTmb7mAfmDSaY1TLHQS4seOYe-kBBufPJEBXbfxjAwMBkX1D5ThshZk81_CM_aem_5LLVmnf8SNa7ShPD8mf2bQ" target="_blank" rel="noopener noreferrer">
              {t.bookNow}
            </Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const CallToActionBanner = ({ outerRef }: { outerRef?: React.Ref<HTMLDivElement> }) => {
  const { t } = useLanguage()
  const internalSectionRef = useRef<HTMLDivElement | null>(null) // Keep for internal animations

  // Combine refs if outerRef is provided
  const sectionRef = (node: HTMLDivElement | null) => {
    internalSectionRef.current = node
    if (typeof outerRef === "function") {
      outerRef(node)
    } else if (outerRef) {
      ;(outerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
    }
  }

  const { scrollYProgress } = useScroll({
    target: internalSectionRef, // Use internal ref for scroll progress
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])
  const y = useTransform(scrollYProgress, [0.3, 0.7], [50, 0])

  return (
    <motion.section
      ref={sectionRef} // Apply combined ref here
      className="bg-zinc-900 text-white py-20 md:py-28"
      style={{ opacity, y }}
    >
      {/* ... rest of the CTA banner content ... */}
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-beige-100">
          {t.ctaBannerTitle}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">{t.ctaBannerSubtitle}</p>
        <Button
          asChild
          size="lg"
          className="mt-10 bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-wider px-10 py-4 text-lg"
        >
          <Link href="https://services.bookio.com/inno-studio/widget?lang=sk&fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExRXQ2cll4cUNzTmVaalFEdwEeTmb7mAfmDSaY1TLHQS4seOYe-kBBufPJEBXbfxjAwMBkX1D5ThshZk81_CM_aem_5LLVmnf8SNa7ShPD8mf2bQ" target="_blank" rel="noopener noreferrer">
            {t.ctaBannerButton}
          </Link>
        </Button>
      </div>
    </motion.section>
  )
}

const Footer = () => {
  const { t } = useLanguage()
  const footerNavItems = [
    { href: "#about", label: t.navAbout },
    { href: "#barbers", label: t.navBarbers },
    { href: "#reviews", label: t.navReviews },
    { href: "#contact", label: t.navContact },
  ]

  return (
    <footer className="bg-black text-white pt-16 pb-12 md:pt-24 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="#hero" className="flex items-center gap-2 text-white mb-4">
              <img src="pics/new.png" alt="" className="w-40"/>
            </Link>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} INNOSTUDIO. <br className="sm:hidden" />
              Všetky práva vyhradené.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-beige-200 uppercase tracking-wider mb-4">{t.footerQuickLinks}</h3>
            <ul className="space-y-2">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-beige-100 transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-beige-200 uppercase tracking-wider mb-4">{t.footerContactUs}</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="h-5 w-5 text-beige-300 flex-shrink-0" />
                <span className="text-gray-300">{t.contactAddress}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-5 w-5 text-beige-300 flex-shrink-0" />
                <a
                  href={`tel:${t.contactPhone.replace(/\s/g, "")}`}
                  className="text-gray-300 hover:text-beige-100 transition-colors duration-200"
                >
                  {t.contactPhone}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-5 w-5 text-beige-300 flex-shrink-0" />
                <a
                  href={`mailto:${t.contactEmail}`}
                  className="text-gray-300 hover:text-beige-100 transition-colors duration-200"
                >
                  {t.contactEmail}
                </a>
              </li>
            </ul>
            <div className="mt-4 text-gray-400 text-center md:text-left">
              <div className="font-semibold mb-1">Otváracie hodiny</div>
              <div>Pon - Pia: 8:00 - 20:00</div>
              <div>Sobota: Na objednávku</div>
              <div>Nedeľa: zatvorené</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-zinc-800 pt-6 pb-2 bg-zinc-950/80">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400 text-center">
          <div>
            <span className="font-semibold text-white">RYCAS Academy s. r. o.</span> &nbsp;|&nbsp; Doležalova 3424/15C, Bratislava - Ružinov &nbsp;|&nbsp; IČO: 57019151 &nbsp;|&nbsp; DIČ: 2122542092
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-beige-100 underline transition-colors duration-200">Privacy Policy</a>
            <a href="/cookies" target="_blank" rel="noopener noreferrer" className="hover:text-beige-100 underline transition-colors duration-200">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Header, Footer }

export function ClientPage() {
  const { t } = useLanguage()
  const ctaBannerRef = useRef<HTMLDivElement | null>(null)
  const isCtaBannerInView = useInView(ctaBannerRef, { amount: 0.3, once: false })
  const isMobile = useMobile()

  return (
    <div className="bg-black min-h-screen font-sans">
      <Header />
      <main>
        <HeroSection />
        <div className="bg-white text-zinc-900">
          <AboutSection
            theme="light"
            sideImageSrc="/placeholder.svg?width=400&height=600"
            sideImageAlt="Minimalist barbershop tools"
            sideImagePosition="right"
          />
        </div>
        <PricingSection />
        {!isMobile && (
          <ParallaxBanner
            bgImage="/banner-bg.png"
            title={t.banner1Title}
            text={t.banner1Text}
            buttonText={t.bookNow}
            buttonLink="https://services.bookio.com/inno-studio/widget?lang=sk&fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExRXQ2cll4cUNzTmVaalFEdwEeTmb7mAfmDSaY1TLHQS4seOYe-kBBufPJEBXbfxjAwMBkX1D5ThshZk81_CM_aem_5LLVmnf8SNa7ShPD8mf2bQ"
          />
        )}
        <div className="bg-white text-zinc-900">
          <BarbersSection theme="light" />
        </div>
        <ReviewsSection theme="dark" />
        <div className="bg-white text-zinc-900">
          <ContactSection
            theme="light"
            sideImageSrc="/placeholder.svg?width=400&height=600"
            sideImageAlt="Abstract architectural lines"
            sideImagePosition="left"
          />
        </div>
        <CallToActionBanner outerRef={ctaBannerRef} />
      </main>
      <GoogleMap />
      <Footer />
      <BookNowButton isCtaVisible={isCtaBannerInView} />
    </div>
  )
}
