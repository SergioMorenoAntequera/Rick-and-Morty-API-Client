import { useState } from 'react'
import { useQuery } from "react-query"
import Link from 'next/link'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Location from '@/features/rick-and-morty-api/types/location.type'
import RICK_AND_MORTY_API from '@/features/rick-and-morty-api/main'

export default function useResidentsList(location?: Location) {
  const cacheName = location?.name ?? '' 

  const [ isListExpanded, setIsListExpanded ] = useState(false)
  
  const { data } = useQuery(
    [ cacheName, location ],
    () => location?.residents ? RICK_AND_MORTY_API.locations.getResidents(location?.residents) : null
  )
  
  const residentsListEl = <>
    <p 
      onClick={() => { setIsListExpanded(prev => !prev) }} 
      className='cursor-pointer font-bold mb-2 flex justify-between'> 
      
      <span> { data?.length} Characters from {location?.name} </span>
      <FontAwesomeIcon icon={isListExpanded ? faCaretUp : faCaretDown} />
    </p>

    { isListExpanded && <div className='max-h-40 overflow-auto'>
      {data?.map(char => <Link className='block hover:bg-gray-100 transition' href={`/character/${char.id}`} key={char.id}> 
        <p className='p-1 last:bg-red-600'> {char.name} </p> 
      </Link>)}
    </div> }
  </>

  return { data, residentsListEl }
}

