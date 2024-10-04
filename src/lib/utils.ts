import { ApiError } from '@/lib/http'
import { ComboboxData } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import get from 'lodash/get'

export const toMilliseconds = (h: number, m: number, s = 0) => (h * 60 * 60 + m * 60 + s) * 500

export function getErrorMessage(error: unknown) {
  if (typeof error === 'string') return error
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message
  }
  console.error('Unable to get error message for error', error)
  return 'Unknown Error'
}

export function createSimpleOptions<T>(data: T[], keyAs: { label: string; value: string }): ComboboxData {
  return data.map((datum) => ({
    value: datum[keyAs.value as keyof T],
    label: datum[keyAs.label as keyof T],
  })) as ComboboxData
}

export const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
  const color = type === 'success' ? 'green' : type === 'error' ? 'red' : 'yellow'

  notifications.show({
    message,
    color,
  })
}

export const setValidationError = (error: ApiError, form: Pick<UseFormReturnType<any, any>, 'setErrors'>) => {
  const getValidationErrors: [] | null = get(error, 'errors', null)

  if (!getValidationErrors) return

  const { setErrors } = form

  const errors: Record<string, string> = {}

  Object.entries(getValidationErrors).forEach((acc) => {
    const [key, value] = acc

    Object.assign(errors, { [key]: value })
  })

  setErrors(errors)
}

export function loadGroupOptions(
  data: any[],
  keyAs: {
    value: string | number
    label: string | number
  },
  subKey: string | number,
  withParent: any,
) {
  return data.map((datum) => {
    if (datum[subKey].length === 0) {
      return {
        value: datum[keyAs.value],
        label: datum[keyAs.label],
      }
    }

    const items = [
      withParent
        ? {
            value: datum[keyAs.value],
            label: `${datum[keyAs.label]} (Parent)`,
          }
        : false,
      ...datum[subKey].map((value: { [x: string]: any }) => ({
        value: value[keyAs.value],
        label: value[keyAs.label],
      })),
    ].filter((value) => Object.keys(value).length !== 0)

    return {
      value: datum[keyAs.value],
      label: datum[keyAs.label],
      group: datum[keyAs.label],
      items,
      // ...datum,
    }
  })
}

export function transformValidationErrors(errors: { [s: string]: unknown } | ArrayLike<unknown>) {
  if (!errors) {
    return errors
  }

  const fieldErrors = {}

  Object.entries(errors).forEach((acc) => {
    // @ts-ignore
    fieldErrors[acc[0]] = acc[1]
  })

  return fieldErrors
}

export function generate(n: number): string {
  let add = 1,
    max = 12 - add // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return generate(max) + generate(n - max)
  }

  max = Math.pow(10, n + add)
  const min = max / 10 // Math.pow(10, n) basically
  const number = Math.floor(Math.random() * (max - min + 1)) + min

  return ('' + number).substring(add)
}
