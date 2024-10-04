import BottomNavigation from '@/components/ui/bottom-navigation'
import { LandingProvider } from '@/modules/landing/LandingProvider'
import Footer from '@/modules/landing/footer'
import Header from '@/modules/landing/header'
import PopupBanner from '@/modules/landing/popup-banner'
import { AppShell } from '@mantine/core'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_layout')({
  component: Layout,
})

export default function Layout() {
  const { i18n } = useTranslation('translation', { lng: localStorage.getItem('lang') ?? 'th' })

  useEffect(() => {
    ;(() => i18n.changeLanguage(localStorage.getItem('lang') ?? 'th'))()
  }, [])

  return (
    <AppShell footer={{ height: 52 }}>
      <LandingProvider>
        <PopupBanner />
        <Header />
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
        <Footer />
        <AppShell.Footer hiddenFrom="sm">
          <BottomNavigation />
        </AppShell.Footer>
      </LandingProvider>
    </AppShell>
  )
}
