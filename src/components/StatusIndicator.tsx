import { useContext } from 'react'
import { SpoilerProtectionContext } from '@/features/spoiler-protection/SpoilerProtection'
import Character, { CharacterStatus } from '@/features/rick-and-morty-api/entities/character.type'

type Props = {character?: Character, status?: CharacterStatus, className?: string}
function StatusIndicator({character, status, className}: Props) {
    status = status || character?.status
    
    const { showingSpoilers } = useContext(SpoilerProtectionContext)
    
    if(!status) <> </>
    const colorClass = status === 'Alive' ? 'bg-green-400' :  'bg-red-400'  
    return (<div className={`flex items-center gap-2 ${className} ${showingSpoilers ? 'filter blur-md' : ''}`} title='Status'>

        <div className={`h-4 w-4 rounded-full ${!showingSpoilers ? colorClass : 'bg-gray-400'}`}/> 
        {status}

    </div>)
}

export default StatusIndicator