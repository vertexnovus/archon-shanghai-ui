import { queries } from '@/lib/constants/queryKeys'
import http from '@/lib/http'
import { queryClient } from '@/lib/query'
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'

export type ProductCreateValues = {
  id?: number | string
  name: string
  defaultDuration: number
  defaultLiveTime: string
}

export type ProductTypes = {
  id: string
  name: string
  defaultDuration: number
  defaultLiveTime: string
}

type ProductParams = {
  page?: number | string
  count?: number | string
  search?: string
}

export const getProductOptions = (params?: ProductParams) => {
  return queryOptions({
    ...queries.product.list(params),
  })
}

export const useGetProduct = (params?: ProductParams) => {
  return useQuery({
    ...queries.product.list(params),
    initialData: () => {
      return {
        data: [],
        meta: {},
      }
    },
  })
}

export const useSaveProduct = (paramsId?: string | number) => {
  return useMutation({
    mutationFn: async (values: ProductCreateValues) => {
      const url = paramsId ? `products/${paramsId}` : 'products'
      return await http.post(url, values)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(queries.product.list())
    },
  })
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await http.delete(`products/${id}`)
    },
    onSuccess: async (_data, _error) => {
      await queryClient.invalidateQueries(queries.product.list())
    },
  })
}
