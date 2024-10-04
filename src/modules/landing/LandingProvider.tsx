import { landingSettingsQueryOptions, nextLiveQueryOptions } from '@/services/landing'
import { BannerTypes, SetupTypes, bannerQueryOptions } from '@/services/settings'
import { DataCollection } from '@/types/collection'
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'

export type LandingContextType = {
  config: DataCollection<SetupTypes>
  banners: DataCollection<BannerTypes>
  nextLive: { data: { upcomingLive: Date } }
  findValue: (value: any, hasDiffLang?: boolean) => string | undefined
}

export const LandingContext = createContext<LandingContextType>({
  config: { data: [] },
  banners: { data: [] },
  nextLive: { data: { upcomingLive: new Date() } },
  findValue: () => undefined,
})

export const LandingProvider = ({ children }: { children: ReactNode }) => {
  const [{ data: banners }, { data: setups }] = useSuspenseQueries({
    queries: [bannerQueryOptions, landingSettingsQueryOptions],
  })
  const { i18n } = useTranslation('translation')

  const { data: nextLive } = useSuspenseQuery({
    ...nextLiveQueryOptions,
    staleTime: Infinity,
  })

  const findValue = useCallback(
    (value: any, hasDiffLang: boolean = false) => {
      const findItem = setups.data.find((item: SetupTypes) => {
        let keyValue = 'en'
        if (i18n.language !== 'en') keyValue = 'tr'

        if (hasDiffLang) return item.key === `${value}_${keyValue}`

        return item.key === value
      })

      return findItem?.value
    },
    [setups.data, i18n.language],
  )

  return (
    <LandingContext.Provider
      value={{
        config: setups,
        banners,
        nextLive,
        findValue,
      }}
    >
      {children}
    </LandingContext.Provider>
  )
}

export function useLanding() {
  const context = useContext(LandingContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
