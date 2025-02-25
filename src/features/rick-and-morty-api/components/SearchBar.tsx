
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import RICK_AND_MORTY_API from '../main'
import { capitalizeFirstLetter, pluralize } from '@/utils/string.utils'
import { extractParam } from '../utils/url-data-collection'
import useClickOutside from '@/hooks/useClickOutside'

const LIMIT_TO_SHOW = 5

function SearchBar() {
  const router = useRouter()
  const nameParam = extractParam(router, 'name')
  
  const [ name, setName ] = useState(nameParam)
  const [isInputOnFocus, setIsInputOnFocus] = useState(false)

  const { isLoading, data: searchResult } = useQuery(
    ['nameSearchResults', name], 
    () => RICK_AND_MORTY_API.getByName(name),
    {enabled: !!name}
  ) 

  const searchBarRef = useClickOutside(() => { setIsInputOnFocus(false) })

  const thereIsData = !!searchResult && Object.values(searchResult).find(e => e.length)

  return (<div className='relative w-96' ref={searchBarRef} onFocus={(e) => { setIsInputOnFocus(true) }}>
    
    <input 
      type="text" 
      placeholder='Search here' 
      className='border border-black px-4 py-2 rounded-full w-full'  
      value={name} onChange={e => {setName(e.target.value)}}
    />
    
    { isInputOnFocus && name && <div className='absolute top-full w-full bg-white shadow-lg rounded-lg'>
      
      { isLoading && <div className='flex items-center px-4 py-2'> Loading... </div> }
      
      { !isLoading && !thereIsData && <div className='flex items-center px-4 py-2'> Nothing found... 😬 </div> }

      { !isLoading && thereIsData && <div className='flex flex-col py-4 gap-5'>
        { Object.entries(searchResult).map(([key, data]) => {
          if(!data.length) return <></>
          
          return <div key={key}>
            <div className='px-4 mb-1 text-sm flex items-center justify-between'> 
              
              <span className='text-gray-800 font-bold'>
                {capitalizeFirstLetter(pluralize(key, data.length))}
              </span>
              
              {data.length > LIMIT_TO_SHOW && 
                <a href={`/${key}?name=${name}`} 
                  className='hover:text-gray-800 transition cursor-pointer'> 
                  see more 
                </a>
              }
              
            </div>

            {data.slice(0, LIMIT_TO_SHOW).map(entity => 
              <a href={`/${key}/${entity.id}`} key={entity.id} 
                className='block px-4 py-1 hover:text-gray-800 hover:bg-gray-100 transition cursor-pointer'> 
                {entity.name} 
              </a>
            )}
          </div>
        })}
      </div>}
    </div>}
  </div>)
}

export default SearchBar