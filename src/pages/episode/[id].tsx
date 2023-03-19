/* eslint-disable react-hooks/exhaustive-deps */

import episodeAPI from '@/api/episode.api'
import CharacterCard from '@/components/CharacterCard'
import LabelList from '@/components/LabelList'
import PillInfo from '@/components/PillInfo'
import StatusIndicator from '@/components/StatusIndicator'
import Character from '@/types/Character'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

function CharacterPage() {
    const router = useRouter()
    const id = parseInt(router.query.id?.toString() ?? '')

    const { isLoading, error, data, refetch } = useQuery('episode', () => id ? episodeAPI.getEverything(id) : null)
    const [episode, characters] = (data ?? [])

    useEffect(() => {
        if(!id) return
        refetch()
    }, [id])
    
    if(!episode) return
    return (<div>
        <div className='text-center mb-16'>
            <p className='relative text-9xl font-bold mb-6 z-10'> {episode?.name} </p>
        </div>

        <PillInfo gridCols='grid-cols-3'>
            <p title='Episode'> {episode?.episode} </p>
            <p title='Air Date'> {episode?.air_date}</p>
            <p title='Characters'> {episode?.characters.length} Character{episode.characters.length > 1 ? 's':''} </p>
        </PillInfo>
        
        <LabelList title='Characters in this episode:' 
            entityName='character' data={characters} 
            renderEl={(character: Character) => <CharacterCard key={character.id} character={character}/>}
        />
    </div>)
}

export default CharacterPage