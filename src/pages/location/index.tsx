import useEntityPagination from '@/hooks/useEntityPagination'
import Location from '@/features/rick-and-morty-api/entities/location.type'
import Link from 'next/link'
import RICK_AND_MORTY_API from '@/features/rick-and-morty-api/main'


function CharacterPage() {
    
  const { data: locationList, paginationControllerEl } = useEntityPagination<Location>(RICK_AND_MORTY_API.locations)
    
  return (<>
    { paginationControllerEl }

    <div className='grid grid-cols-5 gap-7 mb-10'>
            
      {locationList?.results?.map(location => <Link  key={location.id} href={`/${RICK_AND_MORTY_API.locations.entityName}/${location.id}`}>
        <div className='border-container hover text-center cursor-pointer relative rounded p-4 max-w-xs'>
                
          <p className='truncate font-bold'> {location.name} </p>
          <p className=''> {location.dimension} </p>
          <p> Residents: {location.residents.length} </p>
                
        </div> </Link>)}
    </div>

    { paginationControllerEl }
  </>)
}

export default CharacterPage