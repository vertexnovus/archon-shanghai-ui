import { AuthProvider, useAuth } from '@/components/AuthProvider'
import { queryClient } from '@/lib/query'
import { theme } from '@/lib/theme'
import { routeTree } from '@/routeTree.gen'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router'

const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!, // We'll inject this when we render
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} forceColorScheme="light" defaultColorScheme="light">
        <ModalsProvider>
          <Notifications position="top-center" />
          <AuthProvider>
            <Route />
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

function Route() {
  const auth = useAuth()

  return <RouterProvider router={router} context={{ queryClient, auth }} />
}
