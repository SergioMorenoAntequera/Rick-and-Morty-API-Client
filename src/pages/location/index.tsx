import LOCATION_ENTITY from '@/features/rick-and-morty-api/entities/location.api'
import useEntityPagination from '@/hooks/useEntityPagination'
import Location from '@/features/rick-and-morty-api/entities/location.type'
import Image from 'next/image'
import Link from 'next/link'


function CharacterPage() {
    
    const {data: locationList, paginationControllerEl} = useEntityPagination<Location>(LOCATION_ENTITY)
    
    return (<>
        { paginationControllerEl }

        <div className='grid grid-cols-5 gap-7 mb-10'>
            
            {locationList?.results?.map(location => <Link  key={location.id} href={`/${LOCATION_ENTITY.entityName}/${location.id}`}>
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