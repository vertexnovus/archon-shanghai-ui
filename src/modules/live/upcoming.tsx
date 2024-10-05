import { COUNTDOWN_SETUP, generateDateStamp } from '@/lib/constants/misc'
import CountdownItem from '@/modules/landing/countdown'
import { Box, Flex, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export function Upcoming({ data }: { data: { drawing: boolean; liveDate: Date } }) {
  const { t } = useTranslation()

  return (
    <Box p="md" w={'100%'} ta="center" c="white">
      <Title order={3} fw={400}>
        {!data.drawing ? t('countdown') : t('liveDraw')} at <b>{generateDateStamp(data.liveDate)}</b>
      </Title>

      <Flex align={'center'} gap={20} mt={10} justify={'center'}>
        {COUNTDOWN_SETUP.map((item) => (
          <CountdownItem key={item.unit} unit={item.unit} text={item.text} />
        ))}
      </Flex>
    </Box>
  )
}
