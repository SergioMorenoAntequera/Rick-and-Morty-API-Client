/* eslint-disable react-hooks/exhaustive-deps */

import characterAPI from '@/api/character.api'
import locationAPI from '@/api/location.api'
import CharacterCard from '@/components/CharacterCard'
import LabelList from '@/components/LabelList'
import StatusIndicator from '@/components/StatusIndicator'
import Character from '@/types/Character'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

function CharacterPage() {
    const router = useRouter()
    const id = parseInt(router.query.id?.toString() ?? '')

    const { isLoading, error, data, refetch } = useQuery('character', () => id ? locationAPI.specific.getEverything(id) : null)
    const [location, residents] = (data ?? [])

    useEffect(() => {
        if(!id) return
        refetch()
    }, [id])
    
    if(!location) return
    return (<div>

        <div className='flex gap-6'>
            <div>
                <p className='text-3xl'> {location?.name}</p>
                <p> {location?.dimension}</p>
                <p> {location?.type}</p>
                <p> {location?.created}</p>
            </div>
        </div>
        
        <LabelList title='Residents of this place:' 
            entityName='character' data={residents} 
            renderEl={(character: Character) => <CharacterCard key={character.id} character={character}/>}
        />

    </div>)
}

export default CharacterPage