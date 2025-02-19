
export function extractPageNumber(link: string) {
    return parseInt(link.substring(link.indexOf("page=") + 5))
}

export function extractId(link: string) {
    return parseInt(link.substring(link.lastIndexOf("/") + 1))
}