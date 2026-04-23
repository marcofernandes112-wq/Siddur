interface Props {
  text: string
  className?: string
}

export function TransliterationBlock({ text, className = '' }: Props) {
  if (!text) return null
  return (
    <p className={`text-translit ${className}`} lang="pt-Latn">
      {text}
    </p>
  )
}
