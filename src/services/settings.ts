import { queries } from '@/lib/constants/queryKeys'
import http from '@/lib/http'
import { queryClient } from '@/lib/query'
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'

export type BannerTypes = {
  id: string | number
  imageUrl: string
}

export type SetupTypes = {
  id: string | number
  key: string
  value: string
  isFile: boolean
}

export const bannerQueryOptions = queryOptions(queries.banner.list())
export const useGetBanners = () => {
  return useQuery({
    ...queries.banner.list(),
    initialData: { data: [] },
  })
}

export const useSaveBanner = () => {
  return useMutation({
    mutationFn: async (values: FormData) => {
      return await http.post('/banners', values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(queries.banner.list())
    },
  })
}

export const useDeleteBanner = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await http.delete(`/banners/${id}`)
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(queries.banner.list())
    },
  })
}

export const setupQueryOptions = queryOptions(queries.setup.list())

export const useGetSetup = () => {
  return useQuery({
    ...queries.setup.list(),
    initialData: { data: [] },
  })
}

export const useSaveSetup = (editData: SetupTypes) => {
  return useMutation({
    mutationFn: async (values: FormData | { key: string; value: string }) => {
      if (editData.isFile) {
        return await http.post(`/settings/${editData.id}`, values, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }

      return await http.post(`/settings/${editData.id}`, values)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(queries.setup.list())
    },
  })
}
