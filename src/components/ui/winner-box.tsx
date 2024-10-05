import { Flex, Image, em } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import classes from './winner-box.module.css'

export default function WinnerBox({ numbers, index }: { numbers: string; index: number }) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  return (
    <Flex ta="center" w={'100%'} justify={'center'} gap="xl" align={'center'}>
      <Image src={`0${index + 1}.png`} w={isMobile ? 60 : 80} h={isMobile ? 60 : 80} fit="contain" />

      <Flex gap="sm" justify={'center'}>
        {numbers.split('').map((_item, index) => (
          <Image key={index} src={`/ball/${_item}.png`} className={classes.ball} />
        ))}
      </Flex>
    </Flex>
  )
}
