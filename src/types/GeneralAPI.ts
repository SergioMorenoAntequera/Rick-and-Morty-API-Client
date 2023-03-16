import AllResponse from "./AllResponse"


type GeneralAPI<T> = {
    entityName: string
    all: (page?: number) => Promise<AllResponse<T>>
    getById: (idTofetch: string) => Promise<T> 
}

export default GeneralAPI