import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr", "de"],
  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "always",
})

export const config = {
  // Match all paths except api, _next, etc.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
