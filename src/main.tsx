import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './lib/theme/fonts.css'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/carousel/styles.css'
import 'dayjs/locale/en'
import '@/lib/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
