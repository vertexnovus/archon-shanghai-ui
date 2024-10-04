import { useLanding } from '@/modules/landing/LandingProvider'
import { ActionIcon, Image, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconX } from '@tabler/icons-react'
import { useEffect } from 'react'
import classes from './popup-banner.module.css'

export default function Header() {
  const [popupOpened, { toggle, open }] = useDisclosure(false)
  const { findValue } = useLanding()

  const banner = findValue('banner_popup')

  useEffect(() => {
    if (banner) {
      open()
    }
  }, [banner])

  return (
    <Modal
      opened={popupOpened}
      centered
      size="lg"
      withCloseButton={false}
      onClose={toggle}
      classNames={{
        body: classes.body,
      }}
    >
      <ActionIcon pos="absolute" variant="default" className={classes.close} onClick={toggle}>
        <IconX size={20} />
      </ActionIcon>
      <Image src={banner} width={180} height={'100%'} alt="logo" />
    </Modal>
  )
}
