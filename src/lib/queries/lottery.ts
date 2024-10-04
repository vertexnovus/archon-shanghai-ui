import http from '@/lib/http'
import { LotteryTypes } from '@/services/lottery'
import { DataCollection } from '@/types/collection'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const lottery = createQueryKeys('lottery', {
  list: (params = {}) => ({
    queryKey: ['lottery', 'list', { params }],
    queryFn: async ({ signal }): Promise<DataCollection<LotteryTypes>> => {
      return await http.get('lottery', { params, signal })
    },
  }),
  detail: (id: string) => ({
    queryKey: ['lottery', 'detail', id],
    queryFn: async ({ signal }): Promise<LotteryTypes> => {
      return await http.get(`lottery/${id}`, { signal })
    },
  }),
  history: (params = {}) => ({
    queryKey: ['lottery', 'list', { params }],
    queryFn: async ({ signal }): Promise<DataCollection<LotteryTypes>> => {
      return await http.get('lottery/history', { params, signal })
    },
  }),
})
