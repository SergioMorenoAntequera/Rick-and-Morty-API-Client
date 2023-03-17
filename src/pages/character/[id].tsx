/* eslint-disable react-hooks/exhaustive-deps */

import characterAPI from '@/api/character.api'
import Image from 'next/image'
import Link from 'next/link'
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
                <p> 
                    Is from: 
                    <Link className='text-blue-500' href={`/location/${origin?.id}`}> {origin?.name} </Link> 
                    a place in the {location?.dimension} dimension
                    with {location?.residents.length} residents
                </p>
                <p> Last seen in: {location?.name}</p>
            </div>
        </div>
        
        <div>
            <p className='text-4xl font-bold my-2'> Episodes where this charater is seen: </p>
            <div className='flex flex-wrap gap-2'>
                {episodes?.map(episode => <Link key={episode.id} href={`/episode/${episode.id}`}> 
                    <div className='p-1 bg-gray-300 rounded'> {episode.name} </div>
                </Link>)}
                 
            </div>
        </div>

    </div>)
}

export default CharacterPage