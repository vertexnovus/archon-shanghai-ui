import Ball from '@/assets/ball-result.png'
import { getHistoryQueryOptions } from '@/services/landing'
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  Paper,
  Text,
  Title,
  em,
} from '@mantine/core'
import { useListState, useMediaQuery } from '@mantine/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { get } from 'lodash'
import { ArrowRightCircle, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classes from './history.module.css'

export default function History() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  const [isMounted, setIsMounted] = useState(false)
  const {
    data: { data: lotteryData },
  } = useSuspenseQuery(getHistoryQueryOptions({ page: 1, count: 9 }))

  const { t } = useTranslation()
  const [list, handlers] = useListState<number>(isMobile ? [] : [])

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

  const handleCollapseActionClick = (item: number | string) => {
    if (list.includes(item as never)) {
      handlers.filter((_item) => _item !== item)
    } else {
      handlers.append(item as never)
    }
  }

  return (
    <Container size="lg">
      <Paper withBorder className={classes.root}>
        <Title order={2}>{t('past8Days')}</Title>

        <Button
          component={Link}
          to="/history"
          variant="default"
          radius={'xl'}
          size="lg"
          rightSection={<ArrowRightCircle />}
        >
          {t('viewMore')}
        </Button>
      </Paper>

      <Grid mt="md">
        {lotteryData.slice(1).map((item, index) => {
          const winners = get(item, 'winners', [])

          return (
            <Grid.Col span={{ base: 12, lg: 3 }} key={index}>
              <Card withBorder pos={'relative'} shadow="md">
                <Flex justify={'space-between'}>
                  <div>
                    <Text tt="uppercase" c="dimmed">
                      {item.product}
                    </Text>

                    <Text fw={600}>{dayjs(item.lotteryDate).format('DD MMMM YYYY')}</Text>
                  </div>
                  <ActionIcon size={'sm'} color="dark.8" onClick={() => handleCollapseActionClick(item.id)}>
                    <ChevronDown />
                  </ActionIcon>
                </Flex>

                <Collapse in={list.includes(item.id as never)}>
                  <Card.Section mt="md">
                    <Divider my="md" />
                  </Card.Section>

                  {winners.map((item, _i) => {
                    const splitNumber = item.numbers.split('')

                    return (
                      <Box mb="md" key={item.numbers}>
                        <Text fw={500} mb="sm">
                          Prize #{_i + 1}
                        </Text>

                        <Flex justify="space-between" align="center">
                          {splitNumber.map((item, j) => (
                            <Flex key={j} align="center" justify="center">
                              <Image src={Ball} className={classes.ball} />
                              <Text c={'white'} fw={600} ta={'center'} pos="absolute">
                                {item}
                              </Text>
                            </Flex>
                          ))}
                        </Flex>
                      </Box>
                    )
                  })}
                </Collapse>
              </Card>
            </Grid.Col>
          )
        })}
      </Grid>
    </Container>
  )
}
