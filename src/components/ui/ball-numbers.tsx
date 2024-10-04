import Ball from '@/assets/ball.png'
import { Box, Flex, Image, Text } from '@mantine/core'
import classes from './ball-numbers.module.css'

export function BallNumbers({ number }: { number: string | number }) {
  return (
    <Flex align="center" justify="center" pos={'relative'}>
      <Image src={Ball} className={classes.ball} />

      <Box pos="absolute" className={classes.ballText}>
        <Text fw={600}>{number}</Text>
      </Box>
    </Flex>
  )
}
