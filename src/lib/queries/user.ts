import http from '@/lib/http'
import { UserTypes } from '@/services/users'
import { DataCollection } from '@/types/collection'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const users = createQueryKeys('users', {
  list: (params = {}) => ({
    queryKey: ['list'],
    queryFn: async ({ signal }): Promise<DataCollection<UserTypes>> => {
      return await http.get('users', { params, signal })
    },
  }),
})
