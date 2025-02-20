import useEntityPagination from '@/hooks/useEntityPagination'
import Episode from '@/features/rick-and-morty-api/types/episodes.type'
import Image from 'next/image'
import Link from 'next/link'
import RICK_AND_MORTY_API from '@/features/rick-and-morty-api/main'


function CharacterPage() {
    
  const { data: episodeList, paginationControllerEl } = useEntityPagination<Episode>(RICK_AND_MORTY_API.episodes)
    
  return (<>
    { paginationControllerEl }

    <div className='grid grid-cols-5 gap-7 mb-10'>
            
      {episodeList?.results?.map(episode => <Link  key={episode.id} href={`/${RICK_AND_MORTY_API.episodes.entityName}/${episode.id}`}>
        <div className='border-container hover text-center cursor-pointer relative rounded p-4 max-w-xs'>
                
          <p className='truncate font-bold'> {episode.name} </p>
          <p> Characters: {episode.characters.length} </p>
                
        </div> </Link>)}
    </div>

    { paginationControllerEl }
  </>)
}

export default CharacterPage