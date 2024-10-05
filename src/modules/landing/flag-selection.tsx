import chinaFlag from '@/assets/china.png'
import usFlag from '@/assets/united-states.png'
import { Button, Menu } from '@mantine/core'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const languages = [
  { value: 'en', label: 'English', flag: usFlag },
  { value: 'id', label: 'Chinese', flag: chinaFlag },
]

export function FlagSelection() {
  const [_, setSelected] = useState(() => localStorage.getItem('lang') || 'en')
  const { i18n } = useTranslation('translation')

  const handleLanguageClick = async (lang: string) => {
    localStorage.setItem('lang', lang)
    await i18n.changeLanguage(lang)
    setSelected(lang)
  }

  const selectedLanguage = languages.find((item) => item.value === i18n.language)

  return (
    <Menu shadow="md" withArrow offset={0} width={200}>
      <Menu.Target>
        <Button w={'inherit'} color="white" variant="transparent" rightSection={<ChevronDown size={18} />} p={0}>
          <img src={selectedLanguage?.flag} width={20} height={20} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown bg="rgba(255,255,255,0.8)" w={120}>
        {languages.map((item) => (
          <Menu.Item
            key={item.value}
            leftSection={<img src={item.flag} width={20} height={20} />}
            onClick={() => handleLanguageClick(item.value)}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
