import AllResponse from "./AllResponse"


type GenericAPI<T> = {
    entityName: string
    getAll: (page?: number) => Promise<AllResponse<T>>
    getById: (idTofetch: number) => Promise<T> 
    getManyById: (idsTofetch: number[]) => Promise<Awaited<T>[]>
}

export default GenericAPI