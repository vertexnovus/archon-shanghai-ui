import { Button, Flex, Paper, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { Dot, LucideSend } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import classes from './live-announcement.module.css'

export function LiveAnnouncement() {
  const { t } = useTranslation()

  return (
    <Paper withBorder p="md" radius="md" className={classes.root}>
      <Flex align={'center'} justify={'center'}>
        <Title order={3} tt={'uppercase'}>
          {t('liveDraw')}
        </Title>
        <Dot className={classes.dot} size={48} />
      </Flex>
      <Button component={Link} variant="default" to={'/live'} rightSection={<LucideSend />}>
        {t('viewLiveDrawing')}
      </Button>
    </Paper>
  )
}
