import CHARACTER_ENTITY from "./entities/character.api"
import EPISODE_ENTITY from "./entities/episode.api"
import LOCATION_ENTITY from "./entities/location.api"
import Character from "./types/character.type"
import Episode from "./types/episodes.type"
import Location from "./types/location.type"


const RICK_AND_MORTY_API = {
  characters: CHARACTER_ENTITY,
  episodes: EPISODE_ENTITY,
  locations: LOCATION_ENTITY,
  getByName: async (name: string ) => {

    const data = await Promise.allSettled([
      RICK_AND_MORTY_API.characters.getAll({name}),
      RICK_AND_MORTY_API.episodes.getAll({name}),
      RICK_AND_MORTY_API.locations.getAll({name}),
    ]).then(r => r.map(entity => {
        if(entity.status === "rejected") return []
        return entity.value.results
      })
    )
    return {
      character: data[0] as Character[],
      episode: data[1] as Episode[],
      location: data[2] as Location[],
    }
  }
} as const

export default RICK_AND_MORTY_API