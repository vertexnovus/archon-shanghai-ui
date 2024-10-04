import SetupForm from '@/modules/settings/setup/form'
import { SetupTypes, useGetSetup } from '@/services/settings'
import { ActionIcon, Image, Table, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { capitalize, lowerCase } from 'lodash'
import { useState } from 'react'

export const Route = createFileRoute('/admin/_app/settings/general')({
  component: SettingGeneral,
})

function SettingGeneral() {
  const [opened, { toggle }] = useDisclosure(false)
  const [selectedData, setSelectedData] = useState<SetupTypes | null>(null)

  const {
    data: { data },
    isFetching,
  } = useGetSetup()

  const handleEditClick = (value: SetupTypes) => {
    toggle()
    setSelectedData(value)
  }

  return (
    <div>
      <Title order={2} mb="md">
        UI Settings
      </Title>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Value</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isFetching ? (
            <Table.Tr>
              <Table.Td colSpan={2}>Loading...</Table.Td>
            </Table.Tr>
          ) : (
            data.map((element: SetupTypes) => (
              <Table.Tr key={element.id}>
                <Table.Td>{capitalize(lowerCase(element.key))}</Table.Td>
                <Table.Td>{element.isFile ? <Image src={element.value} w={150} /> : element.value}</Table.Td>
                <Table.Td align={'center'}>
                  <ActionIcon variant="default" onClick={() => handleEditClick(element)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>

      {selectedData ? <SetupForm open={opened} onClose={toggle} data={selectedData} /> : null}
    </div>
  )
}
