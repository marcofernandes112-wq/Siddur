import { useEffect, type ReactNode } from 'react'
import { useSettingsStore } from '../../store/settingsStore'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSettingsStore((s) => s.settings.theme)
  const fontScale = useSettingsStore((s) => s.settings.fontScale)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale))
  }, [fontScale])

  return <>{children}</>
}
