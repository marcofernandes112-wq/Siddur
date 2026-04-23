interface Props {
  text: string
  className?: string
}

export function TranslationBlock({ text, className = '' }: Props) {
  if (!text) return null
  return (
    <p className={`text-translation ${className}`} lang="pt">
      {text}
    </p>
  )
}
