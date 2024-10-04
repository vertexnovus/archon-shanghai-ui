import indoFlag from '@/assets/indonesia.png'
import usFlag from '@/assets/united-states.png'
import { Button, Image, Menu } from '@mantine/core'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const languages = [
  { value: 'en', label: 'EN', flag: usFlag },
  { value: 'tr', label: 'ID', flag: indoFlag },
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
        <Button
          w={'inherit'}
          color="white"
          variant="transparent"
          leftSection={<Image src={selectedLanguage?.flag} maw={18} height={18} />}
          rightSection={<ChevronDown size={18} />}
        >
          {selectedLanguage?.label}
        </Button>
      </Menu.Target>

      <Menu.Dropdown bg="rgba(255,255,255,0.8)" w={90}>
        {languages.map((item) => (
          <Menu.Item
            key={item.value}
            leftSection={<Image src={item.flag} width={18} height={18} />}
            onClick={() => handleLanguageClick(item.value)}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
