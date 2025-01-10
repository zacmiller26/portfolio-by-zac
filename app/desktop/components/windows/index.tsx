// import AppsWindow from '@/app/desktop/components/windows/AppsWindow'
import ContactWindow from '@/app/desktop/components/windows/ContactWindow'
import HomeWindow from '@/app/desktop/components/windows/HomeWindow'
import SettingsWindow from '@/app/desktop/components/windows/SettingsWindow'
import { type WindowConfig } from '@/app/desktop/components/windows/types'

export const windowConfigs: WindowConfig[] = [
  HomeWindow,
  ContactWindow,
  // AppsWindow,
  SettingsWindow
]
