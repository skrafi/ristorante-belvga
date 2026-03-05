const messages = {
  en: () => import("../../messages/en.json"),
  fr: () => import("../../messages/fr.json"),
  de: () => import("../../messages/de.json"),
} as const

export default messages
