import Header from '@/components/Header'
import { SpoilerContext, useSpoilerContext } from '@/features/SpoilerContext'
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
     <SpoilerContext.Provider value={useSpoilerContext()}>

      <Header/>
      
      <div className='p-4'>
        <Component {...pageProps} />
      </div>
      </SpoilerContext.Provider>
    </QueryClientProvider>
  </>)
}
