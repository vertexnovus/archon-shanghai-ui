import http from '@/lib/http'
import { ProductTypes } from '@/services/product'
import { DataCollection } from '@/types/collection'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const product = createQueryKeys('product', {
  list: (params = {}) => ({
    queryKey: ['list', { params }],
    queryFn: async ({ signal }): Promise<DataCollection<ProductTypes>> => {
      return await http.get('products/admin', { params, signal })
    },
  }),
})
