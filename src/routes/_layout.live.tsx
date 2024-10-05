import bg from '@/assets/background.png'
import tableBg from '@/assets/table-result-bg.png'
import ShuffleText from '@/components/ui/shuffle-text'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { generateDateStamp } from '@/lib/constants/misc'
import { toMilliseconds } from '@/lib/utils'
import About from '@/modules/landing/about'
import classes from '@/modules/landing/winner.module.css'
import { PreviousWinners } from '@/modules/live/previous-winners'
import { Upcoming } from '@/modules/live/upcoming'
import { liveQueryOptions } from '@/services/landing'
import { BackgroundImage, Box, Container, Flex, Paper, Stack, Text, Title, alpha, em } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import range from 'lodash/range'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_layout/live')({
  component: LivePage,
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(liveQueryOptions)
  },
})

function LivePage() {
  const {
    data: { data },
    isLoading,
  } = useSuspenseQuery({ ...liveQueryOptions, refetchInterval: toMilliseconds(0, 1, 0) })
  const { t } = useTranslation()
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  return (
    <Box>
      {isLoading ? (
        <SkeletonWrapper count={10} height={50} />
      ) : (
        <Stack align="center" w={'100%'}>
          <BackgroundImage
            src={bg}
            opacity={1}
            bgr="no-repeat"
            bgsz={isMobile ? 'cover' : 'contain'}
            style={{ backgroundAttachment: 'fixed' }}
          >
            <Container mt="xl" size="md" style={{ overflow: 'hidden' }} mih={'100vh'}>
              <Stack mt="md">
                {!data.drawing ? (
                  <>
                    <Title ta="center" c="white" order={3} tt={'uppercase'}>
                      {`🎉 ${t('latestResult')} 🎉`}
                    </Title>

                    <Title ta="center" order={3} tt={'uppercase'} mb="md" c="white">
                      {generateDateStamp(data.previous.lotteryDate)}
                    </Title>
                    <BackgroundImage
                      w="100%"
                      src={tableBg}
                      bgp={isMobile ? 'top' : 'center'}
                      bgsz="contain"
                      bgr="no-repeat"
                      mih={{ base: 400 }}
                    >
                      {data.previous.winners.map((item, i) => {
                        const splitNumber = item.numbers.split('')

                        return <PreviousWinners key={i} index={i} numbers={splitNumber} />
                      })}
                    </BackgroundImage>
                  </>
                ) : null}
              </Stack>

              <Box component={Stack} justify={'center'} align={'center'} w={'100%'} p="md" mih={500}>
                {data.product ? (
                  <>
                    {data.drawing ? (
                      <Paper w="100%" mb="md" p="md" bg={alpha('accents', 0.5)} mih={300}>
                        <Stack justify="center" gap={'sm'} align="center" mt="md" h="100%">
                          <Title ta="center" order={2} tt={'uppercase'} c="white">
                            {t('liveDraw')}
                          </Title>
                          <Title ta="center" order={3} tt={'uppercase'} c="white">
                            {generateDateStamp(data.liveDate)}
                          </Title>
                          <Flex justify="center" gap={'sm'} align="center" mt="md">
                            {range(0, data.dCount).map((item) => (
                              <Flex key={item} align="center" justify="center" pos={'relative'}>
                                <Box className={classes.grandBall} />

                                <Box pos="absolute" top={12}>
                                  <Text size="xl" fw={600} c="white">
                                    <ShuffleText characters="0" isFake key={item} />
                                  </Text>
                                </Box>
                              </Flex>
                            ))}
                          </Flex>

                          {data.winners &&
                            data.winners.map((item, i) => {
                              const splitNumber = item.numbers.split('')

                              return <PreviousWinners key={i} index={i} numbers={splitNumber} item={item} />
                            })}
                        </Stack>
                      </Paper>
                    ) : (
                      <>
                        {data.winners &&
                          data.winners.map((item, i) => {
                            const splitNumber = item.numbers.split('')

                            return <PreviousWinners key={i} index={i} numbers={splitNumber} item={item} />
                          })}
                        <Upcoming data={data} />
                      </>
                    )}
                  </>
                ) : null}
              </Box>
            </Container>
          </BackgroundImage>
          <About />

          <Paper
            mb="md"
            p="md"
            bg={alpha('accents', 0.3)}
            withBorder
            style={{ borderColor: 'var(--mantine-color-yellow-4)' }}
          >
            <Stack mt="md">
              <Title ta="center" c="white" order={3} tt={'uppercase'}>
                {`🎉 ${t('latestResult')} 🎉`}
              </Title>

              <Title ta="center" order={3} tt={'uppercase'} mb="md" c="white">
                {generateDateStamp(data.previous.lotteryDate)}
              </Title>
              {data.previous.winners.length > 0
                ? data.previous.winners.map((item, i) => {
                    const splitNumber = item.numbers.split('')

                    return <PreviousWinners key={i} index={i} numbers={splitNumber} />
                  })
                : null}
            </Stack>
          </Paper>
        </Stack>
      )}
    </Box>
  )
}
