import { generateDateStamp } from '@/lib/constants/misc'
import { getHistoryQueryOptions } from '@/services/landing'
import { Box, Button, Card, Container, Flex, Grid, Stack, Text, Title, em } from '@mantine/core'
import { useListState, useMediaQuery } from '@mantine/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { get } from 'lodash'
import { ArrowRightCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function History() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  const [isMounted, setIsMounted] = useState(false)
  const {
    data: { data: lotteryData },
  } = useSuspenseQuery(getHistoryQueryOptions({ page: 1, count: 3 }))

  const { t } = useTranslation()
  const [_list, handlers] = useListState<number>(isMobile ? [] : [])

  useEffect(() => {
    if (isMobile) {
      handlers.filter((_item) => _item === null)
    }
  }, [isMobile])

  useEffect(() => {
    if (!isMobile && !isMounted && lotteryData) {
      lotteryData.forEach((datum) => {
        handlers.append(datum.id as never)
      })

      setIsMounted(true)
    }
  }, [isMobile, lotteryData, isMounted])

  return (
    <Container size="lg">
      <Grid mt="md" justify="center">
        {lotteryData.map((item, index) => {
          const winners = get(item, 'winners', [])

          return (
            <Grid.Col span={{ base: 12, lg: 4 }} key={index}>
              <Card withBorder pos={'relative'} shadow="md" p={0}>
                <Flex justify={'center'} p="md" style={{ background: 'var(--mantine-color-accents-9)' }}>
                  <Box ta="center">
                    <Title c="white" order={4} tt="uppercase">
                      {item.product}
                    </Title>

                    <Text c="white" fw={600}>
                      {generateDateStamp(item.lotteryDate)}
                    </Text>
                  </Box>
                </Flex>

                {winners.map((item, _i) => {
                  const splitNumber = item.numbers.split('')

                  return (
                    <Stack key={item.numbers} p="md">
                      <Text fw={600} tt="uppercase">
                        Prize {_i + 1}
                      </Text>

                      <Flex justify="space-around" align="center">
                        {splitNumber.map((item, j) => (
                          <Flex
                            key={j}
                            align="center"
                            justify="center"
                            bg={'accents'}
                            w={{ base: 25, md: 30 }}
                            h={{ base: 25, md: 30 }}
                            style={(theme) => ({ borderRadius: '100%', boxShadow: theme.shadows.xl })}
                          >
                            <Text fw={600} ta={'center'} c="white">
                              {item}
                            </Text>
                          </Flex>
                        ))}
                      </Flex>
                    </Stack>
                  )
                })}
              </Card>
            </Grid.Col>
          )
        })}
      </Grid>

      <Box ta={'center'} mt="xl">
        <Button
          component={Link}
          to="/history"
          color={'yellow'}
          radius={'xl'}
          size="lg"
          rightSection={<ArrowRightCircle />}
        >
          {t('viewAllResult')}
        </Button>
      </Box>
    </Container>
  )
}
