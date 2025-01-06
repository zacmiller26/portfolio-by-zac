import type { Config } from 'tailwindcss'

// Generates CSS variables for a color with shades
function cssVars(colorName: string, shades: string[]) {
  const colorConfig: { [shade: string]: string } = {}
  shades.forEach(shade => {
    colorConfig[shade] = `var(--${colorName}-${shade})`
  })
  return colorConfig
}

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        surface: cssVars('surface', ['0', '1', '2', '3', '4', '5', '6']),
        primary: cssVars('primary', ['0', '1', '2', '3', '4']),
        accent: cssVars('accent', ['0', '1', '2', '3', '4', '5'])
      }
    }
  },
  safelist: [
    {
      pattern:
        /heropattern-(temple|wiggle|signal|polkadots|graphpaper)-white\/(10|50)/
    },
    {
      pattern: /opacity-(10|20|50|100)/
    }
  ],
  plugins: [require('tailwindcss-hero-patterns')]
} satisfies Config
