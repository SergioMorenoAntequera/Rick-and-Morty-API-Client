import CHARACTER_ENTITY from "./entities/character.api"
import EPISODE_ENTITY from "./entities/episode.api"
import LOCATION_ENTITY from "./entities/location.api"
import { getByName } from "./entities/general.api"

const RICK_AND_MORTY_API = {
  characters: CHARACTER_ENTITY,
  episodes: EPISODE_ENTITY,
  locations: LOCATION_ENTITY,
  getByName: getByName
} as const

export default RICK_AND_MORTY_API