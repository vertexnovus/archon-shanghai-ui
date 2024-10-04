import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_app/settings/')({
  component: () => <div>Hello /admin/_app/settings/!</div>,
  beforeLoad: (_ctx) => {
    throw redirect({ to: '/admin/settings/general' })
  },
})
