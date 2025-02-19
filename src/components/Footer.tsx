import Link from 'next/link'
import React from 'react'

function Footer() {
  return (<div className='bg-gray-50 border-t border-solid'>
    
    <div className='container mx-auto z-50 top-0 border-b border-black p-4 flex items-center justify-between'>
        <Link href='https://github.com/SergioMorenoAntequera'> Developed by Sergio Moreno Antequera </Link>
    </div>

</div>)
}

export default Footer