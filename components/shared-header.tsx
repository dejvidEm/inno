"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import {
  Menu,
  DoorClosedIcon as CloseIcon,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useMobile } from "@/hooks/use-mobile"

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

export const SharedHeader = () => {
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()
  const pathname = usePathname()

  // Detect if we are on a legal page (privacy policy or cookies)
  const isLegalPage = pathname.startsWith('/privacy-policy') || pathname.startsWith('/cookies')
  // Detect if we are on the academy page
  const isAcademyPage = pathname.startsWith('/academy')

  const navItems = isLegalPage
    ? [
        { href: '/', label: t.navAbout },
        { href: '/', label: t.navBarbers },
        { href: '/', label: t.navReviews },
        { href: '/', label: t.navContact },
        { href: '/academy', label: 'Academy' },
      ]
    : isAcademyPage
    ? [
        { href: '/#about', label: t.navAbout },
        { href: '/#barbers', label: t.navBarbers },
        { href: '/#reviews', label: t.navReviews },
        { href: '/#contact', label: t.navContact },
        { href: '/academy', label: 'Academy' },
      ]
    : [
        { href: '#about', label: t.navAbout },
        { href: '#barbers', label: t.navBarbers },
        { href: '#reviews', label: t.navReviews },
        { href: '#contact', label: t.navContact },
        { href: '/academy', label: 'Academy' },
      ]

  const logoHref = isLegalPage ? '/' : isAcademyPage ? '/' : '#hero'

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
