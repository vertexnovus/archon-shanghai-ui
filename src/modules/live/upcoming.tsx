import { COUNTDOWN_SETUP, generateDateStamp } from '@/lib/constants/misc'
import CountdownItem from '@/modules/landing/countdown'
import { Flex, Paper, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export function Upcoming({ data }: { data: { drawing: boolean; liveDate: Date } }) {
  const { t } = useTranslation()

  return (
    <Paper p="md" w={'100%'} ta="center">
      <Title order={3} fw={400}>
        {!data.drawing ? t('countdown') : t('liveDraw')} at <b>{generateDateStamp(data.liveDate)}</b>
      </Title>

      <Flex align={'center'} gap={20} mt={10} justify={'center'}>
        {COUNTDOWN_SETUP.map((item) => (
          <CountdownItem color="dark.7" key={item.unit} unit={item.unit} text={item.text} />
        ))}
      </Flex>
    </Paper>
  )
}
