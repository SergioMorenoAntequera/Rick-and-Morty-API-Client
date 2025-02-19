import EPISODE_ENTITY from '@/features/rick-and-morty-api/entities/episode.api'
import LOCATION_ENTITY from '@/features/rick-and-morty-api/entities/location.api'
import useEntityPagination from '@/hooks/useEntityPagination'
import Episode from '@/features/rick-and-morty-api/entities/episodes.type'
import Image from 'next/image'
import Link from 'next/link'


function CharacterPage() {
    
    const {data: episodeList, paginationControllerEl} = useEntityPagination<Episode>(EPISODE_ENTITY)
    
    return (<>
        { paginationControllerEl }

        <div className='grid grid-cols-5 gap-7 mb-10'>
            
            {episodeList?.results?.map(episode => <Link  key={episode.id} href={`/${EPISODE_ENTITY.entityName}/${episode.id}`}>
                <div className='border-container hover text-center cursor-pointer relative rounded p-4 max-w-xs'>
                
                <p className='truncate font-bold'> {episode.name} </p>
                <p> Characters: {episode.characters.length} </p>
                
            </div> </Link>)}
        </div>

        { paginationControllerEl }
    </>)
}

export default CharacterPage