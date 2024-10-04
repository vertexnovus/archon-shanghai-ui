import { Button, ButtonProps, Group } from '@mantine/core'
import classes from './modal-footer.module.css'

interface BaseProps extends ButtonProps {
  key?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

type ModalFooterProps = {
  actions: BaseProps[]
}

export function ModalFooter({ actions }: ModalFooterProps) {
  return (
    <Group justify="space-between" wrap="nowrap" className={classes.root}>
      {actions.map(({ key, ...rest }, index) => (
        <Button fullWidth key={key || index} {...rest} />
      ))}
    </Group>
  )
}
