interface Props {
  label: string
}

export function ContextBadge({ label }: Props) {
  return <span className="context-badge">{label}</span>
}
