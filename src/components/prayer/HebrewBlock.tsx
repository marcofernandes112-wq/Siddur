interface Props {
  text: string
  className?: string
}

export function HebrewBlock({ text, className = '' }: Props) {
  if (!text) return null
  return (
    <p className={`text-hebrew ${className}`} dir="rtl" lang="he">
      {text}
    </p>
  )
}
