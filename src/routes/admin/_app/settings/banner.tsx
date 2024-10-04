import BannerForm from '@/modules/settings/banners/form'
import { BannerTypes, useDeleteBanner, useGetBanners } from '@/services/settings'
import { ActionIcon, Button, Flex, Image, Table, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconTrash } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_app/settings/banner')({
  component: BannerPage,
})

function BannerPage() {
  const [opened, { toggle }] = useDisclosure(false)

  const {
    data: { data },
    isFetching,
  } = useGetBanners()

  const deleteAction = useDeleteBanner()

  const deleteModalConfimation = (id: string) => {
    return modals.openConfirmModal({
      title: 'Delete Banner?',
      children: <Text size="sm">Are you sure you want to delete this banner?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteAction.mutate(id),
    })
  }
  return (
    <div>
      <Title order={2} mb="md">
        Banner
      </Title>

      <Flex justify="flex-end">
        <Button onClick={toggle} mb="md" ta={'right'}>
          Add Banner
        </Button>
      </Flex>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Image</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isFetching ? (
            <Table.Tr>
              <Table.Td colSpan={2}>Loading...</Table.Td>
            </Table.Tr>
          ) : data.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={2}>No data</Table.Td>
            </Table.Tr>
          ) : (
            data.map((element: BannerTypes) => (
              <Table.Tr key={element.id}>
                <Table.Td>
                  <Image src={element.imageUrl} w={150} />
                </Table.Td>
                <Table.Td>
                  <ActionIcon color={'red'} onClick={() => deleteModalConfimation(element.id as string)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>

      <BannerForm open={opened} onClose={toggle} />
    </div>
  )
}
