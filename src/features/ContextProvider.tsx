import { ReactNode } from 'react'

import ReactQueryProvider from './react-query/ReactQueryProvider'
import SpoilerProtectionProvider from './spoiler-protection/SpoilerProtection'

type ContextProviderProps = { children: ReactNode }
const ContextProvider = ({ children }: ContextProviderProps) => {
    
  return <>
    <ReactQueryProvider>
      <SpoilerProtectionProvider>
        {children}
      </SpoilerProtectionProvider>
    </ReactQueryProvider>
  </>
}

export default ContextProvider