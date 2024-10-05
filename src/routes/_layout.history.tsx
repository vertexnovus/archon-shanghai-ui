import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import WinnerBox from '@/components/ui/winner-box'
import { config, generateDateStamp } from '@/lib/constants/misc'
import DataTables from '@/modules/history/data-tables'
import { useLanding } from '@/modules/landing/LandingProvider'
import About from '@/modules/landing/about'
import { getHistoryQueryOptions } from '@/services/landing'
import { LotteryTypes } from '@/services/lottery'
import { BackgroundImage, Box, Container, Flex, Pagination, Paper, Stack, Text, Title, alpha } from '@mantine/core'
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
  const { findValue } = useLanding()
  const mainBg = findValue(config.MAIN_BG, false)
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
    navigate({ search: { page: 1, date: value ? dayjs(value).format('YYYY-MM-DD') : '' } })
  }

  useEffect(() => {
    if (data.length > 0 && !latestWinner) {
      setLatestWinner(data[0])
    }
  }, [data])

  return (
    <Box>
      <BackgroundImage src={mainBg!} style={{ backgroundAttachment: 'fixed' }} bgsz="contain">
        <Container mt="xl">
          {isLoading ? (
            <SkeletonWrapper count={10} height={50} />
          ) : (
            <>
              <Stack justify="center" align="center" gap="lg" mb="md">
                <Title c="white">{t('latestResult')}</Title>
                {latestWinner && (
                  <>
                    <Text fz={'lg'} fw={600} c="white">
                      {generateDateStamp(latestWinner.lotteryDate)}
                    </Text>
                    <Paper
                      withBorder
                      p="sm"
                      style={{
                        backgroundColor: 'var(--mantine-color-accents-4)',
                        border: '4px solid var(--mantine-color-accents-4)',
                      }}
                    >
                      <Stack gap="lg">
                        {latestWinner.winners.map((item, _i) => {
                          return <WinnerBox index={_i} numbers={item.numbers} />
                        })}
                      </Stack>
                    </Paper>
                  </>
                )}
              </Stack>

              <Flex align={'center'} mt="xl" gap="md" mb="md" justify={'center'}>
                <Text c="white" fw={600}>
                  Search Date
                </Text>
                <DatePickerInput
                  miw={200}
                  clearable
                  maxDate={new Date()}
                  placeholder="Select date"
                  defaultValue={search.date ? dayjs(search?.date).toDate() : null}
                  onChange={handleDateChange}
                />
              </Flex>
              <Paper bg={alpha('#000', 0.3)} pb="md">
                <DataTables data={data} isLoading={isLoading} />

                <Flex align={'center'} mt="xl" justify={'flex-end'} px="md">
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
        </Container>
      </BackgroundImage>
      <About />
    </Box>
  )
}
