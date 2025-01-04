'use client'

import { useCallback, useEffect, useState } from 'react'
import { ZodSchema } from 'zod'

// Memoize the isLocalStorageAvailable function outside the hook
const isLocalStorageAvailable = (() => {
  try {
    const testKey = '__storage_test__'
    window.localStorage.setItem(testKey, 'test')
    window.localStorage.removeItem(testKey)
    return true
  } catch (_error) {
    return false
  }
})()

// Define a generic type for the hook
function useLocalStorage<T>(
  key: string,
  initialValue: T,
  schema: ZodSchema<T>
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store the value
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Use useEffect to set the initial state
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && isLocalStorageAvailable) {
        const item = window.localStorage.getItem(key)
        if (item !== null) {
          const parsedItem = JSON.parse(item)
          // Validate the parsed item using the schema
          const result = schema.safeParse(parsedItem)
          if (result.success) {
            setStoredValue(result.data)
          } else {
            console.error('useLocalStorage validation error: ', result.error)
            setStoredValue(initialValue)
          }
        } else {
          setStoredValue(initialValue)
        }
      }
    } catch (error) {
      console.error('useLocalStorage getItem error: ', error)
      setStoredValue(initialValue)
    }
  }, [key, initialValue, schema])

  // Function to update the state and localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function to match useState API
        const valueToStore =
          value instanceof Function ? value(storedValue) : value

        // Only update state and localStorage if the new value is different
        if (valueToStore !== storedValue) {
          // Update state
          setStoredValue(valueToStore)

          // Update localStorage
          if (typeof window !== 'undefined' && isLocalStorageAvailable) {
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
          }
        }
      } catch (error) {
        console.error('useLocalStorage setItem error: ', error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue]
}

export default useLocalStorage
