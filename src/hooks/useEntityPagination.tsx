/* eslint-disable react-hooks/exhaustive-deps */

import GenericEntity from "@/features/rick-and-morty-api/types/generic-entity"
import { extractPageNumber, extractParam } from "@/features/rick-and-morty-api/utils/url-data-collection"
import { getAroundNumbers } from "@/utils/number.utils"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"

export default function useEntityPagination<T>(entityAPI: GenericEntity<T>) {
  const router = useRouter()
  const page = parseInt(extractParam(router.asPath, "name") || '1')
  const name = extractParam(router.asPath, "name")

  const { isLoading, error, data: result, refetch } = useQuery(
    ['selectedAPI', page, name], 
    () => entityAPI.getAll({page, name})
  )
  const [ data, setData ] = useState(result)

  useEffect(() => {
    if(!router) return
    refetch()
  }, [ router ])
    

  useEffect(() => {
    if(!result) return
    setData(result)
  }, [ result ])

  async function showPrev() {
    if(!data?.info.prev) return
    const newReponse =  await data?.info.prev()
    router.push('?page='+newReponse.info.page, undefined, { shallow: true })
    setData(newReponse)
  }
  async function showNext() {
    if(!data?.info.next) return
    const newReponse =  await data?.info.next()
    router.push('?page='+newReponse.info.page, undefined, { shallow: true })
    setData(newReponse)
  }
  async function goToPage(page: number) {
    const newReponse =  await entityAPI.getAll({page})
    router.push('?page='+page, undefined, { shallow: true })
    setData(newReponse)
  }


  const pagesToShow = getAroundNumbers(data?.info.page, 3, data?.info.pages)

  const paginationControllerEl = <div className='border-container flex gap-4 mb-6 items-center'>
    <div className="mr-8">
      <p> Total of {entityAPI.entityName}s: {data?.info.count} </p>
      <p> Page where we are {data?.info.page} / {data?.info.pages} </p>
    </div >

    <button disabled={!data?.info.prev} onClick={showPrev}> prev </button>

    { pagesToShow.map(pageNumber => 
      <div key={pageNumber} 
        className={`
          ${pageNumber === data?.info.page ? 'bg-black text-white': 'bg-gray-200'}
          w-6 h-6 rounded text-center cursor-pointer
        `} 
        onClick={()=>{goToPage(pageNumber)}}> 
        {pageNumber} 
      </div>)}
        


    <button disabled={!data?.info.next} onClick={showNext}> next </button>
  </div>

  return { isLoading, error, data, showPrev, showNext, paginationControllerEl }
}

