import { ReactNode } from 'react'

import ReactQueryProvider from './ReactQueryProvider'
import SpoilerProtectionProvider from './SpoilerProtection'

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