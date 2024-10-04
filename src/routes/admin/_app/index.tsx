import { createSimpleOptions } from '@/lib/utils'
import { MultipleForm } from '@/modules/lottery/multiple-form'
import { LotteryTypes, useDeleteLottery, useGetLottery } from '@/services/lottery'
import { useGetProduct } from '@/services/product'
import { ActionIcon, Box, Button, Flex, Select, SimpleGrid, Stack, Text, Title, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import qs from 'qs'
import { useEffect, useMemo, useState } from 'react'

export const Route = createFileRoute('/admin/_app/')({
  component: App,
})

function App() {
  const navigate = useNavigate()
  const searchParams = Route.useSearch()
  const parse = qs.parse(searchParams, { ignoreQueryPrefix: true })

  const [showMultipleLotteryForm, { toggle: toggleMultipleLotteryForm }] = useDisclosure(false)

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: parse.page ? parseInt(parse.page as string, 0) - 1 : 0,
    pageSize: parseInt(parse.count as string, 0) || 10,
  })

  const [search, setSearch] = useState(parse.search)
  const [productId, setProductId] = useState(parse.productId)
  const columns = useMemo<MRT_ColumnDef<LotteryTypes>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableHiding: true,
      },
      {
        accessorKey: 'lotteryDate',
        header: 'Date',
        enableHiding: true,
      },
    ],
    [],
  )

  const { data, isLoading, isFetching } = useGetLottery({
    page: parse.page as string,
    count: parse.count as string,
    search: search as string,
    productId: productId as string,
  })

  const deleteAction = useDeleteLottery()

  const { data: products } = useGetProduct()
  const productOptions = createSimpleOptions(products.data, { label: 'name', value: 'id' })

  useEffect(() => {
    const page = pagination.pageIndex + 1
    const count = pagination.pageSize

    // @ts-ignore
    navigate({ search: { page, count, search, productId } })
  }, [pagination, search, productId])

  useEffect(() => {
    if (isEmpty(location.search)) {
      const params = { page: 1, count: 10 }

      // @ts-ignore
      navigate({ search: params })
    }
  }, [])

  const openDeleteConfirmModal = (row: MRT_Row<LotteryTypes>) => {
    modals.openConfirmModal({
      title: `Delete ${row.original.lotteryDate} lottery?`,
      children: <Text>Are you sure you want to delete? This action cannot be undone.</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteAction.mutate(row.original.id)
      },
    })
  }

  const totalRowCount = get(data, 'meta.total', 0)

  const handleProductChange = (value: string) => {
    setProductId(value)
  }

  const handleMultipleLotteryClick = () => {
    toggleMultipleLotteryForm()
  }

  const table = useMantineReactTable({
    columns,
    data: get(data, 'data', []),
    displayColumnDefOptions: {
      'mrt-row-expand': {
        size: 20,
      },
      'mrt-row-actions': {
        size: 20,
      },
    },
    enableColumnActions: false,
    enableColumnFilters: false,
    enableExpanding: true,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableRowActions: true,
    enableSorting: false,
    initialState: {
      density: 'xs',
    },
    mantineDetailPanelProps: {
      bg: 'gray.1',
    },
    mantineTableProps: {
      highlightOnHover: false,
      striped: 'odd',
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
    manualPagination: true,
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    paginationDisplayMode: 'pages',
    positionActionsColumn: 'last',
    renderDetailPanel: ({ row }) => {
      return (
        <Box>
          <Title order={2} mb="lg" td="underline">
            Winner List
          </Title>
          <SimpleGrid cols={6}>
            {row.original.winners.map((winner, index) => (
              <Stack key={winner.numbers} gap="xs">
                <Text key={winner.numbers} tt={'uppercase'} c="dimmed" fw={600}>
                  Prize #{index + 1}
                </Text>
                <Text lts={2}>{winner.numbers}</Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Box>
      )
    },
    renderRowActions: ({ row }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon variant="default" component={Link} to={`/admin/lottery/${row.original.id}`}>
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
    rowCount: totalRowCount,
    renderTopToolbarCustomActions: () => {
      return (
        <Select
          placeholder="Filter By Product"
          value={productId as string}
          data={productOptions}
          onChange={(value) => handleProductChange(value as string)}
        />
      )
    },
    renderToolbarInternalActions: () => {
      return (
        <Flex align={'center'} gap="md">
          <MRT_ToggleGlobalFilterButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} />
          <Button onClick={handleMultipleLotteryClick}>Add Multiple Lottery</Button>
          <Button component={Link} to="lottery/create">
            Add Lottery
          </Button>
        </Flex>
      )
    },
    state: {
      isLoading: isLoading,
      showProgressBars: isFetching,
      pagination: pagination,
      globalFilter: search,
      columnVisibility: {
        id: false,
      },
    },
  })

  return (
    <Box>
      <Title mb="xl">Lottery</Title>

      <MantineReactTable table={table} />

      <MultipleForm open={showMultipleLotteryForm} onClose={toggleMultipleLotteryForm} />
    </Box>
  )
}
