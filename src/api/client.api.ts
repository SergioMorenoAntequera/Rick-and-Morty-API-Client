import AllResponse from "@/types/AllResponse";
import GeneralAPI from "@/types/GeneralAPI";
import axios from "axios";

// PROXY //////////////////////////////////////////////////////////////////////////////////////////////
const allPagesProxy = (entityName: string, data: any): AllResponse<T> => {
    
    return {
        info: {
            count: data.info.count,
            pages: data.info.pages,
        },
        results: data.results
    }
}

// CALLS //////////////////////////////////////////////////////////////////////////////////////////////

const AXIOS_CLIENT = axios.create({ baseURL: 'https://rickandmortyapi.com/api/', timeout: 1000 });

export function getAll<T>(entityName: string, page?: number): Promise<AllResponse<T>> {
    return AXIOS_CLIENT.get(`${entityName}?page=${page}`).then(res => res.data)
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
