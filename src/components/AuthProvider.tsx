import http from '@/lib/http'
import { Loader } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { ReactNode, createContext, useContext } from 'react'

export type AuthContextType = {
  isAuthenticated: boolean
  user: any
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  user: null,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = window.location

  const query = useQuery({
    queryKey: ['session'],
    queryFn: async (): Promise<{ username: string }> => {
      return await http.get('/user')
    },
    enabled: Cookies.get('accessToken') !== undefined && pathname.includes('admin'),
    staleTime: Infinity,
  })

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!query.data?.username,
        user: query.data,
      }}
    >
      {query.isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
