/* eslint-disable react-hooks/exhaustive-deps */

import characterAPI from '@/api/character.api'
import episodeAPI from '@/api/episode.api'
import locationAPI from '@/api/location.api'
import Image from 'next/image'
import Link from 'next/link'
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
        
        <div>
            Characters in the episode:
            {characters?.map(character => <div key={character.id}> {character.name} </div>)}
        </div>

    </div>)
}

export default CharacterPage