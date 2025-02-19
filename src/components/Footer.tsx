import Link from 'next/link'
import React from 'react'

function Footer() {
  return (<div className='bg-gray-50 border-t border-black'>
    
    <div className='container mx-auto p-4'>
      
      <Link href='https://github.com/SergioMorenoAntequera' target='_blank'> 
        Developed by 👉 Sergio Moreno Antequera 
      </Link>

    </div>

  </div>)
}

export default Footer