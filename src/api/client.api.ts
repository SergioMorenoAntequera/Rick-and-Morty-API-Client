import AllResponse from "@/types/AllResponse";
import GeneralAPI from "@/types/GeneralAPI";
import axios from "axios";

function extractPageNumber(link: string) {
    
    return parseInt(link.substring(link.indexOf("page=") + 5))
}

// PROXY //////////////////////////////////////////////////////////////////////////////////////////////
const allPagesProxy = <T>(entityName: string, data: any): AllResponse<T> => {

    const nextFunction = data.info.next 
            ? () => getAll<T>(entityName, extractPageNumber(data.info.next)) 
            : undefined

    const prevFunction = data.info.prev
            ? () => getAll<T>(entityName, extractPageNumber(data.info.prev)) 
            : undefined

    return {
        info: {
            count: data.info.count,
            pages: data.info.pages,
            next: nextFunction,
            prev: prevFunction,
        },
        results: data.results
    }
}

// CALLS //////////////////////////////////////////////////////////////////////////////////////////////

const AXIOS_CLIENT = axios.create({ baseURL: 'https://rickandmortyapi.com/api/', timeout: 1000 });

export function getAll<T>(entityName: string, page?: number): Promise<AllResponse<T>> {
    return AXIOS_CLIENT.get(`${entityName}?page=${page}`).then(res => allPagesProxy<T>(entityName, res.data))
}

export function getById<T>(entityName: string, idTofetch: string): Promise<T> {
    return AXIOS_CLIENT.get(`${entityName}/${idTofetch}`).then(res => res.data as T)
}

function constructClientConsumer<EntityType>(entityName: string, otherAttributes?: any): GeneralAPI<EntityType> {
    return ({
        entityName,
        all: (page?: number) => getAll<EntityType>(entityName, page),
        byId: (idTofetch: string) => getById<EntityType>(entityName, idTofetch),
        ...otherAttributes
    })
}


export default constructClientConsumer
