import { createHashRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { HomePage } from '../pages/HomePage'
import { SectionPage } from '../pages/SectionPage'
import { PrayerPage } from '../pages/PrayerPage'
import { GuidedModePage } from '../pages/GuidedModePage'
import { SearchPage } from '../pages/SearchPage'
import { FavoritesPage } from '../pages/FavoritesPage'
import { SettingsPage } from '../pages/SettingsPage'
import { AboutPage } from '../pages/AboutPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'section/:sectionSlug', element: <SectionPage /> },
      { path: 'prayer/:prayerSlug', element: <PrayerPage /> },
      { path: 'guided/:flowType', element: <GuidedModePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
])
