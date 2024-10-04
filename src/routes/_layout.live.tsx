import Ball from '@/assets/ball.png'
import ShuffleText from '@/components/ui/shuffle-text'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { BANNER_SPEED } from '@/lib/constants/misc'
import { toMilliseconds } from '@/lib/utils'
import { useLanding } from '@/modules/landing/LandingProvider'
import About from '@/modules/landing/about'
import classes from '@/modules/landing/winner.module.css'
import { PreviousWinners } from '@/modules/live/previous-winners'
import { Upcoming } from '@/modules/live/upcoming'
import { liveQueryOptions } from '@/services/landing'
import { bannerQueryOptions } from '@/services/settings'
import { Carousel } from '@mantine/carousel'
import { Box, Container, Flex, Image, Paper, Stack, Text, Title } from '@mantine/core'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import dayjs from 'dayjs'
import Autoplay from 'embla-carousel-autoplay'
import range from 'lodash/range'
import { useRef } from 'react'
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
  const landing = useLanding()
  const logo = landing.findValue('logo')
  const autoplay2 = useRef(Autoplay({ delay: BANNER_SPEED }))

  const {
    data: { data: banners },
  } = useSuspenseQuery(bannerQueryOptions)

  return (
    <Container mt="xl" size="md">
      {isLoading ? (
        <SkeletonWrapper count={10} height={50} />
      ) : (
        <Stack align="center">
          <Carousel
            plugins={[autoplay2.current]}
            withIndicators
            withControls={false}
            loop
            slideSize="100%"
            height="100%"
          >
            {banners.map((banner) => (
              <Carousel.Slide key={banner.imageUrl}>
                <Image src={banner.imageUrl} fit="contain" />
              </Carousel.Slide>
            ))}
          </Carousel>

          <Box component={Stack} justify={'center'} align={'center'} bg={'red.8'} w={'100%'} p="md">
            {data.product && (
              <>
                <Image src={logo} fit="contain" w={'40%'} />
                <Upcoming data={data} />

                {data.drawing && (
                  <Paper w="100%" shadow="md" mb="md" p="md">
                    <Title ta="center" order={3} tt={'uppercase'}>
                      Live Drawing
                    </Title>
                    <Flex justify="center" gap={'sm'} align="center" mt="md">
                      {range(0, data.dCount).map((item) => (
                        <Flex key={item} align="center" justify="center" pos={'relative'}>
                          <Image src={Ball} className={classes.grandBall} />

                          <Box pos="absolute" top={12}>
                            <Text size="xl" fw={600}>
                              <ShuffleText characters="0" isFake key={item} />
                            </Text>
                          </Box>
                        </Flex>
                      ))}
                    </Flex>
                  </Paper>
                )}

                {data.winners &&
                  data.winners.map((item, i) => {
                    const splitNumber = item.numbers.split('')

                    return <PreviousWinners key={i} index={i} numbers={splitNumber} item={item} />
                  })}
              </>
            )}
          </Box>
          <Stack mt="md">
            <Title ta="center" order={3} tt={'uppercase'}>
              {`🎉 ${t('latestResult')} 🎉`}
            </Title>

            <Title ta="center" order={3} tt={'uppercase'} mb="md">
              {dayjs(data.previous.lotteryDate).format('DD MMM YYYY HH:mm')} GMT +7
            </Title>
            {!data.drawing &&
              data.previous.winners.map((item, i) => {
                const splitNumber = item.numbers.split('')

                return <PreviousWinners key={i} index={i} numbers={splitNumber} />
              })}
          </Stack>
        </Stack>
      )}

      <About />
    </Container>
  )
}
