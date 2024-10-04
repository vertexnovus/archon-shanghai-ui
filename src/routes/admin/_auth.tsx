import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_auth')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      return redirect({
        to: '/admin',
      })
    }

    return { success: true }
  },
  component: () => <Outlet />,
})
