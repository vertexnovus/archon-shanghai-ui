import Ball from '@/assets/ball.png'
import { generateDateStamp } from '@/lib/constants/misc'
import { getHistoryQueryOptions } from '@/services/landing'
import { Box, Card, Container, Flex, Image, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import classes from './winner.module.css'

export default function Winner() {
  const {
    data: { data: lotteryData },
  } = useSuspenseQuery(getHistoryQueryOptions({ page: 1, count: 9 }))
  const { t } = useTranslation()
  const grandPrize = lotteryData[0]

  return (
    <Container size="lg">
      <Paper bg="transparent" ta="center">
        <Stack gap="xs" flex={1}>
          <Title order={2} tt={'uppercase'}>
            Indonesia Official
          </Title>
          <Title order={2} tt={'uppercase'} c="red">
            Lottery
          </Title>
          <Text size="xl" tt={'capitalize'}>
            {t('winnerTitle')}
          </Text>

          <Text size="xl" tt={'capitalize'}>
            {t('winnerDesc')}
          </Text>
        </Stack>
      </Paper>

      <Card withBorder ta="center" my="md">
        <Stack gap="sm">
          <Title order={2} tt={'uppercase'}>
            {t('latestResult')}
          </Title>
          {grandPrize && (
            <Text fz={'lg'} fw={600}>
              {generateDateStamp(grandPrize.lotteryDate)}
            </Text>
          )}
          <Title mb="md" tt={'uppercase'} order={3}>
            Prize #1
          </Title>
        </Stack>
        <Flex justify="center" gap={'sm'} align="center">
          {grandPrize?.winners[0].numbers.split('').map((_item, index) => (
            <Flex key={index} align="center" justify="center" pos={'relative'}>
              <Image src={Ball} className={classes.grandBall} />

              <Box pos="absolute" className={classes.ballText}>
                <Text size="xl" fw={600}>
                  {_item}
                </Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Card>
      <SimpleGrid cols={{ base: 1, lg: 2 }} mt="md" spacing={'md'}>
        {grandPrize?.winners.map((item, index) => {
          if (index === 0) return null

          return (
            <Card withBorder key={index}>
              <Title mb="md" order={3}>
                Prize #{index + 1}
              </Title>

              <Flex justify="space-between" align="center">
                {item.numbers.split('').map((_item, index) => (
                  <Flex key={index} align="center" justify="center" pos={'relative'}>
                    <Image src={Ball} className={classes.ball} fit="fill" />

                    <Box
                      pos="absolute"
                      style={(theme) => ({
                        top: theme.breakpoints.sm ? 20 : 40,
                      })}
                    >
                      <Text fw={600}>{_item}</Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Card>
          )
        })}
      </SimpleGrid>
    </Container>
  )
}
