import { getAll } from "../client.api"
import MultipleEntityResponse from "../types/multiple-entity"
import { extractPageNumber } from "./url-data-collection"

// PROXY //////////////////////////////////////////////////////////////////////////////////////////////
export const manyRecordsProxy = <T>(entityName: string, data: any): MultipleEntityResponse<T> => {

  const nextFunction = data.info.next 
    ? () => getAll<T>(entityName, extractPageNumber(data.info.next)) 
    : undefined
    
  const prevFunction = data.info.prev
    ? () => getAll<T>(entityName, extractPageNumber(data.info.prev)) 
    : undefined

  const page = 
           data.info.next ? extractPageNumber(data.info.next) - 1 : 0 
        || data.info.prev ? extractPageNumber(data.info.prev) + 1 : 0 
        || 1 

  return {
    info: {
      count: data.info.count,
      pages: data.info.pages,
      next: nextFunction,
      prev: prevFunction,
      page
    },
    results: data.results
  }
}
