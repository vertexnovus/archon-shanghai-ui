import { queries } from '@/lib/constants/queryKeys'
import { queryOptions } from '@tanstack/react-query'

export const getHistoryQueryOptions = ({
  page,
  product,
  count,
  date,
}: { page: number; product?: string; count: number; date?: string }) =>
  queryOptions(queries.lottery.history({ page, product, count, date }))

export const nextLiveQueryOptions = queryOptions(queries.landing.fetch())
export const landingSettingsQueryOptions = queryOptions(queries.landing.settings())
export const liveQueryOptions = queryOptions(queries.landing.live())
