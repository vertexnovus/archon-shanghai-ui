import classes from '@/modules/landing/winner.module.css'
import { Box, Flex, Image, Paper } from '@mantine/core'

export function PreviousWinners({ numbers, index }: { index: number; item?: any; numbers: string[] }) {
  return (
    <Paper bg="transparent">
      <Flex align="center" justify="center" w="100%">
        <Image src={`/0${index + 1}.png`} w={{ base: 80, md: 100 }} mr="md" />
        <Box display="flex" p="xs" bg="#560000" style={{ borderRadius: 'var(--mantine-radius-sm)' }}>
          {numbers.map((item2: string, _j) => (
            <Image key={_j} src={`/ball/${item2}.png`} className={classes.ball} />
          ))}
        </Box>
      </Flex>
    </Paper>
  )
}
