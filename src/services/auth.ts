import http from '@/lib/http'
import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: { username: string; password: string }): Promise<{ token: string; user: any }> => {
      return await http.post('auth/login', {
        username: username,
        password: password,
      })
    },
    onMutate: () => null,
    onSuccess: (data) => {
      Cookies.set('accessToken', data.token)

      window.location.assign('/admin')
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      })
    },
  })
}
