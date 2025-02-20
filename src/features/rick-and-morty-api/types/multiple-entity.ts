
export type MultipleEntityParams = Partial<{
    page: number
    name: string   
}>

type MultipleEntityResponse<T> = {
    info: {
        count: number,
        pages: number,
        page: number, 
        next?: () => Promise<MultipleEntityResponse<T>>,
        prev?: () => Promise<MultipleEntityResponse<T>>
    },
    results: T[]
}

export default MultipleEntityResponse