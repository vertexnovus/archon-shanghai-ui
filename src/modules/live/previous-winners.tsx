import Ball from '@/assets/ball.png'
import classes from '@/modules/landing/winner.module.css'
import { Box, Flex, Image, Paper, Stack, Text } from '@mantine/core'

export function PreviousWinners({ numbers }: { index: number; item?: any; numbers: string[] }) {
  return (
    <Paper withBorder p="sm" w="100%" style={{ borderColor: 'var(--mantine-color-dark-8)' }}>
      <Flex justify="center" align="center">
        <Flex justify="center" gap={'sm'} align="center">
          {numbers.map((item2: string, j) => (
            <Stack justify="center" key={j} align="center" gap={0}>
              <Flex align="center" justify="center" pos={'relative'}>
                <Image src={Ball} className={classes.ball} />

                <Box pos="absolute" top={12}>
                  <Text size="xl" fw={600}>
                    {item2}
                  </Text>
                </Box>
              </Flex>
            </Stack>
          ))}
        </Flex>
      </Flex>
    </Paper>
  )
}
