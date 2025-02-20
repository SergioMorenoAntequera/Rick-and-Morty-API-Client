
import MultipleEntityResponse, { MultipleEntityParams } from "./multiple-entity"

type GenericEntity<T> = {
    entityName: string
    getAll: (params?: MultipleEntityParams) => Promise<MultipleEntityResponse<T>>
    getById: (idTofetch: number) => Promise<T> 
    getManyById: (idsTofetch: number[]) => Promise<T[]>
}

export default GenericEntity