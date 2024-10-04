import { SetupTypes, useGetSetup } from '@/services/settings'
import { AppShell, Burger, Flex, Image, ScrollArea } from '@mantine/core'
import { IconDeviceGamepad2, IconSettings, IconSpiral, IconUser } from '@tabler/icons-react'
import { useRouterState } from '@tanstack/react-router'
import { split } from 'lodash'
import classes from './sidebar.module.css'

const data = [
  { link: 'products', key: 'products', label: 'Product', icon: IconSpiral },
  { link: '', key: 'admin', label: 'Lottery', icon: IconDeviceGamepad2 },
  { link: 'settings', key: 'settings', label: 'Settings', icon: IconSettings },
  { link: 'users', key: 'users', label: 'Users', icon: IconUser },
]

export function Sidebar({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  const pathname = useRouterState().location.pathname
  const {
    data: { data: setups },
  } = useGetSetup()

  const findItem = setups?.find((item: SetupTypes) => item.key === 'logo')

  const lastPath = split(pathname, '/').pop()

  const links = data.map((item) => {
    return (
      <a
        className={classes.link}
        data-active={lastPath === item.key || undefined}
        href={`/admin/${item.link}`}
        key={item.label}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    )
  })

  return (
    <>
      <AppShell.Section>
        <Flex justify="space-between" align="center" px="md">
          <Image src={findItem?.value} w={'100%'} p="md" />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Flex>
      </AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}>
        {links}
      </AppShell.Section>
    </>
  )
}
