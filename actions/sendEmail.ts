"use server"

import * as React from "react"
import { Resend } from "resend"
import { render, toPlainText } from "@react-email/render"
import ContactFormEmail from "@/emails/index"

const resend = new Resend(process.env.API_KEY) // odporúčam premenovať na RESEND_API_KEY

export const sendEmail = async (formData: FormData) => {
  const email   = formData.get("email")   as string | null
  const meno    = formData.get("meno")    as string | null
  const cislo   = formData.get("cislo")   as string | null
  const kurz    = formData.get("kurz")    as string | null
  const message = formData.get("message") as string | null

  if (!email || !meno || !kurz || !message) {
    return { ok: false, error: "Chýbajú povinné polia." }
  }

  // 1) Vyrenderuj HTML (a voliteľne plain text)
  const element = React.createElement(ContactFormEmail, {
    message, email, name: meno, number: cislo ?? "", kurz: kurz ?? ""
  })

  const html = await render(element)            // React Email 3.x: render je async
  const text = toPlainText(html)                // pekný text fallback

  // 2) Pošli cez Resend s `html:` (nie `react:`!)
  const { data, error } = await resend.emails.send({
    from: "Inno Studio <onboarding@resend.dev>", // na test ok; v produkcii použi overenú doménu
    to: "innomenstudio@gmail.com",
    subject: "Správa z webu innostudio.sk",
    replyTo: email,
    html,
    text,
  })

  if (error) {
    console.error("Resend error:", error)
    return { ok: false, error: String(error) }
  }

  return { ok: true, id: data?.id ?? null }
}