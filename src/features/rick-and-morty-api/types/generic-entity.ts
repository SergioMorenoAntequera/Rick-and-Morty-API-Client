
import MultipleEntityResponse from "./multiple-entity-response"

type GenericEntity<T> = {
    entityName: string
    getAll: (page?: number) => Promise<MultipleEntityResponse<T>>
    getById: (idTofetch: number) => Promise<T> 
    getManyById: (idsTofetch: number[]) => Promise<T[]>
}

export default GenericEntity