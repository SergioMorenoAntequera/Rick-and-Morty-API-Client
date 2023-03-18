
import Link from 'next/link'

type LinkLabel = {id:number, name: string} 
type Props = {
    title: string, 
    entityName:string, 
    data?:LinkLabel[],
    renderEl?: (option: any | LinkLabel) => JSX.Element | string
    className?: string
}

function LabelList({title, entityName, data, renderEl, className}: Props) {
    const wayToRenderElement = renderEl ?? ((element: LinkLabel) => element.name)

    if(!data) return <></> 
    return (<div className={className}>
        <p className='text-2xl font-bold my-2'> {title} {data.length} </p>
        <div className='flex flex-wrap gap-4'>
            
            {data?.map(dataEl => <Link key={dataEl.id} href={`/${entityName}/${dataEl.id}`}> 
                
                <div className='hover:bg-gray-100 transition border-container hover'> 
                    {wayToRenderElement(dataEl)} 
                </div>

            </Link>)}
            
        </div>
    </div>)
}

export default LabelList