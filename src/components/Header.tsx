import { useContext } from 'react'
import { useRouter } from 'next/router'
import { SpoilerProtectionContext } from '@/features/spoiler-protection/SpoilerProtection'

function Header() {

  const router = useRouter()
  const { showingSpoilers, toggleSpoilers } = useContext(SpoilerProtectionContext)

  return (<div className='bg-gray-50 border-b border-black sticky top-0 z-50'>

    <div className='container mx-auto top-0 p-4 flex items-center justify-between'>
        
      <div className='flex gap-5'>
        <div className='cursor-pointer mr-6 font-bold' onClick={()=>router.push('/')}> Home </div>

        <div className={`cursor-pointer ${router.asPath.includes('character') ? 'font-bold' : ''}`} onClick={()=>router.push('/character')}> Characters </div>
        <div className={`cursor-pointer ${router.asPath.includes('location') ? 'font-bold' : ''}`} onClick={()=>router.push('/location')}> Locations </div>
        <div className={`cursor-pointer ${router.asPath.includes('episode') ? 'font-bold' : ''}`} onClick={()=>router.push('/episode')}> Episodes </div>    
      </div>

      <div className='top-0 flex items-center justify-center'>
        <span className='mr-2'> Spoiler Protection: </span>
        <button 
          onClick={toggleSpoilers} 
          className={`relative w-12 h-6 rounded-full focus:outline-none ${showingSpoilers ? 'bg-black' : 'bg-gray-400'}`}
        >
          <span className={`absolute inset-0 w-6 h-6 rounded-full shadow-lg bg-white transform transition-transform ease-in-out ${showingSpoilers ? 'translate-x-full' : 'translate-x-0'}`}/>
        </button>   
      </div>
    </div>
  </div>)
}

export default Header