import { queries } from '@/lib/constants/queryKeys'
import http from '@/lib/http'
import { queryClient } from '@/lib/query'
import { useMutation, useQuery } from '@tanstack/react-query'

export type UserTypes = {
  id: string | number
  username: string
}

export type SetupTypes = {
  id: string | number
  key: string
  value: string
  isFile: boolean
}

export const useGetUsers = () => {
  return useQuery({
    ...queries.users.list(),
    initialData: { data: [] },
  })
}

export const useSaveUser = (userId?: any) => {
  return useMutation({
    mutationFn: async (values: { username: string; password: string }) => {
      if (userId) {
        return await http.patch(`/users/${userId}`, values)
      }

      return await http.post('/users', values)
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(queries.users.list())
    },
  })
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await http.delete(`/users/${id}`)
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(queries.users.list())
    },
  })
}
