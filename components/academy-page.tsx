"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Scissors,
  MapPin,
  Phone,
  Mail,
  ArrowDown,
  GraduationCap,
  Users,
  User,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { SharedHeader } from "@/components/shared-header"
import GoogleMap from '@/components/Map'

type Theme = "light" | "dark"

type Instructor = {
  name: string
  specialty: string
  imgSrc: string
  bio: string
  experience: string
}

const instructorsData: Instructor[] = [
  {
    name: "Lukáš 'Lucas' Kocián",
    specialty: "Classic Techniques & Precision Cuts",
    imgSrc: "/photos/academy4.jpeg",
    bio: "Lucas sám začínal strihávať v Žiline u rodičov na balkóne, kde strihával iba blízkych ľudí z rodiny a pár kamarátov. Rozhodol sa presťahovať do Bratislavy a začať novú kariéru.Za dva mesiace sa stal v BEGENTLEMAN plne obsadeným barberom. Bol hlavným školiteľom BEGENTLEMAN a následne sa osamostatnil a stal sa spoluzakladateľom INNOSTUDIO a INNOACADEMY.\n\nLucas je Ambasádorom švédskej značky Noberu of Sweden. Absolvoval svetové školenia ako napríklad od Alan Beak, Hayden Cassidy a od tímu MENSPIRE a takisto vyhral BarberBattle v Záhrebe.\n\nMomentálne je aktívnym školiteľom a barberom v INNOACADEMY a je pripravený posúvať svoju vášeň a vedomosti ďalším talentovaným barberom.",
    experience: "EDUCATOR / HAIRSTYLIST / BARBER",
  },
  {
    name: "Dominik 'Rynik' Rybár",
    specialty: "Advanced Styling & Business Skills",
    imgSrc: "/photos/rynik.png",
    bio: "Dominik má 26 rokov a pochádza zo Svätého Jura. Strihaniu sa venuje už viac ako 6 rokov. Jeho cesta barbera sa začala už na strednej škole, kde si rád upravoval vlastné vlasy a napadlo mu skúsiť strihať kamarátov a spolužiakov.Prvé skúsenosti získaval v detskej izbe a učil sa najmä z YouTube videí. Po roku absolvoval akreditovaný barberský kurz, kde si osvojil základné techniky a vybudoval pevné základy.\n\nNásledne nastúpil do Begentleman, kde sa nielen zdokonalil v praxi, ale zúčastnil sa aj školení a workshopov od slovenských aj zahraničných barberov. Časom sa stal plne vybookovaným barberom a zároveň aj školiteľom v Begentleman Academy.\n\nDoteraz odškolil viaceré kurzy pre začiatočníkov aj niekoľko individuálnych školení, kde sa mohol podeliť o svoje skúsenosti a pomôcť ďalším barberom rásť. Po 5 rokoch sa osamostatnil a stal sa spoluzakladateľom INNOSTUDIO.",
    experience: "EDUCATOR / HAIRSTYLIST / BARBER",
  },
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
          {t.academyHeroTitle}
        </motion.h1>
      </div>
    </section>
  )
}

