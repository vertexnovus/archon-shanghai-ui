import { COUNTDOWN_SETUP } from '@/lib/constants/misc'
import { useLanding } from '@/modules/landing/LandingProvider'
import Winner from '@/modules/landing/winner'
import { Box, Button, Container, Flex, Title, alpha } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import CountdownItem from './countdown'
import classes from './hero.module.css'

export default function Hero() {
  // const _autoplay = useRef(Autoplay({ delay: BANNER_SPEED }))

  const {
    // banners: { data: banners },
    nextLive: { data: landing },
  } = useLanding()

  const drawingIsLive = get(landing, 'isLive', false)

  const { t } = useTranslation()

  return (
    <Box pos={'relative'} mih={{ base: 'auto' }} mt="xl" className={classes.root}>
      <Container size={'md'} style={{ position: 'relative' }}>
        <Box className={classes.vortex}>
          <Winner />

          <Button c="black" color="yellow" size="lg" component={Link} to="/history" my="xl">
            {t('viewAllResult')}
          </Button>
          {drawingIsLive ? null : (
            <Box ta="center" bg={alpha('accents', 0.8)} p="md" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
              <Title order={3} ta="center" mb="md" tt={'uppercase'} c="white">
                {t('countdown')}
              </Title>
              <Flex justify="center" gap={{ base: 'md', lg: 'xl' }} px="md" align={'center'}>
                {COUNTDOWN_SETUP.map((item) => (
                  <CountdownItem key={item.unit} unit={item.unit} text={item.text} />
                ))}
              </Flex>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}
