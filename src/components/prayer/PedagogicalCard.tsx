interface Props { text: string }
export function PedagogicalCard({ text }: Props) {
  return (
    <div className="pedagogical-card">
      <p className="pedagogical-item">{text}</p>
    </div>
  )
}
