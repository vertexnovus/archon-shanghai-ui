import { useTimer } from '@/hooks/useTimer'
import { useLanding } from '@/modules/landing/LandingProvider'
import { Box, Flex, Text, Title } from '@mantine/core'
import { get } from 'lodash'
import classes from './countdown.module.css'

export type Units = 'Day' | 'Hour' | 'Minute' | 'Second'

const CountdownItem = ({
  unit,
  text,
  orientation = 'vertical',
  color = 'white',
  size,
}: {
  unit: Units
  text: string
  color: string
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
}) => {
  const landing = useLanding()
  const countdownFrom = get(landing, 'nextLive.data.upcomingLive', null)

  const { ref, time } = useTimer(unit, countdownFrom)

  return (
    <Flex direction={orientation === 'vertical' ? 'column' : 'row'} className={classes.root} ff="monospace">
      <Box pos={'relative'} w="full" ta="center" style={{ overflow: 'hidden' }}>
        <Title order={1} ref={ref} c={color || 'white'} fw="bold" fz={size}>
          {time}
        </Title>
      </Box>
      <Text c={color || 'gray.2'}>{text}</Text>
    </Flex>
  )
}

export default CountdownItem
