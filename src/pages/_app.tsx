import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  const queryClient = new QueryClient({defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  }})

  return (<>
    <QueryClientProvider client={queryClient}>


      <div className='w-full border-b border-black p-4 flex gap-5'>
        <div className='cursor-pointer mr-6' onClick={()=>router.push('/')}> Home </div>

        <div className='cursor-pointer' onClick={()=>router.push('/character')}> Characters </div>
        <div className='cursor-pointer' onClick={()=>router.push('/location')}> Locations </div>
        <div className='cursor-pointer' onClick={()=>router.push('/episode')}> Episodes </div>
      </div>
      
      <div className='p-4'>
        <Component {...pageProps} />
      </div>

    </QueryClientProvider>
  </>)
}
