/* eslint-disable react-hooks/exhaustive-deps */

import characterAPI from '@/api/character.api'
import locationAPI from '@/api/location.api'
import CharacterCard from '@/components/CharacterCard'
import LabelList from '@/components/LabelList'
import PillInfo from '@/components/PillInfo'
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

    const { isLoading, error, data, refetch } = useQuery('character', () => id ? locationAPI.getEverything(id) : null)
    const [location, residents] = (data ?? [])

    useEffect(() => {
        if(!id) return
        refetch()
    }, [id])
    
    if(!location) return
    return (<div>
        <div className='text-center mb-16'>
            <p className='relative text-9xl font-bold mb-6 z-10'> {location?.name} </p>
        </div>

        <PillInfo gridCols='grid-cols-3'>
            <p title='Dimension'> {location?.dimension} </p>
            <p title='Type'> Type: {location?.type}</p>
            <p title='Numero de residentes'> {location?.residents.length} Resident{location.residents.length > 1 ? 's':''} </p>
        </PillInfo>
        
        <LabelList title='Residents of this place:' 
            entityName='character' data={residents} 
            renderEl={(character: Character) => <CharacterCard key={character.id} character={character}/>}
        />

    </div>)
}

export default CharacterPage