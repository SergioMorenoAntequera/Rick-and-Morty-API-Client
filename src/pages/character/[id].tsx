import characterAPI from '@/api/character.api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

function CharacterPage() {
    const router = useRouter()
    const id = parseInt(router.query.id?.toString() ?? '')

    const { isLoading, error, data:character, refetch } = useQuery('selectedAPI', () => id ? characterAPI.generic.getById(id) : null)
  
    useEffect(() => {
        if(!id) return
        refetch()
    }, [id])

    useEffect(() => {
        if(!character) return
    }, [character])

    async function getEpisodes() {
        if(!character) return
        const t = await characterAPI.specific.getEpisodes(character?.episode)
        console.log(t)
    }
    
    return (<div>
        
        <div onClick={getEpisodes}> get spisodes </div>

        <div className='flex gap-6'>
            <div>
                {character?.image && <Image width={300} height={300} src={character?.image ?? ''} alt={character?.name ?? ''}></Image>}
            </div>
            <div>
                <p className='text-3xl'> {character?.name}</p>
                <p> {character?.gender}</p>
                <p> {character?.species}</p>
                <p> {character?.status}</p>
            </div>
        </div>
        

    </div>)
}

export default CharacterPage