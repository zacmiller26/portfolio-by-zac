import { Fan, Flame, Moon, Shell, TreePine } from 'lucide-react'

export const THEME_CONFIG = {
  ocean: {
    label: 'Ocean',
    icon: Shell
  },
  ember: {
    label: 'Ember',
    icon: Flame
  },
  emerald: {
    label: 'Pine',
    icon: TreePine
  },
  midnight: {
    label: 'Midnight',
    icon: Moon
  },
  smoke: {
    label: 'Smoke',
    icon: Fan
  }
}

export const THEME_KEYS = Object.keys(THEME_CONFIG)
export const DEFAULT_THEME_KEY = THEME_KEYS[0]
export type THEME_OPTION_TYPE = (typeof THEME_KEYS)[number]

export const PATTERN_CONFIG = {
  none: {
    label: 'None',
    className: null,
    previewClassName: null
  },
  temple: {
    label: 'Temple',
    className: 'heropattern-temple-white/10 opacity-20',
    previewClassName: 'heropattern-temple-white/50 opacity-50'
  },
  wiggle: {
    label: 'Wiggle',
    className: 'heropattern-wiggle-white/10 opacity-20',
    previewClassName: 'heropattern-wiggle-white/50 opacity-50'
  },
  signal: {
    label: 'Signal',
    className: 'heropattern-signal-white/10 opacity-20',
    previewClassName: 'heropattern-signal-white/50 opacity-50'
  },
  polkadots: {
    label: 'Polka Dots',
    className: 'heropattern-polkadots-white/10 opacity-20',
    previewClassName: 'heropattern-polkadots-white/50 opacity-50'
  },
  graphpaper: {
    label: 'Graph Paper',
    className: 'heropattern-graphpaper-white/10 opacity-20',
    previewClassName: 'heropattern-graphpaper-white/50 opacity-50'
  }
}

export const PATTERN_KEYS = Object.keys(PATTERN_CONFIG)
export const DEFAULT_PATTERN_KEY =
  PATTERN_KEYS[0] as keyof typeof PATTERN_CONFIG
export type PATTERN_OPTION_TYPE = keyof typeof PATTERN_CONFIG

export const WALLPAPER_CONFIG = {
  winter: {
    label: 'Winter',
    url: '/wallpaper-2.jpg'
  },
  seattle: {
    label: 'Seattle',
    url: '/wallpaper-1.jpg'
  },
  gaming: {
    label: 'Gaming',
    url: '/wallpaper-3.jpg'
  },
  none: {
    label: 'None',
    url: null
  }
}
export const WALLPAPER_KEYS = Object.keys(WALLPAPER_CONFIG)
export const DEFAULT_WALLPAPER_KEY =
  WALLPAPER_KEYS[0] as keyof typeof WALLPAPER_CONFIG
export type WALLPAPER_OPTION_TYPE = keyof typeof WALLPAPER_CONFIG
