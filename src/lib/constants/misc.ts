import { Units } from '@/modules/landing/countdown'
import dayjs from 'dayjs'

export const API_URL = import.meta.env.VITE_API_URL

export const COUNTDOWN_SETUP: { unit: Units; text: string }[] = [
  { unit: 'Day', text: 'days' },
  { unit: 'Hour', text: 'hours' },
  { unit: 'Minute', text: 'mins' },
  { unit: 'Second', text: 'secs' },
]

export const colors = [
  'red',
  'pink',
  'indigo',
  'blue',
  'cyan',
  'grape',
  'gray',
  'lime',
  'teal',
  'violet',
  'green',
  'orange',
]

export const config = {
  LOGO: 'logo',
  FOOTER: 'footer',
  ABOUT_TITLE: 'about_title',
  ABOUT_DESCRIPTION: 'about_description',
  HERO_TITLE: 'hero_title',
  HERO_DESCRIPTION: 'hero_description',
}

export const BANNER_SPEED = 5000

export const POOL_TYPES = ['AS', 'KOP', 'KEPALA', 'EKOR']

export const generateDateStamp = (date: string | Date) => {
  return `${dayjs(date).format('DD MMMM YYYY HH:mm')} GMT +7`
}
