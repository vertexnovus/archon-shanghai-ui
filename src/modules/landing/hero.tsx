import { Dots } from '@/components/ui/dots'
import { LiveAnnouncement } from '@/components/ui/live-announcement'
import { BANNER_SPEED, COUNTDOWN_SETUP, config } from '@/lib/constants/misc'
import { useLanding } from '@/modules/landing/LandingProvider'
import Winner from '@/modules/landing/winner'
import { Carousel } from '@mantine/carousel'
import { Box, Button, Container, Flex, Image, Space, Stack, Text, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import Autoplay from 'embla-carousel-autoplay'
import { get } from 'lodash'
import { ArrowRightCircle } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import CountdownItem from './countdown'
import classes from './hero.module.css'

export default function Hero() {
  const autoplay = useRef(Autoplay({ delay: BANNER_SPEED }))

  const {
    banners: { data: banners },
    nextLive: { data: landing },
    findValue,
  } = useLanding()
  const title = findValue(config.HERO_TITLE, true)
  const description = findValue(config.HERO_DESCRIPTION, true)
  const drawingIsLive = get(landing, 'isLive', false)

  const { t } = useTranslation()

  const _slideSize = banners.length >= 3 ? '100%' : banners.length === 1 ? '100%' : '100%'

  return (
    <Box pos={'relative'} bg={'red.0'} mih={{ base: 'auto', lg: '100vh' }}>
      <Carousel
        loop
        plugins={[autoplay.current]}
        withIndicators={false}
        withControls={false}
        slideGap="md"
        slideSize={_slideSize}
      >
        {banners.map((banner) => (
          <Carousel.Slide key={banner.imageUrl}>
            <Image src={banner.imageUrl} fit="contain" />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Space h={{ base: 30, lg: 40 }} />

      <Container size={'lg'} style={{ position: 'relative' }}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

        <Box pos={'relative'} className={classes.vortex}>
          <Winner />

          <Button component={Link} to="/history" variant="default" size="lg" rightSection={<ArrowRightCircle />}>
            {t('seeHistory')}
          </Button>

          {drawingIsLive ? (
            <LiveAnnouncement />
          ) : (
            <>
              <Title order={3} ta="center" tt={'uppercase'}>
                {t('countdown')}
              </Title>
              <Flex justify="center" gap={{ base: 'md', lg: 'xl' }} px="md" align={'center'}>
                {COUNTDOWN_SETUP.map((item) => (
                  <CountdownItem color="dark.7" key={item.unit} unit={item.unit} text={item.text} />
                ))}
              </Flex>
            </>
          )}

          <Stack justify="center" align="center" gap="xs" mt="md" mb="xl">
            <Title ta={'center'} className={classes.title}>
              {title}
            </Title>
            <Text ta={'center'} className={classes.subtitle}>
              {description}
            </Text>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
