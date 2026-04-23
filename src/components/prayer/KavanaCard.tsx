interface Props { text: string }
export function KavanaCard({ text }: Props) {
  return (
    <div className="kavana-card">
      <p className="kavana-item">{text}</p>
    </div>
  )
}
