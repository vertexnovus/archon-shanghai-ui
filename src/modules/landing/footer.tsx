import { useLanding } from '@/modules/landing/LandingProvider'
import { Container, Image, Text } from '@mantine/core'
import classes from './footer.module.css'

const AppName = import.meta.env.VITE_APP_NAME
export default function Footer() {
  const { findValue } = useLanding()
  const footerData = findValue('footer', true)
  const logoData = findValue('logo')

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image src={logoData} w={240} mb="md" />
          <Text size="sm" className={classes.description} fw={600} c="white">
            {footerData}
          </Text>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text size="sm" fw={600} c="white">
          Copyright © 2024 {AppName}. All rights reserved.
        </Text>
      </Container>
    </div>
  )
}
