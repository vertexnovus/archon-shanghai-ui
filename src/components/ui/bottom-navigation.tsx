import { Anchor, Text } from '@mantine/core'
import { IconLiveView } from '@tabler/icons-react'
import { useLocation } from '@tanstack/react-router'
import { HistoryIcon, HomeIcon } from 'lucide-react'
import classes from './bottom-navigation.module.css'

const links = [
  { label: 'Home', link: '/', icon: HomeIcon },
  { label: 'Live', link: '/live', icon: IconLiveView },
  { link: '/history', label: 'History', icon: HistoryIcon },
]

export default function BottomNavigation() {
  const { pathname } = useLocation()

  return (
    <div className={classes.root}>
      {links.map((link) => (
        <Anchor key={link.label} href={link.link} className={classes.link} data-active={link.link === pathname}>
          <link.icon size={18} />

          <Text fz="xs">{link.label}</Text>
        </Anchor>
      ))}
    </div>
  )
}
