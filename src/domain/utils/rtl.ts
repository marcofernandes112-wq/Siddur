/** Hebrew and Arabic Unicode ranges */
const RTL_RANGE = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/

export function isRtl(text: string): boolean {
  return RTL_RANGE.test(text)
}

export function detectDirection(text: string): 'rtl' | 'ltr' {
  return isRtl(text) ? 'rtl' : 'ltr'
}

/** Wrap Hebrew text in a bidi-isolated span */
export function bidiWrap(text: string): string {
  if (isRtl(text)) {
    return `<span dir="rtl">${text}</span>`
  }
  return text
}
