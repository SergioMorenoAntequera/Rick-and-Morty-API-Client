import { useContext } from 'react'
import { useRouter } from 'next/router'
import { SpoilerContext } from '@/features/SpoilerContext'

function Header() {
    const router = useRouter()
    const {spoilerProtection: showingSpoilers, toggleSpoilers} = useContext(SpoilerContext)

    return ( <>
        <div className='h-16 bg-gray-50'> </div>

        <div className='fixed z-50 top-0 bg-white w-full border-b border-black p-4  flex items-center justify-between'>
        
            <div className='flex gap-5'>
                <div className='cursor-pointer mr-6 font-bold' onClick={()=>router.push('/')}> Home </div>

                <div className={`cursor-pointer ${router.asPath.includes('character') ? 'font-bold' : ''}`} onClick={()=>router.push('/character')}> Characters </div>
                <div className={`cursor-pointer ${router.asPath.includes('location') ? 'font-bold' : ''}`} onClick={()=>router.push('/location')}> Locations </div>
                <div className={`cursor-pointer ${router.asPath.includes('episode') ? 'font-bold' : ''}`} onClick={()=>router.push('/episode')}> Episodes </div>    
            </div>

            <div className='top-0 flex items-center justify-center'>
                <span className='mr-2'> Spoiler Protection: </span>
                <button onClick={toggleSpoilers} 
                    className={`relative w-12 h-6 rounded-full bg-gray-300 focus:outline-none ${showingSpoilers ? 'bg-blue-400' : 'bg-gray-400'}`}
                >
                    <span className={`absolute inset-0 w-6 h-6 rounded-full shadow-lg bg-white transform transition-transform ease-in-out ${showingSpoilers ? 'translate-x-full' : 'translate-x-0'}`}/>
                </button>   
            </div>
        </div>
    </>)
}

export default Header