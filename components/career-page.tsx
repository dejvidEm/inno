"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Phone,
  Mail,
  ArrowDown,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { SharedHeader } from "@/components/shared-header"
import GoogleMap from '@/components/Map'
import { sendEmail } from "@/actions/sendEmail"

type Theme = "light" | "dark"

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
  const imageBorderColor = theme === "light" ? "#3f3f46" : "#e5e7eb"

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
            <div className="relative w-[280px] h-[420px] sm:w-[300px] sm:h-[450px] lg:w-[350px] lg:h-[525px]">
              <Image
                src={sideImageSrc || "/placeholder.svg"}
                alt={sideImageAlt}
                fill
                loading="lazy"
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
              <motion.div
                className={`absolute -top-2.5 -left-2.5 w-5 h-5 ${designElementAccentColor} opacity-70`}
                initial={{ scale: 0, opacity: 0 }}
                style={{ scale, opacity }}
              />
              <motion.div
                className={`absolute -bottom-2.5 -right-2.5 w-5 h-5 ${designElementAccentColor} opacity-70`}
                initial={{ scale: 0, opacity: 0 }}
                style={{ scale, opacity }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
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
        className="absolute top-1/2 left-8 md:left-12 w-0.5 h-1/4 bg-beige-200/70"
        style={{ y: "-50%", x: xLeftLine, opacity: opacityElements }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/2 right-8 md:right-12 w-0.5 h-1/4 bg-beige-200/70"
        style={{ y: "-50%", x: xRightLine, opacity: opacityElements }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-1/2 w-16 md:w-24 h-0.5 bg-beige-200/70"
        style={{ x: "-50%", y: yBottomLine, opacity: opacityElements }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-16 md:bottom-20 left-1/2 text-white"
        style={{ x: "-50%", y: yBottomLine, opacity: opacityElements }}
        aria-hidden="true"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </motion.div>
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
        >
          <img src="/photos/inno_academy_logo.png" alt="" className="w-40 md:w-56"/>
        </motion.div>
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {t.careerHeroTitle}
        </motion.h1>
      </div>
    </section>
  )
}

const CareerSection1 = ({ theme }: { theme: Theme }) => {
  const { t } = useLanguage()
  const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
  const hrColor = theme === "light" ? "bg-beige-400" : "bg-white"
  const paragraphColor = theme === "light" ? "text-zinc-700" : "text-gray-400"

  return (
    <AnimatedSection
      id="career"
      theme={theme}
      sideImageSrc="/photos/academy1.jpeg"
      sideImageAlt="Barbershop career"
      sideImagePosition="right"
    >
      <div className="text-center md:text-left">
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${headingColor}`}>
          {t.careerTitle}
        </h2>
        <div className={`mt-4 h-1 w-24 ${theme === "light" ? "mx-auto md:mx-0" : "mx-auto"} ${hrColor}`} />
        <p
          className={`mt-8 max-w-3xl ${theme === "light" ? "mx-auto md:mx-0" : "mx-auto"} md:text-lg ${paragraphColor}`}
        >
          {t.careerText}
        </p>
        <div className={`mt-8 ${theme === "light" ? "mx-auto md:mx-0" : "mx-auto"} max-w-3xl`}>
          <h3 className={`text-xl md:text-2xl font-semibold ${headingColor} mb-4`}>
            {t.careerSubtitle}
          </h3>
          <p className={`mb-6 ${paragraphColor} md:text-lg`}>
            {t.careerSubtitle2}
          </p>
          <h4 className={`text-lg md:text-xl font-semibold ${headingColor} mb-3 mt-6`}>
            {t.careerOfferTitle}
          </h4>
          <ul className={`space-y-3 ${paragraphColor} md:text-lg`}>
            <li className="flex items-start gap-3">
              <span className="text-beige-400 mt-1">•</span>
              <span>{t.careerPoint1}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-beige-400 mt-1">•</span>
              <span>{t.careerPoint2}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-beige-400 mt-1">•</span>
              <span>{t.careerPoint3}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-beige-400 mt-1">•</span>
              <span>{t.careerPoint4}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-beige-400 mt-1">•</span>
              <span>{t.careerPoint5}</span>
            </li>
          </ul>
        </div>
      </div>
    </AnimatedSection>
  )
}

const CareerSection2 = ({ theme }: { theme: Theme }) => {
  const { t } = useLanguage()
  const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
  const hrColor = theme === "light" ? "bg-beige-400" : "bg-white"
  const paragraphColor = theme === "light" ? "text-zinc-700" : "text-gray-400"

  return (
    <AnimatedSection
      id="career-expectations"
      theme={theme}
      sideImageSrc="/photos/academy2.jpeg"
      sideImageAlt="Barbershop career expectations"
      sideImagePosition="left"
    >
      <div className="text-center md:text-left">
        <h4 className={`text-lg md:text-xl font-semibold ${headingColor} mb-3`}>
          {t.careerExpectTitle}
        </h4>
        <ul className={`space-y-3 ${paragraphColor} md:text-lg mb-8`}>
          <li className="flex items-start gap-3">
            <span className="text-beige-400 mt-1">•</span>
            <span>{t.careerExpect1}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-beige-400 mt-1">•</span>
            <span>{t.careerExpect2}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-beige-400 mt-1">•</span>
            <span>{t.careerExpect3}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-beige-400 mt-1">•</span>
            <span>{t.careerExpect4}</span>
          </li>
        </ul>
        <p className={`mt-8 ${paragraphColor} md:text-lg`}>
          {t.careerContactText}
        </p>
      </div>
    </AnimatedSection>
  )
}

const ContactFormSection = ({ theme }: { theme: Theme }) => {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    meno: "",
    email: "",
    cislo: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      const fd = new FormData()
      fd.append("meno", formData.meno)
      fd.append("email", formData.email)
      if (formData.cislo) fd.append("cislo", formData.cislo)
      fd.append("kurz", "CAREER APPLICATION")
      fd.append("message", formData.message)

      const res = await sendEmail(fd)

      if (res?.ok) {
        setIsSubmitted(true)
      } else {
        setErrorMsg(res?.error || "Nepodarilo sa odoslať email.")
      }
    } catch (err) {
      setErrorMsg("Nastala neočakávaná chyba pri odosielaní.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
  const hrColor = theme === "light" ? "bg-beige-400" : "bg-white"
  const textColor = theme === "light" ? "text-zinc-700" : "text-gray-300"
  const formBgColor = theme === "light" ? "bg-white" : "bg-zinc-800"
  const inputBgColor = theme === "light" ? "bg-white" : "bg-zinc-700"
  const inputBorderColor = theme === "light" ? "border-gray-300" : "border-gray-600"
  const inputTextColor = theme === "light" ? "text-zinc-900" : "text-white"

  return (
    <AnimatedSection id="contact" theme={theme}>
      <div className="text-center max-w-3xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${headingColor}`}>
          {t.careerFormTitle}
        </h2>
        <div className={`mt-4 h-1 w-24 mx-auto ${hrColor}`} />
      </div>

      {/* 2 stĺpce */}
      <div className="mt-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:items-stretch">
        {/* Ľavo: obrázok s typografiou */}
        <motion.div
          className="relative w-full h-[400px] md:h-full rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Image
            src="/photos/academy1.jpeg"
            alt="Barbershop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center px-6">
              <motion.h3
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase text-white mb-4 leading-relaxed"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t.careerHeroTitle}
              </motion.h3>
            </div>
          </div>
        </motion.div>

        {/* Pravo: formulár */}
        <motion.form
          onSubmit={handleSubmit}
          className={`${formBgColor} p-6 md:p-8 rounded-lg shadow-lg w-full md:max-w-none h-full flex flex-col`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {isSubmitted ? (
            <div className="text-center py-12">
              <svg
                className="h-16 w-16 text-emerald-500 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4 12 14.01l-3-3" />
              </svg>
              <h3 className={`text-2xl font-bold mb-2 ${headingColor}`}>ODOSLANÉ. REGISTROVANÉ. HOTOVO.</h3>
              <p className={`${textColor}`}>Ozveme sa Vám čo najskôr</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm text-left font-medium ${textColor} mb-1`}>
                  {t.careerFormName} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="meno"
                  name="meno"
                  value={formData.meno}
                  onChange={handleInputChange}
                  required
                  className={`${inputBgColor} ${inputBorderColor} ${inputTextColor} focus:border-beige-400`}
                />
              </div>
              <div>
                <label className={`block text-sm text-left font-medium ${textColor} mb-1`}>
                  {t.careerFormEmail} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`${inputBgColor} ${inputBorderColor} ${inputTextColor} focus:border-beige-400`}
                />
              </div>
              <div>
                <label className={`block text-sm text-left font-medium ${textColor} mb-1`}>
                  {t.careerFormPhone}
                </label>
                <Input
                  type="tel"
                  id="cislo"
                  name="cislo"
                  value={formData.cislo}
                  onChange={handleInputChange}
                  className={`${inputBgColor} ${inputBorderColor} ${inputTextColor} focus:border-beige-400`}
                />
              </div>
              <div>
                <label className={`block text-sm text-left font-medium ${textColor} mb-1`}>
                  {t.careerFormMessage} <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className={`${inputBgColor} ${inputBorderColor} ${inputTextColor} focus:border-beige-400`}
                />
              </div>

              {errorMsg && (
                <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-2">
                  {errorMsg}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-beige-400 hover:bg-beige-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t.careerFormSubmit}…
                  </span>
                ) : (
                  t.careerFormSubmit
                )}
              </Button>
            </div>
          )}
        </motion.form>
      </div>
    </AnimatedSection>
  )
}

const Footer = () => {
  const { t } = useLanguage()
  const footerNavItems = [
    { href: "#about", label: t.navAbout },
    { href: "#barbers", label: t.navBarbers },
    { href: "#reviews", label: t.navReviews },
    { href: "#contact", label: t.navContact },
    { href: "/academy", label: "Academy" },
    { href: "/kariera", label: t.navCareer },
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

export function CareerPage() {
  return (
    <div className="bg-black min-h-screen font-sans">
      <SharedHeader />
      <main>
        <HeroSection />
        <div className="bg-white text-zinc-900">
          <CareerSection1 theme="light" />
        </div>
        <div className="bg-zinc-900 text-white">
          <CareerSection2 theme="dark" />
        </div>
        <div className="bg-gray-50 text-zinc-900">
          <ContactFormSection theme="light" />
        </div>
      </main>
      <GoogleMap />
      <Footer />
    </div>
  )
}
