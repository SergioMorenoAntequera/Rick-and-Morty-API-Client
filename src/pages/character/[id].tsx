/* eslint-disable react-hooks/exhaustive-deps */

import characterAPI from '@/api/character.api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

function CharacterPage() {
    const router = useRouter()
    const id = parseInt(router.query.id?.toString() ?? '')

    const { isLoading, error, data, refetch } = useQuery('character', () => id ? characterAPI.specific.getEverything(id) : null)
    const [character, origin, location, episodes] = (data ?? [])

    useEffect(() => {
        if(!id) return
        refetch()
    }, [id])
    
    return (<div>

        <div className='flex gap-6'>
            <div>
                {character?.image && <Image width={300} height={300} src={character?.image ?? ''} alt={character?.name ?? ''}></Image>}
            </div>
            <div>
                <p className='text-3xl'> {character?.name}</p>
                <p> {character?.gender}</p>
                <p> {character?.species}</p>
                <p> {character?.status}</p>
                <p> Is from: {origin?.name}</p>
                <p> Last seen in: {location?.name}</p>
            </div>
        </div>
        
        <div>
            Episodes:
            {episodes?.map(episode => <div key={episode.id}> {episode.name} </div>)}
        </div>

    </div>)
}

export default CharacterPage