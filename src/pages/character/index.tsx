import characterAPI from '@/api/character.api'
import useEntityPagination from '@/hooks/useEntityPagination'
import Character from '@/types/Character'
import Image from 'next/image'
import Link from 'next/link'


function CharacterPage() {
    
    const {data: charactersList, paginationControllerEl} = useEntityPagination<Character>(characterAPI.generic)
    
    return (<>
        { paginationControllerEl }

        <div className='grid grid-cols-5 gap-7 mb-10'>
            
            {charactersList?.results?.map(character => <Link  key={character.id} href={`/${characterAPI.generic.entityName}/${character.id}`}>
                <div className='text-center cursor-pointer relative rounded bg-gray-100 p-4 max-w-xs'>
                
                
                <div className='relative w-20 h-20 m-auto'>
                    <Image fill src={character.image} alt={character.name} />
                </div>
                
                <p className='truncate font-bold'> {character.name} </p>
                <p className=''> {character.status} </p>
                <p> Episodes: {character.episode.length} </p>
                
            </div> </Link>)}
        </div>

        { paginationControllerEl }
    </>)
}

export default CharacterPage