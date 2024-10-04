import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      history: 'History',
      live: 'Live',
      liveDraw: 'drawing in process',
      countdown: 'Next drawing in',
      viewLiveDrawing: 'View Live Drawing',
      latestResult: 'Latest Result',
      winnerTitle: 'Official results of Madura Pools',
      winnerDesc: 'The official and best reputation lottery in Indonesia',
      seeHistory: 'See history',
      nextLiveDraw: 'Next live draw in',
      'header.DrawingIsLive': 'Drawing is live. Click here to view',
      viewMore: 'View more',
      past8Days: '8 Latest Result',
      previousWinners: 'Previous Winners',
    },
  },
  tr: {
    translation: {
      history: 'Riwayat',
      live: 'Live',
      liveDraw: 'Pengundian Live',
      countdown: 'Pengundian dalam',
      viewLiveDrawing: 'Liat Pengundian Live',
      latestResult: 'Hasil Pengundian Terbaru',
      winnerTitle: 'Hasil resmi Madura Pools',
      winnerDesc: 'Lotere Terdepan dengan Reputasi Terbaik di Indonesia',
      seeHistory: 'Lihat riwayat',
      nextLiveDraw: 'Pengudian berikutnya dalam',
      'header.DrawingIsLive': 'Pengundian sedang berlangsung',
      viewMore: 'Lihat',
      past8Days: '8 Keluaran Angka Terbaru',
      previousWinners: 'Pemenang sebelumnya',
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'th', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
