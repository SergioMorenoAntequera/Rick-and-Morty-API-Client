
import { useRouter } from 'next/router'
import React, { FocusEvent, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import RICK_AND_MORTY_API from '../main'
import { capitalizeFirstLetter, pluralize } from '@/utils/string.utils'

function SearchBar() {
  const router = useRouter()
    
  const paramName = router.query.name?.toString() ?? ''
  const [ name, setName ] = useState(paramName)
  const [isInputOnFocus, setIsInputOnFocus] = useState(false)
  const element = useRef<HTMLDivElement>(null)

  const { isLoading, data: searchResult } = useQuery(
    ['nameSearchResults', name], 
    () => RICK_AND_MORTY_API.getByName(name),
    {enabled: !!name}
  ) 
  
  function handleSearchBarFocus(e: FocusEvent<HTMLDivElement>) {
    console.log(e.type);
    if(e.type === 'focus') {
      setIsInputOnFocus(true)
      return
    }

    const clickedInComponent = element.current?.contains(e.target)
    if(e.type === 'blur' && !clickedInComponent) {
      setIsInputOnFocus(false)
      return
    }
  }

  const thereIsData = !!searchResult && Object.values(searchResult).find(e => e.length)
  
  const LIMIT_TO_SHOW = 5


  return (<div className='relative w-96' ref={element} 
    onFocus={(e) => { handleSearchBarFocus(e) }} 
    onBlur={(e) => { handleSearchBarFocus(e) }}
  >
    <input type="text" placeholder='Search here' 
      className='border border-black px-4 py-2 rounded-full w-full'  
      value={name} onChange={e => {setName(e.target.value)}}
    />
    
    { isInputOnFocus && name && <div className='absolute top-full w-full bg-white shadow-lg'>
      
      { isLoading && <div className='flex items-center px-4 py-2'> Loading... </div> }
      
      { !isLoading && thereIsData && Object.entries(searchResult).map(([key, data]) => {
        if(!data.length) return <></>
        
        return <div key={key}>
          <div className='px-4 py-2 bg-gray-400'> 
            {capitalizeFirstLetter(pluralize(key, data.length))}: 
          </div>

          {data.slice(0, LIMIT_TO_SHOW).map(entity => 
            <a href={`/${key}/${entity.id}`} key={entity.id} className='block px-2 py-1 hover:bg-gray-100 transition cursor-pointer'> {entity.name} </a>
          )}

          {data.length > LIMIT_TO_SHOW && 
            <a href={`/${key}?name=${name}`} className='block px-2 py-1 hover:bg-gray-100 transition cursor-pointer'> See all </a>
          }
        </div>
      })}

      {!isLoading && !thereIsData && <div className='flex items-center px-4 py-2'> Nothing found... 😬 </div> }

    </div> }
    </div>)
}

export default SearchBar