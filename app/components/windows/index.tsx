import AboutWindow from '@/app/components/windows/AboutWindow'
import AppsWindow from '@/app/components/windows/AppsWindow'
import HomeWindow from '@/app/components/windows/HomeWindow'
import PhotosWindow from '@/app/components/windows/PhotosWindow'
import SettingsWindow from '@/app/components/windows/SettingsWindow'
import { type WindowConfig } from '@/app/components/windows/types'

export const windowConfigs: WindowConfig[] = [
  HomeWindow,
  AboutWindow,
  PhotosWindow,
  AppsWindow,
  SettingsWindow
]
