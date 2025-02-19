
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ContextProvider from '@/features/ContextProvider'
import { ChildrenProp } from '@/types/utils.types'

import React from 'react'

function MainLayout({ children }: ChildrenProp) {
    
    return (<ContextProvider>
        <div className='flex flex-col min-h-screen'>
        
            <Header />

            <div className='container mx-auto flex-1 py-4'>
                {children}
            </div>
            
            <Footer />

        </div>
    </ContextProvider>)
}

export default MainLayout