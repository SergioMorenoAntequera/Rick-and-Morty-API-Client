
type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    image: "https://rickandmortyapi.com/api/character/avatar/41.jpeg",
    origin: {
        name: "Fantasy World",
        url: "https://rickandmortyapi.com/api/location/48"
    },
    location: {
        name: "Fantasy World",
        url: "https://rickandmortyapi.com/api/location/48"
    },
    episode: string[]
}

export default Character