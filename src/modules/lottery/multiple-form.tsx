import { ModalFooter } from '@/components/ui/modal-footer'
import { createSimpleOptions } from '@/lib/utils'
import { SeedLotteryTypes, useSeedLottery } from '@/services/lottery'
import { useGetProduct } from '@/services/product'
import { Alert, Modal, NumberInput, Select, Stack } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { isInRange, isNotEmpty, useForm } from '@mantine/form'
import dayjs from 'dayjs'
import { useState } from 'react'

export function MultipleForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [_value, _setValue] = useState<[Date | null, Date | null]>([null, null])

  const { data: products } = useGetProduct()

  const productOptions = createSimpleOptions(products.data, { label: 'name', value: 'id' })
  const seedMutation = useSeedLottery()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      productId: '',
      dCount: 4,
      winnerCount: 1,
      startDate: '',
      endDate: '',
      dateRange: [null, null],
    },
    validate: {
      productId: isNotEmpty('Product is required'),
      dCount: isInRange({ min: 3, max: 9 }, 'D Count must be between 3 and 9'),
      dateRange: isNotEmpty('Date is required'),
    },
    transformValues: (values) => {
      const { dateRange } = values

      return {
        ...values,
        startDate: dayjs(dateRange[0]).format('YYYY-MM-DD'),
        endDate: dayjs(dateRange[1]).format('YYYY-MM-DD'),
      }
    },
  })

  const handleSubmit = (values: typeof form.values) => {
    const { dateRange, ...rest } = values

    seedMutation.mutate(rest as SeedLotteryTypes, {
      onSuccess: () => {
        onClose()
        form.reset()
      },
    })
  }

  return (
    <Modal opened={open} onClose={onClose} title="Multiple Form">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            placeholder="Select product"
            label="Product"
            data={productOptions}
            {...form.getInputProps('productId')}
            key={form.key('productId')}
          />

          <NumberInput label="D Count" hideControls {...form.getInputProps('dCount')} key={form.key('dCount')} />
          <NumberInput
            label="Winner Count"
            hideControls
            {...form.getInputProps('winnerCount')}
            key={form.key('winnerCount')}
          />

          <DatePickerInput
            type="range"
            label="Select dates"
            {...form.getInputProps('dateRange')}
            key={form.key('dateRange')}
          />

          <Alert color="yellow">
            Please be mindful when seeding data. Generating too many winners or using a long date range can slow down
            the server.
          </Alert>
        </Stack>

        <ModalFooter
          actions={[
            { key: 'cancel', onClick: onClose, children: 'Cancel', variant: 'transparent' },
            { key: 'save', type: 'submit', children: 'Save' },
          ]}
        />
      </form>
    </Modal>
  )
}
