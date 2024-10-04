import { ProductCreateValues, useSaveProduct } from '@/services/product'
import { ActionIcon, Button, Flex, Modal, NumberInput, Stack, TextInput, rem } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { isInRange, isNotEmpty, useForm } from '@mantine/form'
import { IconClock } from '@tabler/icons-react'
import { useEffect, useRef } from 'react'

type ProductFormProps = {
  data?: ProductCreateValues
  open: boolean
  onClose: () => void
}

export function ProductForm({ data, open, onClose }: ProductFormProps) {
  const action = useSaveProduct(data?.id)
  const ref = useRef<HTMLInputElement>(null)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      _method: 'POST',
      name: '',
      defaultDuration: 0,
      defaultLiveTime: '16:00',
    },
    validate: {
      name: isNotEmpty('Name is required'),
      defaultDuration: isInRange({ min: 1 }, 'Duration minimum is 1'),
      defaultLiveTime: isNotEmpty('Live time is required'),
    },
  })

  useEffect(() => {
    if (data) form.setValues({ ...data, _method: 'PATCH' })

    if (!open) form.reset()
  }, [data, open])

  const handleSubmit = (values: typeof form.values) => {
    action.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Modal opened={open} onClose={onClose} title="Product Form">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            placeholder="Name"
            label="Product Name"
            withAsterisk
            key={form.key(`name`)}
            {...form.getInputProps(`name`)}
          />
          <TimeInput
            ref={ref}
            label="Default live time"
            rightSection={
              <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
                <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
              </ActionIcon>
            }
            placeholder="Default live time"
            key={form.key(`defaultLiveTime`)}
            {...form.getInputProps('defaultLiveTime')}
          />

          <NumberInput
            label="Default duration"
            placeholder="0"
            description="Duration in minutes"
            key={form.key(`defaultDuration`)}
            {...form.getInputProps('defaultDuration')}
          />
        </Stack>

        <Flex justify="flex-end" mt="md">
          <Button type="submit" loading={action.isPending}>
            Save
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}
