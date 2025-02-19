import React from 'react'

type Props = { children: string[]  | JSX.Element[], gridCols: string, className?: string}

function PillInfo({ children, gridCols, className }: Props) {
    
  const pillElements = children?.map((child, i) => (
    <div key={i} className='p-4 text-center hover:bg-black hover:text-white transition text-xl font-bold'> 
      { child }
    </div>
  )) 
    
  // Tailwind dosent allow to make the class "grid-cols-3" dinamically
  return (<div className={`grid ${gridCols} border-container mb-14 grid grid-cols-3 rounded-full items-center justify-center p-0 overflow-hidden ${className}`}>
    { pillElements }      
  </div>)
}

export default PillInfo