import Ball from '@/assets/ball-result.png'
import { LotteryTypes } from '@/services/lottery'
import { Box, Flex, Image, Skeleton, Table, Text } from '@mantine/core'
import dayjs from 'dayjs'
import range from 'lodash/range'
import classes from './tables.module.css'

const tables = ['date']

function DataTables({ data, isLoading }: { data: LotteryTypes[]; isLoading: boolean }) {
  const getTotalWinnerColumns = data[0]?.winners.length

  console.log('data: ', data)

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table
        withTableBorder={false}
        withColumnBorders={false}
        classNames={{
          th: classes.header,
          td: classes.td,
        }}
        striped
        stripedColor={'red.3'}
        highlightOnHoverColor={'red.4'}
      >
        <Table.Thead>
          <Table.Tr style={{ borderRadius: 100 }}>
            {tables.map((item) => (
              <Table.Th key={item} align="center">
                <Text ta="center" fz="sm" fw={600}>
                  {item.toUpperCase()}
                </Text>
              </Table.Th>
            ))}
            {range(0, getTotalWinnerColumns).map((item) => (
              <Table.Th key={item} align="center">
                <Text ta="center" fz="sm" fw={600}>
                  Prize #{item + 1}
                </Text>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isLoading && (
            <Table.Tr>
              {tables.map((_, index) => (
                <Table.Td key={index}>
                  <Skeleton height={50} />
                </Table.Td>
              ))}
            </Table.Tr>
          )}

          {data.length === 0 && !isLoading && (
            <Table.Tr>
              <Table.Td colSpan={4}>No lottery found</Table.Td>
            </Table.Tr>
          )}
          {data.map((item) => (
            <Table.Tr key={item.lotteryDate}>
              <Table.Td align="center">{dayjs(item.lotteryDate).format('DD MMMM YYYY HH:mm')} GMT+7</Table.Td>

              {item.winners.map((winner) => {
                return (
                  <Table.Td align="center">
                    <Flex gap="xs" pos="relative" justify={'center'}>
                      {winner.numbers.split('').map((item, _index) => (
                        <Flex key={_index} align="center" justify="center" pos={'relative'}>
                          <Image src={Ball} className={classes.grandBall} fit="fill" />

                          <Box pos="absolute" className={classes.ballText}>
                            <Text fz={{ base: 'sm', md: 'md' }} fw={600}>
                              {item}
                            </Text>
                          </Box>
                        </Flex>
                      ))}
                    </Flex>
                  </Table.Td>
                )
              })}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}

export default DataTables
