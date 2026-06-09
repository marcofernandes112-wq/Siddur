import { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  onClose: () => void
}

const PRAYERS = [
  { slug: 'hadlakat-nerot',    he: 'הַדְלָקַת נֵרוֹת',   pt: 'Acendimento das Velas' },
  { slug: 'shalom-aleichem',   he: 'שָׁלוֹם עֲלֵיכֶם',    pt: 'Shalom Aleichem' },
  { slug: 'eshet-chayil',      he: 'אֵשֶׁת חַיִל',        pt: 'Eshet Chayil — Mulher Virtuosa' },
  { slug: 'birkat-habanim',    he: 'בִּרְכַּת הַבָּנִים',  pt: 'Bênção dos Filhos' },
  { slug: 'kiddush-shabbat-bayit', he: 'קִדּוּשׁ לֵיל שַׁבָּת', pt: 'Kidush da Noite de Shabat' },
  { slug: 'hamotzi-shabbat',   he: 'הַמּוֹצִיא וּזְמִירוֹת', pt: 'HaMotzi e Zmirot' },
]

export function ShabbatBayitModal({ onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="sbm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sbm-panel" onClick={e => e.stopPropagation()}>
        <div className="sbm-header">
          <div>
            <h2 className="sbm-title">Recebimento de Shabat em Casa</h2>
            <p className="sbm-he">קַבָּלַת שַׁבָּת בַּבַּיִת</p>
          </div>
          <button className="sbm-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <ul className="sbm-list">
          {PRAYERS.map(({ slug, he, pt }) => (
            <li key={slug}>
              <Link to={`/prayer/${slug}`} className="sbm-item" onClick={onClose}>
                <span className="sbm-item-pt">{pt}</span>
                <span className="sbm-item-he">{he}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="sbm-footer">
          <Link to="/guided/shabbat_bayit" className="sbm-btn-guided" onClick={onClose}>
            ✦ Começar em Modo Guiado
          </Link>
          <Link to="/section/kabbalat-shabbat-bayit" className="sbm-btn-all" onClick={onClose}>
            Ver secção completa
          </Link>
        </div>
      </div>
    </div>
  )
}
