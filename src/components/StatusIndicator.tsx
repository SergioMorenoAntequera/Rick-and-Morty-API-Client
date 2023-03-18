import { useContext } from 'react'
import { SpoilerContext } from '@/features/SpoilerContext'
import Character, { CharacterStatus } from '@/types/Character'

type Props = {character?: Character, status?: CharacterStatus, className?: string}
function StatusIndicator({character, status, className}: Props) {
    status = status || character?.status
    
    const { spoilerProtection } = useContext(SpoilerContext)
    
    if(!status) <> </>
    const colorClass = status === 'Alive' ? 'bg-green-400' :  'bg-red-400'  
    return (<div className={`flex items-center gap-2 ${className} ${spoilerProtection ? 'filter blur-md' : ''}`} title='Status'>

        <div className={`h-4 w-4 rounded-full ${!spoilerProtection ? colorClass : 'bg-gray-400'}`}/> 
        {status}

    </div>)
}

export default StatusIndicator