import { BallNumbers } from '@/components/ui/ball-numbers'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { generateDateStamp } from '@/lib/constants/misc'
import DataTables from '@/modules/history/data-tables'
import About from '@/modules/landing/about'
import { getHistoryQueryOptions } from '@/services/landing'
import { LotteryTypes } from '@/services/lottery'
import { Container, Flex, Grid, Pagination, Paper, Stack, Text, Title } from '@mantine/core'
import { DatePickerInput, DateValue } from '@mantine/dates'
import { useWindowScroll } from '@mantine/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { get } from 'lodash'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_layout/history')({
  component: HistoryPage,
  loader: async ({ context: { queryClient } }) => {
    return await Promise.all([await queryClient.ensureQueryData(getHistoryQueryOptions({ page: 1, count: 10 }))])
  },
})

function HistoryPage() {
  const navigate = useNavigate()
  const [, scrollTo] = useWindowScroll()
  const search: { product: string; page: number; date: string } = Route.useSearch()
  const [latestWinner, setLatestWinner] = useState<LotteryTypes>()
  const { t } = useTranslation()

  const { data: history, isLoading } = useSuspenseQuery(
    getHistoryQueryOptions({ page: search.page || 1, product: search?.product, count: 10, date: search?.date }),
  )

  const { data, meta } = history

  const handlePaginationChange = (page: number) => {
    scrollTo({ y: 0 })
    navigate({
      // @ts-ignore
      search: { ...search, page },
    })
  }

  const handleDateChange = (value: DateValue) => {
    // @ts-ignore
    navigate({ search: { page: 1, date: dayjs(value).format('YYYY-MM-DD') } })
  }

  useEffect(() => {
    if (data.length > 0 && !latestWinner) {
      setLatestWinner(data[0])
    }
  }, [data])

  return (
    <Container mt="xl">
      <Paper p="md">
        {isLoading ? (
          <SkeletonWrapper count={10} height={50} />
        ) : (
          <>
            <Stack justify="center" align="center" gap="xs" mb="md">
              <Title>{t('latestResult')}</Title>
              {latestWinner && (
                <>
                  <Text fz={'lg'} fw={600}>
                    {generateDateStamp(latestWinner.lotteryDate)}
                  </Text>
                  <Paper withBorder p="sm" display={'flex'}>
                    <Grid mb="md" mx="md">
                      {latestWinner.winners.map((item, _i) => {
                        const splitNumber = item.numbers.split('')

                        return (
                          <Grid.Col span={{ base: 12, lg: _i === 0 ? 12 : 6 }} key={item.numbers} ta="center">
                            <Title order={2} fw={600} mb="sm">
                              Prize #{_i + 1}
                            </Title>

                            <Flex align="center" gap="xs" justify={'center'}>
                              {splitNumber.map((item, j) => (
                                <BallNumbers key={j} number={item} />
                              ))}
                            </Flex>
                          </Grid.Col>
                        )
                      })}
                    </Grid>
                  </Paper>
                </>
              )}
            </Stack>

            <Flex align={'center'} mt="xl" gap="md" mb="md" justify={'center'}>
              <Text fw={600}>Search Date</Text>
              <DatePickerInput
                miw={200}
                clearable
                maxDate={new Date()}
                placeholder="Select date"
                defaultValue={search.date ? dayjs(search?.date).toDate() : null}
                onChange={handleDateChange}
              />
            </Flex>
            <Paper bg="red.1" p="md">
              <DataTables data={data} isLoading={isLoading} />

              <Flex align={'center'} mt="xl" justify={'flex-end'}>
                <Pagination
                  color={'red.8'}
                  total={get(meta, 'lastPage', 0)}
                  siblings={1}
                  defaultValue={1}
                  withEdges
                  value={search.page}
                  onChange={handlePaginationChange}
                />
              </Flex>
            </Paper>
          </>
        )}
      </Paper>
      <About />
    </Container>
  )
}
