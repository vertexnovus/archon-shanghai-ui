import http from '@/lib/http'
import { SetupTypes } from '@/services/settings'
import { DataCollection } from '@/types/collection'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const setup = createQueryKeys('setup', {
  list: (params = {}) => ({
    queryKey: ['list'],
    queryFn: async ({ signal }): Promise<DataCollection<SetupTypes>> => {
      return await http.get('settings', { params, signal })
    },
  }),
})
