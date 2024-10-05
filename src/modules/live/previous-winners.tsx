import classes from '@/modules/landing/winner.module.css'
import { Box, Flex, Image } from '@mantine/core'

export function PreviousWinners({ numbers, index }: { index: number; item?: any; numbers: string[] }) {
  return (
    <Flex align="center" justify="center" w="100%" mt={{ base: 'xs', md: 'xl' }}>
      <Image src={`/0${index + 1}.png`} w={{ base: 60, md: 100 }} mr={{ base: 'xs', md: 'xl' }} />
      <Box display="flex" p="xs" style={{ borderRadius: 'var(--mantine-radius-sm)' }}>
        {numbers.map((item2: string, _j) => (
          <Image key={_j} src={`/ball/${item2}.png`} className={classes.ball} />
        ))}
      </Box>
    </Flex>
  )
}
