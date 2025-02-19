import Character from "@/features/rick-and-morty-api/entities/character.type"
import EPISODE_ENTITY from "./episode.api"
import { extractId } from "../utils/url-data-collection"
import LOCATION_ENTITY from "./location.api"
import constructClientConsumer from "../client.api"

// CALLS  //////////////////////////////////////////////////////////////////// 

const CHARACTER_ENTITY = {
    ...constructClientConsumer<Character>('character'),
    getEpisodes: (episodesUrls: string[]) => EPISODE_ENTITY.getManyById(episodesUrls.map(extractId)),
    getLocation: (locationUrl: string) => locationUrl ? LOCATION_ENTITY.getById(extractId(locationUrl)) : null,
    getOrigin: (originUrl: string) => originUrl ? LOCATION_ENTITY.getById(extractId(originUrl)) : null,
    getEverything: (charaterId: number) => CHARACTER_ENTITY.getById(charaterId)
        .then(character => Promise.all([
            new Promise<Character>(resolve => resolve(character)),
            CHARACTER_ENTITY.getOrigin(character.origin.url),
            CHARACTER_ENTITY.getLocation(character.location.url),
            CHARACTER_ENTITY.getEpisodes(character.episode)
        ]))
}

export default CHARACTER_ENTITY