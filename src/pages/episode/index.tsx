import episodeAPI from '@/api/episode.api'
import locationAPI from '@/api/location.api'
import useEntityPagination from '@/hooks/useEntityPagination'
import Episode from '@/types/Episodes'
import Image from 'next/image'
import Link from 'next/link'


function CharacterPage() {
    
    const {data: episodeList, paginationControllerEl} = useEntityPagination<Episode>(episodeAPI)
    
    return (<>
        { paginationControllerEl }

        <div className='grid grid-cols-5 gap-7 mb-10'>
            
            {episodeList?.results?.map(episode => <Link  key={episode.id} href={`/${episodeAPI.entityName}/${episode.id}`}>
                <div className='border-container hover text-center cursor-pointer relative rounded p-4 max-w-xs'>
                
                <p className='truncate font-bold'> {episode.name} </p>
                <p> Characters: {episode.characters.length} </p>
                
            </div> </Link>)}
        </div>

        { paginationControllerEl }
    </>)
}

export default CharacterPage