import { ModalFooter } from '@/components/ui/modal-footer'
import { useSaveBanner } from '@/services/settings'
import { FileInput, Modal } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'

export default function BannerForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const action = useSaveBanner()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      file: '',
    },
    validate: {
      file: isNotEmpty('Please select a file'),
    },
  })

  const handleSubmit = (values: typeof form.values) => {
    const formData = new FormData()
    formData.append('image', values.file)

    action.mutate(formData, {
      onSuccess: () => {
        onClose()
        form.reset()
      },
    })
  }

  return (
    <Modal opened={open} onClose={onClose} title="Banner form">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <FileInput
          placeholder="Select an image"
          description="The image should be 16:9 ratio. Max 5mb"
          label="Banner Image"
          {...form.getInputProps('file')}
          key={form.key('file')}
          accept="image/jpg, image/jpeg, image/png, image/webp"
        />

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
