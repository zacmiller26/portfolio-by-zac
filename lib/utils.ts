import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// @date format: yyyy-mm-dd
export function yearsSince(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  const now = new Date()
  const years = now.getUTCFullYear() - year

  if (
    now.getUTCMonth() < month - 1 || // Adjust month to zero-based index
    (now.getUTCMonth() === month - 1 && now.getUTCDate() < day)
  ) {
    return years - 1
  }

  return years
}
