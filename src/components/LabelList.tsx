
import Link from 'next/link'
import React from 'react'

type LinkLabel = {id:number, name:string} 
type Props = {
    title: string, 
    entityName:string, 
    data?:LinkLabel[]
}

function LabelList({title, entityName, data}: Props) {
    if(!data) return <></> 
    return (<div>
        <p className='text-2xl font-bold my-2'> {title} </p>
        <div className='flex flex-wrap gap-2'>
            
            {data?.map(dataEl => 
                <Link key={dataEl.id} href={`/${entityName}/${dataEl.id}`}> 
                    <div className='p-1 bg-gray-300 rounded'> { dataEl.name } </div>
                </Link>
            )}
            
        </div>
    </div>)
}

export default LabelList