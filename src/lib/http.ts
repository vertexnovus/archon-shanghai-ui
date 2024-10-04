import { API_URL } from '@/lib/constants/misc'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { get } from 'lodash'

export interface ApiError extends Error {
  errors?: []
}

const http = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
})

http.interceptors.request.use(
  (config) => {
    const getXsrfToken = Cookies.get('XSRF-TOKEN')
    const accessToken = Cookies.get('accessToken')

    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''

    if ((config.method == 'post' || config.method == 'put' || config.method == 'delete') && !getXsrfToken) {
      return http
        .get('/sanctum/csrf-cookie')
        .then(() => {
          return config
        })
        .catch((_error) => {
          return config
        })
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response.data
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('XSRF-TOKEN')
      Cookies.remove('accessToken')

      // window.location.assign('/admin/signin')
    }

    return Promise.reject(get(error, 'response.data', 'Something went wrong!'))
  },
)

export default http
