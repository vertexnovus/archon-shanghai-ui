import Ball from '@/assets/ball/empty.png'
import ShuffleText from '@/components/ui/shuffle-text'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import WinnerBox from '@/components/ui/winner-box'
import { generateDateStamp } from '@/lib/constants/misc'
import { toMilliseconds } from '@/lib/utils'
import classes from '@/modules/landing/winner.module.css'
import { liveQueryOptions } from '@/services/landing'
import { Box, Flex, Image, Paper, Stack, Text, Title } from '@mantine/core'
import { useSuspenseQuery } from '@tanstack/react-query'
import range from 'lodash/range'

export function LiveRolling() {
  const {
    data: { data },
    isLoading,
  } = useSuspenseQuery({ ...liveQueryOptions, refetchInterval: toMilliseconds(0, 1, 0) })

  return (
    <Box mt="xl" size="md">
      {isLoading ? (
        <SkeletonWrapper count={10} height={50} />
      ) : (
        <Stack align="center">
          <Title ta="center" order={3} tt={'uppercase'}>
            Live Drawing
          </Title>
          <Title ta="center" order={3} tt={'uppercase'}>
            {generateDateStamp(data.liveDate)}
          </Title>
          <Box component={Stack} justify={'center'} align={'center'} w={'100%'} p="md">
            {data.product && (
              <>
                {data.drawing && (
                  <Paper withBorder w="100%" shadow="md" mb="md" p="md">
                    <Flex justify="center" gap={'sm'} align="center">
                      {range(0, data.dCount).map((item) => (
                        <Flex key={item} align="center" justify="center" pos={'relative'}>
                          <Image src={Ball} className={classes.grandBall} />

                          <Box pos="absolute">
                            <Text size="xl" fw={600}>
                              <ShuffleText characters="0" isFake key={item} />
                            </Text>
                          </Box>
                        </Flex>
                      ))}
                    </Flex>
                  </Paper>
                )}
              </>
            )}

            {data.winners &&
              data.winners.map((item, i) => {
                return <WinnerBox key={i} index={i} numbers={item.numbers} />
              })}
          </Box>
        </Stack>
      )}
    </Box>
  )
}
