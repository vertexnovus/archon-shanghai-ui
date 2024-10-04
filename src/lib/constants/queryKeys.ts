import { banner } from '@/lib/queries/banner'
import { landing } from '@/lib/queries/landing'
import { lottery } from '@/lib/queries/lottery'
import { product } from '@/lib/queries/product'
import { setup } from '@/lib/queries/setup'
import { users } from '@/lib/queries/user'
import { mergeQueryKeys } from '@lukemorales/query-key-factory'

export const queries = mergeQueryKeys(landing, lottery, product, banner, setup, users)
