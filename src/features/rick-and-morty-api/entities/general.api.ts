import RICK_AND_MORTY_API from "../main"
import Character from "../types/character.type"
import Episode from "../types/episodes.type"
import Location from "../types/location.type"

export const getByName = async (name: string ) => {

    const data = await Promise.allSettled([
        RICK_AND_MORTY_API.characters.getAll({name}),
        RICK_AND_MORTY_API.locations.getAll({name}),
        RICK_AND_MORTY_API.episodes.getAll({name}),
    ]).then(responses => responses.map(response => 
        response.status === "rejected" ? [] : response.value.results
    ))

    return {
        character: data[0] as Character[],
        location: data[1] as Location[],
        episode: data[2] as Episode[],
    }
}

