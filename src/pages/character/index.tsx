import StatusIndicator from '@/components/StatusIndicator'
import useEntityPagination from '@/hooks/useEntityPagination'
import Character from '@/features/rick-and-morty-api/entities/character.type'
import Image from 'next/image'
import Link from 'next/link'
import RICK_AND_MORTY_API from '@/features/rick-and-morty-api/main'


function CharacterPage() {
    
  const { data: charactersList, paginationControllerEl } = useEntityPagination<Character>(RICK_AND_MORTY_API.characters)
    
  return (<>
    { paginationControllerEl }

    <div className='grid grid-cols-5 gap-7 mb-10'>
            
      {charactersList?.results?.map(character => <Link  key={character.id} href={`/${RICK_AND_MORTY_API.characters.entityName}/${character.id}`}>
        <div className='text-center cursor-pointer relative border-container hover max-w-xs '>
                
                
          <div className='relative w-20 h-20 m-auto'>
            <Image fill src={character.image} alt={character.name} />
          </div>
                
          <p className='truncate font-bold'> {character.name} </p>
          <p className=''> {character.gender} </p>
          <StatusIndicator character={character} className='justify-center'/>
          <p> Episodes: {character.episode.length} </p>
                
        </div> </Link>)}
    </div>

    { paginationControllerEl }
  </>)
}

export default CharacterPage