import locationAPI from '@/api/location.api'
import useEntityPagination from '@/hooks/useEntityPagination'
import Location from '@/types/Location'
import Image from 'next/image'
import Link from 'next/link'


function CharacterPage() {
    
    const {data: locationList, paginationControllerEl} = useEntityPagination<Location>(locationAPI.generic)
    
    return (<>
        { paginationControllerEl }

        <div className='grid grid-cols-5 gap-7 mb-10'>
            
            {locationList?.results?.map(location => <Link  key={location.id} href={`/${locationAPI.generic.entityName}/${location.id}`}>
                <div className='text-center cursor-pointer relative rounded bg-gray-100 p-4 max-w-xs'>
                
                <p className='truncate font-bold'> {location.name} </p>
                <p className=''> {location.dimension} </p>
                <p> Residents: {location.residents.length} </p>
                
            </div> </Link>)}
        </div>

        { paginationControllerEl }
    </>)
}

export default CharacterPage