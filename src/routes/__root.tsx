import { AuthContextType } from '@/components/AuthProvider'
import { QueryClient } from '@tanstack/react-query'
import { Outlet, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router'

export const Route = createRootRouteWithContext<{ auth: AuthContextType; queryClient: QueryClient }>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
