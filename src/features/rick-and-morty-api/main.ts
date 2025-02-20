import CHARACTER_ENTITY from "./entities/character.api"
import EPISODE_ENTITY from "./entities/episode.api"
import LOCATION_ENTITY from "./entities/location.api"


const RICK_AND_MORTY_API = {
  characters: CHARACTER_ENTITY,
  episodes: EPISODE_ENTITY,
  locations: LOCATION_ENTITY,
  getByName: (name: string ) => Promise.allSettled([
    RICK_AND_MORTY_API.characters.getAll({name}),
    RICK_AND_MORTY_API.episodes.getAll({name}),
    RICK_AND_MORTY_API.locations.getAll({name}),
  ]).then(r => r.map(entity => {
      if(entity.status === "rejected") return []
      return entity.value.results
    })
  )
}


export default RICK_AND_MORTY_API