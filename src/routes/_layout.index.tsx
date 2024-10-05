import { config } from '@/lib/constants/misc'
import { useLanding } from '@/modules/landing/LandingProvider'
import About from '@/modules/landing/about'
import Hero from '@/modules/landing/hero'
import History from '@/modules/landing/history'
import { getHistoryQueryOptions, landingSettingsQueryOptions, nextLiveQueryOptions } from '@/services/landing'
import { bannerQueryOptions } from '@/services/settings'
import { BackgroundImage, Space, useMantineColorScheme } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_layout/')({
  component: Index,
  loader: async ({ context: { queryClient } }) => {
    return await Promise.all([
      await queryClient.ensureQueryData(bannerQueryOptions),
      await queryClient.ensureQueryData(nextLiveQueryOptions),
      await queryClient.ensureQueryData(landingSettingsQueryOptions),
      await queryClient.ensureQueryData(getHistoryQueryOptions({ page: 1, count: 9 })),
    ])
  },
})

function Index() {
  const { setColorScheme } = useMantineColorScheme()
  const { findValue } = useLanding()
  const mainBg = findValue(config.MAIN_BG, false)

  useEffect(() => {
    setColorScheme('light')
  }, [])

  return (
    <>
      <BackgroundImage
        src={mainBg!}
        style={{ backgroundSize: 'contain', backgroundAttachment: 'fixed' }}
        bgr="no-repeat"
      >
        <Hero />
      </BackgroundImage>
      <About />

      <Space h={{ base: 40, lg: 80 }} />
      <History />
    </>
  )
}
