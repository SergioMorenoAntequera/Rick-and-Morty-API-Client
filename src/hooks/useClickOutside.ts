import { useEffect, useRef } from "react"

function useClickOutside( onClickOutside: () => void ) {

  const elementRef = useRef<HTMLDivElement>(null)

  function handleClick(e: MouseEvent) {
    if(!elementRef.current || !e.target) return 
    
    const clickedInComponent = elementRef.current?.contains(e.target as Node)
    if(clickedInComponent) return

    onClickOutside()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => { document.removeEventListener('mousedown', handleClick) }
  }, [])
  

  return elementRef
}

export default useClickOutside