import http from '@/lib/http'
import { BannerTypes } from '@/services/settings'
import { DataCollection } from '@/types/collection'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const banner = createQueryKeys('banner', {
  list: (params = {}) => ({
    queryKey: ['list'],
    queryFn: async ({ signal }): Promise<DataCollection<BannerTypes>> => {
      return await http.get('banners', { params, signal })
    },
  }),
})
