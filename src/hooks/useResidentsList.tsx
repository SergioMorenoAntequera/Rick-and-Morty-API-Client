/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useQuery } from "react-query"
import Link from 'next/link'

import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Location from '@/features/rick-and-morty-api/types/location.type'
import RICK_AND_MORTY_API from '@/features/rick-and-morty-api/main'

export default function useResidentsList(location?: Location) {
  const cacheName = location?.name ?? '' 

  const { data, refetch } = useQuery(cacheName, () => location?.residents ?  RICK_AND_MORTY_API.locations.getResidents(location?.residents) : null)
  const [ show, setShow ] = useState(false)

  function toggleShow() { setShow(!show) }

  useEffect(() => {
    if(location) { refetch() }
  }, [ location ])
      
  const residentsListEl = <>
    <p onClick={toggleShow} 
      className='cursor-pointer font-bold mb-2 flex justify-between'> 
      <span> { data?.length} Characters from {location?.name} </span>
      <span> { !show ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} /> }</span>
    </p>

    { show && <div className='max-h-40 overflow-auto'>
      {data?.map(char => <Link className='block hover:bg-gray-100 transition' href={`/character/${char.id}`} key={char.id}> 
        <p className='p-1 last:bg-red-600'> {char.name} </p> 
      </Link>)}
    </div>}
  </>

  return { data, show, toggleShow, residentsListEl }
}

