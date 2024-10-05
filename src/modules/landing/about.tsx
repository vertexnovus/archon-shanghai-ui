import { config } from '@/lib/constants/misc'
import { useLanding } from '@/modules/landing/LandingProvider'
import { Container, Text, Title } from '@mantine/core'
import classes from './about.module.css'

export default function About() {
  const { findValue } = useLanding()
  const title = findValue(config.ABOUT_TITLE, true)
  const description = findValue(config.ABOUT_DESCRIPTION, true)

  return (
    <Container className={classes.wrapper} size={'md'} id="about">
      <div className={classes.inner}>
        <Title className={classes.title} mb="md">
          {title || ''}
        </Title>

        <Text size="lg" c="dimmed" className={classes.description}>
          {description || ''}
        </Text>
      </div>
    </Container>
  )
}
