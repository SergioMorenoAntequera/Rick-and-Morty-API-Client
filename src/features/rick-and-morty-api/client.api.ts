import MultipleEntityResponse, { MultipleEntityParams } from "@/features/rick-and-morty-api/types/multiple-entity"
import GenericEntity from "@/features/rick-and-morty-api/types/generic-entity"
import axios from "axios"
import { manyRecordsProxy } from "./utils/convertion"


// CALLS //////////////////////////////////////////////////////////////////////////////////////////////

const AXIOS_CLIENT = axios.create({ baseURL: 'https://rickandmortyapi.com/api/', timeout: 1000 })

export function getAll<T>(entityName: string, params?: MultipleEntityParams): Promise<MultipleEntityResponse<T>> {
  
  let urlParams = params 
    ? '?' + Object.entries(params).reduce((acc, curr) => acc += `${curr[0]}=${curr[1]}&`, '') 
    : ''

  return AXIOS_CLIENT.get(`${entityName}${urlParams}`).then(res => manyRecordsProxy<T>(entityName, res.data))
}

export function getById<T>(entityName: string, idTofetch: number): Promise<T> {
  return AXIOS_CLIENT.get(`${entityName}/${idTofetch}`).then(res => res.data as T)
}

export function getManyById<T>(entityName: string, idsToFetch: number[]): Promise<Awaited<T>[]> {
  return Promise.all(idsToFetch.map(idToFetch => 
    AXIOS_CLIENT.get(`${entityName}/${idToFetch}`).then(res => res.data as T)
  ))
}

function constructClientConsumer<EntityType>(entityName: string): GenericEntity<EntityType> {
  return ({
    entityName,
    getAll: (params?: MultipleEntityParams) => getAll<EntityType>(entityName, params),
    getById: (idTofetch: number) => getById<EntityType>(entityName, idTofetch),
    getManyById: (idsTofetch: number[]) => getManyById<EntityType>(entityName, idsTofetch)
  })
}


export default constructClientConsumer