interface Props { text: string }
export function MussarCard({ text }: Props) {
  return (
    <div className="mussar-card">
      <p className="mussar-item">{text}</p>
    </div>
  )
}
