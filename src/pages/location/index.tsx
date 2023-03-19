import locationAPI from '@/api/location.api'
import useEntityPagination from '@/hooks/useEntityPagination'
import Location from '@/types/Location'
import Image from 'next/image'
import Link from 'next/link'


function CharacterPage() {
    
    const {data: locationList, paginationControllerEl} = useEntityPagination<Location>(locationAPI)
    
    return (<>
        { paginationControllerEl }

        <div className='grid grid-cols-5 gap-7 mb-10'>
            
            {locationList?.results?.map(location => <Link  key={location.id} href={`/${locationAPI.entityName}/${location.id}`}>
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