const AboutSection = ({ theme }: { theme: Theme }) => {
  const { t } = useLanguage()
  const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
  const hrColor = theme === "light" ? "bg-beige-400" : "bg-white"
  const paragraphColor = theme === "light" ? "text-zinc-700" : "text-gray-400"

  return (
    <AnimatedSection
      id="about"
      theme={theme}
      sideImageSrc="/photos/academy1.jpeg"
      sideImageAlt="Barbering academy classroom"
      sideImagePosition="right"
    >
      <div className="text-center md:text-left">
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${headingColor}`}>
          {t.academyAboutTitle}
        </h2>
        <div className={`mt-4 h-1 w-24 ${theme === "light" ? "mx-auto md:mx-0" : "mx-auto"} ${hrColor}`} />
        <p
          className={`mt-8 max-w-3xl ${theme === "light" ? "mx-auto md:mx-0" : "mx-auto"} md:text-lg ${paragraphColor}`}
        >
          {t.academyAboutText}
        </p>
      </div>
    </AnimatedSection>
  )
}

const InstructorsSection = ({ theme }: { theme: Theme }) => {
  const { t } = useLanguage()
  const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
  const hrColor = theme === "light" ? "bg-zinc-900" : "bg-white"
  const cardBgColor = theme === "light" ? "bg-white" : "bg-zinc-800"
  const cardBorderColor = theme === "light" ? "border-gray-200" : "border-gray-700"
  const instructorNameColor = theme === "light" ? "text-zinc-900" : "text-white"
  const specialtyColor = theme === "light" ? "text-beige-500" : "text-beige-300"
  const bioColor = theme === "light" ? "text-zinc-600" : "text-gray-300"
  const experienceColor = theme === "light" ? "text-zinc-500" : "text-gray-400"

  return (
    <AnimatedSection className={theme === "light" ? "bg-gray-50" : "bg-zinc-900"}>
      <div id="instructors" className="mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${headingColor}`}>
          {t.academyInstructorsTitle}
        </h2>
        <div className={`mt-4 h-1 w-24 mx-auto ${hrColor}`} />
        <div className="mt-12 space-y-12 w-full px-2 md:px-4 md:max-w-6xl md:mx-auto">
          {instructorsData.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              className={`${cardBgColor} rounded-lg shadow-lg border ${cardBorderColor} p-4 md:p-8 overflow-hidden`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:items-start gap-8`}>
                {/* Image Section */}
                <div className="flex-shrink-0">
                  <div className="relative h-64 w-64 rounded-lg overflow-hidden border-4 border-beige-400 shadow-lg">
                    <Image
                      src={instructor.imgSrc || "/placeholder.svg"}
                      alt={`Portrait of ${instructor.name}`}
                      fill
                      loading="lazy"
                      style={{ objectFit: "cover" }}
                      className="grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
                
                {/* Text Section */}
                                  <div className="flex-1 text-center lg:text-left">
                    <h3 className={`text-2xl font-bold tracking-wide ${instructorNameColor} mb-3`}>{instructor.name}</h3>
                    <p className={`${experienceColor} text-base font-medium mb-4`}>{instructor.experience}</p>
                    <div className={`${bioColor} text-base leading-relaxed space-y-3`}>
                      {instructor.bio.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-3 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

const TrainingOptionsSection = ({ theme }: { theme: Theme }) => {
  const { t } = useLanguage()
  const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
  const hrColor = theme === "light" ? "bg-beige-400" : "bg-white"
  const cardBgColor = theme === "light" ? "bg-white" : "bg-zinc-800"
  const cardBorderColor = theme === "light" ? "border-beige-200" : "border-gray-700"
  const optionTitleColor = theme === "light" ? "text-zinc-900" : "text-white"
  const optionTextColor = theme === "light" ? "text-zinc-600" : "text-gray-300"

  return (
    <AnimatedSection id="options" theme={theme}>
      <div className="mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${headingColor}`}>
          {t.academyOptionsTitle}
        </h2>
        <div className={`mt-4 h-1 w-24 mx-auto ${hrColor}`} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            className={`${cardBgColor} rounded-lg shadow-lg border-2 ${cardBorderColor} p-8 text-left hover:border-beige-400 transition-colors duration-300 relative overflow-hidden`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-beige-400/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <User className="h-12 w-12 text-beige-400" />
                <div className="text-right">
                  <div className={`text-2xl font-bold ${optionTitleColor}`}>€250</div>
                  <div className={`text-sm ${optionTextColor}`}>za osobu</div>
                </div>
              </div>
              <h3 className={`text-2xl font-bold ${optionTitleColor} mb-4`}> 1-2-1 PRIVATE EDUCATION</h3>
              <p className={`${optionTextColor} leading-relaxed mb-6`}>{t.academyOption1Text}</p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className={`${theme === "light" ? "bg-gray-50" : "bg-zinc-700"} p-3 rounded-lg text-center`}>
                    <div className={`text-xl font-bold ${optionTitleColor}`}>8</div>
                    <div className={`text-xs ${optionTextColor}`}>Celkovo hodín</div>
                  </div>
                  <div className={`${theme === "light" ? "bg-gray-50" : "bg-zinc-700"} p-3 rounded-lg text-center`}>
                    <div className={`text-xl font-bold ${optionTitleColor}`}>1</div>
                    <div className={`text-xs ${optionTextColor}`}>Dní</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className={`font-semibold ${optionTitleColor} mb-2`}>Čo kurz obsahuje:</h4>
                  <ul className={`text-sm ${optionTextColor} space-y-1`}>
                    <li>• Precízny fading a nožnicové strihy</li>
                    <li>• Detailný styling a profesionálna úprava brady</li>
                    <li>• Filozofia barberingu – technika a kreativita</li>
                    <li>• Individuálny prístup lektora počas celého školenia</li>
                    <li>• Priestor na otázky a okamžité riešenia v praxi</li>
                    <li>• Pretavenie vedomostí do vlastného štýlu</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${cardBgColor} rounded-lg shadow-lg border-2 ${cardBorderColor} p-8 text-left hover:border-beige-400 transition-colors duration-300 relative overflow-hidden`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-beige-400/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <Users className="h-12 w-12 text-beige-400" />
                <div className="text-right">
                  <div className={`text-2xl font-bold ${optionTitleColor}`}>€1,490</div>
                  <div className={`text-sm ${optionTextColor}`}>za osobu</div>
                </div>
              </div>
              <h3 className={`text-2xl font-bold ${optionTitleColor} mb-4`}>BEGINNER COURSE</h3>
              <p className={`${optionTextColor} leading-relaxed mb-6`}>{t.academyOption2Text}</p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className={`${theme === "light" ? "bg-gray-50" : "bg-zinc-700"} p-3 rounded-lg text-center`}>
                    <div className={`text-xl font-bold ${optionTitleColor}`}>80</div>
                    <div className={`text-xs ${optionTextColor}`}>Celkovo hodín</div>
                  </div>
                  <div className={`${theme === "light" ? "bg-gray-50" : "bg-zinc-700"} p-3 rounded-lg text-center`}>
                    <div className={`text-xl font-bold ${optionTitleColor}`}>10</div>
                    <div className={`text-xs ${optionTextColor}`}>Dní</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className={`font-semibold ${optionTitleColor} mb-2`}>Čo kurz obsahuje:</h4>
                  <ul className={`text-sm ${optionTextColor} space-y-1`}>
                    <li>• Správna práca so strojčekom a nožnicami</li>
                    <li>• Základy fadingu a prechodu medzi dĺžkami</li>
                    <li>• Strihanie a úprava dlhých vlasov</li>
                    <li>• Styling a finálna prezentácia klienta</li>
                    <li>• Technické zručnosti a tvorba vlastného štýlu</li>
                    <li>• Dôraz na prax a istotu v rukách</li> 
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

const SWIPE_THRESHOLD_PX = 40     // koľko treba potiahnuť
const SWIPE_VELOCITY = 400        // a/alebo akou rýchlosťou

const PhotoSwiper = ({
    images,
    alt = "Gallery image",
  }: {
    images: string[]
    alt?: string
  }) => {
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState<1 | -1>(1)
  
    const go = (dir: 1 | -1) => {
      if (!images?.length) return
      setDirection(dir)
      setIndex((i) => (i + dir + images.length) % images.length)
    }
  
    const variants = {
      enter: (dir: 1 | -1) => ({ x: dir * 40, opacity: 0 }),
      center: { x: 0, opacity: 1 },
      exit: (dir: 1 | -1) => ({ x: -dir * 40, opacity: 0 }),
    }
  
    return (
      // na ≥md vyplní výšku stĺpca
      <div className="w-full md:h-full flex flex-col">
        {/* šípky – iba na ≥md */}
        <div className="hidden md:flex items-center justify-start gap-3 mb-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="rounded px-3 py-2 bg-zinc-200 hover:bg-zinc-300 transition"
            aria-label="Previous image"
          >
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-6 w-6" />
            </div>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="rounded px-3 py-2 bg-zinc-200 hover:bg-zinc-300 transition"
            aria-label="Next image"
          >
            <div className="flex items-center gap-2">
              <ChevronRight className="h-6 w-6" />
            </div>
          </button>
        </div>
  
        {/* stage – mobile portrait; na ≥md vyplní zvyšok výšky */}
        <div className="relative w-full overflow-hidden rounded shadow-lg bg-zinc-100 dark:bg-zinc-800
                        aspect-[3/4] md:aspect-auto md:flex-1 md:min-h-0">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.img
              key={index}
              src={images[index]}
              alt={alt}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover select-none"
              draggable={false}
            />
          </AnimatePresence>
  
          {/* touch swipe – na desktope vypnuté, aby šípky zostali klikateľné */}
          <motion.div
            className="absolute inset-0 md:pointer-events-none"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const { offset, velocity } = info
              if (offset.x < -SWIPE_THRESHOLD_PX || velocity.x < -SWIPE_VELOCITY) go(1)
              else if (offset.x > SWIPE_THRESHOLD_PX || velocity.x > SWIPE_VELOCITY) go(-1)
            }}
            whileTap={{ cursor: "grabbing" }}
          />
        </div>
  
        {/* indikátory */}
        <div className="mt-3 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (i === index) return
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-beige-400" : "bg-zinc-300 dark:bg-zinc-600"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }
  
  const ContactFormSection = ({ theme }: { theme: Theme }) => {
    const { t } = useLanguage()
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      option: "",
      message: "",
    })
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Form submitted:", formData)
    }
  
    const headingColor = theme === "light" ? "text-zinc-900" : "text-white"
    const hrColor = theme === "light" ? "bg-beige-400" : "bg-white"
    const textColor = theme === "light" ? "text-zinc-700" : "text-gray-300"
    const formBgColor = theme === "light" ? "bg-white" : "bg-zinc-800"
    const inputBgColor = theme === "light" ? "bg-white" : "bg-zinc-700"
    const inputBorderColor = theme === "light" ? "border-gray-300" : "border-gray-600"
    const inputTextColor = theme === "light" ? "text-zinc-900" : "text-white"
  
    // max 3 fotky (cyklické)
    const gallery = ["/photos/end1.jpeg", "/photos/academy2.jpeg", "/photos/end2.png"]
  
    return (
      <AnimatedSection id="contact" theme={theme}>
        {/* hlavička */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${headingColor}`}>
            {t.academyContactTitle}
          </h2>
          <div className={`mt-4 h-1 w-24 mx-auto ${hrColor}`} />
          <p className={`mt-6 ${textColor} md:text-lg`}>{t.academyContactText}</p>
        </div>
  
        {/* 2 stĺpce; rovnaká výška na ≥md */}
        <div className="mt-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:items-stretch">
          {/* ĽAVO: galéria – žiadny sticky, nech sa zarovná výškou s formulárom */}
          <div className="md:h-full">
            <PhotoSwiper images={gallery} alt="Academy gallery" />
          </div>
  
          {/* PRAVO: formulár – natiahnuť na výšku stĺpca */}
          <motion.form
            onSubmit={handleSubmit}
            className={`${formBgColor} p-6 rounded-lg shadow-lg w-full md:max-w-none h-full flex flex-col`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-4">
              <div>
                <label className={`block text-sm text-left font-medium ${textColor} mb-1`}>
                  {t.academyFormName} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`${inputBgColor} ${inputBorderColor} ${inputTextColor} focus:border-beige-400`}
                />
              </div>
              <div>
                <label className={`block text-sm text-left font-medium ${textColor} mb-1`}>
                  {t.academyFormEmail} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`${inputBgColor} ${inputBorderColor} ${inputTextColor} focus:border-beige-400`}
                />
              </div>
              <div>
                <label className={`block text-sm text-left font-medium ${textColor} mb-1`}>
                  {t.academyFormPhone}
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`${inputBgColor} ${inputBorderColor} ${inputTextColor} focus:border-beige-400`}
                />
              </div>
              <div>
                <label className={`block text-sm text-left font-medium ${textColor} mb-1`}>
                  {t.academyFormOption} <span className="text-red-500">*</span>
                </label>
                <select
                  name="option"
                  value={formData.option}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 rounded-md border ${inputBgColor} ${inputBorderColor} ${inputTextColor} focus:border-beige-400 focus:outline-none`}
                >
                  <option value="">Vyberte typ kurzu</option>
                  <option value="1on1">{t.academyFormOption1}</option>
                  <option value="1on2">{t.academyFormOption2}</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm text-left font-medium ${textColor} mb-1`}>
                  {t.academyFormMessage}
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`${inputBgColor} ${inputBorderColor} ${inputTextColor} focus:border-beige-400`}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-beige-400 hover:bg-beige-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
              >
                {t.academyFormSubmit}
              </Button>
            </div>
          </motion.form>
        </div>
      </AnimatedSection>
    )
  }
  

const Footer = () => {
  const { t } = useLanguage()
  const footerNavItems = [
    { href: "/#about", label: t.navAbout },
    { href: "/#barbers", label: t.navBarbers },
    { href: "/#reviews", label: t.navReviews },
    { href: "/#contact", label: t.navContact },
    { href: "/academy", label: "Academy" },
  ]

  return (
    <footer className="bg-black text-white pt-16 pb-12 md:pt-24 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 text-white mb-4">
              <Scissors className="h-7 w-7 text-beige-300" />
              <span className="text-2xl font-bold tracking-wider uppercase">INNO Studio</span>
            </Link>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} INNO Studio. <br className="sm:hidden" />
              All Rights Reserved.
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
          </div>
        </div>
      </div>
    </footer>
  )
}

export function AcademyPage() {
  return (
    <div className="bg-black min-h-screen font-sans">
      <SharedHeader />
      <main>
        <HeroSection />
        <div className="bg-white text-zinc-900">
          <AboutSection theme="light" />
        </div>
        <InstructorsSection theme="dark" />
        <div className="bg-white text-zinc-900">
          <TrainingOptionsSection theme="light" />
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
