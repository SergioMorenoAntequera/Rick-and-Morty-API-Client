import CharacterCard from '@/components/CharacterCard'
import LabelList from '@/components/LabelList'
import PillInfo from '@/components/PillInfo'
import Character from '@/features/rick-and-morty-api/types/character.type'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import RICK_AND_MORTY_API from '@/features/rick-and-morty-api/main'

function CharacterPage() {
  const router = useRouter()
  const id = parseInt(router.query.id?.toString() ?? '')

  const { data, refetch } = useQuery('character', () => id ? RICK_AND_MORTY_API.locations.getEverything(id) : null)
  const [ location, residents ] = (data ?? [])

  useEffect(() => {
    if(!id) return
    refetch()
  }, [ id ])
    
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