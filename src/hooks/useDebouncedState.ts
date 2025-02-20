import { Dispatch, SetStateAction, useEffect, useState } from "react"


type UseDebouncedStateReturn<T> = [T, Dispatch<SetStateAction<T>>, T]
const useDebouncedState = <T>(initialValue: T, debouceTime: number = 500): UseDebouncedStateReturn<T> => {

    const [ value, setValue ] = useState<T>(initialValue)
    const [ debouncedValue, setDebouncedValue ] = useState<T>(initialValue)

    useEffect(() => {

      const timeout = setTimeout(() => {
        setDebouncedValue(value)
      }, debouceTime)

      return () => {
        clearTimeout(timeout)
      }
    }, [value, debouceTime])
    

    return [ value, setValue, debouncedValue ]
}

export default useDebouncedState