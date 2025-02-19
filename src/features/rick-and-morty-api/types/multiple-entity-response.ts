

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