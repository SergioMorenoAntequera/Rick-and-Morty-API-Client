/* eslint-disable react-hooks/exhaustive-deps */

import characterAPI from '@/api/character.api'
import LabelList from '@/components/LabelList'
import StatusIndicator from '@/components/StatusIndicator'
import Episode from '@/types/Episodes'
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
                <StatusIndicator character={character}/>
                <p> 
                    Is from: 
                    <Link className='text-blue-500' href={`/location/${origin?.id}`}> {origin?.name} </Link> 
                    a place in the {location?.dimension} dimension
                    with {location?.residents.length} residents
                </p>
                <p> Last seen in: {location?.name}</p>
            </div>
        </div>
        
        

        <LabelList title='Episodes where this charater is seen:' 
            entityName='episode' data={episodes} 
            renderEl={(episode: Episode) => <>
                <p className='font-bold'> {episode.name} </p>
                <p className='opacity-75'> Live on: {episode.air_date} </p>
            </>}
        />


    </div>)
}

export default CharacterPage