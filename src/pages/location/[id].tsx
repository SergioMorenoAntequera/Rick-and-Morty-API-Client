/* eslint-disable react-hooks/exhaustive-deps */

import characterAPI from '@/api/character.api'
import locationAPI from '@/api/location.api'
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
    
    return (<div>

        <div className='flex gap-6'>
            <div>
                <p className='text-3xl'> {location?.name}</p>
                <p> {location?.dimension}</p>
                <p> {location?.type}</p>
                <p> {location?.created}</p>
            </div>
        </div>
        
        <div>
            Residents:
            {residents?.map(resident => <div key={resident.id}> {resident.name} </div>)}
        </div>

    </div>)
}

export default CharacterPage