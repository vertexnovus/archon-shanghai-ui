import { notifications } from '@mantine/notifications'
import { get } from 'lodash'

export const MUTATION_NOTIFICATION_KEY = 'MUTATION-NOTIFICATION'

type NotifReturnValues = {
  color: string
  title: string
  message: string
  loading: boolean
  autoClose: boolean
}

export type NotifDataType = {
  message?: string | null
}

export const notifData = (
  data: NotifDataType = {},
  isError: boolean = false,
): NotifReturnValues => {
  const title = isError ? 'Error' : 'Success'
  const color = isError ? 'red' : 'green'

  const defaultMessage = isError ? 'Mutation failed' : 'Mutation success'

  return {
    title,
    message: get(data, 'message', defaultMessage) as string,
    color,
    loading: false,
    autoClose: true,
  }
}

export const loadingNotifData = (title = null, message = null) => {
  notifications.show({
    id: MUTATION_NOTIFICATION_KEY,
    withCloseButton: false,
    title,
    message,
    loading: true,
    autoClose: false,
  })
}
