/* eslint-disable react-hooks/exhaustive-deps */

import characterAPI from '@/api/character.api'
import locationAPI from '@/api/location.api'
import LabelList from '@/components/LabelList'
import StatusIndicator from '@/components/StatusIndicator'
import useResidentsList from '@/hooks/useResidentsList'
import Episode from '@/types/Episodes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

function CharacterPage() {
    const router = useRouter()
    const id = parseInt(router.query.id?.toString() ?? '')

    const { data, refetch } = useQuery('character', () => id ? characterAPI.specific.getEverything(id) : null)
    const [character, origin, location, episodes] = (data ?? [])

    const { residentsListEl:originResidentsEl } = useResidentsList(origin ?? undefined)
    const { residentsListEl:locationResidentsEl } = useResidentsList(location ?? undefined)

    useEffect(() => {
        if(id) refetch()
    }, [id])

    if(!character) return
    return (<div>
        <div className='text-center mb-6'>
            <p className='relative text-9xl font-bold mb-6 z-10'> {character?.name} </p>
            { character?.image  && <Image className='m-auto relative -top-14' width={300} height={300} src={character?.image ?? ''} alt={character?.name ?? ''}></Image>}
        </div>

        <div className='border-container mb-14 grid grid-cols-3 rounded-full items-center justify-center p-0 overflow-hidden'>
            <div className='p-4 text-center hover:bg-black hover:text-white transition'> 
                <span className='text-xl font-bold' title='Specie'> {character?.species}  </span> 
            </div>  

            <div className='p-4 text-center border-l border-black hover:bg-black hover:text-white transition'> 
                <span className='text-xl font-bold' title='Gender'> {character?.gender}  </span> 
            </div>  
            
            <div className='p-4 border-l border-black hover:bg-black hover:text-white transition'>
                <StatusIndicator className='text-xl justify-center font-bold' character={character}/>
            </div>  
        </div>

        <div className='border-container grid grid-cols-2 gap-14 p-12'>
            <div>
                <p className='text-xl border-b pb-1 border-black mb-4'> Origin </p>
                {!origin && 'Unknown...'}
                {origin && <>
                    <div className='grid grid-cols-3 gap-6 justify-evenly text-center'>
                        <div>       
                            <p className='font-bold'> Dimension </p>
                            <Link className='text-blue-500' href={`/location/${origin?.id}`}> {origin?.name} </Link> 
                        </div>

                        <div>
                            <p className='font-bold'> Type </p>
                            <p> {origin?.type} </p> 
                        </div>
                        
                        <div>
                            <p className='font-bold'> Dimension </p>
                            <p> {origin?.dimension} </p> 
                        </div>
                    </div>
                    <div className='mt-7'> { originResidentsEl } </div>
                </>}
            </div>
            <div>
                <p className='text-xl border-b pb-1 border-black mb-4'> Current Location </p>
                {!location && 'Unknown...'}
                {location && <>
                    <div className='grid grid-cols-3 gap-6 justify-evenly text-center'>
                        <div>       
                            <p className='font-bold'> Dimension </p>
                            <Link className='text-blue-500' href={`/location/${location?.id}`}> {location?.name} </Link> 
                        </div>

                        <div>
                            <p className='font-bold'> Type </p>
                            <p> {location?.type} </p> 
                        </div>
                        
                        <div>
                            <p className='font-bold'> Dimension </p>
                            <p> {location?.dimension} </p> 
                        </div>
                    </div>
                    <div className='mt-7'> { locationResidentsEl } </div>
                </>}
            </div>
        </div>
        
        

        <LabelList className='mt-10' title='Episodes where this charater is seen:' 
            entityName='episode' data={episodes} 
            renderEl={(episode: Episode) => <div className='max-w-xs'>
                <p className='font-bold truncate' title={episode.name}>  {episode.episode} - {episode.name} </p>
                <p className='opacity-75'> Live on: {episode.air_date} </p>
        </div>}
        />
    </div>)
}

export default CharacterPage