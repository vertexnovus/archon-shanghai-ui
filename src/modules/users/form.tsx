import { ModalFooter } from '@/components/ui/modal-footer'
import { UserTypes, useSaveUser } from '@/services/users'
import { Modal, PasswordInput, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useEffect } from 'react'

export default function BannerForm({
  open,
  data,
  onClose,
}: { open: boolean; data: UserTypes | null; onClose: () => void }) {
  const action = useSaveUser(data?.id)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty('Username is required'),
    },
  })

  useEffect(() => {
    if (data) {
      form.setValues({ username: data.username })
    }

    if (!open) form.reset()
  }, [data, open])

  const handleSubmit = (values: typeof form.values) => {
    action.mutate(values, {
      onSuccess: () => {
        onClose()
        form.reset()
      },
    })
  }

  return (
    <Modal opened={open} onClose={onClose} title="User form">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            placeholder="Username"
            label="Username"
            {...form.getInputProps('username')}
            key={form.key('username')}
          />

          <PasswordInput
            placeholder="Password"
            label="Password"
            {...form.getInputProps('password')}
            key={form.key('password')}
          />
        </Stack>
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
