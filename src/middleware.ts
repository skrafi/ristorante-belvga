import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr", "de"],
  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "always",
})

export const config = {
  // Match only pathnames without `.`, `_`, or `api`
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
