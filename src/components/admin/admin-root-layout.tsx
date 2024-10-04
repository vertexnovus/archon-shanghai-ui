import { Sidebar } from '@/components/admin/sidebar'
import { AppShell, Burger, Group } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Outlet } from '@tanstack/react-router'
import classes from './admin-root-layout.module.css'

export default function AdminRootLayout() {
  const [opened, { toggle }] = useDisclosure()
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <AppShell
      layout="alt"
      header={{ height: isMobile ? 60 : 0 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
      classNames={classes}
    >
      <AppShell.Header hiddenFrom="md">
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar opened={opened} toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
