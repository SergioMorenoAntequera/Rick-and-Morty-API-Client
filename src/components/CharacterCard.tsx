import Character from '@/features/rick-and-morty-api/entities/character.type'
import Image from 'next/image'
import React from 'react'
import StatusIndicator from './StatusIndicator'

type Props = {character: Character}

function CharacterCard({character}: Props) {
  return (<div className='w-28'>
        <Image className='m-auto' width={50} height={50} src={character.image} alt={character.name}></Image>
        <p className='font-bold truncate'> {character.name} </p>
        <p className='opacity-75 truncate'> {character.species} </p>
        <StatusIndicator character={character}/>
    </div>)
}

export default CharacterCard