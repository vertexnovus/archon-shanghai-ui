import UserForm from '@/modules/users/form'
import { UserTypes, useDeleteUser, useGetUsers } from '@/services/users'
import { ActionIcon, Button, Flex, Table, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/_app/users/')({
  component: UserPage,
})

function UserPage() {
  const [opened, { toggle }] = useDisclosure(false)

  const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null)
  const {
    data: { data },
    isFetching,
  } = useGetUsers()

  const deleteAction = useDeleteUser()

  const deleteModalConfirmation = (id: string) => {
    return modals.openConfirmModal({
      title: 'Delete User?',
      children: <Text size="sm">Are you sure you want to delete this user?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteAction.mutate(id),
    })
  }

  const handleEditClick = (data: any) => {
    setSelectedUser(data)
    toggle()
  }

  return (
    <div>
      <Title order={2} mb="md">
        User
      </Title>

      <Flex justify="flex-end">
        <Button onClick={toggle} mb="md">
          Add User
        </Button>
      </Flex>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Username</Table.Th>
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
            data.map((element: UserTypes) => (
              <Table.Tr key={element.id}>
                <Table.Td>{element.username}</Table.Td>
                <Table.Td>
                  <Flex gap="md">
                    <ActionIcon variant="default" onClick={() => handleEditClick(element)}>
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon color={'red'} onClick={() => deleteModalConfirmation(element.id as string)}>
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>

      <UserForm open={opened} onClose={toggle} data={selectedUser} />
    </div>
  )
}
