import { ApiError } from '@/lib/http'
import { NotifDataType, notifData } from '@/lib/notification'
import { setValidationError } from '@/lib/utils'
import { UseFormReturnType } from '@mantine/form'
import { notifications, notificationsStore } from '@mantine/notifications'
import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'
import { get } from 'lodash'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    dehydrate: {
      shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    },
    mutations: {
      onSettled: (data, error) => {
        const { notifications: notifs } = notificationsStore.getState()
        const findLoading = notifs.find((notif) => notif.loading)

        const d = (error || data) as NotifDataType
        const getNotifData = notifData(d, !!error)

        const getId = get(findLoading, 'id', null)

        if (getId) {
          notifications.update({ id: getId, ...getNotifData })
        } else {
          notifications.show(getNotifData)
        }
      },
    },
  },
})

function makeQueryClient() {
  return queryClient
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient()

  return browserQueryClient
}

export const mutationErrorOption = <T>({
  error,
  form,
}: { error: ApiError; form?: Pick<UseFormReturnType<T>, 'setErrors'> }) => {
  if (form) {
    setValidationError(error, form)
  }

  return error
}
