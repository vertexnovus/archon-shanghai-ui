import { ProductForm } from '@/modules/products/form'
import { ProductCreateValues, ProductTypes, useDeleteProduct, useGetProduct } from '@/services/product'
import { ActionIcon, Box, Button, Flex, Text, Title, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import qs from 'qs'
import { useEffect, useMemo, useState } from 'react'

export const Route = createFileRoute('/admin/_app/products/')({
  component: Product,
})

function Product() {
  const location = useLocation()
  const parse = qs.parse(location.search, { ignoreQueryPrefix: true })
  const [opened, { toggle }] = useDisclosure(false)

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: parse.page ? parseInt(parse.page as string, 0) - 1 : 0,
    pageSize: parseInt(parse.count as string, 0) || 10,
  })

  const [search, _setSearch] = useState(parse.search)
  const [editedData, setEditedData] = useState<ProductCreateValues | undefined>(undefined)

  const columns = useMemo<MRT_ColumnDef<ProductTypes>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        hidden: true,
        enableEditing: false,
        mantineEditTextInputProps: {
          hidden: true,
          style: { display: 'none' },
        },
      },
      {
        accessorKey: 'name',
        header: 'Name',
        mantineEditTextInputProps: {
          autoFocus: true,
          required: true,
        },
      },
      { accessorKey: 'defaultLiveTime', header: 'Live Time' },
      { accessorKey: 'defaultDuration', header: 'Raffle Duration' },
    ],
    [],
  )

  const { data, isLoading, isFetching } = useGetProduct({
    page: parse.page as string,
    count: parse.count as string,
  })

  const deleteAction = useDeleteProduct()
  const navigate = useNavigate()

  const handleFormClose = () => {
    toggle()
    setEditedData(undefined)
  }

  useEffect(() => {
    const page = pagination.pageIndex + 1
    const count = pagination.pageSize

    // @ts-ignore
    navigate({ search: { page, count, search } })
  }, [pagination, search])

  useEffect(() => {
    if (isEmpty(location.search)) {
      const params = { page: 1, count: 10 }

      // @ts-ignore
      navigate({ search: params })
    }
  }, [])

  const openDeleteConfirmModal = (row: MRT_Row<ProductTypes>) => {
    modals.openConfirmModal({
      title: `Delete ${row.original.name}?`,
      children: <Text>Are you sure you want to delete? This action cannot be undone.</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteAction.mutate(row.original.id)
      },
    })
  }

  const totalRowCount = get(data, 'meta.total', 0)

  const table = useMantineReactTable({
    columns,
    data: get(data, 'data', []),
    enableColumnActions: false,
    enableColumnFilters: false,
    enableGlobalFilter: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableRowActions: true,
    enableSorting: false,
    initialState: {
      density: 'xs',
    },
    mantineDetailPanelProps: {
      bg: 'dark.8',
    },
    mantineTableProps: {
      highlightOnHover: false,
      striped: 'odd',
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    paginationDisplayMode: 'pages',
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon
            onClick={() => {
              toggle()
              setEditedData(row.original as ProductCreateValues)
            }}
          >
            <IconEdit size={14} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon
            variant="outline"
            color="red"
            onClick={() => {
              openDeleteConfirmModal(row)
            }}
          >
            <IconTrash size={14} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    renderTopToolbarCustomActions: () => (
      <Button variant="default" leftSection={<IconPlus />} onClick={toggle}>
        Create Product
      </Button>
    ),
    rowCount: totalRowCount,
    state: {
      isLoading: isLoading,
      showProgressBars: isFetching,
      pagination: pagination,
      columnVisibility: {
        id: false,
      },
    },
  })

  return (
    <Box>
      <Title mb="xl">Product</Title>

      <MantineReactTable table={table} />

      <ProductForm open={opened} onClose={handleFormClose} data={editedData} />
    </Box>
  )
}
