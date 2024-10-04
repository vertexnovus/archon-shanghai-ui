import { COUNTDOWN_SETUP } from '@/lib/constants/misc'
import { useLanding } from '@/modules/landing/LandingProvider'
import { FlagSelection } from '@/modules/landing/flag-selection'
import { Box, Button, Container, Flex, Text, Transition } from '@mantine/core'
import { useHeadroom } from '@mantine/hooks'
import { Link } from '@tanstack/react-router'
import { get } from 'lodash'
import { LucideSend } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CountdownItem from './countdown'
import classes from './header.module.css'

const links = [
  { link: '/', label: 'home' },
  { link: '/history', label: 'history' },
  { link: '/live', label: 'live' },
]

export default function Header() {
  const { findValue, nextLive } = useLanding()
  const pinned = useHeadroom({ fixedAt: 80 })
  const drawingIsLive = get(nextLive, 'data.isLive', false)

  const { t } = useTranslation('translation')

  const logoData = findValue('logo')
  const [_active, setActive] = useState(links[0].link)

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={() => {
        setActive(link.link)
      }}
    >
      {t(link.label)}
    </a>
  ))

  return (
    <header className={classes.root}>
      <Transition mounted={pinned} keepMounted transition="slide-down" duration={400}>
        {(styles) => (
          <Box className={classes.header} style={styles}>
            <Container size={'md'} className={classes.inner}>
              <a href="/">
                <img src={logoData} width={180} height={'100%'} alt="logo" />
              </a>
              <Flex justify="flex-end" align="center" gap={'md'}>
                <Flex visibleFrom="xs">{items}</Flex>
                <FlagSelection />
              </Flex>
            </Container>
          </Box>
        )}
      </Transition>

      <Transition mounted={!pinned} keepMounted transition="slide-down" duration={400}>
        {(styles) => (
          <Box bg="red" className={classes.inner} style={styles} h={{ base: 64, lg: 48 }} w="100%">
            <Container size="xl">
              <Flex
                direction={{ base: 'column', lg: 'row' }}
                justify={{ base: 'space-between', lg: 'center' }}
                gap={{ base: 'xs', lg: 'xl' }}
                align={{ base: 'space-between', lg: 'center' }}
              >
                {drawingIsLive ? (
                  <Button
                    component={Link}
                    variant="transparent"
                    color={'white'}
                    tt="uppercase"
                    lts={1}
                    to={'/live'}
                    rightSection={<LucideSend size={18} />}
                  >
                    {t('header.DrawingIsLive')}
                  </Button>
                ) : (
                  <>
                    <Text c="white" tt={'uppercase'} lts={1} fz="sm">
                      {t('nextLiveDraw')}
                    </Text>
                    <Flex gap={{ base: 'xs', lg: 'lg' }}>
                      {COUNTDOWN_SETUP.map((item) => (
                        <CountdownItem
                          color="white"
                          key={item.unit}
                          orientation="horizontal"
                          size="md"
                          unit={item.unit}
                          text={item.text}
                        />
                      ))}
                    </Flex>
                  </>
                )}
              </Flex>
            </Container>
          </Box>
        )}
      </Transition>
    </header>
  )
}
