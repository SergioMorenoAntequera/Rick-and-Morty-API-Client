
type Character = {
    id: number,
    name: string,
    status: CharacterStatus,
    species: string,
    type: string,
    gender: string,
    image: string
    origin: {
        name: string
        url: string
    },
    location: {
        name: string
        url: string
    },
    episode: string[]
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export default Character