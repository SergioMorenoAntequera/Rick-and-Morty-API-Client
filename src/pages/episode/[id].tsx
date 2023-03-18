/* eslint-disable react-hooks/exhaustive-deps */

import episodeAPI from '@/api/episode.api'
import LabelList from '@/components/LabelList'
import StatusIndicator from '@/components/StatusIndicator'
import Character from '@/types/Character'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

function CharacterPage() {
    const router = useRouter()
    const id = parseInt(router.query.id?.toString() ?? '')

    const { isLoading, error, data, refetch } = useQuery('episode', () => id ? episodeAPI.specific.getEverything(id) : null)
    const [episode, characters] = (data ?? [])

    useEffect(() => {
        if(!id) return
        refetch()
    }, [id])
    
    return (<div>

        <div className='flex gap-6'>
            <div>
                <p className='text-3xl'> {episode?.name}</p>
                <p> {episode?.episode}</p>
                <p> {episode?.air_date}</p>
                <p> {episode?.created}</p>
            </div>
        </div>
        
        <LabelList title='Characters in the episode:' 
            entityName='character' data={characters} 
            renderEl={(character: Character) => <>
                <p className='font-bold'> {character.name} </p>
                <p className='opacity-75'> {character.species} </p>
                <StatusIndicator character={character}/>
            </>}
        />
    </div>)
}

export default CharacterPage