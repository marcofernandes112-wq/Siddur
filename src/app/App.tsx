import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './providers/ThemeProvider'
import { SettingsProvider } from './providers/SettingsProvider'
import { ContentProvider } from './providers/ContentProvider'
import { router } from './router'

export function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <ContentProvider>
          <RouterProvider router={router} />
        </ContentProvider>
      </SettingsProvider>
    </ThemeProvider>
  )
}
