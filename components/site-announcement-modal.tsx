"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Instagram, X } from "lucide-react"

import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "innostudio-announcement-dismissed"
const OPEN_DELAY_MS = 2000

/** Set to `true` when you want the announcement modal to show again. */
const SITE_ANNOUNCEMENT_ENABLED = false

const IG_URL = "https://www.instagram.com/innomenstudio/"

export function SiteAnnouncementModal() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!SITE_ANNOUNCEMENT_ENABLED) return
    try {
      if (typeof window === "undefined") return
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return
    } catch {
      // sessionStorage may be unavailable
    }

    const id = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [])

  const dismiss = React.useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {
      /* ignore */
    }
    setOpen(false)
  }, [])

  if (!SITE_ANNOUNCEMENT_ENABLED) {
    return null
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss()
      }}
    >
      <DialogPortal>
        <DialogOverlay
          className={cn(
            "z-[150] bg-zinc-950/55 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-[151] w-[calc(100%-2rem)] max-w-md translate-x-[-50%] translate-y-[-50%]",
            "rounded-[1.75rem] border border-[#1A202C]/10 bg-[#FDFBF7] p-8 shadow-xl outline-none",
            "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Oznámenie — zmeny v barbershope
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Informácia o pripravovaných zmenách v cenníku, službách a tíme. Sledujte Instagram pre ďalšie novinky.
          </DialogPrimitive.Description>

          <button
            type="button"
            onClick={dismiss}
            className="absolute right-4 top-4 rounded-full p-2 text-[#1A202C]/70 transition-colors hover:bg-[#1A202C]/5 hover:text-[#1A202C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A202C]/40"
            aria-label="Zavrieť"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center text-center text-[#1A202C]">
            <h2 className="mb-5 text-balance text-xl font-bold leading-snug tracking-tight sm:text-2xl">
              Pripravujeme zmeny v našom štúdiu.
            </h2>

            <div className="space-y-4 text-sm leading-relaxed sm:text-[0.95rem]">
              <p>
                Už čoskoro dôjde k{" "}
                <strong className="font-semibold">úprave cien</strong>,{" "}
                <strong className="font-semibold">novému rozdeleniu služieb</strong> a{" "}
                <strong className="font-semibold">zmenám v našej zostave</strong>.
              </p>
              <p>Sledujte nás pre viac informácií.</p>
            </div>

            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#1A202C]/15 bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#1A202C] transition-colors hover:border-[#1A202C]/30 hover:bg-white"
            >
              <Instagram className="h-5 w-5 shrink-0" aria-hidden />
              Instagram
            </a>

            <p className="mt-8 text-xs font-medium tracking-wide text-[#1A202C]/70">
              Váš tím INNOSTUDIO
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
