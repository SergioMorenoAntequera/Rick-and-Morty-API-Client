import AllResponse from "@/types/AllResponse";
import GenericAPI from "@/types/GeneralAPI";
import axios from "axios";
import { extractPageNumber } from "./utils";


// PROXY //////////////////////////////////////////////////////////////////////////////////////////////
const manyRecordsProxy = <T>(entityName: string, data: any): AllResponse<T> => {

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

// CALLS //////////////////////////////////////////////////////////////////////////////////////////////

const AXIOS_CLIENT = axios.create({ baseURL: 'https://rickandmortyapi.com/api/', timeout: 1000 });

export function getAll<T>(entityName: string, page?: number): Promise<AllResponse<T>> {
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

function constructClientConsumer<EntityType>(entityName: string): GenericAPI<EntityType> {
    return ({
        entityName,
        getAll: (page?: number) => getAll<EntityType>(entityName, page),
        getById: (idTofetch: number) => getById<EntityType>(entityName, idTofetch),
        getManyById: (idsTofetch: number[]) => getManyById<EntityType>(entityName, idsTofetch)
    })
}


export default constructClientConsumer