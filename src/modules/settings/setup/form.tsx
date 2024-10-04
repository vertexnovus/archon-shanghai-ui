import { ModalFooter } from '@/components/ui/modal-footer'
import { SetupTypes, useSaveSetup } from '@/services/settings'
import { FileInput, Image, Modal, Stack, Text, TextInput, Textarea } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useEffect } from 'react'

type SetupFormProps = {
  open: boolean
  data: SetupTypes
  onClose: () => void
}

export default function SetupForm({ open, data, onClose }: SetupFormProps) {
  const action = useSaveSetup(data)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { key: '', value: '' },
    validate: {
      value: isNotEmpty(data.isFile ? 'Please select a file' : 'Please enter a value'),
    },
  })

  useEffect(() => {
    if (data) {
      data.isFile ? form.setValues({ key: data.key, value: '' }) : form.setValues({ key: data.key, value: data.value })
    }

    if (!open) {
      form.reset()
    }
  }, [data, open])

  const handleSubmit = (values: typeof form.values) => {
    let formData

    if (data.isFile) {
      formData = new FormData()
      formData.append('key', data.key)
      formData.append('value', values.value)
    } else {
      formData = values
    }

    action.mutate(formData, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Modal opened={open} onClose={onClose} title="Setup form">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput {...form.getInputProps('key')} key={form.key('key')} label="Key" disabled mb="md" />

        {data.isFile ? (
          <FileInput
            placeholder="Select a file"
            label="Image"
            accept="image/*"
            {...form.getInputProps('value')}
            key={form.key('value')}
          />
        ) : (
          <Textarea
            rows={4}
            {...form.getInputProps('value')}
            key={form.key('value')}
            placeholder="Value"
            label="Value"
          />
        )}

        {data.isFile ? (
          <Stack mt="md">
            <Text>Current {data.key}</Text>
            <Image src={data.value} w={150} />
          </Stack>
        ) : null}

        <ModalFooter
          actions={[
            { children: 'Cancel', key: 'cancel', onClick: onClose, type: 'button', variant: 'light' },
            { children: 'Save', key: 'submit', type: 'submit' },
          ]}
        />
      </form>
    </Modal>
  )
}
