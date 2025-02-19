import MultipleEntityResponse from "@/features/rick-and-morty-api/types/multiple-entity-response"
import GenericEntity from "@/features/rick-and-morty-api/types/generic-entity"
import axios from "axios"
import { manyRecordsProxy } from "./utils/convertion"


// CALLS //////////////////////////////////////////////////////////////////////////////////////////////

const AXIOS_CLIENT = axios.create({ baseURL: 'https://rickandmortyapi.com/api/', timeout: 1000 })

export function getAll<T>(entityName: string, page?: number): Promise<MultipleEntityResponse<T>> {
  return AXIOS_CLIENT.get(`${entityName}?page=${page}`).then(res => manyRecordsProxy<T>(entityName, res.data))
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
    getAll: (page?: number) => getAll<EntityType>(entityName, page),
    getById: (idTofetch: number) => getById<EntityType>(entityName, idTofetch),
    getManyById: (idsTofetch: number[]) => getManyById<EntityType>(entityName, idsTofetch)
  })
}


export default constructClientConsumer