import { queries } from '@/lib/constants/queryKeys'
import http from '@/lib/http'
import { queryClient } from '@/lib/query'
import { useMutation, useQuery } from '@tanstack/react-query'

export type LotteryCreateValues = {
  lotteryDate: Date
  dCount: number
  productId: string
  winners: Array<{ numbers: string; key: string }>
}

export type LotteryTypes = {
  id: string
  lotteryDate: string
  product: string
  winners: Array<{ numbers: string }>
}

export type SeedLotteryTypes = {
  startDate: string
  endDate: string
  productId: string
  dCount: number
  winnerCount: number
}

export const useGetLottery = (params?: {
  page?: number | string
  count?: number | string
  search?: string
  productId?: string
}) => {
  return useQuery(queries.lottery.list(params))
}

export const getDetailLotteryOptions = (id: string) => {
  return queries.lottery.detail(id)
}

export const useGetDetailLottery = (id: string) => {
  return useQuery(queries.lottery.detail(id))
}

export const useSaveLottery = (params?: string) => {
  return useMutation({
    mutationFn: async (values: LotteryCreateValues) => {
      const url = params ? `lottery/${params}` : 'lottery'

      if (params) {
        return await http.patch(url, values)
      }

      return await http.post(url, values)
    },
  })
}

export const useDeleteLottery = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await http.delete(`lottery/${id}`)
    },
    onSettled: async (_data, _error) => {
      await queryClient.invalidateQueries(queries.lottery.list())
    },
  })
}

export const useSeedLottery = () => {
  return useMutation({
    mutationFn: async (values: SeedLotteryTypes) => {
      return await http.post(`lottery/seed`, values)
    },
    onSettled: async (_data, _error) => {
      await queryClient.invalidateQueries(queries.lottery.list())
    },
  })
}
