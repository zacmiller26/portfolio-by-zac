// import AppsWindow from '@/app/components/windows/AppsWindow'
import ContactWindow from '@/app/components/windows/ContactWindow'
import HomeWindow from '@/app/components/windows/HomeWindow'
import SettingsWindow from '@/app/components/windows/SettingsWindow'
import { type WindowConfig } from '@/app/components/windows/types'

export const windowConfigs: WindowConfig[] = [
  HomeWindow,
  ContactWindow,
  // AppsWindow, TODO: Uncomment when ready to implement
  SettingsWindow
]
