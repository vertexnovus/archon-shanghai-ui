import { createSimpleOptions, generate } from '@/lib/utils'
import { LotteryCreateValues, getDetailLotteryOptions, useSaveLottery } from '@/services/lottery'
import { ProductTypes, getProductOptions } from '@/services/product'
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
  rem,
} from '@mantine/core'
import { DatePickerInput, TimeInput } from '@mantine/dates'
import { isInRange, isNotEmpty, useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import { IconClock, IconRefresh, IconX } from '@tabler/icons-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import dayjs from 'dayjs'
import isEmpty from 'lodash/isEmpty'
import { ChevronLeft, PlusIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/admin/_app/lottery/$id')({
  component: LotteryCreate,
  // @ts-ignore
  loader: (ctx) => {
    const {
      context: { queryClient },
      params: { id },
    } = ctx

    const productQuery = queryClient.ensureQueryData(getProductOptions())

    if (id === 'create') {
      return productQuery
    }

    return Promise.all([productQuery, queryClient.ensureQueryData(getDetailLotteryOptions(id))])
  },
})

let data: LotteryCreateValues | null
function LotteryCreate() {
  const params = Route.useParams()

  const isEdit = params.id !== 'create'

  if (params.id !== 'create') {
    const { data: response } = useSuspenseQuery(getDetailLotteryOptions(params.id))

    // @ts-ignore
    data = response.data
  }

  const { data: products } = useSuspenseQuery(getProductOptions())
  const productOptions = createSimpleOptions(products.data, { label: 'name', value: 'id' })

  const { history } = useRouter()
  const ref = useRef<HTMLInputElement>(null)
  const action = useSaveLottery(isEdit ? params.id : undefined)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      productId: '',
      liveTime: '00:00',
      duration: 0,
      lotteryDate: new Date(),
      dCount: 6,
      winners: [
        { numbers: '', key: randomId() },
        { numbers: '', key: randomId() },
        { numbers: '', key: randomId() },
        { numbers: '', key: randomId() },
      ],
    },
    validate: {
      productId: isNotEmpty('Product is required'),
      duration: isInRange({ min: 1 }, 'Duration minimum is 1'),
      liveTime: isNotEmpty('Live time is required'),
      lotteryDate: isNotEmpty('Lottery date is required'),
      dCount: isInRange({ min: 4, max: 10 }, 'D count must be between 4 and 10'),
      winners: {
        numbers: isNotEmpty('Number is required'),
      },
    },
    transformValues: (values) => {
      return {
        ...values,
        lotteryDate: dayjs(values.lotteryDate).format('YYYY-MM-DD'),
      }
    },
  })

  form.watch('productId', ({ value }) => {
    const product = products.data.find((item: ProductTypes) => item.id === value)

    if (product && !isEdit) {
      form.setFieldValue('liveTime', product.defaultLiveTime)
      form.setFieldValue('duration', product.defaultDuration)
    }
  })

  useEffect(() => {
    if (!isEmpty(data)) {
      form.setValues({
        ...data,
        productId: data.productId.toString(),
        lotteryDate: dayjs(data.lotteryDate) as unknown as Date,
      })
    }
  }, [data])

  const handleSubmit = (values: typeof form.values) => {
    action.mutate(values, {
      onSuccess: () => {
        form.reset()
        if (isEdit) {
          history.back()
        }
      },
    })
  }

  const handleGenerateNumbers = () => {
    form.getValues().winners.forEach((_: any, index: any) => {
      form.setFieldValue(`winners.${index}.numbers`, generate(form.getValues().dCount))
    })
  }

  return (
    <>
      <Title mb="xl">Lottery</Title>
      <Container>
        <Button variant="light" mb="md" leftSection={<ChevronLeft />} onClick={() => history.back()}>
          Back
        </Button>

        <form
          onSubmit={form.onSubmit((values) => {
            // @ts-ignore
            handleSubmit(values)
          })}
        >
          <Paper mb="md" p="md">
            <Stack>
              <Select
                data={productOptions}
                label="Product"
                placeholder="Product"
                key={form.key(`productId`)}
                {...form.getInputProps('productId')}
              />

              <DatePickerInput
                label="Lottery date"
                placeholder="Lottery date"
                key={form.key(`lotteryDate`)}
                {...form.getInputProps('lotteryDate')}
              />

              <NumberInput
                label="D count"
                placeholder="D"
                rightSection={'D'}
                w={'25%'}
                description="4D = 4321: 6D = 123456"
                key={form.key(`dCount`)}
                {...form.getInputProps('dCount')}
              />
            </Stack>
          </Paper>

          <Paper p="md">
            <Stack>
              <Flex justify="space-between" align="center">
                <Title order={4}>Add winner ({form.getValues().winners.length})</Title>
                <Button size="sm" leftSection={<IconRefresh size={18} />} onClick={handleGenerateNumbers}>
                  Generate random numbers
                </Button>
              </Flex>
              <SimpleGrid cols={4} spacing="md">
                {form.getValues().winners.map((_: any, index: number) => (
                  <TextInput
                    placeholder="Number"
                    label={`Prize ${index + 1}`}
                    withAsterisk
                    style={{ flex: 1 }}
                    key={form.key(`winners.${index}.numbers`)}
                    {...form.getInputProps(`winners.${index}.numbers`)}
                    rightSection={
                      <ActionIcon variant="default" color="red" onClick={() => form.removeListItem('winners', index)}>
                        <IconX size="1rem" />
                      </ActionIcon>
                    }
                  />
                ))}
              </SimpleGrid>

              <Box style={{ alignSelf: 'flex-start' }}>
                <Button
                  variant="outline"
                  size="xs"
                  leftSection={<PlusIcon />}
                  onClick={() => form.insertListItem('winners', { numbers: '', key: randomId() })}
                >
                  Add winner
                </Button>
              </Box>
            </Stack>
          </Paper>
          <Paper p="md" mt="md">
            <Stack>
              <Flex justify="space-between" align="center">
                <Title order={4}>Additional setup</Title>
              </Flex>

              <SimpleGrid cols={2} spacing="md">
                <TimeInput
                  ref={ref}
                  label="Live time"
                  rightSection={
                    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
                      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                  }
                  placeholder="Live time"
                  key={form.key(`liveTime`)}
                  {...form.getInputProps('liveTime')}
                />

                <NumberInput
                  label="Duration (in minutes)"
                  placeholder="0"
                  key={form.key(`duration`)}
                  {...form.getInputProps('duration')}
                />
              </SimpleGrid>
            </Stack>
          </Paper>
          <Flex justify="flex-end" mt="md">
            <Button type="submit">Save</Button>
          </Flex>
        </form>
      </Container>
    </>
  )
}
