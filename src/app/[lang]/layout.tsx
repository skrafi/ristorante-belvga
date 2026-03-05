import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Header } from "@/components/ui/Header"
import { Footer } from "@/components/ui/Footer"
import { ToastProvider } from "@/components/ui/Toast"
import { locales } from "@/i18n"

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: "Ristorante Pescheria Belvga",
  description: "Fresh Mediterranean seafood on the shores of Lake Lugano",
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const messages = await getMessages()

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header currentLang={lang as any} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ToastProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
