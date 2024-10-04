import { DEFAULT_THEME, Input, Modal, Table, createTheme } from '@mantine/core'
import classes from './Default.module.css'

export const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: [
      '#eff6ff',
      '#dbeafe',
      '#bfdbfe',
      '#93c5fd',
      '#60a5fa',
      '#3b82f6',
      '#2563eb',
      '#1d4ed8',
      '#1e40af',
      '#1e3a8a',
    ],
  },
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  defaultRadius: 'md',
  components: {
    Table: Table.extend({
      defaultProps: {
        verticalSpacing: 'sm',
        striped: true,
        withColumnBorders: true,
        withRowBorders: false,
        withTableBorder: true,
        highlightOnHover: true,
      },
      classNames: {
        table: classes.table,
      },
    }),
    InputWrapper: Input.Wrapper.extend({
      classNames: {
        error: classes.errorInput,
      },
    }),
    Modal: Modal.extend({
      classNames: {
        body: classes.dialog,
        header: classes.dialogHeader,
        title: classes.dialogTitle,
      },
      defaultProps: {
        closeOnClickOutside: false,
      },
      styles: {
        body: {
          paddingTop: DEFAULT_THEME.spacing.md,
        },
      },
    }),
  },
})
