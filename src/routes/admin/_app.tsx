import AdminRootLayout from '@/components/admin/admin-root-layout'
import { createFileRoute, redirect } from '@tanstack/react-router'
import 'mantine-react-table/styles.css'

export const Route = createFileRoute('/admin/_app')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/admin/signin',
      })
    }

    // Otherwise, return the user in context
    return {
      username: context.auth.user.username,
    }
  },
  component: App,
})

function App() {
  return <AdminRootLayout />
}
