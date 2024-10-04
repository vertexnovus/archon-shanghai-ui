export type MetaCollection = {
  total?: number
  count?: number
  perPage?: number
  currentPage?: number
  totalPages?: number
}

export type DataCollection<T> = {
  error?: boolean
  data: T[]
  meta?: MetaCollection
}
