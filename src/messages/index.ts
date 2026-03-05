const messages = {
  en: () => import("./en.json"),
  fr: () => import("./fr.json"),
  de: () => import("./de.json"),
} as const

export default messages
