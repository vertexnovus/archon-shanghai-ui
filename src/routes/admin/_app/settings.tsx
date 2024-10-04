import { Grid, NavLink, Paper, ScrollArea, Title } from '@mantine/core'
import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_app/settings')({
  component: Settings,
})

const menus = [
  { label: 'Banner', value: 'banner' },
  { label: 'General', value: 'general' },
]

function Settings() {
  const { pathname } = useLocation()

  return (
    <div>
      <Title mb="md">Settings</Title>

      <Grid>
        <Grid.Col span={2}>
          {menus.map((menu) => (
            <NavLink
              active={pathname.split('/').pop() === menu.value}
              href={`/admin/settings/${menu.value}`}
              key={menu.value}
              label={menu.label}
              mb="xs"
              style={(theme) => ({
                borderRadius: theme.radius.sm,
              })}
            />
          ))}
        </Grid.Col>

        <Grid.Col span={10} component={ScrollArea} style={{ height: '100vh' }}>
          <Paper shadow="md" p="md">
            <Outlet />
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  )
}
