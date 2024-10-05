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
      viewAllResult: 'View All Result',
    },
  },
  id: {
    translation: {
      history: '历史',
      live: '直播',
      liveDraw: '抽奖进行中',
      countdown: '下次抽奖倒计时',
      viewLiveDrawing: '查看直播抽奖',
      latestResult: '最新结果',
      winnerTitle: '马杜拉彩票官方结果',
      winnerDesc: '印度尼西亚最具声誉的彩票',
      seeHistory: '查看历史',
      nextLiveDraw: '下次直播抽奖倒计时',
      'header.DrawingIsLive': '抽奖正在进行中。点击这里观看',
      viewMore: '查看更多',
      past8Days: '最近8次结果',
      previousWinners: '往期赢家',
      viewAllResult: '查看所有结果',
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
