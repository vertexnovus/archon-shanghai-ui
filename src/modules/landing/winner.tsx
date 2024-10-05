import tableBg from '@/assets/table-result-bg.png'
import WinnerBox from '@/components/ui/winner-box'
import { generateDateStamp } from '@/lib/constants/misc'
import { getHistoryQueryOptions } from '@/services/landing'
import { BackgroundImage, SimpleGrid, Title, em } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function Winner() {
  const {
    data: { data: lotteryData },
  } = useSuspenseQuery(getHistoryQueryOptions({ page: 1, count: 9 }))
  const { t } = useTranslation()
  const grandPrize = lotteryData[0]
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  return (
    <>
      <Title order={2} mb={0} ta="center" tt={'uppercase'} c="white">
        {t('latestResult')}
      </Title>
      <Title order={4} ta="center" tt={'uppercase'} c="white" mb="md">
        {generateDateStamp(grandPrize.lotteryDate)}
      </Title>
      <BackgroundImage
        w="100%"
        src={tableBg}
        bgp={isMobile ? 'top' : 'center'}
        style={{ background: `url(${tableBg}) no-repeat`, backgroundSize: 'contain' }}
        mih={{ base: 400 }}
      >
        <SimpleGrid cols={1} my="md" spacing={'md'} style={{ justifyItems: 'center' }}>
          {grandPrize?.winners.map((item, index) => {
            return <WinnerBox numbers={item.numbers} index={index} key={index} />
          })}
        </SimpleGrid>
      </BackgroundImage>
    </>
  )
}
