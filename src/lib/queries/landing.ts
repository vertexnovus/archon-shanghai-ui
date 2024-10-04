import http from '@/lib/http'
import { SetupTypes } from '@/services/settings'
import { DataCollection } from '@/types/collection'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export type LandingLiveTypes = {
  data: {
    product: string
    liveDate: Date
    drawing: boolean
    duration: number
    dCount: number
    previous: { winners: Array<{ numbers: string; prize: string }>; lotteryDate: string }
    winners: Array<{ numbers: string; prize: string }>
  }
}

export type LandingLiveWinnerTypes = {
  winners: Array<{ numbers: string; prize: string }>
}

export const landing = createQueryKeys('landing', {
  settings: (params = {}) => ({
    queryKey: ['list'],
    queryFn: async ({ signal }): Promise<DataCollection<SetupTypes>> => {
      return await http.get('settings/web', { params, signal })
    },
  }),
  fetch: () => ({
    queryKey: ['fetch'],
    queryFn: async ({ signal }): Promise<{ data: { upcomingLive: Date } }> => {
      return await http.get('landing', { signal })
    },
  }),
  live: () => ({
    queryKey: ['live'],
    queryFn: async ({ signal }): Promise<LandingLiveTypes> => {
      return await http.get('landing/live', { signal })
    },
  }),

  liveWinner: () => ({
    queryKey: ['live', 'winners'],
    queryFn: async ({ signal }): Promise<LandingLiveTypes> => {
      return await http.get('landing/live/winners', { signal })
    },
  }),
})
