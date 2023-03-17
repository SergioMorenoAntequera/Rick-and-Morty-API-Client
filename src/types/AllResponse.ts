

type AllResponse<T> = {
    info: {
        count: number,
        pages: number,
        page: number, 
        next?: () => Promise<AllResponse<T>>,
        prev?: () => Promise<AllResponse<T>>
    },
    results: T[]
}

export default AllResponse